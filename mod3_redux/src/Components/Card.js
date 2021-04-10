import React, { Component } from 'react';

export default class Card extends Component {

  componentDidMount(){
    console.log("MOUNTED! 222")
  }

  render(){
    return(
        <img src={this.props.cardImage} alt={this.props.cardCode} />
    )
  }
}


