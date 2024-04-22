import React, { useState, useEffect } from 'react';
import ClientCard from "../../../components/accountManager/clients/ClientCard";
import "./Clients.css";

const Clients = () => {
    const pageSize = 8; // Number of clients per page
    const [clients, setClients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // Simulating fetching client data from a database
        const fetchClients = async () => {
            // Fetch client data from your database API
            // For demonstration purposes, I'm simulating the data
            const dataFromDatabase = [
                { id: 1, name: "Google", imgURL: "https://i.postimg.cc/63bnfQj0/1.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 2, name: "Client 2", imgURL: "https://i.postimg.cc/Kzjgj2Gg/10.png", description: "Description 2" },
                { id: 3, name: "Google", imgURL: "https://i.postimg.cc/Bn5Fwp7t/2.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 4, name: "Client 2", imgURL: "https://i.postimg.cc/7Lxzvzj9/3.png", description: "Description 2" },
                { id: 5, name: "Google", imgURL: "https://i.postimg.cc/yYZc0sFm/4.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 6, name: "Google", imgURL: "https://i.postimg.cc/5tnCf0VV/5.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 7, name: "Google", imgURL: "https://i.postimg.cc/cHzt8bCk/6.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 8, name: "Google", imgURL: "https://i.postimg.cc/MpJRDNDh/7.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 9, name: "Google", imgURL: "https://i.postimg.cc/pr98Gt3t/8.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 10, name: "Client 2", imgURL: "https://i.postimg.cc/J7gjyGB7/9.png", description: "Description 2" },
                { id: 11, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 12, name: "Client 2", imgURL: "https://example.com/image2.png", description: "Description 2" },
                { id: 13, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 14, name: "Client 2", imgURL: "https://example.com/image2.png", description: "Description 2" },
                { id: 15, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 16, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 17, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 18, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 19, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 20, name: "Client 2", imgURL: "https://example.com/image2.png", description: "Description 2" },
                { id: 21, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 22, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 23, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 24, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 25, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 26, name: "Client 2", imgURL: "https://example.com/image2.png", description: "Description 2" }

                // Add more client objects as needed
            ];
            setClients(dataFromDatabase);
        };

        fetchClients();
    }, []);

    const totalPages = Math.ceil(clients.length / pageSize);

    const handlePageChange = (page) => {
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
    const columnSize = currentClients.length > 2 ? "col-md-3" : `col-md-${12 / Math.max(currentClients.length, 1)}`;

    return (
        <div className="container">
            <h1>Clientes</h1>
            <div className="row">
                {currentClients.map(client => (
                    <div className={columnSize} key={client.id}>
                        <ClientCard clientName={client.name} imgURL={client.imgURL} clientDescription={client.description} />
                    </div>
                ))}
            </div>
            <div className="pagination-container">
                {totalPages > 1 && (
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                            {currentPage > 1 && (
                                <li className="page-item">
                                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                        Anterior
                                    </button>
                                </li>
                            )}
                            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(pageNumber => (
                                <li className={`page-item ${currentPage === pageNumber ? 'active' : ''}`} key={pageNumber}>
                                    <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                                        {pageNumber}
                                    </button>
                                </li>
                            ))}
                            {currentPage < totalPages && (
                                <li className="page-item">
                                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                        Siguiente
                                    </button>
                                </li>
                            )}
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
};

export default Clients;