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
import { AccountsModule } from './modules/accounts/accounts.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { LoginRequiredMiddleware } from './middlewares/loginRequired';
import { AdminRequiredMiddleware } from './middlewares/adminRequired';

@Module({
  imports: [UsersModule, PrismaModule, AccountsModule, TokensModule],
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
        { path: 'accounts/', method: RequestMethod.ALL },
        { path: 'accounts/:id', method: RequestMethod.ALL },
      );
    consumer
      .apply(AdminRequiredMiddleware)
      .forRoutes(
        { path: 'users/', method: RequestMethod.GET },
        { path: 'users/:id', method: RequestMethod.GET },
      );
  }
}
