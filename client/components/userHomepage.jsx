import React from "react";

export default class UserHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.toSwipePage = this.toSwipePage.bind(this)
    this.swipeToSearch = this.swipeToSearch.bind(this)
    this.getLocation = this.getLocation.bind(this)
  }

  toSwipePage(event) {
    this.props.setView('cardstack')
  }

  swipeToSearch(event) {
    this.props.setView('search')
  }

  getLocation(event) {
    this.props.setView('locationSettings')
  }

  render() {

  return(
      <div className = 'mx-auto vw-100 vh-100 d-flex flex-column align-items-center justify-content-center' >
      <div className='w-100 h-100 my-3'>
        <div className='h-100 mt-4 d-flex align-items-start justify-content-around'>
          <div className='d-flex align-items-center'></div>
          <div className='d-flex align-items-center'><i className='fas fa-user-alt fa-2x text-pink'></i></div>
          <div className='d-flex align-items-center' onClick={this.toSwipePage}><i className='fas fa-utensils fa-2x hover gray'></i></div>
        </div>
      </div>
      <div className="flex-row my-5 gray">
        <h1 className="title">FiNdEr_Tim</h1>
      </div>
      <div className='w-100 h-100 mb-3 d-flex align-items-center justify-content-center'>
        <div className="col-md d-flex flex-column align-items-center">
          <div>
            <button type='button' className='stack-button gray btn button-outline shadow m-4 align-items-center' onClick={this.getLocation}>
              <i className='fas fa-map-marker-alt fa-2x'></i>
            </button>
          </div>
          <div>
            <p className='d-flex flex-column m-2 gray font-weight-bold align-items-center'>LOCATION</p>
          </div>
        </div>
        <div className="col-md d-flex flex-column align-items-center">
          <div>
            <button type='button' className='stack-button round-btn gray btn button-outline shadow m-4 align-items-center' onClick={this.swipeToSearch}>
              <i className='fas fa-search fa-2x'></i>
            </button>
          </div>
          <div>
            <p className='d-flex flex-column m-2 gray font-weight-bold align-items-center'>SEARCH</p>
          </div>
        </div>
      </div>

      <div className='w-100 h-100 mb-3 d-flex align-items-center justify-content-center'>
        <button
          type='button'
          className='w-75 btn btn-outline-light button-outline shadow text-pink font-weight-bold'
          onClick={() => console.log('Logout')}>
          LOGOUT
        </button>
      </div>

      </div>
    )

  }

}
