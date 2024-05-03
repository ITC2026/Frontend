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
}

const TableStaffer = (prop: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { id1, id2 } = useParams();
  const positionProjectID  = parseInt(id1 as string);
  const positionID = parseInt(id2 as string);
  console.log(positionID);

  const navigate = useNavigate();

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
      }) : [];

    const infoButton = (id: number) => {
      return (
          <Link to={`${id}`}>
              <i className='bi bi-info-circle-fill'></i>
          </Link>
      );
    };

    const openingsButton = (id:number) => {
      return (
        <Link to={`positions/${id}`}>
          <i className="bi bi-person-plus-fill"></i>
        </Link>
      );
    };

    const handleAddButton = async (candidate_id : number) => {
      const addApplication = {
        person_id: candidate_id,
        position_id: positionID,
        application_status: "Waiting on Client Response"
      };
      await createApplication(addApplication);
    };
  
    const addButton = (id : number) => {
      handleAddButton(id);
    };

    const addApplicationButton = (id:number) => {
      return (
        <button>
          <i onClick={() => { addButton(id); navigate(-1); }} className="bi bi-plus-circle-fill"></i>
        </button>
      );
    };

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
            <th className="encora-purple text-light">Opciones</th>
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
                  {
                    return <td key={index}>{value?.toString()}</td>;
                  }
                })}
                <td>
                  {prop.showInfoButton === true ? (
                    infoButton(entity.id)
                  ) : null}
                  {prop.showInfoButton === false ? (
                    openingsButton(entity.id) 
                  ) : null}
                  {prop.showAddButton === true ? (
                    addApplicationButton(entity.id)
                  ) : null}
                  {prop.buttonArr ? prop.buttonArr : null}
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TableStaffer;
