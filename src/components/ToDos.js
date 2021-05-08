import React, { Component } from 'react'
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todos extends Component {
  markCom=()=>{
    console.log("Hello")
  }
  render()
  {
      return this.props.todos.map((todo) => 
      (
        <div>
          <TodoItem key={todo.id} todo={todo} markComplete={this.props.markCom} deltodo={this.props.deltodo}/>
        </div>
      ));
  }
}

Todos.propTypes = 
{
  todos : PropTypes.array.isRequired,
  markCom : PropTypes.func.isRequired,
  deltodo : PropTypes.func.isRequired,
}
export default Todos;
