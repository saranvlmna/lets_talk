import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './chat/chat.service';
@WebSocketGateway()
export class ChatGateway {
  constructor(private chatService: ChatService) {}
  @WebSocketServer()
  async handleConnection(socket: Socket, ...args: any[]) {
    return this.chatService.activeUser(
      socket.handshake.query.userId,
      socket.id,
    );
  }

  handleDisconnect(socket: Socket) {
    return this.chatService.offlineUser(socket.id);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() message: any,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    let user = await this.chatService.findUser(message['reciverId']);
    if (user) {
      socket.to(user.socketId).emit('reciveMessage', message);
    }
  }
}
