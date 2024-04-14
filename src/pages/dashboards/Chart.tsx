import React from 'react';
import ChartComponent from './ChartComponent';
import "./Dashboard.css";


const Chart: React.FC = () => {
  const chartType = 'pie';
  const chartType2 = 'bar';
  const chartType3 = 'bar';
  
  const labelcolor = '#ffffff';

  const chartBgColor = ['#275317', '#3B7D23', '#8ED973', '#92C089', '#BCD5B7'];
  const chartBgColor2 = ['#ffffff'];
  const chartBgColor3 = ['#ffffff'];

  const axiscolor = '#ffffff';

  const chartBdColor = '#ffffff';
  const chartBdColor2 = '#000000';
  const chartBdColor3 = '#000000';

  const chartBdWidths = 2;
  const chartBdWidths2 = 1;
  const chartBdWidths3 = 1;

  const chartData = [31, 65, 22, 7, 18];
  const chartData2 = [1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 12];
  const chartData3 = [1, 1, 3, 3, 1, 1, 2, 2, 2, 1, 3, 1, 5, 7];

  const chartLabels = ['Aceptado', 'Rechazado',	'Esperando Feedback', 'Agendado a Cita', 'Recién Postulado'];
  const chartLabels2 = ['Appian', 'Golang', 'iOS', 'JavaScript', 'Kotlin', 'PowerApps', 'UX', '.NET', 'Angular', 'Automation', 'Manual Tester', 'Python', 'React', 'Java'];

  return (
    <div className='row r1'>        
        <div className='col-md-4'>
          <div className='graph1'>
            <h2 className='graph1-title'>Simple Chart Example 1</h2>
            <ChartComponent type={chartType} data={chartData} labels={chartLabels} labelcolor = {labelcolor}  axiscolor = {axiscolor} bgcolor= {chartBgColor} bdcolor={chartBdColor} bdwidth={chartBdWidths} />
          </div>
          
          <div className='graph3'>
            <h2 className='graph1-title'>Simple Chart Example 3</h2>
            <ChartComponent type={chartType3} data={chartData3} labels={chartLabels2} labelcolor = {labelcolor} axiscolor = {axiscolor} bgcolor= {chartBgColor3} bdcolor={chartBdColor3} bdwidth={chartBdWidths3}  />
          </div>
    
        </div>

        <div className='col-md-5'>
          <div className='graph2'>
            <h2 className='graph1-title'>Simple Chart Example 2</h2>
            <ChartComponent type={chartType2} data={chartData2} labels={chartLabels2} labelcolor = {labelcolor} axiscolor = {axiscolor} bgcolor= {chartBgColor2} bdcolor={chartBdColor2} bdwidth={chartBdWidths2} />
          </div>
        </div>

    </div>
  );
};

export default Chart;
