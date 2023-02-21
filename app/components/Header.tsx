import UserLineIcon from "remixicon-react/UserLineIcon";

type AppHeadProps = {
    logo:string;
    link:string;
  
  }
  
  export default function Header({ logo, link }:AppHeadProps){
    return (
      <div className="top-header">
        <img src={logo} alt="duck duck hunt logo" className="logo"></img>
        <a href={link} className="userlink"><UserLineIcon color="#fff"/><span>Account</span></a>
      </div>
    )
  }

