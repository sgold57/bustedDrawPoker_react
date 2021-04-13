import React, { Component } from 'react';
import Card from "./Card";

export default class HandContainer extends Component {

  componentDidMount(){
    console.log("MOUNTED")
  }


  render(){
    return(
      <div className="hand-div">
        {this.props.startingHand.map(card => <Card cardImage={card.image} cardAlt={card.code} />
        )}
      </div>
    )
  }
}