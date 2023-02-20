// This is the main landing page for when a duck is scanned or someone visits the site not logged in

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

export default function Index() {
  // const { leaderBoard } = useLoaderData<typeof loader>();

  return (
    <>
    <header>
      <Header logo="https://cdn.discordapp.com/attachments/858075406191820810/1067217369904205864/full-trans-logo.png" link="user.html"/>
    </header>
    <main>
      <Welcome />
      <div className="found-duck">
        <DuckFound duckNum={4} timesFound={3} />
        <CreateAccntButton />
        <LoginButton />
      </div>
      <Features />
      <Footer />
    </main>
    </>
    // <>
    //   <ul>
    //     {leaderBoard.map((boardEntry) => (
    //       <li>
    //         {boardEntry.username}:{boardEntry.count}
    //       </li>
    //     ))}
    //   </ul>
    // </>
  );
}

export function Nav(){
  return(
    <nav>
      <ul>
          <li><Link to="home" className="active">HOME</Link></li>
          <li><Link to="leaderboard">LEADERBOARD</Link></li>
          <li><Link to="history">MY DUCKS</Link></li>
          <li><Link to="about">ABOUT</Link></li>
      </ul>
    </nav>
  )
}

type AppHeadProps = {
  logo:string;
  link:string;

}

export function Header({ logo, link }:AppHeadProps){
  return (
    <div className="top-header">
      <img src={logo} alt="duck duck hunt logo" className="logo"></img>
      <Nav />
      <a href={link} className="userlink"><UserLineIcon color="#fff"/><span>Account</span></a>
    </div>
  )
}



function Welcome(){
  return (
    <div className="welcome">
          <div>
            <h1>Welcome to Duck Duck Hunt!</h1>
            <p>An interactive game that gets you and your friends out and in the competitive spirit.</p>
          </div>
        </div>
  )
}

type AppDuckProps = {
  duckNum:number;
  timesFound:number;
}

function DuckFound({duckNum, timesFound}:AppDuckProps){
  return(
    <>
      <h2>You Found Duck #4: Diego</h2>
      <p>Login to save your duck or create a free account</p>
    </>
  )
}

function CreateAccntButton (){
  return(
    <button className="create-accnt">Create Account</button>
  )
}

function LoginButton (){
  return (
    <button className="login">Login</button>
  )
}

function Features (){
  return (
    <div  className="features">
      <h1>How Does It Work?</h1>
      <section>
          <img src="https://cdn.discordapp.com/attachments/858075406191820810/1067570067035914371/green-duck.png" alt="single duck"/>
          <div>
            <h3>Step 1</h3>
            <p>As you walk around campus, keep your eyes out for small rubber ducks. When you find a duck turn it over to find a QR code.</p>
          </div>
      </section>
      <section>
          <img src="https://cdn.discordapp.com/attachments/858075406191820810/1067570067400822875/pink-duck.png" alt="single duck"/>
          <div>
            <h3>Step 2</h3>
            <p>Scan the QR code found on the duck. This will take you to our website where you can sign up for a free account. This also allows you to save the duck you found.</p>
          </div>
      </section>
      <section>
          <img src="https://cdn.discordapp.com/attachments/858075406191820810/1067570066662641787/blue-duck.png" alt="single duck"/>
          <div>
            <h3>Step 3</h3>
            <p>While they may all look the same, each duck has it's own unique name. Your job is to be the first to collect all 300 ducks. After finding a duck, you get the chance to give it a new hiding place on campus. Happy hunting!</p>
          </div>
      </section>
      <div className="bottom-cta">
        <h2>So what are you waiting for? Get hunting!</h2>
        <CreateAccntButton />
        <LoginButton />
      </div>
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



