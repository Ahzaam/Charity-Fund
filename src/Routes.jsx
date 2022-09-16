import ReactDOM from "react-dom/client";
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import { QrHome } from './pages/QrPage';
import { Form } from './pages/AddPeoples';


const root = ReactDOM.createRoot(
  document.getElementById("root")
);



root.render(
    <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<App />} /> */}
      <Route path="qroperations" element={<QrHome />} />
      <Route path="form" element={<Form />} />
    </Routes>
  </BrowserRouter>
);