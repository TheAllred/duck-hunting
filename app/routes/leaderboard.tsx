import { json } from "@remix-run/node";
import { Link } from '@remix-run/react';
import { useLoaderData } from "@remix-run/react";
import knex from "~/knex";
import UserLineIcon from "remixicon-react/UserLineIcon";
import FacebookCircleFillIcon from "remixicon-react/FacebookCircleFillIcon";
import InstagramFillIcon from "remixicon-react/InstagramFillIcon";
// import duckLogo from "/duck-hunting/public/images/trans-duck-logo.png";
import mainStyles from "~/css/styles.css";

export function links() {
    return[
      {rel: 'stylesheet',
      href: mainStyles}
    ]
}

export default function Leaderboard(){
    return(
        <>
        <header>
            <Header logo="https://cdn.discordapp.com/attachments/858075406191820810/1067217369904205864/full-trans-logo.png" link="user.html"/>        
        </header>
        <main>
          <h1>Leaderboard</h1>
          <ol>
            <li>
                <p>User</p>
                <p>Duck Count</p>
            </li>
            <li>
                <p> cooldude74 </p>
                <p className="user-count">136/300</p>
            </li>
            <li>
                <p> duckhunter49</p>
                <p className="user-count">112/300</p>
            </li>
            <li>
                <p> bobby</p>
                <p className="user-count">94/300</p>
            </li>
            <li>
                <p> quackerrrs3</p>
                <p className="user-count">89/300</p>
            </li>
            <li>
                <p> suzy7390</p>
                <p className="user-count">84/300</p>
            </li>
          </ol>
        </main>
        </>
    )
}

function Nav(){
    return(
      <nav>
        <ul>
            <li><a href="#">HOME</a></li>
            <li><a href="#" className="active">LEADERBOARD</a></li>
            <li><a href="#">MY DUCKS</a></li>
            <li><a href="#">ABOUT</a></li>
        </ul>
      </nav>
    )
  }

type AppHeadProps = {
    logo:string;
    link:string;
  
}

function Header({ logo, link }:AppHeadProps){
    return (
      <div className="top-header">
        <img src={logo} alt="duck duck hunt logo" className="logo"></img>
        <Nav />
        <a href={link} className="userlink"><UserLineIcon color="#fff"/><span>Account</span></a>
      </div>
    )
}



// 10 users, see more button, top 3 podium, make placement look better, user avatars