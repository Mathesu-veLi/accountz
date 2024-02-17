import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PasswordsModule } from './passwords/passwords.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [UsersModule, PrismaModule, PasswordsModule, TokensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
