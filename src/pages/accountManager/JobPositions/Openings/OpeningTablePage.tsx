import { OpeningTable } from "../../../../components/accountManager/job_positions/openings/OpeningsTable";
import { ReturnButton } from "../../../../components/ReturnButton/ReturnButton";
const OpeningTablePage = () => {
  return (
    <>
      <ReturnButton />

      <h1>Tabla de Vacantes</h1>
      <OpeningTable />
    </>
  );
};

export default OpeningTablePage;
