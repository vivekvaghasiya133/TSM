import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./scenes/Login/Login";
import Protect from "./scenes/Protected/Protect";
import Society from "./scenes/team/Society";
import AddStudents from "./scenes/contacts/AddStudents";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} /> */}
            <ToastContainer />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <Protect>
                  <Dashboard />
                </Protect>
              } />
              <Route path="/team" element={
                <Protect>
                  <Team />
                </Protect>
              } />
              <Route path="/society" element={
                <Protect>
                  <Society />
                </Protect>
              } />
              <Route path="/add-student" element={
                <Protect>
                  <AddStudents />
                </Protect>
              } />
              <Route path="/contacts" element={
                <Protect>
                  <Contacts />
                </Protect>
              } />
              <Route path="/invoices" element={
                <Protect>
                  <Invoices />
                </Protect>
              } />
              <Route path="/form" element={
                <Protect>
                  <Form />
                </Protect>
              } />
              <Route path="/bar" element={
                <Protect>
                  <Bar />
                </Protect>
              } />
              <Route path="/pie" element={
                <Protect>
                  <Pie />
                </Protect>
              } />
              <Route path="/line" element={
                <Protect>
                  <Line />
                </Protect>
              } />
              <Route path="/faq" element={
                <Protect>
                  <FAQ />
                </Protect>
              } />
              {/* <Route path="/calendar" element={
                <Protect>
                  <Calendar />
                </Protect>
              } /> */}
              <Route path="/geography" element={
                <Protect>
                  <Geography />
                </Protect>
              } />
            </Routes>
          {/* </main>
        </div> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
