import React  from 'react';
import { connect } from 'react-redux';
import './css/Main.css';

import Progress from './Progress';
import Finished from './Finished';
import Deleted from './Deleted';

class Main extends React.Component {
    state = { change: true}


    addTrack () {
        this.props.onAddTrack(this.trackInput.value, this.dateInput.value);
        this.trackInput.value = '';
        this.setState({change: true});
    }

    clear () {
        this.trackInput.value = '';
        this.setState({change: true});
    }

    render() {
        return(
            <div>
                <div className="add-task">
                    <form>
                        <input
                            type="text"
                            placeholder="What do you need to do?"
                            ref = {(input) => {this.trackInput=input}}
                            onChange={event =>
                                event.target.value !== '' ? this.setState({change: false}) : this.setState({change: true})}
                            className="add-item-input" />
                        <input type="date" ref={(input) => {this.dateInput = input}}/>
                    </form>
					<button onClick={this.addTrack.bind(this)}>Save Item</button>
                    <button disabled={this.state.change} onClick={this.clear.bind(this)}>Clear</button>
                </div>
                <div className="container">
                    <div className="list-container progress-list">
                        <div className="list-title">In Progress</div>
                        <Progress />
                    </div>
                    <div className="list-container finished-list">
                        <div className="list-title">Finished</div>
                        <Finished />
                    </div>
                    <div className="list-container deleted-list">
                        <div className="list-title">Deleted</div>
                        <Deleted />
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(
    state => ({
        data: state
    }),
    dispatch => ({
        onAddTrack: (trackValue, finishDate) => dispatch({
            type: 'ADD_TRACK',
            payload: {
                id: '',
                trackValue: trackValue,
                createdOn: new Date().valueOf(),
                finishOn: finishDate,
                status: 'progress'
            }
        }),
    })
)(Main);