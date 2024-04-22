import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import SearchBar from "../searchbar/SearchBar";
import { Link } from "react-router-dom";
import "./Table.css";

interface Props {
  entity: Project[] | Position[] | Opening[] | Person[];
  types: { [key: string]: string };
  type?: string;
  buttonArr?: React.ReactElement | React.ReactElement[] | JSX.Element[];
}

const TableView = (prop: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  // Filtering the entity array based on the search term
  // Ensure prop.entity is defined before filtering
  const filteredEntity = prop.entity
    ? prop.entity.filter((entity: any) => {
        const searchableFields = Object.values(entity)
          .map((value: any) => (value ? value.toString().toLowerCase() : ""))
          .join(" ");
        return searchableFields
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
    : [];

  return (
    <div>
      <SearchBar onSearchTermChange={handleSearchTermChange} />
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
          {filteredEntity.map(
            (entity: Project | Position | Opening | Person, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {Object.keys(prop.types).map((key: string, index: number) => (
                  <td key={index}>
                    {entity[
                      key as keyof (Project | Position | Opening | Person)
                    ]?.toString()}
                  </td>
                ))}
                <td>
                  {prop.buttonArr ? prop.buttonArr : null}

                  {prop.type === "Project" ? (
                    <Link to={`${entity.id}`}>
                      <i className="table-button bi bi-briefcase-fill"></i>
                    </Link>
                  ) : null}

                  {prop.type === "StafferProject" ? (
                    <Link to={"positions"}>
                      <i className="bi bi-person-plus-fill"></i>
                    </Link>
                  ) : null}
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
