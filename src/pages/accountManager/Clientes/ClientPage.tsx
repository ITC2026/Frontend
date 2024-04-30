import { useState, useEffect } from "react";
import ClientCard from "../../../components/accountManager/clients/ClientCard";
import "./Clients.css";
import LargeModal from "../../../components/modal/LargeModal";
import ClientRegisterForm from "../../../components/accountModals/ClientRegisterForm";
import { getAllClients } from "../../../api/ClientAPI";
import { Outlet, useLocation } from "react-router-dom";
import ClientModifyForm from "../../../components/accountModals/ClientModifyForm.tsx";

const ClientPage = () => {
  const [registerVisible, setRegisterVisible] = useState<boolean>(false);
  const [modifyVisible, setModifyVisible] = useState<boolean>(false);
  const pageSize = 8; // Number of clients per page
  const [clients, setClients] = useState<Client[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    !registerVisible &&
      getAllClients().then((data: Client[] | undefined) =>
        setClients(data || [])
      );
    console.log(clients);
  }, [registerVisible, location]);

  const totalPages = Math.ceil(clients.length / pageSize);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentClients = clients.slice(startIndex, endIndex);

  // Calculate the range of page numbers to display
  const range = 3;
  let startPage = Math.max(1, currentPage - Math.floor(range / 2));
  let endPage = Math.min(totalPages, currentPage + Math.floor(range / 2));

  // Adjust the start and end pages if they are out of bounds
  if (endPage - startPage < range) {
    if (startPage === 1) {
      endPage = Math.min(range, totalPages);
    } else if (endPage === totalPages) {
      startPage = Math.max(totalPages - range + 1, 1);
    }
  }
  //adjust the grid so the cards dont overlap depending on the amount of cards
  const columnSize =
    currentClients.length > 2
      ? "col-md-3"
      : `col-md-${12 / Math.max(currentClients.length, 1)}`;

  return (
    <div>
      <Outlet />
      <h1>Clientes</h1>
      <div className="botoncito">
        <button
          className="agregar btn encora-purple-button"
          onClick={() => setRegisterVisible(true)}
        >
          Registrar Cliente
        </button>
        <div className="mostrar">
          {registerVisible && (
            //<RegistrarCliente setActiveModal={setRegisterVisible} />
            <LargeModal
              titleModal="Registrar Cliente"
              formContent={
                <ClientRegisterForm setActiveModal={setRegisterVisible} />
              }
            />
          )}
        </div>
      </div>

      <div className="container">
        <div className="row">
          {currentClients.map((client) => (
            <div className={columnSize} key={client.id}>
              <ClientCard
                clientName={client.client_name}
                imgURL={client.logo_url}
                clientDescription={client.client_desc}
                id={client.id}
              />
            </div>
          ))}
        </div>
        <div className="pagination-container">
          {totalPages > 1 && (
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                {currentPage > 1 && (
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Anterior
                    </button>
                  </li>
                )}
                {Array.from(
                  { length: endPage - startPage + 1 },
                  (_, i) => startPage + i
                ).map((pageNumber) => (
                  <li
                    className={`page-item ${
                      currentPage === pageNumber ? "active" : ""
                    }`}
                    key={pageNumber}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  </li>
                ))}
                {currentPage < totalPages && (
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Siguiente
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
