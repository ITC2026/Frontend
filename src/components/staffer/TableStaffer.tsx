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
  entity_id?: { [key: string]: number };
}
const TableStaffer = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { id1, id2 } = useParams();
  const positionProjectID = parseInt(id1 as string);
  const positionID = parseInt(id2 as string);
  console.log(positionID); // Console logging for debug, consider removing for production

  const navigate = useNavigate();

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  // Filtering the entity array based on the search term and ensuring prop.entity is defined before filtering
  const filteredEntity = props.entity
    ? props.entity
        .filter((entity: any) =>
          entity.id.toString().includes(searchTerm.toLowerCase())
        )
        .sort((a: any, b: any) => a.id - b.id) // Sorting by ID in ascending order
    : [];

  // Function definitions for buttons
  const infoButton = (id: number) => (
    <Link to={`${id}`}>
      <i className="bi bi-info-circle-fill"></i>
    </Link>
  );

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
            <th className="encora-purple text-light">Options</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntity.map((entity, index) => (
            <tr key={index}>
              <td>{entity.id}</td>
              {Object.keys(props.types).map((key, index) => {
                const value = entity[key as keyof typeof entity];
                return <td key={index}>{value?.toString()}</td>;
              })}
              <td>
                {props.showInfoButton ? infoButton(entity.id) : null}
                {props.showAddButton ? addApplicationButton(entity.id) : null}
                {props.buttonArr}
                {props.showEditButton && (
                  <Link to={`edit/${entity.id}`}>
                    <i className="bi bi-pencil-fill"></i>
                  </Link>
                )}
                {props.entity_id && (
                  <Link to={`${props.entity_id[entity.id]}`}>
                    <i className="bi bi-pencil-fill"></i>
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableStaffer;
