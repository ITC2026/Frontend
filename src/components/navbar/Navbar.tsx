import "./Navbar.css";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import iconsInfo from "../../icons.json";

interface Props {
  route: string;
  windowTitle?: string;
  routes: string[];
}

const Navbar = (props: Props) => {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState<string>("");
  const routes = props.routes;
  const routePrefix = location.pathname.split("/")[1];

  useEffect(() => {
    setActiveRoute(location.pathname);
    if (props.windowTitle) {
      document.title = props.windowTitle;
    }
  }, [location, props.windowTitle, routePrefix]);

  const renderNavIcons = () => {
    return routes.map((route) => (
      <div key={route}>
        {activeRoute === props.route + route ? (
          <div className="navbar-icon navbar-img-active">
            <Link to={props.route + route} key={route}>
              <i className={`bi ${getIcon(route)}`}></i>
            </Link>
          </div>
        ) : (
          <div className="navbar-icon">
            <Link to={props.route + route} key={route}>
              <i className={`bi ${getIcon(route)}`}></i>
            </Link>
          </div>
        )}
      </div>
    ));
  };

  const getIcon = (route: string) => {
    const iconInfo = iconsInfo[routePrefix as keyof typeof iconsInfo]?.find(
      (item) => item.route === route
    );

    {/** If it can find the proper icon with the received route*/}
    if (iconInfo) { 
      return iconInfo.isSelected === undefined || iconInfo.isSelected === true
        ? iconInfo.icon
        : iconInfo.isSelected;
    }
    return null;
  };

  const SettingsProp = () => {
    return (
      <div className="navbar-settings">
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
        <SettingsProp />
      </div>
    </div>
  );
};

export default Navbar;
