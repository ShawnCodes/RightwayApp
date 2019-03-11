import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import * as ROUTES from '../modules/routes';
import Auth from '../modules/Auth';

class Navigation extends Component {
  render() {
    return (
        <nav className="nav-wrapper grey">
        <div className="container">
            <Link to="/" className="brand-logo"><img src='https://res-5.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/kfymtf8lorugdgpd57pv' alt='logo' className='logo'/></Link>
            {(!Auth.isUserAuthenticated())
                ? <ul className="right">
                    <li><NavLink to={ROUTES.LOGIN}>Login</NavLink></li>
                    <li><NavLink to={ROUTES.REGISTER}>Register</NavLink></li>
                </ul>
                : <ul className="right">
                    <li><NavLink to={ROUTES.DASHBOARD}>Dashboard</NavLink></li>
                    <li><NavLink to={ROUTES.UPLOADS}>Uploads</NavLink></li>
                    <li><NavLink to={ROUTES.LANDING} onClick={this.props.handleLogout}>Logout</NavLink></li>
                </ul>
            }
        </div>
        </nav>
    );
  }
}

export default withRouter(Navigation)
