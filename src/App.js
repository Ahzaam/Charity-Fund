import React from "react";
// import {Button} from '@material-ui/core'
import "./App.css";
// import { Form } from './pages/AddPeoples';
// import {Link} from "react-router-dom";
import Navbar from "./components/AdminNav";
import { QrHome } from "./pages/QrPage";
import { AddMember } from "./pages/AddPeoples";
import { Routes, Route } from "react-router-dom";
import List from "./components/MemberList";
import Container from "@material-ui/core/Container";
import Home from './components/home';
import EventList from './components/EventList';


// import './Routes';
function App() {
 
  return (
    <>
      <Container maxWidth="sm">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/list" element={<List/>} />
          <Route path="/scanqr/:event/:month" element={<QrHome />} />
          <Route path="/addnew" element={<AddMember />} />
          <Route path="/list/:event/:month" element={<EventList/>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
