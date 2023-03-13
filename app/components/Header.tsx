import { Link } from "@remix-run/react";
import LogoutCircleRLineIcon from "remixicon-react/LogoutCircleRLineIcon";
import UserLineIcon from "remixicon-react/UserLineIcon";
import UserSettingsLineIcon from "remixicon-react/UserSettingsLineIcon";

type AppHeadProps = {
  logo: string;
  link: string;
  user?: {
    nickname: string;
  };
};

export function Header({ logo, user }: AppHeadProps) {
  return (
    <div className="top-header">
      <img src={logo} alt="duck duck hunt logo" className="logo"></img>
      {/* <nav /> */}
      {user && (
        <div className="dropdown" >
          <a className="userlink">
            <UserLineIcon color="#fff" />
            <span id="username">{user.nickname}</span>
          </a>
          <div className="logout-div">
            <a className="logout" href="/logout">
              <LogoutCircleRLineIcon color="#fff"/>
              <span>Logout</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
