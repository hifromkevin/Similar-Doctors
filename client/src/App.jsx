import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Menu from './components/Menu.jsx';
import Doctor from './components/Doctor.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rendered: false,
      doctors: []
    }

    this.findSimilarDoctorsByAreaOfPractice = this.findSimilarDoctorsByAreaOfPractice.bind(this);
  }

  componentWillMount() {
    this.fetchDoctors();
  }

  fetchDoctors() {
    axios.get('/doctors')
      .then(res => {
        this.setState({
          rendered: true,
          doctors: res.data
        });
      })
      .catch(err => {
        console.log('That ain\'t right...', err);
      });
  }


  findSimilarDoctorsByAreaOfPractice(practiceArea) {
    axios.get(`/doctors/${practiceArea}`)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .catch(err => {
        console.log(`Failed to find ${practiceArea}`, err);
      });

  }

  render() {
    if(this.state.rendered) {
      return (
        <div>
        {this.findSimilarDoctorsByAreaOfPractice('Primary Care')}
          <Menu />
          <div className="container">
            <div className="row">
              {this.state.doctors.map((doctor, index) => {
                return <Doctor doctor={doctor} findSimilarDoctorsByAreaOfPractice={this.findSimilarDoctorsByAreaOfPractice} key={index} />
              })
              }
            </div>
          </div>
        </div>
      )
    }
    return ( 
      <div>
        <Menu />
        <img src="img/loading.gif" alt="Loading" className="loading__image" />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


/*

NEXT STEPS:

 - Practice sorting
 - Create a "Similar Doctors" section
 - Searching
 - Create a load bar when doctors are being loaded (see below)

*/



/*

  render() {
    if (this.state.renderBool) {
      return (
        <div id="overview-wrapper">
          <div id="overview-restaurant-title">{this.state.restaurantTitle}</div>
          <div id="overview-restaurant-tagline">{this.state.restaurantTagline}</div>
          <BasicDetails
            type={this.state.restaurantType}
            vicinity={this.state.restaurantVicinity}
            priceLevel={this.state.restaurantPriceLevel}
          />
          <DividerLine />
          <div className="overview-wegot-review-title">THE WEGOT REVIEW</div>
          <WeGotReview
            food={this.state.weGotFoodRating}
            decor={this.state.weGotDecorRating}
            service={this.state.weGotServiceRating}
          />
          <LongDescription
            description={this.state.restaurantDescription}
          />
        </div>
      );
    }
    return <div>
    <img src="./test.gif" /><br />
    Loading Restaurant Info...
    </div>;
  }

*/