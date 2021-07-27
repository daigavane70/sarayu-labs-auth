// import logo from './logo.svg';
import './App.css';
import Home from './views/home';
import Auth from './views/auth';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={`/home/:id`} component={Home}/>
        <Route path={`/`} component={Auth}/>
      </Switch>
    </div>
  );
}

export default App;
