import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav>
                <h3 to="/" className="logo">Exercise Tracker</h3>
                <ul>
                    <li><Link className="button" to="/">Exercises</Link></li>
                    <li><Link className="button" to="/create">Create Exercise</Link></li>
                    <li><Link className="button" to="/user">Create User</Link></li>
                </ul>
            </nav>
        )
    };
}