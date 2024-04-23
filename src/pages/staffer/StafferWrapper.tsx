import "./StafferWrapper.css";
import NavBar from "../../components/navbar/Navbar";
import {Outlet} from "react-router-dom";

interface Props {
    route: string;
    routes: string[];
}

const StafferWrapper = (props: Props) => {
  return (
    <div className="staffer-wrapper">
        <NavBar 
        route={props.route} 
        routes={props.routes} 
        windowTitle="Staffer" />
        <div className="staffer-content">
            <Outlet />
        </div>
    </div>
  );
};

export default StafferWrapper;