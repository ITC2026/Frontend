import "./ClientCard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const InfoCircleFillIcon: React.FC = () => {
  return (
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2D1154" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
       <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
     </svg>
  );
 };
 const PencilFillIcon: React.FC = () => {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2D1154" className="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
</svg>
  );
 }; 
interface Props {
  clientName: string;
  imgURL?: string;
  clientDescription: string;
}

const ClientCard = (prop: Props) => {

  return (
    <div className = "client-tab">
      
      <div className="contenido">
      
        
      <div className="client-img">
        <img src={prop.imgURL} alt={prop.imgURL} />
      </div>
      <div className="textito">
      <div className="clientName">{prop.clientName}</div> 
      <div className="clientDesc">{prop.clientDescription}</div>
      
      
      </div>

      <div className="abajo">
      <button className="centro-1"><InfoCircleFillIcon/></button>
      <button className="centro-2"><PencilFillIcon/></button>
      </div>
      </div>
      
    </div>
  );
};

export default ClientCard;
