import { Types } from "mongoose";
import { appEvents } from "../events/events";
import { Post, IPost, ContentBlock } from "../models/Post";

interface CreatePostDto {
  title: string;
  description: string;
  cover: string;
  content: ContentBlock[];
  userId: string;
  date: Date;
}

interface UpdatePostDto {
  title: string;
  description: string;
  cover: string;
  content: ContentBlock[];
}

export class PostService {
  static async createPost(data: CreatePostDto): Promise<IPost> {}
}
