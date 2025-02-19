import AddWebsites from './pages/AddWebsites';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import MonitoringLogs from './pages/MonitoringLogs';
import Settings from './pages/Settings';
import Websites from './pages/Websites';
import Sidebar from './Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className='d-flex'>
      <div className='col-auto'>
        <Sidebar />
      </div>
      <div>
        <Routes>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/websites' element={<Websites />}></Route>
          <Route path='/add-websites' element={<AddWebsites />}></Route>
          <Route path='/monitoring-logs' element={<MonitoringLogs />}></Route>
          <Route path='/settings' element={<Settings />}></Route>
          <Route path='/logout' element={<Logout />}></Route>
        </Routes>
      </div>
    </div>
  </BrowserRouter>

  );
}

export default App;

