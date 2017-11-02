import React, {Component} from 'react';
import {connect} from 'react-redux';

class Deleted extends Component {
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
                                    <div>
                                        <button onClick={() => this.props.onFullDeleteTrack(item.id)}>DELETE</button>
                                        <button onClick={() => this.props.onRestoreTrack(item.id)}>RESTORE</button>
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
            items: state.filter(item => item.status === 'deleted')
        })
    },
    dispatch => ({
        onFullDeleteTrack: trackId => dispatch({
            type: 'FULL_DELETE_TRACK',
            payload: {
                id: trackId
            }
        }),
        onRestoreTrack: trackId => dispatch({
            type: 'RESTORE_TRACK',
            payload: {
                id: trackId
            }
        })
    })
)(Deleted);