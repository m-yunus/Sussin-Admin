import { BrowserRouter, Route, Router } from "react-router-dom";
import "./index.css"
import RouteLayout from "./Routes/RouteLayout";



export const BaseUrl="https://suss.onrender.com";
function App() {
  return (
  <>
<RouteLayout/>
  </>
  );
}

export default App;
