import React from 'react';
import ChartComponent from './ChartComponent';

import "./Dashboard.css";
import { getAllProjects } from  "../../api/ProjectAPI";

import { getAllClients } from  "../../api/ClientAPI";

import { getAllPersons } from '../../api/PersonAPI';

import { getAllEmployees } from '../../api/EmployeeAPI';

import { getAllPositions } from '../../api/PositionAPI';

import { getAllOpenings } from '../../api/OpeningAPI';


import { useState, useEffect } from 'react';



const ChartAccount: React.FC = () => {

    // State to store data from API calls

    const [, setProjects] = useState<Project[]>([])
    const [, setClients] = useState<Client[]>([])
    const [persons, setPersons] = useState<Person[]>([])
    const [positions, setPositions] = useState<Position[]>([])
    const [employees, setEmployees] = useState<Employee[]>([])
    const [openings, setOpenings] = useState<Opening[]>([])


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
    getAllPersons().then((data: unknown) => {
        setPersons(data as Person[]);
    });
    }, [setPersons]);


    useEffect(() => {
    getAllEmployees().then((data: unknown) => {
        setEmployees(data as Employee[]);
    });
    }, [setEmployees]);


    useEffect(() => {
    getAllOpenings().then((data: unknown) => {
        setOpenings(data as Opening[]);
    });
    }, [setOpenings]);

    useEffect(() => {
    getAllPositions().then((data: unknown) => {
        setPositions(data as Position[]);
    });
    }, [setPositions]);
    // Function to extract names into an array of strings

    const getNonRepeatPersonsStatus = (): string[] => {
    return Array.from(new Set(persons.map((person) => person.status)));
    }

    const getAllOpeningsFilled = (): Opening[] => {
    return openings.filter((opening) => opening.person_id !== null);
    }

    //Use FilledOpenings positionID to get positions bill rate and still count with amount of openings
    const getAllOpeningsFilledPosition = (): Position[] => {
    return getAllOpeningsFilled().map((opening) => positions.find((position) => position.id === opening.position_id) as Position);
    }

    console.log(getAllOpeningsFilledPosition())

    const getPositionsBillRate = (): number[] => {
    return getAllOpeningsFilledPosition().map((position) => position.bill_rate);
    }

    const getPositionsBillRateSum = (): number => {
    return getPositionsBillRate().reduce((acc, rate) => acc + rate, 0);
    }


    const getEmployeesBench = (): Employee[] => {
    return employees.filter((employee) => employee.employee_status !== 'On Hired');
    }

    const getEmployeesHired = (): Employee[] => {
    return employees.filter((employee) => employee.employee_status === 'On Hired');
    }

    const getTotalBenchSalary = (): number => {
        return getEmployeesBench().reduce((acc, person) => acc + person.salary, 0);
    }

    const getTotalHiredSalary = (): number => {
        return getEmployeesHired().reduce((acc, person) => acc + person.salary, 0);
    }






    const getNonRepeatEmployeeProposedAction = (): string[] => {
    return Array.from(new Set(employees.map((employee) => employee.proposed_action)));
    }

    const getSalaryBilling = (employee_id: number): number => {
    return employees.find((employee) => employee.id === employee_id)?.salary as number;
    }

    const getAllSalaryBilling = (): number[] => {
    return employees.map((employee) => getSalaryBilling(employee.id));
    }

    const getBillingSalaryLabels = (): string[] => {
        const salaryBilling = getAllSalaryBilling();
        const minSalary = Math.min(...salaryBilling);
        const maxSalary = Math.max(...salaryBilling);
        const step = 5000;
        const labels: string[] = [];
        for (let i = minSalary; i <= maxSalary; i += step) {
            labels.push(`${i}-${i + step}`);
        }
        return labels;
        }


    const determineColorIfPositive = (value: number): string => {
    return value >= 0 ? '#40C1EF' : '#FF564D';
    }

    // Functions to count 

    const countAmountPersonsStatus = (): number[] => {
    const nonRepeatingStatus = getNonRepeatPersonsStatus();
    return nonRepeatingStatus.map((status) => persons.filter((person) => person.status === status).length);
    }

    const countAmountEmployeesProposedAction = (): number[] => {
    const nonRepeatingProposedAction = getNonRepeatEmployeeProposedAction();
    return nonRepeatingProposedAction.map((action) => employees.filter((employee) => employee.proposed_action === action).length);
    }

    const countAmountEmployeesSalary = (): number[] => {
    const salaryBilling = getAllSalaryBilling();
    const minSalary = Math.min(...salaryBilling);
    const maxSalary = Math.max(...salaryBilling);
    const step = 5000;
    const labels: string[] = [];
    const counts: number[] = [];
    for (let i = minSalary; i <= maxSalary; i += step) {
        labels.push(`${i}-${i + step}`);
        counts.push(salaryBilling.filter((salary) => salary >= i && salary <= i + step).length);
    }
    return counts;
    }


    // Chart properties
    const chartType = 'bar';
    const chartType2 = 'pie';
    const chartType3 = 'doughnut';

    const legendposition = 'top';

    const labelcolor = '#ffffff';
    const labelcolor2 = '#000000';

    const legendDisplay = true;
    const legendDisplay2 = false;

    const chartBgColor = ['#40C1EF', '#FF564D','#FF564D', '#FF564D', determineColorIfPositive(getPositionsBillRateSum() - getTotalBenchSalary() - getTotalHiredSalary())];
    const chartBgColor2 = ['#ffffff'];  
    const chartBgColor3 = ['#fffee0', '#fffdc1', '#fffb82', '#fff941', '#fff600', '#ffeb00', '#ffdd00', '#ffcf00', '#ffbf00', '#ffae00', '#ff9b00', '#ff8700', '#ff7200', '#ff5b00', '#ff4300', '#ff2a00'];
    const chartBgColor4 = ['#92C089','#8ED973', '#3B7D23'];

    const axiscolor = '#ffffff';
    const axiscolor2 = '#000000';

    const chartBdColor = '#ffffff';
    const chartBdColor2 = '#000000';

    const chartBdWidths = 2;
    const chartBdWidths2 = 1;
    const chartBdWidths3 = 1;

    const indexAxis = 'y';

    // Data for charts

    const chartData = [getPositionsBillRateSum(), getTotalHiredSalary(), getTotalBenchSalary(),  getTotalBenchSalary() + getTotalHiredSalary(), getPositionsBillRateSum() - getTotalBenchSalary() - getTotalHiredSalary()];
    const chartData2 = countAmountPersonsStatus();
    const chartData3 = countAmountEmployeesSalary();
    const chartData4 = countAmountEmployeesProposedAction();


    const chartLabels = ["Billing Rate", "Salario Billing", "Salario Bench", "Salario Total", "Ingreso Final"];
    const chartLabels2 = getNonRepeatPersonsStatus();
    const chartLabels3 = getBillingSalaryLabels();
    const chartLabels4 = getNonRepeatEmployeeProposedAction();

    return (
    <div className='row r1'>
        <h1>Dashboards</h1>

        <div className='col-sm-6 c1'>

            <div className='graph1-account'>
            <h2 className='graph1-staffer-title'>Distribución de ingresos y gastos</h2>
            <ChartComponent type={chartType} data={chartData} labels={chartLabels} legendDisplay={legendDisplay2} legendposition={legendposition} labelcolor={labelcolor} axiscolor={axiscolor} bgcolor={chartBgColor} bdcolor={chartBdColor} bdwidth={chartBdWidths}  indexAxis={indexAxis}  />
            </div>

            <div><br></br></div>

            <div className='graph4-staffer'>
            <h2 className='graph1-staffer-title'>Distribución de Acción Propuesta para Empleados</h2>
            <ChartComponent type={chartType3} data={chartData4} labels={chartLabels4} legendDisplay={legendDisplay} legendposition={legendposition} labelcolor={labelcolor2} axiscolor={axiscolor} bgcolor={chartBgColor3} bdcolor={chartBdColor2} bdwidth={chartBdWidths2} />
            </div>
            
        </div>

        <div className='col-sm-6'>

            <div className='graph2-resource'>
            <h2 className='graph1-staffer-title'>Distribución de Personas</h2>
            <ChartComponent type={chartType2} data={chartData2} labels={chartLabels2}  legendDisplay={legendDisplay} legendposition={legendposition} labelcolor={labelcolor} axiscolor={axiscolor} bgcolor={chartBgColor4} bdcolor={chartBdColor} bdwidth={chartBdWidths2}/>
            </div>

            <div><br></br></div>

            <div className='graph3-staffer'>
            <h2 className='graph3-staffer-title'>Salarios en Billing</h2>
            <ChartComponent type={chartType} data={chartData3} labels={chartLabels3}  legendDisplay={legendDisplay2} legendposition={legendposition} labelcolor={labelcolor2} axiscolor={axiscolor2} bgcolor={chartBgColor2} bdcolor={chartBdColor2} bdwidth={chartBdWidths3} />
            </div>

        </div>
        </div>

    );
};

export default ChartAccount;
