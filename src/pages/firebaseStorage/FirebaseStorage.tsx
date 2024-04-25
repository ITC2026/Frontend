import { uploadFile } from "../../firebase/initialize";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const clientLogoPath = "clients/logo/";
const clientContractPath = "client/contract";
const peopleProfilePath = "people/profile/";

const FirebaseStorage = () => {
 const [logoFile, setLogoFile] = useState<File>();
 const [logoPath, setLogoPath] = useState<string>();
 const [contractFile, setContractFile] = useState<File>();
 const [contractPath, setContractPath] = useState<string>();
 const [profileFile, setProfileFile] = useState<File>();
 const [profilePath, setProfilePath] = useState<string>();

const handleSubmitClient = async (e: React.FormEvent) => {
    if (logoFile && logoPath && contractFile && contractPath) {
      e.preventDefault();
      const urlLogo = await uploadFile(logoFile, logoPath);
      console.log(urlLogo);
      const urlContract = await uploadFile(contractFile, contractPath);
      console.log(urlContract);
    }
 };

 const handleSubmitPeople = async (e: React.FormEvent) => {
  if (profileFile && profilePath) {
    e.preventDefault();
    const urlProfile = await uploadFile(profileFile, profilePath);
    console.log(urlProfile);
  }
};


 return (
    <>
      <form onSubmit={handleSubmitClient}>
        <h1>Formato para subir en Clientes</h1>
        <label htmlFor="clientLogo">Logo</label>
        <input
          type="file"
          name="ClientLogo"
          id="ClientLogo"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setLogoFile(e.target.files[0]);
              setLogoPath(clientLogoPath + uuidv4());
            }
          }}
        />
        <label htmlFor="clientContract">Contract</label>
        <input
          type="file"
          name="ClientContract"
          id="ClientContract"
          accept=".pdf"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setContractFile(e.target.files[0]);
              setContractPath(clientContractPath + uuidv4());
            }
          }}
        />
        <button>Subir a la DB de Clientes</button>
      </form>
      <form onSubmit={handleSubmitPeople}>
        <h1>Formato para subir en Empleados</h1>
        <label htmlFor="EmployeeProfile">Profile Pic</label>
        <input
          type="file"
          name="EmployeeProfile"
          id="EmployeeProfile"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setProfileFile(e.target.files[0]);
              setProfilePath(peopleProfilePath + uuidv4());
            }
          }}
        />
        <button>Subir a la DB de Personas</button>
      </form>
    </>    
 );
};

export default FirebaseStorage;