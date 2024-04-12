import NavbarAccountManager from "../../components/account_manager/NavbarAccountManager";
import "./AccountManager.css";
import { Outlet } from "react-router-dom";

interface Props {
  route: string;
}

const AccountManagerWrapper = (props: Props) => {
  return (
    <div className="account-manager-wrapper">
      <NavbarAccountManager route={props.route} />
      <Outlet />
    </div>
  );
};

export default AccountManagerWrapper;
