import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  
  componentDidMount(){
    fetch("http://localhost:8080/new")
      .then(response => response.json())
      .then(result => console.log(result))
  }

  render(){
    return(
      <div className="App">
        <p>HELLO</p>
      </div>
  );
  }
}


