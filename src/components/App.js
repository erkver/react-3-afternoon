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
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.filterPost = this.filterPost.bind( this );
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
    let str = this.str.value;
    axios.get(BASE_URL + '/posts', {str}).then(res => {
      console.log("res: ", res);
      this.setState({posts: res.data});
    }).catch(err => console.log(err))
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header 
          filterPostFn={this.filterPost}
          ref={str => this.str = str}
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
