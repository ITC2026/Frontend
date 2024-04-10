import "./NavbarAccountManager.css";
import { Link } from "react-router-dom";
import Clients from "../../assets/accountManager/clients.png";
import Home from "../../assets/accountManager/home.png";
import Settings from "../../assets/accountManager/settings.png";
import Projects from "../../assets/accountManager/projects.png";

interface Props {
  route: string;
}

const NavbarAccountManager = (props: Props) => {
  return (
    <div className="navbar-account-manager">
      <div className="navbar-wrap">
        <div className="navbar-icon">
          <Link to={props.route}>
            <img src={Home} alt="Home" />
          </Link>
        </div>

        <div className="navbar-icon">
          <Link to={props.route + "/clients"}>
            <img src={Clients} alt="Clients" />
          </Link>
        </div>

        <div className="navbar-icon">
          <Link to={props.route + "/projects"}>
            <img src={Projects} alt="Projects" />
          </Link>
        </div>

        <div className="navbar-icon">
          <Link to={props.route + "/settings"}>
            <img src={Settings} alt="Settings" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarAccountManager;
