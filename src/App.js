import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './PageContainer/Home/Home';
import CreateHackathon from './PageContainer/CreateHackathon/CreateHackathon';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="createHackathon" element={<CreateHackathon />} />
      </Routes>
    </div>
  );
}

export default App;
