import React from 'react';
import ChartComponent from './ChartComponent';
import "./Dashboard.css";
import { Project } from "../../types";
import {getAllProjects} from  "../../api/ProjectAPI";

import { Client } from "../../types";
import {getAllClients} from  "../../api/ClientAPI";

import { useState, useEffect } from 'react';


const ChartAccount: React.FC = () => {

  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    getAllProjects().then((data: unknown) => {
      setProjects(data as Project[]);
      console.log(data);
    });
  }, [setProjects]);  

  const [clients, setClients] = useState<Client[]>([])
  useEffect(() => {
    getAllClients().then((data: unknown) => {
      setClients(data as Client[]);
      console.log(data);
    });
  }, [setClients]);

  const projectClientIds = projects.map(project => project.client_id);
  const uniqueClientIds = [...new Set(projectClientIds)];
  const validClientsWithProjects = uniqueClientIds
  .map(clientId => {
    const matchingClient = clients.find(client => client.id === clientId);
    return matchingClient ? matchingClient.client_name : ''; // Return client_name if found, otherwise empty string
  })
  .filter(clientName => clientName !== ''); // Filter out empty strings

  const clientProjectCounts = validClientsWithProjects.map(clientName => {
    return projects.filter(project => {
      const matchingClient = clients.find(client => client.id === project.client_id);
      return matchingClient ? matchingClient.client_name === clientName : false;
    }).length;
  });

  const chartType = 'pie';
  const chartType2 = 'bar';
    
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

  const chartData = clientProjectCounts;
  const chartData2 = [1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 12];
  const chartData3 = [1, 1, 3, 3, 1, 1, 2, 2, 2, 1, 3, 1, 5, 7];
  const chartData4 = [2, 7, 3, 2, 3, 1, 2, 3, 3, 1, 3];


  const chartLabels = validClientsWithProjects;
  const chartLabels2 = ['Appian', 'Golang', 'iOS', 'JavaScript', 'Kotlin', 'PowerApps', 'UX', '.NET', 'Angular', 'Automation', 'Manual Tester', 'Python', 'React', 'Java'];
  const chartLabels3 = ['SOW Google 01.24', 'SOW Temu 01.24', 'SOW Allison 01.23', 'SOW Queen Data 01.24', 'SOW TCE 01.24', 'SOW UIAT 01.23', 'SOW Microsoft 01.24', 'SOW Microsoft 02.24', 'SOW Microsoft 03.24', 'SOW Apprentice 01.24', 'SOW Trolly 01.24'];

  return (
    <div className='row r1'>
        <h1>Dashboards</h1>

        <div className='col-sm-6 c1'>

          <div className='graph1-account'>
            <h2 className='graph1-staffer-title'>Estado Actual de Postulados</h2>
            <ChartComponent type={chartType} data={chartData} labels={chartLabels} legendDisplay={legendDisplay} legendposition={legendposition} labelcolor={labelcolor} axiscolor={axiscolor} bgcolor={chartBgColor} bdcolor={chartBdColor} bdwidth={chartBdWidths} />
          </div>

          <div><br></br></div>

          <div className='graph3-staffer'>
            <h2 className='graph3-staffer-title'>Tech Stacks en Empleados</h2>
            <ChartComponent type={chartType2} data={chartData3} labels={chartLabels2}  legendDisplay={legendDisplay2} legendposition={legendposition} labelcolor={labelcolor2} axiscolor={axiscolor2} bgcolor={chartBgColor2} bdcolor={chartBdColor2} bdwidth={chartBdWidths3} />
          </div>

        </div>

        <div className='col-sm-6'>

          <div className='graph2-staffer'>
            <h2 className='graph1-staffer-title'>Tech Stacks en Posiciones</h2>
            <ChartComponent type={chartType2} data={chartData2} labels={chartLabels2}  legendDisplay={legendDisplay2} legendposition={legendposition} labelcolor={labelcolor} axiscolor={axiscolor} bgcolor={chartBgColor2} bdcolor={chartBdColor2} bdwidth={chartBdWidths2} />
          </div>

          <div><br></br></div>

          <div className='graph4-staffer'>
            <h2 className='graph1-staffer-title'>Posiciones Activas Proyecto</h2>
            <ChartComponent type={chartType} data={chartData4} labels={chartLabels3} legendDisplay={legendDisplay} legendposition={legendposition} labelcolor={labelcolor2} axiscolor={axiscolor} bgcolor={chartBgColor3} bdcolor={chartBdColor2} bdwidth={chartBdWidths2} />
          </div>

          <div><br></br></div>

        </div>
      </div>

  );
};

export default ChartAccount;
