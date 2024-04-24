import React from 'react';
import ChartComponent from './ChartComponent';

import "./Dashboard.css";
import {getAllProjects} from  "../../api/ProjectAPI";

import { getAllClients } from  "../../api/ClientAPI";

import { getAllPositions } from '../../api/PositionAPI';

import {  getAllPeople } from '../../api/PersonAPI';

import { getAllOpenings } from '../../api/OpeningAPI';

import { getAllExpirationDateOpenings } from '../../api/ExpirationDateOpeningAPI';

import { useState, useEffect } from 'react';


const ChartAccount: React.FC = () => {

  // State to store data from API calls

  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [persons, setPersons] = useState<Person[]>([])
  const [, setOpenings] = useState<Opening[]>([])
  const [expirationDateOpenings, setExpirationDateOpenings] = useState<ExpirationDateOpening[]>([])

  useEffect(() => {
    getAllProjects().then((data: unknown) => {
      setProjects(data as Project[]);
    });
  }, [setProjects]);  


  useEffect(() => {
    getAllClients().then((data: unknown) => {
      setClients(data as Client[]);
    });
  }, [setClients]);


  useEffect(() => {
    getAllPositions().then((data: unknown) => {
      setPositions(data as Position[]);
    });
  }, [setPositions]);

  useEffect(() => {
    getAllPeople().then((data: unknown) => {
      setPersons(data as Person[]);
    });
  }, [setPersons]);

  useEffect(() => {
    getAllOpenings().then((data: unknown) => {
      setOpenings(data as Opening[]);
    });
  }, [setOpenings]);

  useEffect(() => {
    getAllExpirationDateOpenings().then((data: unknown) => {
      setExpirationDateOpenings(data as ExpirationDateOpening[]);
    });
  }, [setExpirationDateOpenings]);

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


  const Last8Sundays = (): Date[] => {
    const today = new Date();
    const lastSunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const last8Sundays = Array.from({ length: 8 }, (_, i) => new Date(lastSunday.getFullYear(), lastSunday.getMonth(), lastSunday.getDate() - i * 7));
    return last8Sundays;
  }

  const Last8SundaysToString = (): string[] => {
    return Last8Sundays().map((sunday) => sunday.toDateString());
  }

  const getExpirationDatesInAWeek = (WeekDay: Date): ExpirationDateOpening[] => {
    const nextWeek = new Date(WeekDay.getFullYear(), WeekDay.getMonth(), WeekDay.getDate() + 7);
    return expirationDateOpenings.filter((expirationDateOpening) => new Date(expirationDateOpening.expiration_date) < nextWeek);
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

  const countExpirationDatesLast8Weeks = (): number[] => {
    const last8Sundays = Last8Sundays();
    return last8Sundays.map((sunday) => getExpirationDatesInAWeek(sunday).length);
  }




  // Chart properties
  const chartType = 'bar';
  const chartType2 = 'pie';
  const chartType3 = 'line';
    
  const legendposition = 'top';

  const labelcolor = '#ffffff';
  const labelcolor2 = '#000000';

  const legendDisplay = true;
  const legendDisplay2 = false;

  const chartBgColor = ['#44197E', '#531e98','#7f3fc7', '#9a4fcf', '#b85fd6'];
  const chartBgColor2 = ['#ffffff'];  
  const chartBgColor3 = ['#94D7EF', '#04B1EF', '#0096D6', '#005C6B', '#003D3F', '#001F1F', '#B8E0EF ', '#64CAEF', '#007FA3'];

  const axiscolor = '#ffffff';
  const axiscolor2 = '#000000';

  const chartBdColor = '#ffffff';
  const chartBdColor2 = '#000000';

  const chartBdWidths = 2;
  const chartBdWidths2 = 1;
  const chartBdWidths3 = 1;

  // Data for charts

  const chartData = countAllClientProjects();
  const chartData2 = countExpirationDatesLast8Weeks().reverse();
  const chartData3 = countBenchJobTitles();
  const chartData4 = getAllClientRevenue();


  const chartLabels = getClientNames();
  const chartLabels2 = Last8SundaysToString().reverse();
  const chartLabels3 = getBenchJobTitles();
  const chartLabels4 = getClientNames();

  return (
    <div className='row r1'>
        <h1>Dashboards</h1>

        <div className='col-sm-6 c1'>

          <div className='graph4-staffer'>
            <h2 className='graph1-staffer-title'>Openings Cerradas en los Últimos 2 Meses</h2>
            <ChartComponent type={chartType3} data={chartData2} labels={chartLabels2}  legendDisplay={legendDisplay2} legendposition={legendposition} labelcolor={labelcolor} axiscolor={axiscolor} bgcolor={chartBgColor2} bdcolor={chartBdColor2} bdwidth={chartBdWidths2} />
          </div>


          <div><br></br></div>

          <div className='graph3-staffer'>
            <h2 className='graph3-staffer-title'>Titulos de Trabajo en Bench</h2>
            <ChartComponent type={chartType2} data={chartData3} labels={chartLabels3}  legendDisplay={legendDisplay} legendposition={legendposition} labelcolor={labelcolor2} axiscolor={axiscolor2} bgcolor={chartBgColor3} bdcolor={chartBdColor2} bdwidth={chartBdWidths3} />
          </div>

        </div>

        <div className='col-sm-6'>
          
          <div className='graph1-account'>
            <h2 className='graph1-staffer-title'>Proyectos Activos por Cliente</h2>
            <ChartComponent type={chartType2} data={chartData} labels={chartLabels} legendDisplay={legendDisplay} legendposition={legendposition} labelcolor={labelcolor} axiscolor={axiscolor} bgcolor={chartBgColor} bdcolor={chartBdColor} bdwidth={chartBdWidths} />
          </div>

          <div><br></br></div>

          <div className='graph2-staffer'>
            <h2 className='graph1-staffer-title'>Ingreso Total de Clientes</h2>
            <ChartComponent type={chartType} data={chartData4} labels={chartLabels4} legendDisplay={legendDisplay2} legendposition={legendposition} labelcolor={labelcolor2} axiscolor={axiscolor} bgcolor={chartBgColor2} bdcolor={chartBdColor2} bdwidth={chartBdWidths2} />
          </div>

        </div>
      </div>
  );
};

export default ChartAccount;
