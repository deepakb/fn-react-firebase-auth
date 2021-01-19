import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { LayoutProvider } from '../contexts/LayoutContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <LayoutProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
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
