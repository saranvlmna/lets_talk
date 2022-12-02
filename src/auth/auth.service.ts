import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/database/user';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findOrCreate(req: any) {
    if (req.user) {
      let isExistUser: User;
      isExistUser = await this.userModel.findOne({
        email: req.user.email,
      });
      if (!isExistUser) {
        return await this.userModel.create(req.user).then((res: any) => {
          return res;
        });
      }
      return isExistUser;
    }
  }

  generateAuthToken(user: User) {
    let payload = { user };
    return this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '1h',
    });
  }

  generateRefreshToken(userId: any) {
    let payload = { userId };
    return this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '30d',
    });
  }
}
