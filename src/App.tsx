import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Placeholder Content</h2>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => navigate("/account_manager/")}
      >
        Account Manager
      </button>

      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => navigate("/settings")}
      >
        Settings
      </button>
    </div>
  );
}

export default App;
