import React, { Component } from 'react';
import Card from "./Card";

export default class HandContainer extends Component {

  componentDidMount(){
    console.log("MOUNTED")
  }


  render(){
    return(
      <div>
        {this.props.startingHand.forEach(card => {
          <img src={card.image} alt={card.code} />
        }
        )}
      </div>
    )
  }
}