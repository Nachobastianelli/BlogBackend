import { appEvents } from "../events/events";
import { IUser, User } from "../models/User";

interface CreateUserDTO {
  firstname: string;
  lastname: string;
  mail: string;
  phone?: string;
  avatar?: string;
  password: string;
}

interface UpdateUserDTO {
  firstname?: string;
  lastname?: string;
  mail?: string;
  phone?: string;
  avatar?: string;
}

export class UserService {
  static async createUser(data: CreateUserDTO): Promise<IUser> {
    const { password, ...rest } = data;
    const user = new User({
      ...rest,
      hashedPassword: password,
    });
    await user.save();
    console.log("Emitiendo evento userCreated", user.mail);
    appEvents.emit("userCreated", user);
    return user;
  }

  static async getUserByEmail(
    email: string,
    includePassword = false
  ): Promise<IUser | null> {
    if (includePassword) {
      return User.findOne({ mail: email }).select("+hashedPassword").exec();
    }
    return User.findOne({ mail: email }).exec();
  }

  static async getUserById(id: string): Promise<IUser | null> {
    return User.findById(id).exec();
  }

  static async updateUser(
    id: string,
    updateData: UpdateUserDTO
  ): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  static async deleteUser(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id).exec();
  }
}
