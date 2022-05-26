/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import 'antd/dist/antd.less';
import 'antd/dist/antd.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import Bisection from './components/RootofEquations/bisection';
import { Route, Routes} from 'react-router-dom';
import MainNavbar from './components/tools/navbar';
import Onepoint from './components/RootofEquations/onepoint';
import Falseposition from './components/RootofEquations/falseposition';
import Secant from './components/RootofEquations/secant';
import Newton from './components/RootofEquations/newton';
import Cramer from './components/Linear Equations/cramer';
function App() {
  return (
   
 
      <div>
          <MainNavbar /> 
         <Routes>
           
          <Route path='/bisection' element={<Bisection />} />
          <Route path='/onepoint' element={<Onepoint />} />
          <Route path='/falseposition' element={<Falseposition />} />
          <Route path='/secant' element={<Secant />} />
          <Route path='/newton' element={<Newton />} />
          <Route path='/cramer' element={<Cramer />} />
        </Routes> 
        <div className="container">
        <br></br>
        <h1>6204062620062 Pattarapol Pornsirirung</h1>
        </div>
      </div>
 
  );
}

export default App;
