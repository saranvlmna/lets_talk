import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chatgateway';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './database/models/user';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ChatModule,
    MongooseModule.forRoot('mongodb://localhost/lets_talk'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [ChatGateway],
})
export class AppModule {}
