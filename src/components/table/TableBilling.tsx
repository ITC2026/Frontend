import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';
import './Table.css';
import { getPersonById } from '../../api/PersonAPI';
import  getClientForPerson  from '../../pages/resourceManager/functions/getClientForPerson';
import getBillRateForBilling from '../../pages/resourceManager/functions/getBillRateForBilling';
import getProjectForPerson from '../../pages/resourceManager/functions/getProjectForPerson';
import getSalaryForEmployee from '../../pages/resourceManager/functions/getSalaryForEmployee';

interface Props {
  entity: (Person)[];
  categories: { [key: string]: string };
  children?: JSX.Element;
}

const TableBench = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [personNames, setPersonNames] = useState<{ [key: number]: string }>({});
  const [divisions, setDivisions] = useState<{ [key: number]: string }>({});
  const [jobTitles, setJobTitles] = useState<{ [key: number]: string }>({});
  const [clients, setClients] = useState<{ [key: number]: string }>({});
  const [projects, setProjects] = useState<{ [key: number]: string }>({});
    const [billRate, setBillRate] = useState<{ [key: number]: string }>({});
    const [salary, setSalary] = useState<{ [key: number]: string }>({});

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const fetchPersonData = async () => {
      const namesMap: { [key: number]: string } = {};
        const divisionMap: { [key: number]: string } = {};
      const jobTitleMap: { [key: number]: string } = {};
      const clientMap: { [key: number]: string } = {};
      const projectMap: { [key: number]: string } = {};
      const billRateMap: { [key: number]: string } = {};
      const salaryMap: { [key: number]: string } = {};

      for (const entity of props.entity) {
        const personId = entity.id;
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

            if (props.categories[key].includes('Cliente') && personId && !clientMap[personId]) {
                try {
                  const client = await getClientForPerson(personId);
                  if (!client) {
                    throw new Error('Client not found');
                  }
                  clientMap[personId] = client.toString();
                } catch (error) {
                  console.error('Error fetching client from ID:', error);
                  clientMap[personId] = 'Error fetching client';
                }
              }

              if (props.categories[key].includes('Proyecto') && personId && !projectMap[personId]) {
                try {
                  const project = await getProjectForPerson(personId);
                  if (!project) {
                    throw new Error('Project not found');
                  }
                  projectMap[personId] = project;
                } catch (error) {
                  console.error('Error fetching project from ID:', error);
                  projectMap[personId] = 'Error fetching project';
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
            if (props.categories[key].includes('Billing Rate') && personId && !billRateMap[personId]) {
                try {
                  const billRate = (await getBillRateForBilling(personId));
                  if (!billRate) {  
                    throw new Error('Bill Rate not found');
                  }
                  billRateMap[personId] = billRate.toString();
                } catch (error) {
                  console.error('Error fetching Bill Rate from ID:', error);
                  billRateMap[personId] = 'Error fetching Bill Rate';
                }
              }
              if (props.categories[key].includes('Salario') && personId && !salaryMap[personId]) {
                try {
                  const salary = await getSalaryForEmployee(personId);
                  if (!salary) {
                    throw new Error('Person not found');
                  }
                  const personSalary = salary;
                  salaryMap[personId] = personSalary.toString();
                } catch (error) {
                  console.error('Error fetching salary from ID:', error);
                  salaryMap[personId] = 'Error fetching salary';
                }
              }

          }
        }
      }
  
      // Update state with all fetched data
      setPersonNames((prevNames) => ({ ...prevNames, ...namesMap }));
      setDivisions((prevDivisions) => ({ ...prevDivisions, ...divisionMap }));
      setJobTitles((prevTitles) => ({ ...prevTitles, ...jobTitleMap }));
      setClients((prevClients) => ({ ...prevClients, ...clientMap }));
      setProjects((prevProjects) => ({ ...prevProjects, ...projectMap }));
      setBillRate((prevBillRate) => ({ ...prevBillRate, ...billRateMap }));
      setSalary((prevSalary) => ({ ...prevSalary, ...salaryMap }));
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
    <div className='todo'>
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
            <th className="encora-purple text-light">Opciones</th>
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
                    props.categories[key] &&
                    props.categories[key].includes('División') &&
                    personId &&
                    divisions[personId]
                  ) {
                    return <td key={columnIndex}>{divisions[personId]}</td>;
                  } if (
                    props.categories[key].includes('Cliente')
                  ) {
                    return <td key={columnIndex}>{clients[personId]}</td>;
                  }   
                if (
                    props.categories[key].includes('Titulo de trabajo')
                  ) {
                    return <td key={columnIndex}>{jobTitles[personId]}</td>;
                  } if (
                    props.categories[key].includes('Proyecto')
                  ) {
                    return <td key={columnIndex}>{projects[personId]}</td>;
                    }
                    if (
                        props.categories[key].includes('Billing Rate')
                      ) {
                        return <td key={columnIndex}>{billRate[personId]}</td>;
                      }
                      if (
                        props.categories[key].includes('Salario')
                      ) {
                        return <td key={columnIndex}>{salary[personId]}</td>;
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
