import { OpeningTable } from "../../../../components/accountManager/job_positions/openings/OpeningsTable";
import { ReturnButton } from "../../../../components/ReturnButton/ReturnButton";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import OpeningRegisterModal from "../../../../components/accountManager/opening/OpeningModal";
import { Outlet } from "react-router";
import { getJobPositionName } from "../../../../utils/JobPositions/GetJobPositionName";
import { useParams } from "react-router";

const OpeningTablePage = () => {
  const [showOpeningModal, setShowOpeningModal] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const [jobTitle, setJobTitle] = useState<string>("");

  const int_id = Number(id);
  useEffect(() => {
    getJobPositionName(int_id).then((jobPositionName) => {
      if (!jobPositionName) {
        return;
      }
      setJobTitle(jobPositionName);
    });
  }, [id, int_id]);

  return (
    <>
      <ReturnButton />

      <h1>Tabla de Vacantes</h1>
      <h2>Nombre: {jobTitle}</h2>
      <OpeningTable
        registerState={showOpeningModal}
        registerBtn={
          <Button
            className="encora-purple-button"
            onClick={() => {
              setShowOpeningModal(true);
            }}
          >
            Registrar Openings{" "}
          </Button>
        }
      />
      {showOpeningModal && (
        <OpeningRegisterModal onClose={setShowOpeningModal} />
      )}
      <Outlet />
    </>
  );
};

export default OpeningTablePage;
