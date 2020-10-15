import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import style from './App.css';

@connect(
  state => ({
    tasks: state.tasks
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    tasks: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { todos, actions } = this.props;

    return (
      <div className={style.normal}>
        <Header addTask={actions.addTask} deleteTask={actions.deleteTask}/>
      {
        /*
        <MainSection todos={todos} actions={actions} />
        */
      }
      </div>
    );
  }
}
