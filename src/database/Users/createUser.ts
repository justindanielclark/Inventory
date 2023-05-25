import { MongoClient, WithId } from "mongodb";
import getUsersCollection from "./getUsersCollection";
import { User } from "../../types/User";
export default async function createUser(client: MongoClient, user: User) {
  const result = await getUsersCollection(client).insertOne(user);
  return result;
}
