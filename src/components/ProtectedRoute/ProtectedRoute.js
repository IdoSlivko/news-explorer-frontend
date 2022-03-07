import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ children, loggedIn, openLogin, ...props }) {
  
  useEffect(() => {
    if (!loggedIn && !localStorage.token) {
      openLogin();
    }
  }, [])

  return (
    <Route {...props}>
      { loggedIn ? children : <Redirect to='/' /> }
    </Route>
  );
}

export default ProtectedRoute;
