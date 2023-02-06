import { json } from "@remix-run/node";
import { Link } from 'react-router-dom';
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

export default function Home() {
    // const { leaderBoard } = useLoaderData<typeof loader>();

    return (
        <>
        <header>
            <Header logo="https://cdn.discordapp.com/attachments/858075406191820810/1067217369904205864/full-trans-logo.png" link="user.html"/>
        </header>
        <main className="home-main">
            <DuckFound duckNum={4} timesFound={3} />
            <DuckCount counter={32} />
            <Leaderboard />
        </main>
        <Footer />
        </>
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


function Nav(){
    return(
      <nav>
        <ul>
            <li><Link to="./home.tsx" className="active">HOME</Link></li>
            <li><Link to="./leaderboard.tsx">LEADERBOARD</Link></li>
            <li><Link to="./history.tsx">MY DUCKS</Link></li>
            <li><Link to="./about.tsx">ABOUT</Link></li>
        </ul>
      </nav>
    )
  }

  type AppDuckProps = {
    duckNum:number;
    timesFound:number;
  }
  
  function DuckFound({duckNum, timesFound}:AppDuckProps){
    return(
    <div className="found-duck">
        <h1>You Found Duck {duckNum}:  Diego</h1>
        <section className="times-found">
            <h3>Times Found: <span>{timesFound}</span></h3>
            <section className="duck-info">
                <a href="#">Location: STC Atrium</a>
            </section>
        </section>
      </div>
    )
  }

type AppUserDuckProps = {
    counter:number;
}

function DuckCount({counter}:AppUserDuckProps){
    return(
        <div className="duck-count">
            <h1>Ducks Found</h1>
            <p className="counter">32<span>/300</span></p>
            <a href="history.html">See All Found Ducks</a>
        </div>
    )
}

function Leaderboard() {
    const { leaderBoard } = useLoaderData<typeof loader>();

    return (
        <div className="home-leaderboard">
            <h2>Leaderboard</h2>
            <ul>
                {leaderBoard.map((boardEntry) => (
                    <li>
                    {boardEntry.username}:{boardEntry.count}
                    </li>
                ))}
            </ul>
            <ol>
                <li>
                    <p>User</p>
                    <p>Duck Count</p>
                </li>
                <li>
                    <p>cooldude74 </p>
                    <p className="user-count">136/300</p>

                </li>
                <li>
                    <p>duckhunter49</p>
                    <p className="user-count">112/300</p>
                </li>
                <li>
                    <p>bobby</p>
                    <p className="user-count">94/300</p>
                </li>
                <li>
                    <p>quackerrrs3</p>
                    <p className="user-count">89/300</p>
                </li>
                <li>
                    <p>suzy7390</p>
                    <p className="user-count">84/300</p>
                </li>
            </ol>
        </div>
    )
}

function Footer () {
    return (
      <footer>
        <img src="https://cdn.discordapp.com/attachments/858075406191820810/1067217369904205864/full-trans-logo.png" alt="duck duck hunt logo" className="logo" />
        <div className="quick-links">
              <p>Quick Links</p>
              <a href="#">Feedback</a>
              <a href="#">About</a>
          </div>
        <div className="socials">
          <a href="https://www.facebook.com/"><FacebookCircleFillIcon color="#fff"/></a>
          <a href="https://www.instagram.com/"><InstagramFillIcon color="#fff"/></a>
        </div>
      </footer>
    )
  }
  
