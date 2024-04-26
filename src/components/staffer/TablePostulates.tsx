import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import SearchBar from "../searchbar/SearchBar";
import { Link } from "react-router-dom";
import getProjectTitleFromID from "../../pages/staffer/functions/getProjectTitleForPerson";
import getPositionTitleFromID from "../../pages/staffer/functions/getPositionTitleForPerson";
import "../table/Table.css";

interface Props {
  entity: Project[] | Position[] | Opening[] | Person[];
  types: { [key: string]: string };
  categories?: string;
  buttonArr?: React.ReactElement | React.ReactElement[] | JSX.Element[];
}

const TablePostulates = (prop: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [projectTitle, setProjectTitle] = useState<string>("No Tiene Projecto");
  const [positionTitle, setPositionTitle] = useState<string>("No Tiene Posición");

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleProjectTitle = (id: number) => {
    getProjectTitleFromID(id).then((data: unknown) => {
      setProjectTitle(data as string);
    });
  }

  const handlePositionTitle = (id: number) => {
    getPositionTitleFromID(id).then((data: unknown) => {
      setPositionTitle(data as string);
    });
  }
  

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
          {getProjectTitleFromID(72).toString()}
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
                {Object.keys(prop.types).map((key: string, index: number) => {
                  const value =
                    entity[
                      key as keyof (Project | Position | Opening | Person)
                    ];
                  if (key === "project_name") {
                    handleProjectTitle(entity.id);
                    return (
                      <td key={index}>
                        {projectTitle}
                      </td>
                    );
                  } 
                  if (key === "position_name") {
                    handlePositionTitle(entity.id);
                    return (
                      <td key={index}>
                        {positionTitle}
                      </td>
                    );
                  } else {
                    return <td key={index}>{value?.toString()}</td>;
                  }
                })}
                <td>
                  {prop.buttonArr ? prop.buttonArr : null}

                  {prop.categories === "StafferProject" ? (
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

export default TablePostulates;
