import './App.css';
import Login from './Login';
import Home from './Home';
import Contact from './Contact';

import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useState } from 'react';

function App() {

  let currentUser = JSON.parse(localStorage.getItem('user'));
  const [isUserLogged, setIsUserLogged] = useState(currentUser);


  const logout = e => {
    e.preventDefault();
   
    axios.post('https://akademia108.pl/api/social-app/user/logout',
      {},
      {
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).jwt_token
        }
      }
    ).then(resp => {
   
      localStorage.removeItem('user');
      setIsUserLogged(null);

    })

  }

  return (
    <div className="App">
      <Router>

        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            {!isUserLogged && <li><Link to="/login">Login</Link></li>}
            {isUserLogged && <li><Link to="/" onClick={logout}>Logout</Link></li>}
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/login'>
            <Login loginUser={setIsUserLogged} logged={isUserLogged} />
          </Route>
          <Route path='/contact'>
            <Contact />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
