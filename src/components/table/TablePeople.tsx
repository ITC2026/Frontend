/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import SearchBar from "../searchbar/SearchBar";
import "./Table.css";
import { getPersonNameByID } from "../../pages/resourceManager/functions/getPersonNameByID";

interface Props {
  entity: Person[];
  categories: { [key: string]: string };

  children?: JSX.Element;
  
}

const TableViewPeople = (props: Props) => {
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
        <div className = "children-container">
        {props.children}
        </div>
        <SearchBar onSearchTermChange={handleSearchTermChange} />
      </div>

      <Table striped bordered hover responsive bsPrefix="custom-table">
        <thead>
          {getPersonNameByID(1).toString()}
          <tr>
            <th className="encora-purple text-light">#</th>
            {Object.values(props.categories).map((category: string, index: number) => (
              <th key={index} className="encora-purple text-light">
                {category}
              </th>
            ))}
            <th className="encora-purple text-light">Options</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntity.map(
            (entity: Person, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {Object.keys(props.categories).map((key: string, index: number) => {
                  const value =
                    entity[
                      key as keyof (Person)
                    ];
                  return <td key={index}>{value}</td>;
                })}
                <td>
                  <Link to={`${entity.id}`}>
                    <i className="bi bi-eye-fill table-element"></i>
                  </Link>
                  <Link to={`edit/${entity.id}`}>
                    <i className="bi bi-pencil-fill table-element"></i>
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

export default TableViewPeople;

