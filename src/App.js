import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {TodoItems} from './TodoItems'
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <h3 className= "m-3 d-flex justify-content-center">
        Weekly To Do List
     </h3>
     <Navigation/>
     <Switch>
       <Route path= '/' component={Home} exact/>
       <Route path= '/TodoItems' component={TodoItems}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
