import NavbarAccountManager from "../../components/account_manager/NavbarAccountManager";
import "./AccountManager.css";
import { Outlet } from "react-router-dom";

interface Props {
  route: string;
  content: string;
}

const AccountManagerWrapper = (props: Props) => {
  return (
    <div className="account-manager-wrapper">
      <NavbarAccountManager route={props.route} />
      <Outlet />{" "}
      {/* This is a React Router component that renders the child routes */}
    </div>
  );
};

export default AccountManagerWrapper;
