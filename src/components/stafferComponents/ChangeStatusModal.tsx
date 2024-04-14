import React from 'react';
import './ChangeStatusModal.css';

interface ChangeStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChangeStatusModal: React.FC<ChangeStatusModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Cambiar estado</h2>
                <div className="select-container">
                    <div className="select-label">Estado:</div>
                    <select className="status-select">
                        <option value="">Selecciona un estado</option>
                        <option value="Aceptado">Aceptado</option>
                        <option value="Rechazado">Rechazado</option>
                        <option value="Agendando cita">Agendando cita</option>
                        <option value="Esperando feedback">Esperando feedback</option>
                        <option value="Recien postulado">Recien postulado</option>
                    </select>
                </div>
                <div className="button-container">
                    <button className="cancel-button" onClick={onClose}>Cancelar</button>
                    <button className="finalize-button">Finalizar</button>
                </div>
            </div>
        </div>
    );
};

export default ChangeStatusModal;
