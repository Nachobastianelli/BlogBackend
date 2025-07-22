import { model, Types, Schema, Document } from "mongoose";

export interface IView extends Document {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  createdAt: Date;
  userAgent?: string;
  ipAddress?: string;
}

const ViewSchema = new Schema<IView>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    userAgent: { type: String, required: false },
    ipAddress: { type: String, required: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const View = model<IView>("View", ViewSchema);
