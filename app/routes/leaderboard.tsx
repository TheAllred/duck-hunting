import { json } from "@remix-run/node";
import { Link } from '@remix-run/react';
import { useLoaderData } from "@remix-run/react";
import knex from "~/knex";
import UserLineIcon from "remixicon-react/UserLineIcon";
import FacebookCircleFillIcon from "remixicon-react/FacebookCircleFillIcon";
import InstagramFillIcon from "remixicon-react/InstagramFillIcon";
// import duckLogo from "/duck-hunting/public/images/trans-duck-logo.png";
import mainStyles from "~/css/styles.css";
import { loader } from "~/routes/index";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
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

