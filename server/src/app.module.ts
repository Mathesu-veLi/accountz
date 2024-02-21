import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PasswordsModule } from './modules/passwords/passwords.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { LoginRequiredMiddleware } from './middlewares/loginRequired';

@Module({
  imports: [UsersModule, PrismaModule, PasswordsModule, TokensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginRequiredMiddleware)
      .forRoutes(
        { path: 'users/:id', method: RequestMethod.PATCH },
        { path: 'users/:id', method: RequestMethod.DELETE },
        { path: 'passwords/', method: RequestMethod.ALL },
        { path: 'passwords/:id', method: RequestMethod.ALL },
      );
  }
}
