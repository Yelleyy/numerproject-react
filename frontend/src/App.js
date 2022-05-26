/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import Bisection from './components/RootofEquations/bisection';
import { Route, Switch,BrowserRouter as Router} from 'react-router-dom';
import MainNavbar from './components/tools/navbar';
import Onepoint from './components/RootofEquations/onepoint';
import Falseposition from './components/RootofEquations/falseposition';
import Secant from './components/RootofEquations/secant';
import Newton from './components/RootofEquations/newton';
import Cramer from './components/Linear Equations/cramer';
function App() {
  return (
   
          <Router>
  
          <MainNavbar/>
         <Switch>
          <Route path='/bisection' component={Bisection}/>
          <Route path='/onepoint' component={Onepoint}/>
          <Route path='/falseposition' component={Falseposition}/>
          <Route path='/secant' component={Secant}/>
          <Route path='/newton' component={Newton}/>
          <Route path='/cramer' component={Cramer}/>
        </Switch> 
        <div className="container">
        <br></br>
        <h1>6204062620062 Pattarapol Pornsirirung</h1>
        </div>
   
      </Router>
  );
}

export default App;
