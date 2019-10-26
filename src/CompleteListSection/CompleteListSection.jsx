import React from 'react';
import { connect } from 'react-redux';
import { searchActions } from '../_actions';
import './CompleteListSection.css';

const PAGE_SIZE = 30;

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
        this.onClickFirst = this.onClickFirst.bind(this);
        this.onClickLast = this.onClickLast.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.renderPagination = this.renderPagination.bind(this);
        this.initState = this.initState.bind(this);
    }

    initState(props) {
        let sentenceList = Object.keys(props.sentiSearch.results.sentences);
        if(props.filterTerm) {
            sentenceList = sentenceList.filter(item => item.toLowerCase().includes(props.filterTerm));
        }
        this.setState({
            sentences: sentenceList,
            currentPage: sentenceList.slice(0,30),
            totalPageCount: Math.ceil(sentenceList.length / PAGE_SIZE) - 1,
            disabled: [],
            currentPageNumber: 0
        });
    }

    componentWillReceiveProps(newProps) {
        this.initState(newProps);
    }

    componentWillMount() {
        this.initState(this.props);
    }

    loadPage(props) {
        let start = props.pageNumber * PAGE_SIZE;
        return this.state.sentences.slice(start, start + PAGE_SIZE);
    }

    async onClickFirst() {
        let nextPage = this.loadPage({pageNumber: 0});
        this.setState({currentPageNumber: 0, disabled: [0,1], currentPage: nextPage });
    }

    async onClickLast() {
        let nextPage = this.loadPage({pageNumber: this.state.totalPageCount});
        this.setState({currentPageNumber: this.state.totalPageCount, disabled: [2,3], currentPage: nextPage});
    }

    async onClickNext() {
        if(this.state.currentPageNumber <= this.state.totalPageCount) {
            let current = this.state.currentPageNumber;
            let nextPage = this.loadPage({pageNumber: 1 + current});
            this.setState({currentPageNumber: ++this.state.currentPageNumber, 
                disabled: current + 1 == this.state.totalPageCount ? [2,3] : [],
                currentPage: nextPage});
        }
    }

    async onClickPrev() {
        if(this.state.currentPageNumber > 0) {
            let nextPage = this.loadPage({pageNumber: this.state.currentPageNumber-1});
            this.setState({currentPageNumber: --this.state.currentPageNumber, 
                disabled: this.state.currentPageNumber-1 == 0 ? [0,1] : [],
                currentPage: nextPage});
        }
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

    renderPagination() {
        if(this.state.totalPageCount > 0) {
            return (
                <section className="pagination">
                    <button onClick={this.onClickFirst} className="btn btn-warning" disabled={this.state.disabled.includes(0) ? true : false}>first</button>
                    <button onClick={this.onClickPrev} className="btn btn-primary" disabled={this.state.disabled.includes(1) ? true : false}>previous</button>
                    <button onClick={this.onClickNext} className="btn btn-primary" disabled={this.state.disabled.includes(2) ? true : false}>next</button>
                    <button onClick={this.onClickLast} className="btn btn-warning" disabled={this.state.disabled.includes(3) ? true : false}>last</button>
                </section>
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
                        </tr>
                    </thead>
                    {this.convertCurrentPageToTableBody()}
                </table>
                {this.renderPagination()}
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