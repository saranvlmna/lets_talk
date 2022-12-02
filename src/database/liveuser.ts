import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActiveDocument = Active & Document;

@Schema()
export class Active {
  @Prop()
  userId: string;

  @Prop()
  socketId: string;
}

export const ActiveSchema = SchemaFactory.createForClass(Active);
