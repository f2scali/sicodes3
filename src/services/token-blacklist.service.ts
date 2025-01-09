import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlacklistedToken } from 'src/entities/blackListToken.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenBlacklistService {
  constructor(
    @InjectRepository(BlacklistedToken)
    private blacklistRepository: Repository<BlacklistedToken>,
  ) {}

  async add(token: string): Promise<void> {
    const blacklistedToken = this.blacklistRepository.create({ token });
    await this.blacklistRepository.save(blacklistedToken);
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const exists = await this.blacklistRepository.findOne({ where: { token } });
    return !!exists;
  }
}
