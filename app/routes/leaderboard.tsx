import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import knex from "~/knex";
import UserLineIcon from "remixicon-react/UserLineIcon";
import FacebookCircleFillIcon from "remixicon-react/FacebookCircleFillIcon";
import InstagramFillIcon from "remixicon-react/InstagramFillIcon";
import Nav from "~/components/MainNav";
import Header from "~/components/Header";
import {ListLeaderboard} from "~/components/listLeaderboard";
// import duckLogo from "/duck-hunting/public/images/trans-duck-logo.png";
import mainStyles from "~/css/styles.css";

const leaderBoard= [
  {
    username: 'Dory',
    count: 10
  },
  {
    username: 'Fred',
    count: 10
  },
  {
    username: 'Mike',
    count: 30
  }
]

export default function Leaderboard(){
    return(
        <>
        <header>
            <Header logo="https://cdn.discordapp.com/attachments/858075406191820810/1067217369904205864/full-trans-logo.png" link="user.html"/>
            <Nav />  
            
        </header>
        <main>
          <ListLeaderboard boardEntry={leaderBoard}></ListLeaderboard>
        </main>
        </>
    )
}

export function links() {
  return([{
    rel: 'stylesheet',
    href: mainStyles
  }])
}