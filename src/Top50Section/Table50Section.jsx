import React from 'react';
import { connect } from 'react-redux';
import { searchActions } from '../_actions';
import './Table50Section.css';

class Top50Section extends React.Component {
    constructor(props) {
        super(props);
        this.renderBody = this.renderBody.bind(this);
        this.top50Helper = this.top50Helper.bind(this);
    }

    top50Helper(a,b) {
        return b[1] - a[1];
    }

    renderBody() {
        // RE-CREATE THE INCOMING OBJECT AS AN ARRAY, searchOutput, FOR EASE OF USE
        let searchOutput = [];
        let objectData = this.props.data;
        for(var key in objectData) {
            searchOutput.push([key, objectData[key]]);
        }
        
        // USER ENTERED TEXT IN THE INPUT FIELD THAT FILTERS THE TABLE
        let filterTerm = this.props.filterTerm;

        // IF ALL IS FINE AND DANDY,
        if(searchOutput) {

            // FILTER searchOutput GIVEN THE USER INPUT, IF ANY
            if(this.props.filterTerm) {
                searchOutput = searchOutput.filter(item => item[0].toLowerCase().includes(filterTerm));
            }
            
            // SORT THE TOP FEATURES BY THE COUNT (INDEX 1 IN THE ARRAY NOW)
            searchOutput = searchOutput.sort(this.top50Helper);
            
            // RENDERRR
            return (
                searchOutput.map(topFeatures => {
                    return (
                        <tr key={topFeatures[0]}>
                            <td><div className="sentence">{topFeatures[0]}</div></td>
                            <td>{topFeatures[1]}</td>
                        </tr>
                    )
                })
            )
        }
    }

    render() {
        return (
            <div className="col-md-8 offset-2">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Sentence</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBody()}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapState(state) {
    const { sentiSearch } = state;
    return { sentiSearch };
}

const actionCreators = {
    search: searchActions.search
}

const connectedTop50Section = connect(mapState, actionCreators)(Top50Section);

export { connectedTop50Section as Top50Section }