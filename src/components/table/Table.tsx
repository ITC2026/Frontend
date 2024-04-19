import Table from "react-bootstrap/Table";
import "./Table.css";
import { Project, Position, Opening, Person } from "../../types/.";
import { Link } from "react-router-dom";

interface Props {
  entity: Project[] | Position[] | Opening[] | Person[];
  elements: { [key: string]: string };
  type?: string;
}

/**
 * TableView component
 *
 * @param prop entity: Project[] | Position[] | Opening[] | Person[]
 * @param prop types: { [key: string]: string }
 * @returns Table
 *
 * This component receives an entity and a types object as props.
 * It currently supports Projects, Positions, Openings and People.
 */

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

const TableView = (prop: Props) => {
  return (
    
    <Table striped bordered hover className="custom-table">
      <thead>
        <tr>
          <th className="purple-700 text-light">#</th>
          {Object.values(prop.elements).map((type: string, index: number) => (
            <th key={index} className="purple-700 text-light">
              {type}
            </th>
          ))}
          <th className="purple-700 text-light">Options</th>
        </tr>
      </thead>
      <tbody>
        {prop.entity.map(
          (entity: Project | Position | Opening | Person, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {Object.keys(prop.elements).map((key: string, index: number) => {
                const value =
                  entity[key as keyof (Project | Position | Opening | Person)];
                // Check if the column contains "Fecha"
                if (
                  prop.elements[key] &&
                  prop.elements[key].includes("Fecha") &&
                  value
                ) {
                  return (
                    <td key={index}>{formatTimestamp(value.toString())}</td>
                  );
                } else {
                  return <td key={index}>{value?.toString()}</td>;
                }
              })}
              <td>
                <Link to={`${entity.id}`}>
                  <i className="table-button bi bi-info-circle-fill"></i>
                </Link>

                <Link to={`${entity.id}`}>
                  <i className="table-button bi bi-pencil-fill"></i>
                </Link>

                {prop.type === "Project" ? (
                  <Link to={`${entity.id}`}>
                    <i className="table-button bi bi-briefcase-fill"></i>
                  </Link>
                ) : null}
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};

export default TableView;
