import React, { Component } from 'react';
import Auth from '../modules/Auth'

class Dashboard extends Component{
  constructor() {
    super();
    this.state = {
      myUploads: null,
      uploadsLoaded: false,
      email: ''
    }
  }

  componentWillMount() {
    if (!Auth.isUserAuthenticated()) {
      window.location = '/login';
    }
  }

  componentDidMount() {
    fetch('/profile', {
      method: 'GET',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
      }
    }).then(res => res.json())
      .then(res => {
        this.setState({
          myUploads: res.uploads,
          uploadsLoaded: true,
          email: ''
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return(
      <div className="container">
        {(this.state.uploadsLoaded)
          ? this.state.myUploads.map(upload => {
            return <h4 key={upload.id}>{upload.name}</h4>
          })
          : <p>Loading...</p>
        }
        <form className='form' onSubmit={(e) => this.props.handleRequestSubmit(e, this.state.email)}>
          <input name="email" type="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
          <input type="submit" value="Send link"/>
        </form>
      </div>
    )
  }
}
export default Dashboard;
