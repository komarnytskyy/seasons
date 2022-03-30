import React from 'react';
import { SeasonDisplay } from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component<any, any> {

  state = { lat: null, errorMessage: '' }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
        })
        console.log(position)
      },
      error => {
        this.setState({
          errorMessage: error.message
        })
        console.log(error)
      }
    )
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat}/>;
    }
    return <Spinner message='Please accept location request'/>
  }

  render() {
    return (
      <div className='border red'>
        {this.renderContent()}
      </div>
    )
  }
}

export default App;
