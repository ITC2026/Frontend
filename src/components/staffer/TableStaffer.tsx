/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import SearchBar from "../searchbar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { createApplication } from "../../api/ApplicationAPI";
import { useParams } from "react-router-dom";
import "../table/Table.css";

interface Props {
  entity: Project[] | Position[] | Opening[] | Person[];
  types: { [key: string]: string };
  showInfoButton?: boolean;
  showAddButton?: boolean;
  buttonArr?: React.ReactElement | React.ReactElement[] | JSX.Element[];
  showEditButton?: boolean;
  hideOptions: boolean; 
  entity_id?: { [key: string]: number };
  routing?: number;
}
const TableStaffer = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
useState<string>("");

  const { id1, id2 } = useParams();
  const positionProjectID = parseInt(id1 as string);
  const positionID = parseInt(id2 as string);
  console.log(positionID);

  const navigate = useNavigate();


  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };
  // Filtering the entity array based on the search term and ensuring prop.entity is defined before filtering
  const filteredEntity = props.entity
    ? props.entity.filter((entity: any) => {
        const searchableFields = Object.values(entity)
          .map((value: any) => (value ? value.toString().toLowerCase() : ""))
          .join(" ");
        return searchableFields
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
    : [];

  // Function definitions for buttons
  const infoButton = (id: number) => (
    <Link to={`${id}`}>
      <i className="bi bi-info-circle-fill"></i>
    </Link>
  );

  const modifyButton = (id: number) => (
    <Link to={`${id}`}>
      <i className="bi bi-pencil-fill"></i>
    </Link>
  );

  const openingsButton = (id: number) => {
    return (
      <Link to={`positions/${id}`}>
        <i className="bi bi-person-plus-fill"></i>
      </Link>
    );
  };

  const addButton = async (candidate_id: number) => {
    const addApplication = {
      person_id: candidate_id,
      position_id: positionID,
      application_status: "On Hold",
    };
    await createApplication(addApplication);
  };

  const addApplicationButton = (id: number) => (
    <button
      onClick={() => {
        addButton(id);
        navigate(-1);
      }}
    >
      <i className="bi bi-plus-circle-fill"></i>
    </button>
  );

  // Rendering the component
  return (
    <div>
      <SearchBar onSearchTermChange={handleSearchTermChange} />
      <Table striped bordered hover className="custom-table">
        <thead>
          <tr>
            <th className="encora-purple text-light">#</th>
            {Object.values(props.types).map((type, index) => (
              <th key={index} className="encora-purple text-light">
                {type}
              </th>
            ))}
            {props.hideOptions && <th className="encora-purple text-light">Options</th>}
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
                  if (props.types[key] === "application_id" || props.types[key].includes("Aplicacion") && value) {
                    
                    return (
                      <td key={index}>
                        <Link to={`${value}`}>{value}</Link>
                      </td>
                    );
                  }

                  {
                    return <td key={index}>{value?.toString()}</td>;
                  }
                })}
                {props.hideOptions && (
                  <td>
                    {props.showInfoButton === true ? infoButton(entity.id) : null}
                    {props.showInfoButton === false ? openingsButton(entity.id) : null}
                    {props.showAddButton === true ? addApplicationButton(entity.id) : null}
                    {props.buttonArr ? props.buttonArr : null}
                  </td>
                )}
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TableStaffer;
