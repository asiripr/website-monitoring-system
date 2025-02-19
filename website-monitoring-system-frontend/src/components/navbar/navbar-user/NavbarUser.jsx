import { NavLink } from 'react-router-dom';

const NavbarUser = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Websites', path: '/websites' },
    { name: 'Add Websites', path: '/add-websites' },
    { name: 'Monitoring Logs', path: '/monitoring-logs' },
    { name: 'Settings', path: '/settings' },
    { name: 'Logout', path: '/logout' },
  ];

  return (
    <nav>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarUser;