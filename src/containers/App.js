import React from 'react';
import { robots } from '../robots';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        };
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }

    onSearchChange(event) {
        this.setState({ searchfield: event.target.value });
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        });
        if (this.state.robots.length === 0) {
            return <h1>Loading...</h1>;
        } else { 
        return (
            <div className='tc'>
                <h1 id="titleOfPage">RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        ); 
    } 
} 
}

export default App;