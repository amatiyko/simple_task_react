import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Finished extends Component {
    render() {
        if (this.props.items.length === 0) {
            return <div></div>
        }
        return (
            <div>
                <div className="task-list">
                    <ul>
                        {
                            this.props.items.map( (item) => (
                                <li key={item.id}>
                                    <div>{item.trackValue}</div>
                                    <div><span>Task created: </span>{item.createdOn}</div>
                                    <div><span>Task deadline: </span>{item.finishOn}</div>
                                    <div>
                                        {/*<button onClick={() => this.props.onDoneTrack(item.id)}>DONE</button>*/}
                                        <button><Link to={`/details/${item.id}`}>DETAILS</Link></button>
                                        <button onClick={() => this.props.onDeleteTrack(item.id)}>DELETE</button>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        return ({
            items: state.filter(item => item.status === 'finished')
        })
    },
    dispatch => ({
        onDoneTrack: trackId => dispatch({
            type: 'DONE_TRACK',
            payload: {
                id: trackId
            }
        }),
        onDeleteTrack: trackId => dispatch({
            type: 'DELETE_TRACK',
            payload: {
                id: trackId
            }
        })
    })
)(Finished);