import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>Edit</Link> | <a onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</a>
        </td>
    </tr>
)

export default class ExerciseList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};
    };

    componentDidMount() {
        axios.get('https://mern-exercise-tracker-lunari.herokuapp.com/exercises/').then(response => {
            this.setState({ exercises: response.data });
        }).catch((error) => {
            console.log(error);
        });
    }

    deleteExercise(id) {
        axios.delete('https://mern-exercise-tracker-lunari.herokuapp.com/exercises/'+id).then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        });
    }

    exerciseList() {
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />
        });
    }

    render() {
        return (
            <section>
                <blockquote>
                    <h4>Exercise List</h4>
                </blockquote>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration (Mins)</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </section>
        )
    };
}