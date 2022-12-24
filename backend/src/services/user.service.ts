import { User } from "../models";
import { TUpdateUserBody, TUser } from "../schemas/user.schema";

/**
 * getUserByEmail
 */
export async function getUserByEmail(email: string) {
  const user = await User.findOne({ where: { email } });
  return user?.toJSON() as TUser;
}

/**
 * getUserById
 */
export async function getUserById(userId: string) {
  const user = await User.findOne({ where: { id: userId } });
  return user?.toJSON() as TUser;
}

/**
 * updateUser
 */
export async function updateUser(userId: string, data: TUpdateUserBody) {
  const user = await User.update(data, { where: { id: userId } });
  return !!user;
}
