/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
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

interface Entity extends Project, Position, Opening, Person {}

const TableView = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    if (sortConfig !== null) {
      props.entity.sort((a, b) => {
        const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
        const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
  }, [sortConfig, props.entity]);

  const filteredEntity = props.entity.filter((entity: Entity) => {
    const searchableFields = Object.values(entity)
      .map(value => (value ? value.toString().toLowerCase() : ""))
      .join(" ");
    return searchableFields.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="todo">
      <div className="table-header">
        <div className="children-container">{props.children}</div>
        <SearchBar onSearchTermChange={handleSearchTermChange} />
      </div>

      <Table striped bordered responsive hover bsPrefix="custom-table">
        <thead>
          <tr>
            {!props.hideIndex && <th className="encora-purple text-light">#</th>}
            {Object.entries(props.categories).map(([key, category], index) => (
              <th key={index} className="encora-purple text-light" onClick={() => handleSort(key)}>
                {category} {sortConfig && sortConfig.key === key ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
              </th>
            ))}
            <th className="encora-purple text-light">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntity.map((entity, index) => (
            <tr key={index}>
              {!props.hideIndex && <td>{index + 1}</td>}
              {Object.keys(props.categories).map((key, index) => {
                const value = entity[key];
                if (props.categories[key] && props.categories[key].includes("Fecha") && value) {
                  return <td key={index}>{formatTimestamp(value.toString())}</td>;
                } else {
                  return <td key={index}>{value?.toString()}</td>;
                }
              })}
              <td>
                <div className="table-options">
                  <Link to={`${entity.id}`}>
                    <i className="bi bi-eye-fill table-element"></i>
                  </Link>
                  {props.showEdit && (
                    <Link to={`edit/${entity.id}`}>
                      <i className="bi bi-pencil-fill table-element"></i>
                    </Link>
                  )}
                  <ConfigIcons entity={props.configBtn} id={entity.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableView;
