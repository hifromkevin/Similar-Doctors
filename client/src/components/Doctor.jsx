import React, { Component } from 'react';

export default class Doctor extends Component {
  constructor(props) {
    super(props);
  }


  learnMore(id) {
    document.querySelector(`.bio_${id}`).classList.toggle('hide');
    document.querySelector(`.similar_${id}`).classList.toggle('hide');
  }

  render() {
    return(
      <div className="col-sm-4 doctor">
        <img src={this.props.doctor.picture} alt={this.props.doctor.name} className="doctor__image" />

        <p className="doctor__name">{this.props.doctor.name}</p>

        <button className="bio_button" onClick={() => {this.learnMore(this.props.doctor._id)}}>Learn More</button>

        <div className={`doctor__bio bio_${this.props.doctor._id} hide`}>
          <p className="doctor__areaOfPractice">{this.props.doctor.areaOfPractice} at</p>
          <p className="doctor__practiceName">{this.props.doctor.practiceName}</p>
          <p className="doctor__catchPhrase">{this.props.doctor.practiceCatchPhrase}</p>
          <p className="doctor__address">{this.props.doctor.streetAddress}<br />
          {this.props.doctor.city},{this.props.doctor.state} {this.props.doctor.zipCode}</p>
          <p className="doctor__phone">{this.props.doctor.phoneNumber}</p>
        </div>

        <p className="doctor__rating">Rating: <strong>{this.props.doctor.averageReview}/5</strong> out of <strong>{this.props.doctor.numberOfReviews}</strong> reviews</p>

        <div className={`doctor__similar similar_${this.props.doctor._id} hide`}>
        </div>
      </div>
    )
  }
}