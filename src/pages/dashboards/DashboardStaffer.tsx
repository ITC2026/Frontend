import React from 'react';
import ChartComponent from './ChartComponent';
import "./Dashboard.css";
import {getAllProjects} from  "../../api/ProjectAPI";

import {getAllClients} from  "../../api/ClientAPI";

import { getAllPositions } from '../../api/PositionAPI';

import { getAllApplications } from '../../api/ApplicationAPI';

import { useState, useEffect } from 'react';


const ChartStaffer: React.FC = () => {

  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [applications, setApplications] = useState<Application[]>([])


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
    getAllApplications().then((data: unknown) => {
      setApplications(data as Application[]);
    });
  }, [setApplications]);



  // Function to extract names into an array of strings

  const getApplicationsStatus = (): string[] => {
    return Array.from(new Set(applications.map((application) => application.application_status)));
  }


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

  const getAllProjectPositions = (project_id: number): Position[] => {
    return positions.filter((position) => position.project_id === project_id);
  }

  // Functions to count 
  
  const countAllClientsActiveProjects = (): number[] => {
    return clients.map((client) => getClientProjects(client.id).length);
  }


  const countAllPositionsTechStack = (): number[] => {
    const nonRepeatingTechStacks = nonRepeatingTechStack();
    return nonRepeatingTechStacks.map((techStack) => getAllPositionsTechStack().filter((tech) => tech === techStack).length);
  }


  const countAllProjectPositions = (): number[] => {
    return projects.map((project) => getAllProjectPositions(project.id).length);
  }


  const countApplicationsStatus = (): number[] => {
    return getApplicationsStatus().map((status) => applications.filter((application) => application.application_status === status).length);
  }



  const chartType = 'pie';
  const chartType2 = 'bar';
  const chartType3 = 'doughnut';
    
  const legendposition = 'top';

  const labelcolor = '#ffffff';
  const labelcolor2 = '#000000';

  const legendDisplay = true;
  const legendDisplay2 = false;

  const chartBgColor = ['#BCD5B7', '#92C089','#8ED973', '#3B7D23', '#275317'];
  const chartBgColor2 = ['#ffffff'];  
  const chartBgColor3 = ['#fffee0', '#fffdc1', '#fffb82', '#fff941', '#fff600', '#ffeb00', '#ffdd00', '#ffcf00', '#ffbf00', '#ffae00', '#ff9b00', '#ff8700', '#ff7200', '#ff5b00', '#ff4300', '#ff2a00'];

  const axiscolor = '#ffffff';
  const axiscolor2 = '#000000';

  const chartBdColor = '#ffffff';
  const chartBdColor2 = '#000000';

  const chartBdWidths = 2;
  const chartBdWidths2 = 1;
  const chartBdWidths3 = 1;

  const chartData = countApplicationsStatus();
  const chartData2 = countAllPositionsTechStack();
  const chartData3 = countAllClientsActiveProjects();
  const chartData4 = countAllProjectPositions();


  const chartLabels = getApplicationsStatus();
  const chartLabels2 = nonRepeatingTechStack();
  const chartLabels3 = getAllProjectNames();

  return (
    <div className='row r1'>
        <h1>Dashboards</h1>

        <div className='col-sm-6 c1'>

          <div className='graph1-staffer'>
            <h2 className='graph1-staffer-title'>Estado Actual de Postulados</h2>
            <ChartComponent type={chartType3} data={chartData} labels={chartLabels} legendDisplay={legendDisplay} legendposition={legendposition} labelcolor={labelcolor} axiscolor={axiscolor} bgcolor={chartBgColor} bdcolor={chartBdColor} bdwidth={chartBdWidths} />
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
