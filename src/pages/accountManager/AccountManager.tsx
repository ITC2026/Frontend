import NavbarAccountManager from "../../components/account_manager/NavbarAccountManager";
import "./AccountManager.css";

interface Props {
  route: string;
}
const AccountManagerWrapper = (props: Props) => {
  return (
    <div className="account-manager-wrapper">
      <NavbarAccountManager route={props.route} />
      <h1>AccountManagerWrapper</h1>
    </div>
  );
};

export default AccountManagerWrapper;
