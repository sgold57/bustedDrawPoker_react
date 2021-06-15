import React, { Component } from 'react';

export default class Card extends Component {

  state = {
    clicked: false
  }

  render(){
    return(
      <img 
        src={this.props.cardImage} 
        alt={this.props.cardAlt} 
        onClick={() => {this.props.handleHitClick(this.props.cardInfo, this.props.card)}}
      />
    )
  }
}


