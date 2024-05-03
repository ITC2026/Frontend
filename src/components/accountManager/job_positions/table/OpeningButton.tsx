import "../styles/OpeningButton.css";
import { Link } from "react-router-dom";

interface Props {
  id: number;
}

export const OpeningButton = (prop: Props) => {
  return (
    <>
      <Link to={`/account_manager/positions/${prop.id}`}>
        <i className="bi bi-person-square table-element"></i>
      </Link>
    </>
  );
};
