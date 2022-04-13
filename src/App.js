import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News'
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <News pageSize={6} country="in" category="general" />
     <BrowserRouter>
        <Switch>
            <Route path="/" component={<News pageSize={6} country="in" category="general" />} />
            <Route path="/business" component={<News pageSize={6} country="in" category="business" />} />
            <Route path="/entertainment" component={<News pageSize={6} country="in" category="entertainment" />} />
            <Route path="/general" component={<News pageSize={6} country="in" category="general" />} />
            <Route path="/health" component={<News pageSize={6} country="in" category="health" />} />
            <Route path="/science" component={<News pageSize={6} country="in" category="science" />} />
            <Route path="/sports" component={<News pageSize={6} country="in" category="sports" />} />
            <Route path="/technology" component={<News pageSize={6} country="in" category="technology" />} />
        </Switch>
    </BrowserRouter>
      </div>
    )
  }
}

export default App;

