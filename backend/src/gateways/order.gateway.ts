import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { date } from 'drizzle-orm/mysql-core';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class OrderGateway {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    const { shopId } = client.handshake.query;
    if (shopId) client.join(shopId.toString());
    console.log(`Client joined room: ${shopId}`);
  }

  notifyNewOrder(order: any, shopId: string) {
    this.server.to(shopId).emit('newOrder', order);
  }

  handleStatusUpdate(@MessageBody() data: { shopId: string; status: string }) {
    this.server.to(data.shopId).emit('orderStatusUpdated', data);
  }
}
