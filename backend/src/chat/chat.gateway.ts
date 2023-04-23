import {
  ClassSerializerInterceptor,
  Logger,
  ParseIntPipe,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketUser } from '../users/users.decorator';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Role, Status } from './entities/chat-users.entity';

@UseInterceptors(ClassSerializerInterceptor)
@WebSocketGateway({
  transports: ['websocket'],
  cors: '*',
})
export class ChatGateway implements OnGatewayConnection {
  private connectedUsers = new Map<number, Socket>();
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    const userId = client.handshake.auth?.user?.id;
    if (!userId) {
      client.disconnect();
      return;
    }

    // Store the user id and socket id in a map
    this.connectedUsers.set(userId, client);

    // Fetch the user's chats and join the socket rooms
    const chats = await this.chatService.findChatRoomsByUserId(userId);
    chats.forEach((chat) => client.join(`chat:${chat.id}`));
    client.emit('listChats', chats);

    // Fetch the user's active chat messages and send them to the client
    const messages = await this.chatService.findMessagesByChatId(chats[0].id);
    client.emit('listMessages', messages);
  }

  @SubscribeMessage('listChats')
  async listChats(
    @SocketUser('id') userId: number,
    @ConnectedSocket() client: Socket,
  ) {
    const chats = await this.chatService.findChatRoomsByUserId(userId);
    client.emit('listChats', chats);

    return chats;
  }

  @SubscribeMessage('createChat')
  async createChatRoom(
    @SocketUser('id') userId: number,
    @MessageBody(new ValidationPipe({ transform: true }))
    createChatDto: CreateChatDto,
  ) {
    const chat = await this.chatService.createChatRoom(userId, createChatDto);
    if (!chat) {
      return;
    }

    await Promise.all(
      chat.users.map(async (chatUsers) => {
        const socket = this.connectedUsers.get(chatUsers.user.id);
        if (socket) {
          socket.join(`chat:${chat.id}`);
          const chats = await this.chatService.findChatRoomsByUserId(
            chatUsers.user.id,
          );
          socket.emit('listChats', chats);
        }
      }),
    );
  }

  @SubscribeMessage('createDirectMessage')
  async createDirectMessage(
    @SocketUser('id') userId: number,
    @MessageBody(new ValidationPipe()) friendId: number,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      this.logger.debug(`create dm - ${userId} : ${friendId}`);
      const chat = await this.chatService.createDirectMessageRoom(
        userId,
        friendId,
      );

      await Promise.all(
        chat.users.map(async (chatUsers) => {
          const socket = this.connectedUsers.get(chatUsers.user.id);
          if (socket) {
            socket.join(`chat:${chat.id}`);
            const chats = await this.chatService.findChatRoomsByUserId(
              chatUsers.user.id,
            );
            socket.emit('listChats', chats);
          }
        }),
      );
    } catch (err) {
      client.emit('apiError', err.message);
    }
  }

  @SubscribeMessage('joinChat')
  async joinChat(
    @MessageBody(new ValidationPipe()) joinChatDto: JoinChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { chatId, userIds } = joinChatDto;
    const chat = await this.chatService.joinChat(chatId, userIds);

    try {
      // Join chat users to the new room
      await Promise.all(
        chat.users.map(async (chatUsers) => {
          const socket = this.connectedUsers.get(chatUsers.user.id);
          if (socket) {
            socket.join(`chat:${chat.id}`);
            const chats = await this.chatService.findChatRoomsByUserId(
              chatUsers.user.id,
            );
            socket.emit('listChats', chats);
          }
        }),
      );
    } catch (err) {
      client.emit('apiError', err.message);
    }
  }

  @SubscribeMessage('leaveChat')
  async leaveChat(
    @SocketUser('id') userId: number,
    @MessageBody(new ParseIntPipe()) chatId: number,
  ) {
    return await this.chatService.leaveChatRoom(userId, chatId);
  }

  @SubscribeMessage('inviteUsers')
  async inviteUsers(
    @SocketUser('id') userId: number,
    @MessageBody(new ParseIntPipe()) chatId: number,
    @MessageBody(new ValidationPipe()) userIds: number[],
  ) {
    return await this.chatService.inviteUsersToChatRoom(chatId, userIds);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @SocketUser('id') userId: number,
    @MessageBody(new ValidationPipe()) messageDto: PostMessageDto,
  ) {
    const { chatId, content } = messageDto;
    const newMessage = await this.chatService.sendMessage(
      userId,
      chatId,
      content,
    );
    this.server.to(`chat:${chatId}`).emit('newMessage', newMessage);
  }

  @SubscribeMessage('listMessages')
  async listMessages(
    @MessageBody(new ParseIntPipe()) chatId: number,
    @ConnectedSocket() client: Socket,
  ) {
    const messages = await this.chatService.findMessagesByChatId(chatId);

    client.emit('listMessages', messages);

    return messages;
  }

  // @SubscribeMessage('promoteToAdmin')
  // async promoteUser(
  //   @SocketUser('id') userId: number,
  //   @MessageBody(new ValidationPipe()) promoteToAdminDto: PromoteToAdminDto,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   await this.chatService.promoteUser(
  //     userId,
  //     promoteToAdminDto.chatId,
  //     promoteToAdminDto.userId,
  //   );

  //   return await this.listChats(userId, client);
  // }

  // @SubscribeMessage('demoteToMember')
  // async demoteUser(
  //   @SocketUser('id') userId: number,
  //   @MessageBody(new ValidationPipe()) demoteToMemberDto: DemoteToMemberDto,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   await this.chatService.demoteUser(
  //     userId,
  //     demoteToMemberDto.chatId,
  //     demoteToMemberDto.userId,
  //   );

  //   return await this.listChats(userId, client);
  // }

  @SubscribeMessage('updateMember')
  async muteMember(
    @SocketUser('id') userId: number,
    @MessageBody(new ValidationPipe()) updateMember: UpdateMemberDto,
    @ConnectedSocket() client: Socket,
  ) {
    await this.chatService.updateMember(
      userId,
      updateMember.chatId,
      updateMember.userId,
      updateMember.role,
      updateMember.status,
    );

    // Notify the user that they have been modified
    const socket = this.connectedUsers.get(updateMember.userId);
    if (socket) {
      const chats = await this.chatService.findChatRoomsByUserId(
        updateMember.userId,
      );
      socket.emit('listChats', chats);
    }

    // Notify the requester that the user has been modified
    return await this.listChats(userId, client);
  }

  @SubscribeMessage('deleteMember')
  async deleteMember(
    @SocketUser('id') userId: number,
    @MessageBody(new ValidationPipe()) deleteMember: DeleteMemberDto,
    @ConnectedSocket() client: Socket,
  ) {
    await this.chatService.deleteMember(
      userId,
      deleteMember.chatId,
      deleteMember.userId,
    );

    // Notify the user that they have been deleted
    const socket = this.connectedUsers.get(deleteMember.userId);
    if (socket) {
      const chats = await this.chatService.findChatRoomsByUserId(
        deleteMember.userId,
      );
      socket.emit('listChats', chats);
    }

    return await this.listChats(userId, client);
  }
}

export interface PostMessageDto {
  chatId: number;
  content: string;
}

export interface JoinChatDto {
  chatId: number;
  userIds: number[];
}

export interface PromoteToAdminDto {
  chatId: number;
  userId: number;
}

export interface DemoteToMemberDto {
  chatId: number;
  userId: number;
}

export type UpdateMemberDto = {
  chatId: number;
  userId: number;
  role?: Role;
  status?: Status;
};

export type DeleteMemberDto = {
  chatId: number;
  userId: number;
};
