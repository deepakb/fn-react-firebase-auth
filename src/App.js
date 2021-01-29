import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LayoutProvider } from './contexts/LayoutContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import ForgotPassword from './components/pages/ForgotPassword';
import Dashboard from './components/pages/Dashboard';
import Employees from './components/pages/Employees';

export default function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <LayoutProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/employees" component={Employees} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />
              <Route path='/forgot-password' component={ForgotPassword} />
            </Switch>
          </LayoutProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}
