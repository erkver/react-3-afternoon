import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import Post from './Post/Post'

import Header from './Header/Header';
import Compose from './Compose/Compose';
const BASE_URL = 'https://practiceapi.devmountain.com/api';


class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      userInput: ""
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.filterPost = this.filterPost.bind( this );
    this.handleChange = this.handleChange.bind( this );
  }
  
  componentDidMount() {
    axios.get(BASE_URL + '/posts').then(res => {
      console.log("res: ", res)
      this.setState({posts: res.data});
    }).catch(err => console.log(err));
  }

  updatePost(id, text) {
    axios.put(`${BASE_URL}/posts?id=${ id }`, {text}).then(res => {
      console.log("res: ", res);
      this.setState({posts: res.data});
    }).catch(err => console.log(err));
  }

  deletePost(id) {
    axios.delete(`${BASE_URL}/posts?id=${ id }`).then(res => {
      console.log("res: ", res);
      this.setState({posts: res.data})
    }).catch(err => console.log(err))
  }

  createPost(text) {
    axios.post(BASE_URL + '/posts', {text}).then(res => {
      console.log("res: ", res);
      this.setState({posts: res.data})
    }).catch(err => console.log(err))
  }

  filterPost() {
    let str = encodeURI(this.state.userInput.slice());
    axios.get(`${BASE_URL}/posts?text=${ str }`).then(res => {
      console.log("res: ", res);
      this.setState({posts: res.data, userInput: ""});
    }).catch(err => console.log(err))
  }

  handleChange(e) {
    this.setState({userInput: e.target.value})
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header 
          filterPost={this.filterPost}
          input={this.state.userInput}
          handleChange={this.handleChange}
        />

        <section className="App__content">

          <Compose 
            createPostFn={this.createPost}
          />
          {posts.map(e => (
            <Post 
              key={e.id} 
              text={e.text}
              date={e.date}
              updatePostFn={this.updatePost}
              id={e.id}
              deletePostFn={this.deletePost}
            />
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
