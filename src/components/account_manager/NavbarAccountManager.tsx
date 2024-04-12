import "./NavbarAccountManager.css";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface Props {
  route: string;
}

const NavbarAccountManager = (props: Props) => {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState<string>("");
  const routes = ["/", "/clients", "/projects", "/positions"];

  useEffect(() => {
    setActiveRoute(location.pathname);
    document.title = "Encora - Account Manager";
  }, [location]);

  const renderNavIcons = () => {
    return routes.map((route) => (
      <div key={route}>
        {activeRoute === props.route + route ? (
          <div className="navbar-icon navbar-img-active">
            <Link to={props.route + route} key={route}>
              <i className={`bi ${getIcon(route, true)}`}></i>
            </Link>
          </div>
        ) : (
          <div className="navbar-icon">
            <Link to={props.route + route} key={route}>
              <i className={`bi ${getIcon(route, false)}`}></i>
            </Link>
          </div>
        )}
      </div>
    ));
  };

  const getIcon = (route: string, isSelected: boolean) => {
    switch (route) {
      case "/":
        return "bi-house-door-fill";
      case "/clients":
        return "bi-buildings";
      case "/projects":
        return isSelected
          ? "bi-journal-code"
          : "bi-journal-code project-active";
      case "/settings":
        return isSelected ? "bi-gear-fill" : "bi-gear";
      case "/positions":
        return "bi-person-workspace";
      default:
        return null;
    }
  };

  const SettingsProp = () => {
    return (
      <div>
        {activeRoute === props.route + "/settings" ? (
          <div className="navbar-icon navbar-img-active">
            <Link to={props.route + "/settings"}>
              <i className="bi bi-gear-fill"></i>
            </Link>
          </div>
        ) : (
          <div className="navbar-icon">
            <Link to={props.route + "/settings"}>
              <i className="bi bi-gear"></i>
            </Link>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="navbar-account-manager">
      <div className="navbar-wrap">
        {renderNavIcons()}
        <div className="navbar-settings">
          <SettingsProp />
        </div>
      </div>
    </div>
  );
};

export default NavbarAccountManager;
