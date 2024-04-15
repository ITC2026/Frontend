import React from 'react';
import ChartComponent from './ChartComponent';
import "./Dashboard.css";


const Chart: React.FC = () => {
  const chartType = 'pie';
  const chartType2 = 'bar';
  
  const legendposition = 'top';

  const labelcolor = '#ffffff';

  const legendDisplay = true;
  const legendDisplay2 = false;

  const chartBgColor = ['#275317', '#3B7D23', '#8ED973', '#92C089', '#BCD5B7'];
  const chartBgColor2 = ['#ffffff'];  

  const axiscolor = '#ffffff';

  const chartBdColor = '#ffffff';
  const chartBdColor2 = '#000000';

  const chartBdWidths = 2;
  const chartBdWidths2 = 1;
  const chartBdWidths3 = 1;

  const chartData = [31, 65, 22, 7, 18];
  const chartData2 = [1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 12];
  const chartData3 = [1, 1, 3, 3, 1, 1, 2, 2, 2, 1, 3, 1, 5, 7];
  const chartData4 = [2, 7, 3, 2, 3, 1, 2, 3, 3, 1, 3];


  const chartLabels = ['Aceptado', 'Rechazado',	'Esperando Feedback', 'Agendado a Cita', 'Recién Postulado'];
  const chartLabels2 = ['Appian', 'Golang', 'iOS', 'JavaScript', 'Kotlin', 'PowerApps', 'UX', '.NET', 'Angular', 'Automation', 'Manual Tester', 'Python', 'React', 'Java'];
  const chartLabels3 = ['SOW Google 01.24', 'SOW Temu 01.24', 'SOW Allison 01.23', 'SOW Queen Data 01.24', 'SOW TCE 01.24', 'SOW UIAT 01.23', 'SOW Microsoft 01.24', 'SOW Microsoft 02.24', 'SOW Microsoft 03.24', 'SOW Apprentice 01.24', 'SOW Trolly 01.24'];

  return (
    <div className='row r1'>
        <h1>Dashboards</h1>

        <div className='col-sm-6 c1'>

          <div className='graph1'>
            <h2 className='graph1-title'>Estado Actual de Postulados</h2>
            <ChartComponent type={chartType} data={chartData} labels={chartLabels} legendDisplay={legendDisplay} legendposition={legendposition} labelcolor={labelcolor} axiscolor={axiscolor} bgcolor={chartBgColor} bdcolor={chartBdColor} bdwidth={chartBdWidths} />
          </div>

          <div><br></br></div>

          <div className='graph3'>
            <h2 className='graph1-title'>Tech Stacks en Empleados</h2>
            <ChartComponent type={chartType2} data={chartData3} labels={chartLabels2}  legendDisplay={legendDisplay2} legendposition={legendposition} labelcolor={labelcolor} axiscolor={axiscolor} bgcolor={chartBgColor2} bdcolor={chartBdColor2} bdwidth={chartBdWidths3} />
          </div>

        </div>

        <div className='col-sm-6'>

          <div className='graph2'>
            <h2 className='graph1-title'>Tech Stacks en Posiciones</h2>
            <ChartComponent type={chartType2} data={chartData2} labels={chartLabels2}  legendDisplay={legendDisplay2} legendposition={legendposition} labelcolor={labelcolor} axiscolor={axiscolor} bgcolor={chartBgColor2} bdcolor={chartBdColor2} bdwidth={chartBdWidths2} />
          </div>

          <div><br></br></div>

          <div className='graph4'>
            <h2 className='graph1-title'>Posiciones Activas Proyecto</h2>
            <ChartComponent type={chartType2} data={chartData4} labels={chartLabels3} legendDisplay={legendDisplay} legendposition={legendposition} labelcolor={labelcolor} axiscolor={axiscolor} bgcolor={chartBgColor2} bdcolor={chartBdColor2} bdwidth={chartBdWidths2} />
          </div>

          <div><br></br></div>

        </div>
      </div>

  );
};

export default Chart;
