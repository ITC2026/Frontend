/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import SearchBar from "../searchbar/SearchBar";
import "./Table.css";
import { formatTimestamp } from "../../utils/Dates";

interface Props {
  entity: Project[] | Position[] | Opening[] | Person[];
  categories: { [key: string]: string };

  children?: JSX.Element;
  
}

const TableView = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    props.entity.forEach((entity: Opening | Position | Project | Person) => {
      if ("expiration_date" in entity) {
        console.log(entity.expiration_date?.expiration_date);
      }
    });
  }, []);

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
            (entity: Project | Position | Opening | Person, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {Object.keys(props.categories).map((key: string, index: number) => {
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

export default TableView;
