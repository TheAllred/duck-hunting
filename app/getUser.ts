import { LoaderArgs } from "@remix-run/node";
import knex from "./knex";

export async function getUser(args: LoaderArgs) {
  const auth0user = args.context.user;
  if (!auth0user) {
    return undefined;
  }

  const [user] = await knex("users")
    .insert({
      email: auth0user.nickname,
    })
    .onConflict(["email"])
    .merge()
    .returning("*");
  return user;
}
