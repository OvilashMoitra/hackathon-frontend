import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './PageContainer/Home/Home.tsx';
import CreateHackathon from './PageContainer/CreateHackathon/CreateHackathon.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HelmetProvider } from 'react-helmet-async';
function App() {
  const helmetContext = {};
  return (
    <div className="App">
      <HelmetProvider context={helmetContext}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="createHackathon" element={<CreateHackathon />} />
        </Routes>
      </HelmetProvider>
    </div>
  );
}

export default App;
