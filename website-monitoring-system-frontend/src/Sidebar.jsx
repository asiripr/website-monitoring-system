import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
    return (
        <div>
            <div className="d-flex justify-content-space-between bg-dark flex-column p-2 vh-100">
                <a href="#" className="d-flex align-items-center">
                    <i className='bi bi-bootstrap'></i>
                    <span className='fs-3'>Sidebar</span>
                </a>
                <hr className='text-secondary' />
                <ul className='nav nav-pills flex-column'>
                    <li className='nav-item'>
                        <Link to="/" className='nav-link'>
                            <i className='bi bi-speedometer'></i>
                            <span className='fs-5'>Dashboard</span>
                        </Link>
                        <Link to="/websites" className='nav-link'>
                            <i className='bi bi-speedometer'></i>
                            <span className='fs-5'>Website</span>
                        </Link>
                        <Link to="/add-websites" className='nav-link'>
                            <i className='bi bi-speedometer'></i>
                            <span className='fs-5'>Add Website</span>
                        </Link>
                        <Link to="/monitoring-logs" className='nav-link'>
                            <i className='bi bi-speedometer'></i>
                            <span className='fs-5'>Monitoring Logs</span>
                        </Link>
                        <Link to="/settings" className='nav-link'>
                            <i className='bi bi-speedometer'></i>
                            <span className='fs-5'>Settings</span>
                        </Link>
                        <Link to="/logout" className='nav-link'>
                            <i className='bi bi-speedometer'></i>
                            <span className='fs-5'>Logout</span>
                        </Link>
                    </li>
                </ul>
                <div>
                    <hr className='text-secondary' />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
