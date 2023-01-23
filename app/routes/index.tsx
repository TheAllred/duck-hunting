import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import knex from "~/knex";
import UserLineIcon from "remixicon-react/UserLineIcon";
import FacebookCircleFillIcon from "remixicon-react/FacebookCircleFillIcon";
import InstagramFillIcon from "remixicon-react/InstagramFillIcon";
// import duckLogo from "/duck-hunting/public/images/trans-duck-logo.png";

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
      {/* <Header logo={duckLogo} link="user.html"/> */}
    </header>
    <main>
      <Welcome />
      <div className="found-duck">
        <DuckFound duckNum={4} timesFound={3} />
        <p>Login to save your find or create a free account</p>
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
type AppHeadProps = {
  logo:string;
  link:string;

}

function Header({ logo, link }:AppHeadProps){
  return (
    <div className="top-header">
      <img src={logo} alt="duck duck hunt logo" className="logo"></img>
      <a href={link} className="userlink"><UserLineIcon color="#fff"/><span>Account</span></a>
    </div>
  )
}

function Nav(){
  return(
    <nav>
      <ul>
        <li><a href="leaderboard.html">Leaderboard</a></li>
        <li><a href="history.html">My Ducks</a></li>
        <li><a href="about.html">About</a></li>
      </ul>
    </nav>
  )
}

function Welcome(){
  return (
    <div className="welcome">
        <h1>Welcome to Duck Duck Hunt!</h1>
        <p>Forget the fat lady! You're obsessed with the fat lady! Drive us out of here! God creates dinosaurs. God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs. This thing comes fully loaded. AM/FM radio, reclining bucket seats, and... power windows.</p>
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
      <h1>You found duck #{duckNum}</h1>
      <p>Duck #{duckNum} has be found {timesFound} times</p>
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
    <button className="login-btn">Login</button>
  )
}

function Features (){
  return (
    <div  className="features">
      <h2>What is Duck Duck Hunt?</h2>
      <section>
          <img src="images/trans-single-duck.png" alt="single duck"/>
          <h3>Feature 1</h3>
          <p>Hey, take a look at the earthlings. Goodbye! Just my luck, no ice. You really think you can fly that thing? Is this my espresso machine? Wh-what is-h-how did you get my espresso machine?</p>
      </section>
      <section>
          <img src="images/trans-single-duck.png" alt="single duck"/>
          <h3>Feature 2</h3>
          <p>Must go faster... go, go, go, go, go! Did he just throw my cat out of the window? God help us, we're in the hands of engineers. Life finds a way.</p>
      </section>
      <section>
          <img src="images/trans-single-duck.png" alt="single duck"/>
          <h3>Feature 3</h3>
          <p>So you two dig up, dig up dinosaurs? They're using our own satellites against us. And the clock is ticking. Remind me to thank John for a lovely weekend. Forget the fat lady! You're obsessed with the fat lady</p>
      </section>
      <p>So what are you waiting for? Get hunting!</p>
      <CreateAccntButton />
      <LoginButton />
    </div>
  )
}

function Footer () {
  return (
    <footer>
      {/* <img src={duckLogo} alt="duck duck hunt logo" className="logo" /> */}
      <p>Quick Links</p>
      <a href="#">Feedback</a>
      <a href="about.html">About</a>
      <a href="https://www.facebook.com/"><FacebookCircleFillIcon color="#fff"/></a>
      <a href="https://www.instagram.com/"><InstagramFillIcon color="#fff"/></a>
    </footer>
  )
}