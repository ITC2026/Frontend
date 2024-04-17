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
                { id: 1, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 2, name: "Client 2", imgURL: "https://example.com/image2.png", description: "Description 2" },
                { id: 3, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 4, name: "Client 2", imgURL: "https://example.com/image2.png", description: "Description 2" },
                { id: 5, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 6, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 7, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 8, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 9, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 10, name: "Client 2", imgURL: "https://example.com/image2.png", description: "Description 2" },
                { id: 11, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 12, name: "Client 2", imgURL: "https://example.com/image2.png", description: "Description 2" },
                { id: 13, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 14, name: "Client 2", imgURL: "https://example.com/image2.png", description: "Description 2" },
                { id: 15, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 16, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 17, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 18, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 19, name: "Google", imgURL: "https://i.imgur.com/6pzmgPW.png", description: "Hola mucho gusto me llamo google, nos vemos" },
                { id: 20, name: "Client 2", imgURL: "https://example.com/image2.png", description: "Description 2" }

                // Add more client objects as needed
            ];
            setClients(dataFromDatabase);
        };

        fetchClients();
    }, []);

    // Calculate total number of pages
    const totalPages = Math.ceil(clients.length / pageSize);

    // Function to handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Filter clients for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentClients = clients.slice(startIndex, endIndex);

    // Calculate column size based on the number of clients
    const columnSize = currentClients.length > 2 ? "col-md-3" : `col-md-${12 / Math.max(currentClients.length, 1)}`;

    return (
        <div className="container">
            <h1>Lista de Clientes</h1>
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
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index + 1}>
                                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
};

export default Clients;
