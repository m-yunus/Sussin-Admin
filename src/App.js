import { BrowserRouter, Route, Router } from "react-router-dom";
import "./index.css"
import Sidebar from "./Layout/Sidebar/Sidebar";
import LoginPage from "./Components/LoginPage/LoginPage";
import RouteLayout from "./Components/LoginPage/Routes/RouteLayout";


function App() {
  return (
  <>
<RouteLayout/>
  </>
  );
}

export default App;
