import React from 'react';
import ChartComponent from './ChartComponent';

import "./Dashboard.css";
import {getAllProjects} from  "../../api/ProjectAPI";

import { getAllClients } from  "../../api/ClientAPI";

import { getAllPositions } from '../../api/PositionAPI';

import { getAllPersons } from '../../api/PersonAPI';

import { getAllOpenings } from '../../api/OpeningAPI';

import { useState, useEffect } from 'react';


const ChartAccount: React.FC = () => {

  // State to store data from API calls

  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    getAllProjects().then((data: unknown) => {
      setProjects(data as Project[]);
    });
  }, [setProjects]);  

  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    getAllClients().then((data: unknown) => {
      setClients(data as Client[]);
    });
  }, [setClients]);

  const [positions, setPositions] = useState<Position[]>([])

  useEffect(() => {
    getAllPositions().then((data: unknown) => {
      setPositions(data as Position[]);
    });
  }, [setPositions]);

  const [persons, setPersons] = useState<Person[]>([])
  useEffect(() => {
    getAllPersons().then((data: unknown) => {
      setPersons(data as Person[]);
    });
  }, [setPersons]);

  const [openings, setOpenings] = useState<Opening[]>([])
  useEffect(() => {
    getAllOpenings().then((data: unknown) => {
      setOpenings(data as Opening[]);
    });
  }, [setOpenings]);

  // Function to extract names into an array of strings

  const getClientNames = (): string[] => {
    return clients.map((client) => client.client_name);
  };
  
  const getClientProjects = (client_id: number): Project[] => {
    return projects.filter((project) => project.client_id === client_id);
  }



  const getAllProjectPositions = (project_id: number): Position[] => {
    return positions.filter((position) => position.project_id === project_id);
  }

  const getProjectsRevenue = (project_id: number): number => {
    return getAllProjectPositions(project_id).reduce((acc, position) => acc + position.bill_rate, 0);
  }

  
  
  const getAllClientRevenue = (): number[] => {
    return clients.map((client) => getProjectsRevenue(client.id));
  }
  
  const getPersonsBench = (): Person[] => {
    return persons.filter((person) => person.status === 'Bench');
  }

  const getBenchJobTitles = (): string[] => {
    return Array.from(new Set(getPersonsBench().map((person) => person.title)));
  }



  const hasExpirationDateOpenings = openings.filter((opening) => opening.has_expiration_date === true);

  const expirationDateOpenings = (): Date[] => {
    return hasExpirationDateOpenings.map((opening) => opening.start_date);
  }

  // Functions to count 
  
  const countClientProjects = (client_id: number): number => {
    return getClientProjects(client_id).length;
  }

  const countAllClientProjects = (): number[] => {
    return clients.map((client) => countClientProjects(client.id));
  }

  const countBenchJobTitles = (): number[] => {
    const benchJobTitles = getBenchJobTitles();
    return benchJobTitles.map((title) => getBenchJobTitles().filter((t) => t === title).length);
  }

  const countClosedOpeningsLastMonthPerWeek = (): number[] => {
    const lastMonth = new Date();
    console.log(lastMonth);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthOpenings = expirationDateOpenings.filter((expirationDateOpening) => expirationDateOpening.expiration_date > lastMonth);
    const lastMonthOpeningsPerWeek = lastMonthOpenings.map((expirationDateOpening) => expirationDateOpening.expiration_date.getDate());
    return lastMonthOpeningsPerWeek;
  }


  // Chart properties
  const chartType = 'bar';
    
  const legendposition = 'top';

  const labelcolor = '#ffffff';
  const labelcolor2 = '#000000';

  const legendDisplay = true;
  const legendDisplay2 = false;

  const chartBgColor = ['#44197E', '#531e98','#7f3fc7', '#9a4fcf', '#b85fd6'];
  const chartBgColor2 = ['#ffffff'];  
  const chartBgColor3 = ['#fffee0', '#fffdc1', '#fffb82', '#fff941', '#fff600', '#ffeb00', '#ffdd00', '#ffcf00', '#ffbf00', '#ffae00', '#ff9b00', '#ff8700', '#ff7200', '#ff5b00', '#ff4300', '#ff2a00'];

  const axiscolor = '#ffffff';
  const axiscolor2 = '#000000';

  const chartBdColor = '#ffffff';
  const chartBdColor2 = '#000000';

  const chartBdWidths = 2;
  const chartBdWidths2 = 1;
  const chartBdWidths3 = 1;

  // Data for charts

  const chartData = countAllClientProjects();
  const chartData2 = countClosedOpeningsLastMonthPerWeek();
  const chartData3 = countBenchJobTitles();
  const chartData4 = getAllClientRevenue();


  const chartLabels = getClientNames();
  const chartLabels2 = allExpirationDateOpeningsString();
  const chartLabels3 = getBenchJobTitles();
  const chartLabels4 = getClientNames();

  return (
    <div className='row r1'>
        <h1>Dashboards</h1>

        <div className='col-sm-6 c1'>

          <div className='graph1-account'>
            <h2 className='graph1-staffer-title'>Proyectos Activos por Cliente</h2>
            <ChartComponent type={chartType} data={chartData} labels={chartLabels} legendDisplay={legendDisplay} legendposition={legendposition} labelcolor={labelcolor} axiscolor={axiscolor} bgcolor={chartBgColor} bdcolor={chartBdColor} bdwidth={chartBdWidths} />
          </div>

          <div><br></br></div>

          <div className='graph3-staffer'>
            <h2 className='graph3-staffer-title'>Titulos de Trabajo en Bench</h2>
            <ChartComponent type={chartType} data={chartData3} labels={chartLabels3}  legendDisplay={legendDisplay2} legendposition={legendposition} labelcolor={labelcolor2} axiscolor={axiscolor2} bgcolor={chartBgColor2} bdcolor={chartBdColor2} bdwidth={chartBdWidths3} />
          </div>

        </div>

        <div className='col-sm-6'>

          <div className='graph2-staffer'>
            <h2 className='graph1-staffer-title'>Tech Stacks en Posiciones</h2>
            <ChartComponent type={chartType} data={chartData2} labels={chartLabels2}  legendDisplay={legendDisplay2} legendposition={legendposition} labelcolor={labelcolor} axiscolor={axiscolor} bgcolor={chartBgColor2} bdcolor={chartBdColor2} bdwidth={chartBdWidths2} />
          </div>

          <div><br></br></div>

          <div className='graph4-staffer'>
            <h2 className='graph1-staffer-title'>Ingreso Total de Clientes</h2>
            <ChartComponent type={chartType} data={chartData4} labels={chartLabels4} legendDisplay={legendDisplay} legendposition={legendposition} labelcolor={labelcolor2} axiscolor={axiscolor} bgcolor={chartBgColor3} bdcolor={chartBdColor2} bdwidth={chartBdWidths2} />
          </div>

        </div>
      </div>

  );
};

export default ChartAccount;
