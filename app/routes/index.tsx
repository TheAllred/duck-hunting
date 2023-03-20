// This is the main page with the users info and leaderboard

import { json, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import knex from "~/knex";
// import duckLogo from "/duck-hunting/public/images/trans-duck-logo.png";
import mainStyles from "~/css/styles.css";
import { getUser } from "~/getUser";
import * as dayjs from "dayjs";

export function links() {
  return [{ rel: "stylesheet", href: mainStyles }];
}

export async function loader(args: LoaderArgs) {
  const user = await getUser(args);
  if (!user) {
    throw redirect("/about");
  }
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
      .limit(10);
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

export default function Home() {
  return (
    <>
      <main className="home-main">
        <DuckFound duckNum={4} timesFound={3} />
        {/* <DuckCount counter={32} /> */}
        <UserHistory />
        <Leaderboard />
      </main>
    </>
  );
}

type AppDuckProps = {
  duckNum: number;
  timesFound: number;
};

function DuckFound({ duckNum, timesFound }: AppDuckProps) {
  const { duck } = useLoaderData<typeof loader>();
  if (!duck) {
    return (
      <div className="found-duck">
        <h1>Scan a duck!</h1>
        <p>Or scan the duck you found again.</p>
      </div>
    );
  }
  return (
    <div className="found-duck">
      <h1>
        You Found Duck #{duck.id}: {duck.name}
      </h1>
      <p>
        Tag us at
        <a href="https://www.instagram.com/duckduckhunt/">@duckduckhunt</a> with
        a picture of where you hide the duck next!
      </p>
      {/* <section className="duck-info">
        <a href="#">Location: STC Atrium</a>
      </section> */}
    </div>
  );
}

type AppUserDuckProps = {
  counter: number;
};

function Leaderboard() {
  const { leaderBoard } = useLoaderData<typeof loader>();

  return (
    <div className="home-leaderboard">
      <h2>Leaderboard Top 10</h2>
      <ol>
        {leaderBoard.map((boardEntry) => (
          <li>
            <p>{boardEntry.username}</p>
            <p className="user-count">{boardEntry.count}/300</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
function UserHistory() {
  const { userHistory, count } = useLoaderData<typeof loader>();

  return (
    <div className="home-UserHistory duck-count">
      <h1>My Duck History</h1>
      <p className="user-duck-count">Total Ducks Found: {count}/300</p>
      <ul>
        {userHistory.map((boardEntry) => (
          <li>
            <h2>
              Duck #{boardEntry.id} {boardEntry.name}
            </h2>
            <p>Date Found: {boardEntry.found_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
