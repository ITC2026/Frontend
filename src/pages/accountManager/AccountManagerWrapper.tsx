import Navbar from "../../components/navbar/Navbar";
import "./AccountManagerWrapper.css";
import { Outlet } from "react-router-dom";

interface Props {
  route: string;
  routes: string[];
}

const AccountManagerWrapper = (props: Props) => {
  return (
    <div className="account-manager-wrapper">
      <Navbar
        route={props.route}
        routes={props.routes}
        windowTitle="Account Manager"
      />
      <div className="account-manager-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountManagerWrapper;
