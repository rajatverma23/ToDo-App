import React from 'react';
import Todos from './components/ToDos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
// import { v4 as uuidv4 } from 'uuid';
import About from './components/pages/About';
import axios from 'axios';

import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends React.Component 
{
  state = {
      todos :[]
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res => this.setState({todos: res.data}))
  }


  // toggle complete
  complete=(id)=>{
    this.setState({todos: this.state.todos.map(todo=>{
      if(todo.id === id)
      {
        todo.completed = !todo.completed;
      }
      return todo;
    })});
  }

  // for deleting todo items
  deltodo =(id) =>{
    axios.delete('https://jsonplaceholder.typicode.com/todos/${id}').then(res=> this.setState({todos : [...this.state.todos.filter(todo => todo.id !== id)]}));    
  }

  // add new todo items
  addTodo=(title)=>{
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed : false
    })
    .then(res => this.setState({todos : [...this.state.todos, res.data]}));
  }


  render()
  {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos} markCom={this.complete} deltodo ={this.deltodo}/>
              </React.Fragment>
            )} />

            <Route path='/about' component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
