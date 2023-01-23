import { Logger } from '@nestjs/common';
import { ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

export const FRONTEND_URL = process.env.FRONTEND_URL

interface Positions {
  [id: string]: {
    x: number,
    y: number
  }
}

@WebSocketGateway(
  {
    transports: ['websocket'],
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private positions: Positions = {}
  private readonly frameRate = 30;
  private readonly logger: Logger = new Logger(GameGateway.name);

  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.debug(`Client connected: ${client.id}`);
    this.positions[client.id] = { x: 0.5, y: 0.5 };

    setInterval(() => {
      this.server.emit("positions", this.positions);
    }, 1000 / this.frameRate);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.debug(`Client disconnected: ${client.id}`);
    delete this.positions[client.id];
  }

  @SubscribeMessage('updatePosition')
  updatePositions(client: Socket, payload: any): void {
    this.logger.debug(`Update position for socket: ${client.id}`)
    this.positions[client.id].x = payload.x;
    this.positions[client.id].y = payload.y;
  }

  @SubscribeMessage('Input_raquete')
  updateRaquete(client: Socket, payload: any): void {
    this.logger.debug(`coordinates received: x: ${payload.x} y: ${payload.y}`)
  }

}

// Recebe conexao
//  Player impar (envia sinal "player")
//  Player par (envia sinal "player")
//  Telespectador (envia sinal "spectator")
//
//  no sinal player
//    push id no vetor de sockets
//    se for impar manda msg de player left
//    se for par manda msg de player right
//  se for impar faz setup do game
//    Inicializa raquetes
//    Inicializa bola
//    Inicializa scores
//    Cria vetor de players ?
//    Cria vetor de bola ?
//    Cria sala de jogo ?
//
// Na desconexao
//    Da vitoria para outro jogador
//    Retira jogadores do vetor de conexoes
//
// No heartbeet
//  loop para cada sala game
//    Update raquete left
//    Update raquete right
//    Update ball
//    Update score
//  Envia estado do mundo (todos juntos ? Ou envia 1 game por vez ?
//
//  Cliente no heartbeat
//    Envia posicao x y ?
//    Recebe estado do mundo
//    Limpa canvas
//    Draw canvas
//
//  Cliente envia sinal input_raquete
//  Servidor no sinal input_raquete:
//    Atualiza velocidade da raquete em questao
//
//
// Estado do jogo:
//  raquete_left
//  raquete_right
//  bola
//  id left
//  id right
//  id game
//
// Retangulo (raquete_left raquete_right bola)
//    x
//    y
//    width
//    height
//    vx
//    vy
//    score
//
