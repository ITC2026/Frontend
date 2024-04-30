import Navbar from "../../components/navbar/Navbar";
import "./ResourceManagerWrapper.css";
import { Outlet } from "react-router-dom";

interface Props {
  route: string;
}

const resourceManagerRoutes: string[] = ["/", "/employees"];

const ResourceManagerWrapper = (props: Props) => {
  return (
    <div className="resource-manager-wrapper">
      <Navbar
        route={props.route}
        routes={resourceManagerRoutes}
        windowTitle="Resource Manager"
      />
      <div className="resource-manager-content">
        <Outlet />
      </div>
    </div>
  );
};

export default ResourceManagerWrapper;
