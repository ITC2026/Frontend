import { uploadFile } from "../../firebase/initialize";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const clientLogoPath = "clients/logo/";

const FirebaseStorage = () => {
 const [file, setFile] = useState<File>();
 const [path, setPath] = useState<string>();

const handleSubmit = async (e: React.FormEvent) => {
    if (file && path) {
      e.preventDefault();
      const result = await uploadFile(file, path);
      console.log(result);
    }
 };

 return (
    <form onSubmit={handleSubmit}>
      <h1>Test</h1>
      <input
        type="file"
        name="ClientLogo"
        id="ClientLogo"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFile(file);
            setPath(clientLogoPath + uuidv4());
          }
        }}
      />
      <button>Subir</button>
    </form>
 );
};

export default FirebaseStorage;