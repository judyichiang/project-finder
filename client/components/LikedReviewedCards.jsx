import React from 'react'

export default class LikedReviewedCards extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            thumbsRate: this.props.restaurant.thumbsRate
        }
        this.deleteRestaurant = this.deleteRestaurant.bind(this);
        this.addReview = this.addReview.bind(this);
        this.thumbsDown = this.thumbsDown.bind(this);
        this.thumbsUp = this.thumbsUp.bind(this);
        this.rate = this.rate.bind(this);
    }

    deleteRestaurant(event) {
        this.props.deleteRestaurant(event.target.getAttribute('data-yelpid'), "likedRestaurants")
    }
  
    thumbsUp(event) {
        if(this.state.thumbsRate === false) {
            return this.setState({thumbsRate: true})
        }
        this.setState({
            thumbsRate: this.state.thumbsRate === null ? true : null
        })
    }

    thumbsDown(event) {
        if(this.state.thumbsRate === true) {
            return this.setState({thumbsRate: false})
        }
        this.setState({
            thumbsRate: this.state.thumbsRate === null ? false : null
        })
    }

    rate(event) {
        if(event.target.getAttribute('id') === 'thumbsUp') {
            this.thumbsUp()
        }
        if(event.target.getAttribute('id') === 'thumbsDown') {
            this.thumbsDown()
        }
        this.props.postReview(this.props.restaurant.yelpId, this.props.restaurant.note, this.state.thumbsRate, false)
    }

 
  addReview(event) {
    this.props.getReview(event.target.getAttribute('data-yelpid'), event.target.getAttribute('data-restaurantname'))
    this.props.setView('writeReview')
  }


  render() {
    const price = [];
    for (let i = 0; i < this.props.restaurant.price.length; i++) {
      price.push(<i className='fas fa-dollar-sign fa-sm' key={'price' + i}></i>);
    }

    const rating = [];
    for (let i = 0; i < Math.floor(this.props.restaurant.rating); i++) {
      rating.push(<i className='fas fa-star fa-xs' key={'rating' + i}></i>);
    }

    if (!Number.isInteger(this.props.restaurant.rating) && this.props.restaurant.rating) {
      rating.push(<i className='fas fa-star-half fa-xs' key={'rating' + rating.length}></i>);
    }
    console.log(this.props.restaurant)
    return (
      <div className='w-100 my-1 d-flex flex-wrap align-items-center justify-content-center card rounded cardShadow' style={{ height: '200px' }}>
        <div className='d-flex align-items-center text-secondary col-7 p-1'>
          <img className="restaurantPhoto" src={this.props.restaurant.storeImageUrl} data-yelpid={this.props.restaurant.yelpId} onClick={() => this.props.toDetails(this.props.restaurant)} />
        </div>

        <div className='flex-column align-items-center text-secondary container col-5 p-1'>
          <div className="col-12 p-1 h-25 text-dark pb-4">
            <h6>{this.props.restaurant.restaurantName}</h6>
          </div>
                    <div className={`d-flex flex-wrap ${this.props.viewState === "likedRestaurants" ? "mt-4" : "mt-2"} mb-4 text-pink`}>
                        <div className={`w-50 text-center ${this.props.viewState === "likedRestaurants" ? "col-7 p-0 pr-0" : "col-6"}`}>
                            {this.props.viewState === "likedRestaurants" 
                                ? rating 
                                : <i data-yelpid={this.props.restaurant.yelpId} onClick={this.rate} id="thumbsUp" className={`fa-2x ${this.state.thumbsRate === true ? "fas fa-thumbs-up" : "far fa-thumbs-up"}`}></i>}
                        </div> 
                        {this.props.viewState === "likedRestaurants" ? "|" : ""}
                        <div className={`w-50 ${this.props.viewState === "likedRestaurants" ? "col-3 pr-0 pl-1" : "col-6"}`}>
                            {this.props.viewState === "likedRestaurants" 
                                ? price 
                                : <i data-yelpid={this.props.restaurant.yelpId} onClick={this.rate} id="thumbsDown" className={`fa-2x ${this.state.thumbsRate === false ? "fas fa-thumbs-down" : "far fa-thumbs-down"}`}></i>}

                        </div>
                    </div>

                    <div id="edit_row" className='d-flex flex-wrap mt-4 pt-2 text-pink'>
                        {this.props.viewState === "likedRestaurants"
                            ? <><i onClick={this.addReview} data-yelpid={this.props.restaurant.yelpId} data-restaurantname={this.props.restaurant.restaurantName} className="fas fa-comment-dots fa-2x col-6"></i>
                                <i onClick={this.deleteRestaurant} data-yelpid={this.props.restaurant.yelpId} className="fas fa-trash-alt fa-2x col-6"></i></>
                            : <><i onClick={this.addReview} data-yelpid={this.props.restaurant.yelpId} data-restaurantid={this.props.restaurant.restaurantId} className="fas fa-edit fa-2x col-6"></i>
                                <i onClick={this.deleteRestaurant} data-yelpid={this.props.restaurant.yelpId} className="fas fa-trash-alt fa-2x col-6"></i></>
                        }
                    </div>
                </div>

          <div>
            {this.props.viewState === "likedRestaurants" ? "|" : ""}
            <div className={`w-50 ${this.props.viewState === "likedRestaurants" ? "col-3 pr-0 pl-1" : "col-6"}`}>
              {this.props.viewState === "likedRestaurants"
                ? price
                : <i className="far fa-thumbs-down fa-2x"></i>}
            </div>
          </div>

          <div className='d-flex flex-wrap mt-4 pt-2 text-pink'>
            {this.props.viewState === "likedRestaurants"
              ? <><i onClick={this.addReview} data-yelpid={this.props.restaurant.yelpId} data-restaurantname={this.props.restaurant.restaurantName} className="fas fa-comment-dots fa-2x col-6"></i>
                <i onClick={this.deleteRestaurant} data-yelpid={this.props.restaurant.yelpId} className="fas fa-trash-alt fa-2x col-6"></i></>
              : <><i data-restaurantid={this.props.restaurant.restaurantId} className="fas fa-edit fa-2x col-6"></i>
                <i data-restaurantid={this.props.restaurant.restaurantId} className="fas fa-trash-alt fa-2x col-6"></i></>
            }
          </div>
        </div>
    )
  }
}
