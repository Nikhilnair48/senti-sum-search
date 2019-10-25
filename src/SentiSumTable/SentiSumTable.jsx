import React from 'react';
import { connect } from 'react-redux';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

    }
}

function mapState(state) {
    return { };
}

const actionCreators = {

}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);

export { connectedHomePage as HotelPage}