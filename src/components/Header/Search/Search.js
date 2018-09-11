import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: "",
      filteredPosts: []
    }
    this.handleChange = this.handleChange.bind( this );
  }

  handleChange(e) {
    this.setState({searchInput: e.target.value});
  }

  getNewPosts() {
    this.props.filterPostFn(this.state.searchInput);
    this.setState({searchInput: ""})
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={e => this.handleChange(e)} />
          
          <SearchIcon id="Search__icon" onClick={this.getNewPosts} />
        </div>
        
      </section>
    )
  }
}