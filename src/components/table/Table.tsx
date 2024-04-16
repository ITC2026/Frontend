import Table from "react-bootstrap/Table";
import "./Table.css";
import { Project, Position, Opening, Person } from "../../types/.";

interface Props {
  entity: Project[] | Position[] | Opening[] | Person[];
  types: { [key: string]: string };
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

const TableView = (prop: Props) => {
  return (
    <Table striped bordered hover className="custom-table">
      <thead>
        <tr>
          <th className="encora-purple text-light">#</th>
          {Object.values(prop.types).map((type: string, index: number) => (
            <th key={index} className="encora-purple text-light">
              {type}
            </th>
          ))}
          <th className="encora-purple text-light">Options</th>
        </tr>
      </thead>
      <tbody>
        {/** 
         * https://www.typescriptlang.org/docs/handbook/2/keyof-types.html
         */}
        {prop.entity.map(
          (entity: Project | Position | Opening | Person, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {Object.keys(prop.types).map((key: string, index: number) => (
                <td key={index}>
                  
                  {entity[key as keyof (Project | Position | Opening | Person)]?.toString()}

                  </td>
              ))}
              <td>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};

export default TableView;
