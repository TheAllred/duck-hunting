import { json, LoaderArgs, redirect } from "@remix-run/node";
import { Link } from '@remix-run/react';
import { useLoaderData } from "@remix-run/react";
import knex from "~/knex";
import UserLineIcon from "remixicon-react/UserLineIcon";
import FacebookCircleFillIcon from "remixicon-react/FacebookCircleFillIcon";
import InstagramFillIcon from "remixicon-react/InstagramFillIcon";
// import duckLogo from "/duck-hunting/public/images/trans-duck-logo.png";
import mainStyles from "~/css/styles.css";
// import { loader } from "~/routes/index";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { getUser } from "~/getUser";

export function links() {
    return[
      {rel: 'stylesheet',
      href: mainStyles}
    ]
}


export default function Leaderboard(){
    const { leaderBoard } = useLoaderData<typeof loader>();

    return (
    <main>
      <div className="leaderboard">
        <h1>Leaderboard</h1>
        <ol>
          {leaderBoard.map((boardEntry) => (
            <li>
              <p>{boardEntry.email}</p>
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
  if (!user) {
    throw redirect("/about");
  }
  const duckId = new URL(args.request.url).searchParams.get("duckId");
  const leaderBoard: { id: string; email: string; count: string }[] =
    await knex("user_ducks")
      .select("users.id")
      .select("users.email")
      .count()
      .join("users", "users.id", "user_ducks.user_id")
      .groupBy("users.id")
      .groupBy("users.email")
      .orderBy("count", "desc")
      .limit(100);
  const userHistory: {
    id: string;
    name: string;
    found_at: string;
  }[] = await knex("user_ducks")
    .select("ducks.name")
    .select("ducks.id")
    .select("user_ducks.found_at")
    .where("user_ducks.user_id", user.id)
    .join("ducks", "ducks.id", "user_ducks.duck_id")
    .orderBy("user_ducks.found_at", "desc")
    .limit(5);

  const [{ count }] = await knex("user_ducks")
    .where("user_id", user.id)
    .count();

  const duck = duckId
    ? await knex("ducks").where("id", duckId).first()
    : undefined;

  return json({
    leaderBoard,
    duck,
    userHistory,
    count,
  });
}

