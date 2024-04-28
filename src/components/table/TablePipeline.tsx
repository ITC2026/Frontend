import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';
import './Table.css';
import { getPersonById } from '../../api/PersonAPI';

interface Props {
  entity: (Project | Position | Opening | Candidate)[];
  categories: { [key: string]: string };
  children?: JSX.Element;
}

const TablePipeline = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [personNames, setPersonNames] = useState<{ [key: number]: string }>({});

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const fetchPersonNames = async () => {
      const namesMap: { [key: number]: string } = {};
      for (const entity of props.entity) {
        for (const key of Object.keys(props.categories)) {
          const value = entity[key as keyof (Project | Position | Opening | Candidate)];
          if (
            props.categories[key] &&
            props.categories[key].includes('Nombre') &&
            value &&
            !personNames[value]
          ) {
            try {
              const person = await getPersonById(value);
              if (!person) {
                throw new Error('Person not found');
              }
              const personName = person.name.toString();
              namesMap[value] = personName;
            } catch (error) {
              console.error('Error fetching person from ID:', error);
              namesMap[value] = 'Error fetching name';
            }
          }
        }
      }
      setPersonNames((prevNames) => ({ ...prevNames, ...namesMap }));
    };

    fetchPersonNames();
  }, [props.entity, props.categories]); // Trigger fetch when entity or categories change

  const filteredEntity = props.entity.filter((entity) => {
    const searchableFields = Object.values(entity)
      .map((value) => (value ? value.toString().toLowerCase() : ''))
      .join(' ');
    return searchableFields.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <div className="table-header">
        <div className="children-container">{props.children}</div>
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
            (entity: Project | Position | Opening | Candidate, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {Object.keys(props.categories).map((key: string, columnIndex: number) => {
                  const value =
                    entity[key as keyof (Project | Position | Opening | Candidate)];
                  if (
                    props.categories[key] &&
                    props.categories[key].includes('Nombre') &&
                    value &&
                    personNames[value]
                  ) {
                    return <td key={columnIndex}>{personNames[value]}</td>;
                  } else {
                    return <td key={columnIndex}>{value?.toString()}</td>;
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

export default TablePipeline;
