import { json, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { notFound } from "remix-utils";
import { getUser } from "~/getUser";

import knex from "~/knex";

export async function loader(args: LoaderArgs) {
  const user = await getUser(args);
  if (!user) {
    throw redirect("/about");
  }
  const duck = await knex("ducks").where("slug", args.params.duckId).first();

  if (!duck) {
    throw notFound({ message: "Duck Not Found!" });
  }
  await knex("user_ducks")
    .insert({
      user_id: user.id,
      duck_id: duck.id,
    })
    .onConflict(["user_id", "duck_id"])
    .ignore();

  return redirect(`/?duckId=${duck.id}`);
}
