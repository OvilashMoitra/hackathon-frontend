import './App.css';
import React, { lazy, Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import PropagateLoader from "react-spinners/PropagateLoader";
const Home = lazy(() => import('./PageContainer/Home/Home'));
const CreateHackathon = lazy(() => import('./PageContainer/CreateHackathon/CreateHackathon.tsx'));
const EditHackathon = lazy(() => import('./PageContainer/EditHackathon/EditHackathon.tsx'));
const HackathonInfo = lazy(() => import('./PageContainer/HackathonInfo/HackathonInfo.tsx'));
function App() {
  const helmetContext = {};
  return (
    <div className="App">
      <Suspense fallback={<PropagateLoader />}>
        <HelmetProvider context={helmetContext}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/createHackathon" element={<CreateHackathon />} />
            <Route path="/HackathonInfo/:id" element={<HackathonInfo />} />
            <Route path="/EditHackathon/:id" element={<EditHackathon />} />
            <Route path="*" element={<Link to={'/'}>Home</Link>} />
          </Routes>
        </HelmetProvider>
      </Suspense>
    </div>
  );
}

export default App;
