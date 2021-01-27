import React, { Component } from 'react';
import axios from 'axios';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateExercises extends Component {
    constructor(props) {
        super(props);

        this.onChangedUsername = this.onChangedUsername.bind(this);
        this.onChangedDescription = this.onChangedDescription.bind(this);
        this.onChangedDuration = this.onChangedDuration.bind(this);
        this.onChangedDate = this.onChangedDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    };

    componentDidMount() {
        axios.get('https://mern-exercise-tracker-lunari.herokuapp.com/users/').then(response => {
            if (response.data.length > 0) {
                this.setState({
                    users: response.data.map(user => user.username),
                    username: response.data[0].username
                });
            };
        });
    }

    onChangedUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangedDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangedDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangedDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        };

        console.log(exercise);

        axios.post('https://mern-exercise-tracker-lunari.herokuapp.com/exercises/add', exercise).then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <section>
                <blockquote>
                    <h4>Create Exercise</h4>
                </blockquote>
                <form onSubmit={this.onSubmit}>
                    <fieldset>
                        <label>Username</label>
                        <select required value={this.state.username} onChange={this.onChangedUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                        key={user} value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                        <label>Exercise Description</label>
                        <input required type="text" placeholder="Unnamed Exercise" value={this.state.description} onChange={this.onChangedDescription} />
                        <label>Exercise Duration (Mins)</label>
                        <input required type="text" value={this.state.duration} onChange={this.onChangedDuration} />
                        <label>Exercise Date</label>
                        <div>
                            <DatePicker selected={this.state.date} onChange={this.onChangedDate} />
                        </div>
                        <input className="button-primary" type="submit" value="Confirm"></input>
                    </fieldset>
                </form>
            </section>
        )
    };
}