import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import style from './Button.css';

export default class Header extends Component {

  static propTypes = {
    addTask: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      replace: '',
      match: '',
      interval: null
    };
  }

  handleSave = (key, text) => {
    console.log(key, text);
    this.setState({
      [key]: key === 'interval' ? parseInt(text, 10) : text
    })
  };

  handleSubmit = () => {
    this.props.addTask(this.state);
    setTimeout(() => {
      chrome.tabs.query({active: true}, function(tab) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, {code: code});
        window.close();
      })
    }, 300);
  }

  handleStop = () => {
    this.props.deleteTask();
    setTimeout(() => {
      chrome.tabs.query({active: true}, function(tab) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, {code: code});
        window.close();
      })
    }, 300);
  }

  render() {
    return (
      <header>
        <h1>Match And Replace</h1>
        <TodoTextInput
          newTodo
          onSave={(val) => this.handleSave('match', val)}
          placeholder="匹配文字(多个逗号分隔)"
        />
        <TodoTextInput
          newTodo
          onSave={(val) => this.handleSave('replace', val)}
          placeholder="替换文字(多个逗号分隔)"
        />
        <TodoTextInput
          newTodo
          onSave={(val) => this.handleSave('interval', val)}
          placeholder="替换间隔毫秒数(数字),最小300"
        />
        <div className={classnames([style.footer])}>
          <button
          className={classnames([style.button: true])}
          onClick={this.handleSubmit}>添加</button>
          <button
          className={classnames([style.stop: true])}
          onClick={this.handleStop}>清除</button>
        </div>
      </header>
    );
  }
}
