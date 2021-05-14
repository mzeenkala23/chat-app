import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import {Login} from './page/Auth/Login';
import {Register} from './page/Auth/Register';
import {Chat} from './page/Chat';
import { ProtectedRoute} from './components/Router/ProtectedRoute';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <ProtectedRoute exact path="/" component={Chat}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route render={() => <h1> 404 Page not found</h1>}/>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
