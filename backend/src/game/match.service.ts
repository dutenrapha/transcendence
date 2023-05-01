import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Game, GameStatus } from './entities/game.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Game) private readonly matchRepository: Repository<Game>,
    private readonly usersService: UsersService,
    private eventEmitter: EventEmitter2,
  ) {}

  async createMatch(gameDto: CreateGameDto) {
    const playerOne = await this.usersService.findOne(gameDto.playerOne);
    const playerTwo = gameDto.playerTwo
      ? await this.usersService.findOne(gameDto.playerTwo)
      : null;

    const newGame = this.matchRepository.create({
      playerOne,
      playerTwo,
    });

    const game = await this.matchRepository.save(newGame);

    this.eventEmitter.emit('match.created', game);

    return game;
  }

  async joinMatch(gameId: string, userId: number) {
    const game = await this.matchRepository.findOne({
      where: { id: gameId },
      relations: ['playerOne', 'playerTwo'],
    });

    if (!game) {
      throw new Error('Game not found');
    }

    if (game.playerTwo) {
      throw new Error('Game already has two players');
    }

    const playerTwo = await this.usersService.findOne(userId);

    game.playerTwo = playerTwo;

    return this.matchRepository.save(game);
  }

  async updateMatch(gameId: string, gameDto: Partial<Game>) {
    const game = await this.matchRepository.findOne({
      where: { id: gameId },
      relations: ['playerOne', 'playerTwo'],
    });

    if (!game) {
      throw new Error('Game not found');
    }

    const updatedGame = this.matchRepository.merge(game, gameDto);

    return this.matchRepository.save(updatedGame);
  }

  async finishMatch(gameId: string) {
    const game = await this.matchRepository.findOne({
      where: { id: gameId },
      relations: ['playerOne', 'playerTwo'],
    });

    if (!game) {
      throw new Error('Game not found');
    }

    game.status = GameStatus.FINISHED;

    return this.matchRepository.save(game);
  }

  async getCurrentMatches() {
    return this.matchRepository.find({
      where: { status: GameStatus.WAITING || GameStatus.PLAYING },
      order: { createdAt: 'ASC' },
      relations: ['playerOne', 'playerTwo'],
    });
  }

  async getMatch(gameId: string) {
    return this.matchRepository.findOne({
      where: { id: gameId },
      relations: ['playerOne', 'playerTwo'],
    });
  }
}
