import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Header from './Components/Header';
import GameStart from './Components/GameStart';
import Game from './Components/Game'


export default class App extends Component {


  render(){
    return(
      <BrowserRouter>
        <Header />
        <Switch>
          <Route component={GameStart} path='/' exact />
          <Route component={Game} path='/newGame' exact/>
        </Switch>
      </BrowserRouter>

    )
  }


}