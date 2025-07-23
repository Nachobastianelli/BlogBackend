import { Types } from "mongoose";
import { appEvents } from "../events/events";
import { Post, IPost, ContentBlock } from "../models/Post";
import moment from "moment";
import { getCurrentFormattedDate } from "../utils/date";
import { UserService } from "./User.services";
import { ZodError } from "zod";
import { logger } from "../utils/logger";

interface CreatePostDto {
  title: string;
  description: string;
  cover: string;
  content: ContentBlock[];
}

interface UpdatePostDto {
  title: string;
  description: string;
  cover: string;
  content: ContentBlock[];
}

export class PostService {
  static async createPost(data: CreatePostDto, userId: string): Promise<IPost> {
    try {
      const user = await UserService.getUserById(userId);
      if (!user) throw new Error("No se encontro al usuario");

      const post = new Post({ ...data, date: new Date(), userId: user._id });
      await post.save();

      logger.info(`Emitiendo evento postCreated ${post}`);
      appEvents.emit("postCreated", post);

      return post;
    } catch (err) {
      logger.error(`Error al crear el post:\n ${err}`);
      throw new Error("No se pudo crear el post");
    }
  }
}
