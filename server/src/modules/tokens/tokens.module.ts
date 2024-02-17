import { Module } from '@nestjs/common';
import { TokenService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TokensController],
  providers: [TokenService],
})
export class TokensModule {}
