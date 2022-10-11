import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './PageContainer/Home/Home';
import CreateHackathon from './PageContainer/CreateHackathon/CreateHackathon.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HelmetProvider } from 'react-helmet-async';
import HackathonInfo from './PageContainer/HackathonInfo/HackathonInfo.tsx';
import EditHackathon from './PageContainer/EditHackathon/EditHackathon.tsx';
function App() {
  const helmetContext = {};
  return (
    <div className="App">
      <HelmetProvider context={helmetContext}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createHackathon" element={<CreateHackathon />} />
          <Route path="/HackathonInfo/:id" element={<HackathonInfo />} />
          <Route path="/EditHackathon/:id" element={<EditHackathon />} />
        </Routes>
      </HelmetProvider>
    </div>
  );
}

export default App;
