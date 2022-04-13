import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch
} from "react-router-dom";
export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <News pageSize={6} country="in" category="general" />
        <Router>
        <Switch>

          <Route exact path="/" element={<News pageSize={6} country="in" category="general"/>}></Route>
          <Route exact path="/business" element={<News pageSize={6} country="in" category="business" />}></Route>
          <Route exact path="/entertainment" element={<News pageSize={6} country="in" category="entertainment" />}></Route>
          <Route exact path="/general" element={<News pageSize={6} country="in" category="general" />}></Route>
          <Route exact path="/health" element={<News pageSize={6} country="in" category="health" />}></Route>
          <Route exact path="/science" element={<News pageSize={6} country="in" category="science" />}></Route>
          <Route exact path="/sports" element={<News pageSize={6} country="in" category="sports" />}></Route>
          <Route exact path="/technology" element={<News pageSize={6} country="in" category="technology" />}></Route>
          </Switch>

        </Router>
      </div>
    )
  }
}
