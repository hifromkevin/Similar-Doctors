import React, { Component } from 'react';
import axios from 'axios';

import SimilarDoctors from './SimilarDoctors.jsx';

export default class Doctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      simDocs: ['hi']
    }
  }


  learnMore(id, practice) {
    document.querySelector(`.bio_${id}`).classList.toggle('hide');
    document.querySelector(`.similar_${id}`).classList.toggle('hide');
    this.findSimilarDoctors(practice);
  }

  findSimilarDoctors(practiceArea) {
    axios.get(`/doctors/${practiceArea}`)
      .then(res => {
        this.setState({
          simDocs: res.data.slice(0,3)
        });
      })
      .catch(err => {
        console.log(`Failed to find ${practiceArea}`, err);
      });

  }

  render() {
    return(
      <div className="col-sm-4 doctor">
        <img src={this.props.doctor.picture} alt={this.props.doctor.name} className="doctor__image" />

        <p className="doctor__name">{this.props.doctor.name}</p>

        <button className="bio_button" onClick={() => {this.learnMore(this.props.doctor._id, this.props.doctor.areaOfPractice)}}>Learn More</button>

        <div className={`doctor__bio bio_${this.props.doctor._id} hide`}>
          <p className="doctor__areaOfPractice">{this.props.doctor.areaOfPractice} at</p>
          <p className="doctor__practiceName">{this.props.doctor.practiceName}</p>
          <p className="doctor__catchPhrase">{this.props.doctor.practiceCatchPhrase}</p>
          <div className="doctor__contact">
            <p className="doctor__address">{this.props.doctor.streetAddress}<br />
            {this.props.doctor.city}, {this.props.doctor.state}<br />
            {this.props.doctor.zipCode}</p>
            <p className="doctor__phone">{this.props.doctor.phoneNumber}</p>
          </div>
        </div>

        <p className="doctor__rating">Rating: <strong>{this.props.doctor.averageReview}/5</strong> out of <strong>{this.props.doctor.numberOfReviews}</strong> reviews</p>

        <div className={`similar similar_${this.props.doctor._id} hide`}>
          <p className="similar__title">Similar Doctors</p>
          <div className="container-fluid">
            <div className="row">
              { this.state.simDocs.map((doctor, index) => {
                return <SimilarDoctors doctor={doctor} key={index} />
                })
              }       
            </div>
          </div>
        </div>
      </div>
    )
  }
}