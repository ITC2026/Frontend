import Table from "react-bootstrap/Table";
import "./Table.css";
import { Project } from "../../types/.";

interface Props {
  categories: string[];
  content?: Project[]; 
}

const TableView = (prop: Props) => {
  return (
    <Table striped bordered hover className="custom-table">
      <thead>
        <tr>
          <th className="encora-purple text-light">#</th>
          {prop.categories.map((category: string, index: number) => (
            <th key={index} className="encora-purple text-light">
              {category}
            </th>
          ))}
          <th className="encora-purple text-light">Options</th>
        </tr>
      </thead>
      <tbody>
      {prop.content ? (
    prop.content.map((project: Project, index: number) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{project.project_title || "N/A"}</td>
        <td>{project.project_description || "N/A"}</td>
        <td>{project.client_id || "N/A"}</td>
        <td>
          {/* Add options here */}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={prop.categories.length + 2}>No projects available</td>
    </tr>
  )}

      </tbody>
    </Table>
  );
}

export default TableView;
