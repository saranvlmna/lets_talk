import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/database/models/user';
import { Model } from 'mongoose';
import { Active, ActiveDocument } from 'src/database/models/liveuser';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Active.name) private liveModel: Model<ActiveDocument>,
  ) {}

  createUser() {
    this.userModel.create({});
  }

  findUser(userId: any) {
    return this.liveModel.findOne({ userId });
  }

  updateUser(userId: any, socketId: any) {
    return this.userModel.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          socketId: socketId,
        },
      },
    );
  }

  async activeUser(userId: any, socketId: any) {
    const activeUser = await this.liveModel.find({ userId });
    if (activeUser && activeUser.length !== 0) {
      return this.liveModel.updateOne(
        { userId },
        {
          socketId,
        },
      );
    } else {
      return this.liveModel.create({
        userId,
        socketId,
      });
    }
  }

  async offlineUser(socketId: any) {
    return this.liveModel.deleteOne({ socketId });
  }
}
