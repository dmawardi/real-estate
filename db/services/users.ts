import db from "../db.ts";

function getUserWithId(userId: number) {
  return db.models.User.where("id", userId);
}

async function getAllUsers() {
  const users = db.models.User.all();
  return users;
}

export default {
  getUserWithId,
  getAllUsers,
};
