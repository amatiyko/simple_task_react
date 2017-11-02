import React, {Component} from 'react';
import Title from './Title';

class Layout extends Component {
    render() {
        return (
            <div>
                <Title />
                <div>{this.props.children}</div>
            </div>
        );
    }
}

export default Layout;