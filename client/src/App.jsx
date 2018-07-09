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

  render() {
    if(this.state.rendered) {
      return (
        <div>
          <Menu />
          <div className="container">
            <div className="row">
              {this.state.doctors.map((doctor, index) => {
                return <Doctor 
                          doctor={doctor} 
                          similarDoctors={this.state.similarDoctors}
                          key={index}
                        />
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