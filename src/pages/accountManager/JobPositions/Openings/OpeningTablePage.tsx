import { OpeningTable } from "../../../../components/accountManager/job_positions/openings/OpeningsTable";
import { ReturnButton } from "../../../../components/ReturnButton/ReturnButton";
import { Button } from "react-bootstrap";
import { useState } from "react";
import OpeningRegisterModal from "../../../../components/accountManager/opening/OpeningModal";
import { Outlet } from "react-router";

const OpeningTablePage = () => {
  const [showOpeningModal, setShowOpeningModal] = useState<boolean>(false);

  return (
    <>
      <ReturnButton />

      <h1>Tabla de Vacantes</h1>
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
