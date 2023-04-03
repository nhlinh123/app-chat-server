import userModel, {User} from "../models/user.model";
import {omit} from "lodash";
import {excludedFields} from "../controllers/auth.controller";

export const createUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return omit(user.toJSON(), excludedFields);
};

