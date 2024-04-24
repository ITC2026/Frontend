/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import SearchBar from "../searchbar/SearchBar";
import "./Table.css";
import { Project, Position, Opening, Person } from "../../types/";
import { formatTimestamp } from "../../utils/Dates";

interface Props {
  entity: Project[] | Position[] | Opening[] | Person[];
  types: { [key: string]: string };
  setVisibleForm?: (visible: boolean) => void;
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
      <SearchBar onSearchTermChange={handleSearchTermChange} />
      <Table striped bordered hover className="custom-table">
        <thead>
          <tr>
            <th className="encora-purple text-light">#</th>
            {Object.values(props.types).map((type: string, index: number) => (
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
                {Object.keys(props.types).map((key: string, index: number) => {
                  const value =
                    entity[
                      key as keyof (Project | Position | Opening | Person)
                    ];
                  if (
                    props.types[key] &&
                    props.types[key].includes("Fecha") &&
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
                    <i className="bi bi-eye-fill"></i>
                  </Link>
                  <Link to={`edit/${entity.id}`}>
                    <i className="bi bi-pencil-fill"></i>
                  </Link>
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
