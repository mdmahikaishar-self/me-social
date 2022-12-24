import { User } from "../models";
import { TSignupBody } from "../schemas/auth.schema";
// import bcrypt from "bcrypt";
import crypto from "crypto";
import { TUser } from "../schemas/user.schema";

/**
 * createUser
 */
export async function createUser(body: TSignupBody) {
  const id = await crypto.randomUUID();
  // const salt = await bcrypt.genSalt(10);
  const hashedPassword = body.password; // await bcrypt.hash(body.password, salt);

  const user = await User.create({ ...body, id, password: hashedPassword });
  return user.toJSON() as TUser;
}
