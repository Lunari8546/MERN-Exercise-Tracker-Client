import React, { Component } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2';

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

        axios.post('https://mern-exercise-tracker-lunari.herokuapp.com/users/add/', user).then(() => {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 1800,
                timerProgressBar: true,
                padding: '20px'
            })

            Toast.fire({
                icon: 'success',
                title: 'User created!',
                customClass: 'swal'
            })
        }).catch((error) => {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 1800,
                timerProgressBar: true,
                padding: '20px'
            })

            Toast.fire({
                icon: 'error',
                title: error,
                customClass: 'swal'
            })
        });

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
                        <label>Username (At least 3 characters)</label>
                        <input required type="text" placeholder="Unnamed User" value={this.state.username} onChange={this.onChangedUsername} />
                        <input className="button-primary" type="submit" value="Confirm"></input>
                    </fieldset>
                </form>
            </section>
        )
    };
}