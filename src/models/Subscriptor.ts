import { model, Schema, Types, Document } from "mongoose";

export interface ISubscriptor extends Document {
  bloggerId: Types.ObjectId;
  subscripterId: Types.ObjectId;
  createdAt: Date;
}

const SubscriptorSchema = new Schema<ISubscriptor>(
  {
    bloggerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subscripterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Subsctiptor = model<ISubscriptor>(
  "Subscripton",
  SubscriptorSchema
);
