import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'milligram';

import './components/styles/style.css';

import Navbar from './components/navbar.component';
import ExerciseList from './components/exercise-list.component';
import EditExercises from './components/edit-exercise.component';
import CreateExercises from './components/create-exercise.component';
import CreateUser from './components/create-user.component';
import Copyright from './components/copyright.component';

function App() {
    return (
        <Router>
            <Navbar />
            <br />
            <Route path="/" exact component={ExerciseList} />
            <Route path="/edit/:id" exact component={EditExercises} />
            <Route path="/create" exact component={CreateExercises} />
            <Route path="/user" exact component={CreateUser} />
            <Copyright />
        </Router>
    );
}

export default App;