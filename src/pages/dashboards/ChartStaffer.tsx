import React from 'react';
import ChartComponent from './ChartComponent';
import "./Dashboard.css";
import { Project } from "../../types";
import {getAllProjects} from  "../../api/ProjectAPI";

import { Client } from "../../types";
import {getAllClients} from  "../../api/ClientAPI";

import { Position } from '../../types';
import { getAllPositions } from '../../api/PositionAPI';

import { useState, useEffect } from 'react';


const ChartStaffer: React.FC = () => {

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

  // Function to extract names into an array of strings
  const getClientNames = (): string[] => {
    return clients.map((client) => client.client_name);
  };

  const getClientProjects = (client_id: number): Project[] => {
    return projects.filter((project) => project.client_id === client_id);
  }

  const getAllProjectNames = (): string[] => {
    return projects.map((project) => project.project_title);
  }

  const getAllPositionsTechStack = (): string[] => {
    return positions.map((position) => position.tech_stack.split(', ')).flat();
  }

  const nonRepeatingTechStack = (): string[] => {
    return Array.from(new Set(getAllPositionsTechStack()));
  }

  // Functions to count 

  const countAllPositionsTechStack = (): number[] => {
    const nonRepeatingTechStacks = nonRepeatingTechStack();
    return nonRepeatingTechStacks.map((techStack) => getAllPositionsTechStack().filter((tech) => tech === techStack).length);
  }

  const countClientProjects = (client_id: number): number => {
    return getClientProjects(client_id).length;
  }

  const countAllClientProjects = (): number[] => {
    return clients.map((client) => countClientProjects(client.id));
  }



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

  const chartData = countAllClientProjects();
  const chartData2 = countAllPositionsTechStack();
  const chartData3 = [1, 1, 3, 3, 1, 1, 2, 2, 2, 1, 3, 1, 5, 7];
  const chartData4 = [2, 7, 3, 2, 3, 1, 2, 3, 3, 1, 3];


  const chartLabels = getClientNames();
  const chartLabels2 = nonRepeatingTechStack();
  const chartLabels3 = getAllProjectNames();

  return (
    <div className='row r1'>
        <h1>Dashboards</h1>

        <div className='col-sm-6 c1'>

          <div className='graph1-staffer'>
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

export default ChartStaffer;
