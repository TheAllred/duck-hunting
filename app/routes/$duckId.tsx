import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { notFound } from "remix-utils";

import knex from "~/knex";

export async function loader({ params }: LoaderArgs) {
  const duck = await knex("ducks").where("id", params.duckId).first();

  if (!duck) {
    throw notFound({ message: "Duck Not Found!" });
  }

  await knex("user_ducks")
    .insert({
      user_id: "1",
      duck_id: duck.id,
    })
    .onConflict(["user_id", "duck_id"])
    .ignore();

  return json({
    duck: duck,
  });
}

export default function () {
  const { duck } = useLoaderData<typeof loader>();

  return (
    <>
      <div>duck id: {duck.id}</div>
      <div>duck name: {duck.name}</div>
    </>
  );
}
