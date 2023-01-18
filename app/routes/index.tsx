import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import knex from "~/knex";

export async function loader() {
  const leaderBoard: { id: string; username: string; count: string }[] =
    await knex("user_ducks")
      .select("users.id")
      .select("users.username")
      .count()
      .join("users", "users.id", "user_ducks.user_id")
      .groupBy("users.id")
      .groupBy("users.username")
      .orderBy("count", "desc")
      .limit(100);

  return json({
    leaderBoard,
  });
}

export default function Index() {
  const { leaderBoard } = useLoaderData<typeof loader>();

  return (
    <>
      <ul>
        {leaderBoard.map((boardEntry) => (
          <li>
            {boardEntry.username}:{boardEntry.count}
          </li>
        ))}
      </ul>
    </>
  );
}
