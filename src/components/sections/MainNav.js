import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function MainNav() {
  const history = useHistory();
  const { logout } = useAuth();

  const navigate = path => {
    history.push(path);
  };

  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" onClick={() => navigate('/')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <GroupAddIcon />
        </ListItemIcon>
        <ListItemText primary="Employees" onClick={() => navigate('/employees')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" onClick={() => navigate('/customers')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" onClick={() => navigate('/reports')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" onClick={logout} />
      </ListItem>
    </div>
  )
}
