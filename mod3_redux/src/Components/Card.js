import React, { Component } from 'react';

export default class Card extends Component {

  state = {
    clicked: false,
    clickedTransform: 15
  }

  render(){
    return(
      <img 
        className="card-img"
        src={this.props.cardImage} 
        alt={this.props.cardAlt} 
        onClick={() => {
          this.props.handleHitClick(this.props.cardCode, this.props.card)
          this.setState({
            clicked: !this.state.clicked,
          })
        }}
        style= { this.state.clicked ? { transform: `translateY(-${this.state.clickedTransform}px` } : { transform: `translateY(${this.state.clickedTransform}px` }}
      />
    )
  }
}


