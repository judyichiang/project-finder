import React from 'react';

export default class SetLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationKeyword: '',
      radius: 5
    };
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeDistance = this.handleChangeDistance.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChangeLocation(event) {
    this.setState({ locationKeyword: event.target.value });
  }

  handleChangeDistance(event) {
    this.setState({ radius: event.target.value });
  }

  handleClick(event) {
    if (event.currentTarget.id === 'cancel') return this.props.setView('userHomepage');
    if (event.currentTarget.id === 'submit') {
      this.props.setLocation(
        !this.props.location ? null : this.props.location.lat, 
        !this.props.location ? null : this.props.location.long, 
        this.state.locationKeyword, 
        this.state.radius)
      this.props.setView('userHomepage')
    };
    if (event.target.id === 'currentLocation') {
      navigator.geolocation.getCurrentPosition((position) => 
      this.props.setLocation(position.coords.latitude, position.coords.longitude, null, this.state.radius)
      );
      return this.props.setView('userHomepage');
    }
  }

  render() {
    const { distance } = this.state
    return (
      <div className='mx-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>
        <div className="my-2">
          <div className="justify-content-left">
            <h4 className="text-pink ml-3">Location (Zip Code)</h4>
          </div>
          <div className="wrapper d-flex mt-3">
            <i className="mag-glass2 fas fa-search fa-2x gray mt-2"></i>
            <input className="search text-secondary shadow w-130 px-1 py-2 justify-content-left" placeholder="Search"
              value={this.state.locationKeyword} onChange={this.handleChangeLocation}></input>
            <i id={'currentLocation'} className="fas fa-map-marker-alt fa-3x pink ml-3 mb-2" onClick={this.handleClick}></i>
          </div>
        </div>
        <div className="mt-5 pink">
          <h4>Distance Radius(mi.)</h4>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <label className="d-flex align-items-center">
            <input
              id="typeinp"
              type="range"
              min="0" max="24"
              value={this.state.radius}
              onChange={this.handleChangeDistance}
              step="1"
              className="mr-3" />
            <div className="miles pink">
              {this.state.radius}
            </div>
          </label>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <button type="text" form="userSignUp" className="w-125 mt-2 mx-3 btn submit font-weight-bold"
            id="cancel" onClick={this.handleClick}>CANCEL</button>
          <button type="text" form="userSignUp" className="w-125 mt-2 mx-3 btn submit font-weight-bold"
            id="submit" onClick={this.handleClick}>SUBMIT</button>
        </div>
      </div>
    )
  }
}