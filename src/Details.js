import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import './css/Details.css';

class Details extends Component {
    render() {
        console.log(this.props.item);
        return (
            <div className="details">
                <Link to="/">Back</Link>
                <h3>{this.props.item.trackValue}</h3>
                <Link to="steps">Add details</Link>
                <div>
                    {this.props.children}
                </div>
            </div>)
    }
}

export default connect(
    (state, props) => {
        console.log(state);
        return ({
            item: state.filter(item => item.id === props.params.id)[0]
        })
    }
)(Details);