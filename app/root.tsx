import { json, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Duck Duck Hunt",
  viewport: "width=device-width,initial-scale=1",
});

export function loader(args: LoaderArgs) {
  return json({ user: args.context.user });
}

export default function App() {
  const { user } = useLoaderData();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header
          logo="https://cdn.discordapp.com/attachments/858075406191820810/1067217369904205864/full-trans-logo.png"
          user={user}
          link={""}
        />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
