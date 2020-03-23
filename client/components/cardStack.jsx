import React from 'react';
import Details from './details';
import restaurantData from '../../database/restaurants.json';

export default class CardStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = { restaurants: null, index: 0, canRewind: false, showDetails: false };
    this.handleClick = this.handleClick.bind(this);
    this.toLikedRestaurant = this.toLikedRestaurant.bind(this);
    this.toCardStack = this.toCardStack.bind(this);
  }

  componentDidMount() {
    this.getRestaurants();
  }

  getRestaurants(lat, long, term) {
    fetch('/api/search/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        term: 'sushi',
        latitude: '33.650561',
        longitude: '-117.74425'
      })
    })
      .then(res => res.json())
      .then(data => Promise.all(data.map(restaurant => this.getRestaurantDetails(restaurant.yelpId))).then(values => this.setState({ restaurants: values })))
      .catch(err => console.error(err));
  }

  getRestaurantDetails(yelpId) {
    return fetch(`/api/view/${yelpId}`)
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.error(err));
  }

  likeRestaurant(yelpId, index) {
    fetch('/api/likedRestaurants/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ yelpId })
    })
      .then(res => res.json())
      .catch(err => console.error(err));

    const newArr = Array.from(this.state.restaurants);
    newArr.splice(index, 1);
    return this.setState({ restaurants: newArr, index: this.state.index % newArr.length, canRewind: false });
  }

  handleClick(e) {
    if (e.currentTarget.id === 'like' && this.state.restaurants.length) return this.likeRestaurant(this.state.restaurants[this.state.index].yelpId, this.state.index);
    if (e.currentTarget.id === 'pass') return this.setState({ index: (this.state.index + 1) % this.state.restaurants.length, canRewind: true });
    if (e.currentTarget.id === 'rewind' && this.state.canRewind) return this.setState({ index: (this.state.index + this.state.restaurants.length - 1) % this.state.restaurants.length, canRewind: false });
    if (e.currentTarget.id === 'details') return this.setState({ showDetails: true });
  }

  toLikedRestaurant (e) {
    this.props.getLikedRestaurants();
    this.props.setView('likedRestaurants');
  }

  toCardStack() {
    this.setState({ showDetails: false });
  }

  renderCard() {
    if (!this.state.restaurants) {
      return (
        <div className='w-75 mx-auto d-flex flex-column align-items-center justify-content-center card rounded shadow' style={{ height: '450px' }}>
          <h1 className='text-pink text-center font-weight-bold'>Rendering matches</h1>
          <div className="spinner-border text-pink mt-3" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      );
    }
    if (!this.state.restaurants.length) {
      return (
        <div className='w-75 mx-auto d-flex flex-column align-items-center justify-content-center card rounded shadow' style={{ height: '450px' }}>
          <h1 className='text-pink text-center font-weight-bold'>No matches found</h1>
        </div>
      );
    }

    const price = [];
    for (let i = 0; i < this.state.restaurants[this.state.index].price.length; i++) price.push(<i className='fas fa-dollar-sign fa-sm mr-1' key={'price' + i}></i>);

    const rating = [];
    for (let i = 0; i < Math.floor(this.state.restaurants[this.state.index].rating); i++) rating.push(<i className='fas fa-star fa-sm' key={'rating' + i}></i>);
    if (!Number.isInteger(this.state.restaurants[this.state.index].rating)) rating.push(<i className='fas fa-star-half fa-sm' key={'rating' + rating.length}></i>);

    if (this.state.showDetails) return <Details price={price} rating={rating} restaurant={this.state.restaurants[this.state.index]} toCardStack={this.toCardStack} />;

    return (
      <div className='w-75 mx-auto d-flex flex-column align-items-center justify-content-center card rounded shadow' style={{ height: '450px' }}>
        <div className='w-100 h-100 text-center text-pink d-flex align-items-center justify-content-center'>
          <div className='w-50'>{rating}</div> |
          <div className='w-50'>{price}</div>
        </div>
        <div className='w-100 h-100'>
          <img
            className='rounded'
            id='details'
            onClick={this.handleClick}
            src={this.state.restaurants[this.state.index].storeImageUrl}
            alt={this.state.restaurants[this.state.index].restaurantName}
            style={{ objectFit: 'cover', height: '250px', width: '100%' }} />
        </div>
        <div className='w-100 h-100 text-center text-pink font-weight-bold d-flex flex-column align-items-center justify-content-center'>
          <div>{this.state.restaurants[this.state.index].restaurantName}</div>
          <div>{this.state.restaurants[this.state.index].location.city}, {this.state.restaurants[this.state.index].location.state}</div>
          <div><i className="fas fa-map-marker-alt mr-2"></i>{(this.state.restaurants[this.state.index].distance * 0.000621371).toFixed(1)} mi</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className='mx-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>
        <div className='w-100 h-100 my-3'>
          <div className='h-100 mt-4 d-flex align-items-start justify-content-around'>
            <div className='d-flex align-items-center text-white'><i className='fas fa-heart fa-2x'></i></div>
            <div className='d-flex align-items-center text-pink'><i className='fas fa-utensils fa-2x'></i></div>
            <div className='d-flex align-items-center text-secondary' onClick={this.toLikedRestaurant}><i className='fas fa-heart fa-2x'></i></div>
          </div>
        </div>
        <div className='w-100 h-100 mb-3'>
          {this.renderCard()}
        </div>
        <div className='w-100 h-100 mb-3'>
          <div className='h-100 pb-4 d-flex align-items-end justify-content-around'>
            <button type='button' id='pass' className='stack-button pink btn button-outline shadow' onClick={this.handleClick}>
              <i className='fas fa-times fa-lg'></i>
            </button>
            <button type='button' id='rewind' className='stack-button yellow btn button-outline shadow' onClick={this.handleClick}>
              <i className='fas fa-undo fa-lg'></i>
            </button>
            <button type='button' id='like' className='stack-button green btn button-outline shadow' onClick={this.handleClick}>
              <i className='fas fa-heart fa-lg'></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
