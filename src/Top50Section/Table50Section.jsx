import React from 'react';
import { connect } from 'react-redux';
import { searchActions } from '../_actions';
import './Table50Section.css';

class Top50Section extends React.Component {
    constructor(props) {
        super(props);
        this.renderBody = this.renderBody.bind(this);
    }

    renderBody() {
        let searchOutput = this.props.data;
        let searchText = this.props.sentiSearch.input;        
        if(searchOutput) {
            return (
                searchOutput.map(sentence => {
                    return (
                        <tr key={sentence}>
                            <td><div className="sentence">{sentence}</div></td>
                            <td>{sentence.match(new RegExp(searchText, "gi") || []).length}</td>
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