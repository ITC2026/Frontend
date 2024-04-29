import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';
import './Table.css';
import { getPersonById } from '../../api/PersonAPI';

interface Props {
  entity: (Employee)[];
  categories: { [key: string]: string };
  children?: JSX.Element;
}

const TableBench = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [personNames, setPersonNames] = useState<{ [key: number]: string }>({});
  const [divisions, setDivisions] = useState<{ [key: number]: string }>({});
  const [jobTitles, setJobTitles] = useState<{ [key: number]: string }>({});
  const [techStacks, setTechStacks] = useState<{ [key: number]: string }>({});
  const [daysOnBench, setDaysOnBench] = useState<{ [key: number]: string }>({});

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const fetchPersonData = async () => {
      const namesMap: { [key: number]: string } = {};
        const divisionMap: { [key: number]: string } = {};
      const jobTitleMap: { [key: number]: string } = {};
      const techStackMap: { [key: number]: string } = {};
      const daysOnBenchMap: { [key: number]: string } = {};

      for (const entity of props.entity) {
        const personId = entity.person_id;
        for (const key of Object.keys(props.categories)) {
          if (props.categories[key]) {
            // Check if the category includes any of the desired data
            if (props.categories[key].includes('Nombre') && personId && !personNames[personId]) {
              try {
                const person = await getPersonById(personId);
                if (!person) {
                  throw new Error('Person not found');
                }
                const personName = person.name.toString();
                namesMap[personId] = personName;
              } catch (error) {
                console.error('Error fetching person name from ID:', error);
                namesMap[personId] = 'Error fetching name';
              }
            }

            if (props.categories[key].includes('División') && personId && !divisionMap[personId]) {
                try {
                    const person = await getPersonById(personId);
                    if (!person) {
                    throw new Error('Person not found');
                    }
                    const personDivision = person.division.toString();
                    divisionMap[personId] = personDivision;
                } catch (error) {
                    console.error('Error fetching division from ID:', error);
                    divisionMap[personId] = 'Error fetching division';
                }
            }   
  
            if (props.categories[key].includes('Titulo de trabajo') && personId && !jobTitleMap[personId]) {
              try {
                const person = await getPersonById(personId);
                if (!person) {
                  throw new Error('Person not found');
                }
                const personJobTitle = person.title.toString();
                jobTitleMap[personId] = personJobTitle;
              } catch (error) {
                console.error('Error fetching job title from ID:', error);
                jobTitleMap[personId] = 'Error fetching job title';
              }
            }
  
            if (props.categories[key].includes('Tech Stack') && personId && !techStackMap[personId]) {
              try {
                const person = await getPersonById(personId);
                if (!person) {
                  throw new Error('Tech stack not found');
                }
                const personTechStack = person.tech_stack.toString();
                techStackMap[personId] = personTechStack;
              } catch (error) {
                console.error('Error fetching tech stack from ID:', error);
                techStackMap[personId] = 'Error fetching tech stack';
              }
            }
            if (props.categories[key].includes('Días en el bench') && personId && !daysOnBenchMap[personId]) {
                try {
                  const on_bench_since = entity.last_movement_at;
                  const today = new Date();
                  const days_on_bench = Math.floor((today.getTime() - new Date(on_bench_since).getTime()) / (1000 * 60 * 60 * 24));
                  daysOnBenchMap[personId] = days_on_bench.toString();
                } catch (error) {
                  console.error('Error getting days on bench:', error);
                  daysOnBenchMap[personId] = 'Error fetching days on bench';
                }
              }
          }
        }
      }
  
      // Update state with all fetched data
      setPersonNames((prevNames) => ({ ...prevNames, ...namesMap }));
      setDivisions((prevDivisions) => ({ ...prevDivisions, ...divisionMap }));
      setJobTitles((prevTitles) => ({ ...prevTitles, ...jobTitleMap }));
      setTechStacks((prevStacks) => ({ ...prevStacks, ...techStackMap }));
      setDaysOnBench((prevDays) => ({ ...prevDays, ...daysOnBenchMap }));
    };
  
    fetchPersonData();
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
            (entity: Employee, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {Object.keys(props.categories).map((key: string, columnIndex: number) => {
                  const personId =
                    entity.person_id;
                  const value = entity[key as keyof Employee];
                  if (
                    props.categories[key] &&
                    props.categories[key].includes('Nombre') &&
                    personId &&
                    personNames[personId]
                  ) {
                    return <td key={columnIndex}>{personNames[personId]}</td>;
                  } if (
                    props.categories[key] &&
                    props.categories[key].includes('División') &&
                    personId &&
                    divisions[personId]
                  ) {
                    return <td key={columnIndex}>{divisions[personId]}</td>;
                    }    
                if (
                    props.categories[key].includes('Titulo de trabajo')
                  ) {
                    return <td key={columnIndex}>{jobTitles[personId]}</td>;
                  } if (
                    props.categories[key].includes('Tech Stack')
                  ) {
                    return <td key={columnIndex}>{techStacks[personId]}</td>;
                  } if (
                    props.categories[key].includes('Días en el bench')
                  ) {
                    return <td key={columnIndex}>{daysOnBench[personId]}</td>;
                  }
                   else {
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

export default TableBench;
