import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../entities/Connection';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface IConnectionCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

export class ConnectionsService {
  private ConnectionsRepository: Repository<Connection>;

  constructor() {
    this.ConnectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
    const connection = this.ConnectionsRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.ConnectionsRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string) {
    const connection = await this.ConnectionsRepository.findOne({
      user_id,
    });

    return connection;
  }

  async findAllWithoutAdmin() {
    const connections = await this.ConnectionsRepository.find({
      where: { admin_id: null },
      relations: ['user'],
    });

    return connections;
  }
}
