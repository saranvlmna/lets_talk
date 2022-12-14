import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chatgateway';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './database/user';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ChatModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/lets_talk'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [ChatGateway],
})
export class AppModule {}
