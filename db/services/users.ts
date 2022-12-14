import db from "../db.ts";

export function getUserWithId(userId: number) {
  return db.models.User.where("id", userId);
}

export async function getAllUsers() {
  const users = db.models.User.all();
  return users;
}
