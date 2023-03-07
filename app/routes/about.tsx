// This is the main landing page for when a duck is scanned or someone visits the site not logged in

import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import knex from "~/knex";
import FacebookCircleFillIcon from "remixicon-react/FacebookCircleFillIcon";
import InstagramFillIcon from "remixicon-react/InstagramFillIcon";
// import duckLogo from "/duck-hunting/public/images/trans-duck-logo.png";
import mainStyles from "~/css/styles.css";

export function links() {
  return [{ rel: "stylesheet", href: mainStyles }];
}
export default function Index() {
  return (
    <>
      <main>
        <Welcome />
        <Features />
      </main>
    </>
  );
}

function Welcome() {
  return (
    <div className="welcome">
      <div>
        <h1>Welcome to Duck Duck Hunt!</h1>
        <p>
          An interactive game that gets you and your friends out and in the
          competitive spirit.
        </p>
      </div>
      <LoginButton />
    </div>
  );
}

type AppDuckProps = {
  duckNum: number;
  timesFound: number;
};

function LoginButton() {
  return (
    <button className="create-accnt">
      <a href="/login">Login</a>
    </button>
  );
}

function Features() {
  return (
    <div className="features">
      <h1>How Does It Work?</h1>
      <section>
        <img
          src="https://cdn.discordapp.com/attachments/858075406191820810/1067570067035914371/green-duck.png"
          alt="single duck"
        />
        <div>
          <h3>Step 1</h3>
          <p>
            As you walk around campus, keep your eyes out for small rubber
            ducks. When you find a duck turn it over to find a QR code.
          </p>
        </div>
      </section>
      <section>
        <img
          src="https://cdn.discordapp.com/attachments/858075406191820810/1067570067400822875/pink-duck.png"
          alt="single duck"
        />
        <div>
          <h3>Step 2</h3>
          <p>
            Scan the QR code found on the duck. This will take you to our
            website where you can sign up for a free account. This also allows
            you to save the duck you found.
          </p>
        </div>
      </section>
      <section>
        <img
          src="https://cdn.discordapp.com/attachments/858075406191820810/1067570066662641787/blue-duck.png"
          alt="single duck"
        />
        <div>
          <h3>Step 3</h3>
          <p>
            While they may all look the same, each duck has it's own unique
            name. Your job is to be the first to collect all 300 ducks. After
            finding a duck, you get the chance to give it a new hiding place on
            campus. Happy hunting!
          </p>
        </div>
      </section>
      <div className="bottom-cta">
        <h2>So what are you waiting for? Get hunting!</h2>
        <LoginButton />
      </div>
    </div>
  );
}
