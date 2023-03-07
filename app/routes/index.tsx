// This is the main page with the users info and leaderboard

import { json, LoaderArgs, redirect } from "@remix-run/node";
import { Link } from "react-router-dom";
import { useLoaderData } from "@remix-run/react";
import knex from "~/knex";
import UserLineIcon from "remixicon-react/UserLineIcon";
// import duckLogo from "/duck-hunting/public/images/trans-duck-logo.png";
import mainStyles from "~/css/styles.css";

import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { notFound } from "remix-utils";

export function links() {
  return [{ rel: "stylesheet", href: mainStyles }];
}

export async function loader(args: LoaderArgs) {
  if (!args.context.user) {
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

  const duck = duckId
    ? await knex("ducks").where("id", duckId).first()
    : undefined;

  return json({
    leaderBoard,
    duck,
  });
}

export default function Home() {
  // const { leaderBoard } = useLoaderData<typeof loader>();

  return (
    <>
      <main className="home-main">
        <DuckFound duckNum={4} timesFound={3} />
        <DuckCount counter={32} />
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
    return null;
  }
  return (
    <div className="found-duck">
      <h1>
        You Found Duck {duck.id}: {duck.name}
      </h1>
    </div>
  );
}

type AppUserDuckProps = {
  counter: number;
};

function DuckCount({ counter }: AppUserDuckProps) {
  return <div className="duck-count"></div>;
}

function Leaderboard() {
  const { leaderBoard } = useLoaderData<typeof loader>();

  return (
    <div className="home-leaderboard">
      <h2>Leaderboard</h2>
      <ol>
        {leaderBoard.map((boardEntry) => (
          <li>
            <p>{boardEntry.email}</p>
            <p className="user-count">{boardEntry.count}/300</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
