import React from 'react';
import { connect } from 'react-redux';
import { searchActions } from '../_actions';
import './CompleteListSection';

const PAGE_SIZE = 10;

class CompleteListSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sentences: [],
            currentPage : [],
            currentPageNumber : 0,
            totalPageCount : 0,
            fetching: false,
            disabled: []
        }
        this.convertCurrentPageToTableBody = this.convertCurrentPageToTableBody.bind(this);
    }

    componentWillMount() {
        this.setState({
            sentences: this.props.sentiSearch.results.sentences,
            currentPage: Object.keys(this.props.sentiSearch.results.sentences).splice(0,29),
            totalPageCount: Object.keys(this.props.sentiSearch.results.sentences).length / 30
        })
    }

    convertCurrentPageToTableBody() {
        return (
            <tbody>
                {
                    this.state.currentPage.map(sentence => {
                        return (
                            <tr key={this.props.sentiSearch.results.sentences[sentence]}>
                                <td><div className="sentence">{sentence}</div></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        )
    }

    render() {
        return (
            <div className="col-md-8 offset-2">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Sentence</th>
                        </tr>
                    </thead>
                    {this.convertCurrentPageToTableBody()}
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
const connectedCompleteListSection = connect(mapState, actionCreators)(CompleteListSection);

export { connectedCompleteListSection as CompleteListSection}