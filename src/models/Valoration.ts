import { model, Document, Schema, Types } from "mongoose";

export interface IValoration extends Document {
  valoration: number;
  content?: string;
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ValorationSchema = new Schema<IValoration>(
  {
    valoration: {
      type: Number,
      required: true,
      max: 5,
      min: 0,
      validate: {
        validator: (v: number) => /^\d+(\.\d)?$/.test(v.toString()),
        message: (props) =>
          `${props.value} no es un valor válido. Solo se permite un decimal.`,
      },
    },
    content: { type: String, maxlength: 300, trim: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  {
    timestamps: true,
  }
);
export const Valoration = model<IValoration>("Valoration", ValorationSchema);
