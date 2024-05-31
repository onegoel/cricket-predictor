import "./App.css";
import { AppBar } from "@mui/material";
import GroupStage from "./components/GroupStage/GroupStage";
import "/node_modules/flag-icons/css/flag-icons.min.css";

function App() {
  const headerTitle = "ICC Men's T20 World Cup 2024 Predictor";
  return (
    <div className="app font-mono">
      <AppBar
        position="static"
        className="h-18 w-full flex flex-row p-3"
        color="error"
      >
        <div className="flex flex-row items-center justify-start">
          <img
            src="../public/wcLogo.jpg"
            alt="WC Logo"
            className="h-14 w-14 mr-3"
          />
          <div className="text-white text-3xl font-bold">{headerTitle}</div>
        </div>
      </AppBar>
      <GroupStage />
    </div>
  );
}

export default App;
