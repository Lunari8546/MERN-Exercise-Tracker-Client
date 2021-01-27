import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangedUsername = this.onChangedUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        }
    };

    onChangedUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username
        };

        console.log(user);

        axios.post('http://localhost:5000/users/add', user).then(res => console.log(res.data));

        this.setState({
            username: ''
        });
    }

    render() {
        return (
            <section>
                <blockquote>
                    <h4>Create User</h4>
                </blockquote>
                <form onSubmit={this.onSubmit}>
                    <fieldset>
                        <label>Username</label>
                        <input required type="text" placeholder="Unnamed User" value={this.state.username} onChange={this.onChangedUsername} />
                        <input className="button-primary" type="submit" value="Confirm"></input>
                    </fieldset>
                </form>
            </section>
        )
    };
}