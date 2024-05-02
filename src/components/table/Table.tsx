/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import SearchBar from "../searchbar/SearchBar";
import "./Table.css";
import { formatTimestamp } from "../../utils/Dates";
import { ConfigIcons } from "../table/ConfigIcons/ConfigIcons";
interface Props {
  entity: Project[] | Position[] | Opening[] | Person[];
  categories: { [key: string]: string };
  children?: JSX.Element;
  hideIndex?: boolean;
  showEdit?: boolean;
  configBtn?: string;
}

const TableView = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  const filteredEntity = props.entity.filter((entity: any) => {
    const searchableFields = Object.values(entity)
      .map((value: any) => (value ? value.toString().toLowerCase() : ""))
      .join(" ");
    return searchableFields.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <div className="table-header">
        <div className="children-container">{props.children}</div>
        <SearchBar onSearchTermChange={handleSearchTermChange} />
      </div>

      <Table striped bordered responsive hover bsPrefix="custom-table">
        <thead>
          <tr>
            {!props.hideIndex && (
              <th className="encora-purple text-light">#</th>
            )}
            {Object.values(props.categories).map(
              (category: string, index: number) => (
                <th key={index} className="encora-purple text-light">
                  {category}
                </th>
              )
            )}
            <th className="encora-purple text-light">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntity.map(
            (entity: Project | Position | Opening | Person, index: number) => (
              <tr key={index}>
                {!props.hideIndex && <td>{index + 1}</td>}

                {Object.keys(props.categories).map(
                  (key: string, index: number) => {
                    const value =
                      entity[
                        key as keyof (Project | Position | Opening | Person)
                      ];
                    if (
                      props.categories[key] &&
                      props.categories[key].includes("Fecha") &&
                      value
                    ) {
                      return (
                        <td key={index}>{formatTimestamp(value.toString())}</td>
                      );
                    } else {
                      return <td key={index}>{value?.toString()}</td>;
                    }
                  }
                )}
                <td>
                  <div className="table-options">
                    <Link to={`${entity.id}`}>
                      <i className="bi bi-eye-fill table-element info-element"></i>
                    </Link>

                    {props.showEdit && ( // Conditional rendering based on showEdit prop
                      <Link to={`edit/${entity.id}`}>
                        <i className="bi bi-pencil-fill table-element"></i>
                      </Link>
                    )}

                    <ConfigIcons entity={props.configBtn} id={entity.id} />
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TableView;
