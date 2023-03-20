import { json, LoaderArgs, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import knex from "~/knex";
import mainStyles from "~/css/styles.css";
import { getUser } from "~/getUser";

export function links() {
  return [{ rel: "stylesheet", href: mainStyles }];
}

export default function Leaderboard() {
  const { leaderBoard } = useLoaderData<typeof loader>();

  return (
    <main>
      <div className="leaderboard">
        <h1>Leaderboard</h1>
        <ol>
          {leaderBoard.map((boardEntry) => (
            <li>
              <p>{boardEntry.username}</p>
              <p className="user-count">{boardEntry.count}/300</p>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}

export async function loader(args: LoaderArgs) {
  const user = await getUser(args);
  const duckId = new URL(args.request.url).searchParams.get("duckId");

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

  const duck = duckId
    ? await knex("ducks").where("id", duckId).first()
    : undefined;

  return json({
    leaderBoard,
    duck,
  });
}
