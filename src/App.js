import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = (props) =>{
  const pageSize=6;
  const apiKey = "645adba78f4049b1b97c870d7cce3d14";
  const [progress, setProgress] = useState(0);


    return (
      <div>
        <Router>
          <NavBar/>
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}
          />
        <Switch>
        <Route exact path="/"><News setProgress={setProgress}  apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/></Route> 
        <Route exact path="/business"><News setProgress={setProgress}  apiKey={apiKey} key="business" pageSize={pageSize} country="us" category="business" /></Route> 
        <Route exact path="/entertainment"><News setProgress={setProgress}  apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment" /> </Route>
        <Route exact path="/general"><News setProgress={setProgress}  apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general" /></Route>
        <Route exact path="/health"><News setProgress={setProgress}  apiKey={apiKey} key="health" pageSize={pageSize} country="us" category="health" /></Route>
        <Route exact path="/science"><News setProgress={setProgress}   apiKey={apiKey} key="science"pageSize={pageSize} country="us" category="science" /></Route>
        <Route exact path="/sports"><News setProgress={setProgress}  apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category="sports" /></Route>
        <Route exact path="/technology"><News setProgress={setProgress}  apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category="technology" /></Route>
          </Switch>
        </Router> 
      </div>
    )
}

export default App;
