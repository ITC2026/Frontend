import "./SettingsPage.css";

function SettingsPage() {
  return (
    <div>
      <h1>Configuración</h1>
      <h4>Seleccionar estilo de la plataforma:</h4>
      <select className="form-select" aria-label="Default select example">
        <option selected>Claro</option>
        <option value="1">Oscuro</option>
      </select>
      <h4>Ajusta el tamaño de letra:</h4>
      <label htmlFor="customRange2" className="form-label"></label>
      <input
        type="range"
        className="form-range"
        min="0"
        max="5"
        id="customRange2"
      ></input>

      <h4>Idioma:</h4>
      <select className="form-select" aria-label="Default select example">
        <option selected>Español</option>
        <option value="1">Ingles</option>
      </select>
    </div>
  );
}

export default SettingsPage;
