import React from 'react';
import { connect } from 'react-redux';
import { searchActions } from '../_actions';
import { Top50Section } from '../Top50Section';
import { CompleteListSection } from '../CompleteListSection';

import './HomePage.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            top50Strings: [],
            allStrings: [],
            active: 0
        }
        this.searchSentiSum = this.searchSentiSum.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderTables = this.renderTables.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.menuClicked = this.menuClicked.bind(this);
    }

    async searchSentiSum() {
        if(this.state.searchInput) {
            await this.props.search({input: this.state.searchInput});
            if(this.props.sentiSearch.results && Object.keys(this.props.sentiSearch.results.sentences).length > 0) {
                this.setState({
                    top50Strings: Object.keys(this.props.sentiSearch.results.sentences).slice(0, 49),
                    allStrings: this.props.sentiSearch.results.sentences
                });
                this.menuClicked(0);
            } else {
                alert("Your input didn't retrieve any sentences. Please try again.");
            }
        } else {
            alert("Please enter a search input.");
        }
    }

    handleKeyPress(e) {
        if(e.key === "Enter") {
            this.searchSentiSum();
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    menuClicked(menuID) {
        if(menuID == 0) {
            return (
                <div className="top-fifty-section">
                    <Top50Section data={this.state.top50Strings} />
                </div>  
            );
        } else {
            return (
                <div className="all-strings-section">
                    <CompleteListSection data={this.state.top50Strings} />
                </div>
            );
        }
    }

    renderTables() {
        if(this.props.sentiSearch.results
            && this.state.top50Strings && this.state.top50Strings.length > 0
            && this.state.allStrings && Object.keys(this.state.allStrings).length > 0) {
            return (
                <div>
                    <div className="row menu-row">
                        <ul className="nav nav-pills">
                            <li><a href="#" className={this.state.active == 0 ? "nav-link active" : "nav-link"} onClick={() => this.setState({active: 0})}>Top 50</a></li>
                            <li><a href="#" className={this.state.active == 1 ? "nav-link active" : "nav-link"} onClick={() => this.setState({active: 1})}>All sentences</a></li>
                        </ul>
                    </div>
                    {this.menuClicked(this.state.active)}
                </div>
            )
        }
    }

    render() {
        return (
            <div className="row homepage-container">
                <div className="search-bar">
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" name="searchInput" placeholder="Enter your search term..." value={this.state.searchInput} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-primary" type="button" onClick={this.searchSentiSum}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                { this.renderTables() }
            </div>
        );
    }
}

function mapState(state) {
    const { sentiSearch } = state;
    return { sentiSearch };
}

const actionCreators = {
    search: searchActions.search
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);

export { connectedHomePage as HomePage}