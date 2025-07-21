import { model, Document, Schema, Types } from "mongoose";

interface ContentBlock {
  type: "text" | "image";
  value: string;
}

export interface IPost extends Document {
  title: string;
  description: string;
  cover: string;
  content: ContentBlock[];
  userId: Types.ObjectId;
  views: number;
  previousViews: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PostShema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true, maxlength: 400 },
    cover: { type: String, required: true },
    content: {
      type: [
        {
          type: { type: String, enum: ["text", "image"], required: true },
          value: { type: String, required: true, maxlength: 600 },
        },
      ],
      required: true,
      validate: {
        validator: (arr: any[]) => arr.length <= 8,
        message: "El contenido no puede tener más de 8 bloques",
      },
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    views: { type: Number, default: 0 },
    previousViews: { type: Number, default: 0 },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const Post = model<IPost>("Post", PostShema);
