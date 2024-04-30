import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';
import './Table.css';
import { getAllCandidates } from '../../api/CandidateAPI';

interface Props {
  entity: (Person)[];
  categories: { [key: string]: string };
  children?: JSX.Element;
}

const TablePipeline = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [personNames, setPersonNames] = useState<{ [key: number]: string }>({});
  const [jobTitles, setJobTitles] = useState<{ [key: number]: string }>({});
  const [techStacks, setTechStacks] = useState<{ [key: number]: string }>({});
  const [salarioEsperado, setSalarioEsperado] = useState<{ [key: number]: string }>({});

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const fetchPersonData = async () => {
      const namesMap: { [key: number]: string } = {};
      const jobTitleMap: { [key: number]: string } = {};
      const techStackMap: { [key: number]: string } = {};
      const SalarioEsperadoMap: { [key: number]: string } = {};
  
      for (const entity of props.entity) {
        const personId = entity.id;
        for (const key of Object.keys(props.categories)) {
          if (props.categories[key]) {
            // Check if the category includes any of the desired data
            if (props.categories[key].includes('Nombre') && personId && !personNames[personId]) {
              try {
                const personName = entity.name.toString();
                namesMap[personId] = personName;
              } catch (error) {
                console.error('Error fetching person name from ID:', error);
                namesMap[personId] = 'Error fetching name';
              }
            }
  
            if (props.categories[key].includes('Titulo de trabajo') && personId && !jobTitleMap[personId]) {
              try {
                const personJobTitle = entity.title.toString();
                jobTitleMap[personId] = personJobTitle;
              } catch (error) {
                console.error('Error fetching job title from ID:', error);
                jobTitleMap[personId] = 'Error fetching job title';
              }
            }
  
            if (props.categories[key].includes('Tech Stack') && personId && !techStackMap[personId]) {
              try {
                const personTechStack = entity.tech_stack.toString();
                techStackMap[personId] = personTechStack;
              } catch (error) {
                console.error('Error fetching tech stack from ID:', error);
                techStackMap[personId] = 'Error fetching tech stack';
              }
            }
            if (props.categories[key].includes('Salario Esperado') && personId && !SalarioEsperadoMap[personId]) {
              try {
                const candidates = await getAllCandidates();
                if (!candidates) {
                  throw new Error('Candidates not found');
                }
                const candidate = candidates.find((candidate) => candidate.id === personId);
                const personExpectedSalary = candidate?.expected_salary;
                SalarioEsperadoMap[personId] = personExpectedSalary?.toString() || 'Error fetching expected salary';
              } catch (error) {
                console.error('Error fetching tech stack from ID:', error);
                SalarioEsperadoMap[personId] = 'Error fetching expected salary';
              }
            }
          }
        }
      }
  
      // Update state with all fetched data
      setPersonNames((prevNames) => ({ ...prevNames, ...namesMap }));
      setJobTitles((prevTitles) => ({ ...prevTitles, ...jobTitleMap }));
      setTechStacks((prevStacks) => ({ ...prevStacks, ...techStackMap }));
      setSalarioEsperado((prevSalario) => ({ ...prevSalario, ...SalarioEsperadoMap }));
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
            (entity: Person, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {Object.keys(props.categories).map((key: string, columnIndex: number) => {
                  const personId =
                    entity.id;
                  const value = entity[key as keyof Person];
                  if (
                    props.categories[key] &&
                    props.categories[key].includes('Nombre') &&
                    personId &&
                    personNames[personId]
                  ) {
                    return <td key={columnIndex}>{personNames[personId]}</td>;
                  } if (
                    props.categories[key].includes('Titulo de trabajo')
                  ) {
                    return <td key={columnIndex}>{jobTitles[personId]}</td>;
                  } if (
                    props.categories[key].includes('Tech Stack')
                  ) {
                    return <td key={columnIndex}>{techStacks[personId]}</td>;
                  } if (
                    props.categories[key].includes('Salario Esperado')
                  ) {
                    return <td key={columnIndex}>{salarioEsperado[personId]}</td>;
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
