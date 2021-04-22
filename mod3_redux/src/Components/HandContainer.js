import React, { Component } from 'react';
import Card from "./Card";

export default class HandContainer extends Component {

handleHitClick = () => {
  console.log("ok!")
}
  render(){
    return(
      <div className="hand-div">
        {this.props.startingHand.map(card => <Card cardImage={card.image} cardAlt={card.code} onClick={this.handleHitClick} />
        )}
      </div>
    )
  }
}