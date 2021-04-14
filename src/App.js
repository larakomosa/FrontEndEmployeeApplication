import logo from './logo.svg';
import './App.css';

import {Header} from './Header'
import {Home} from './Home';
import {TodoItems} from './TodoItems'

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">

     <Header/>
     <Switch>
       <Route path= '/' component={Home} exact/>
       <Route path= '/TodoItems' component={TodoItems}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
