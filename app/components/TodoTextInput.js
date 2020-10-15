import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import style from './TodoTextInput.css';

export default class TodoTextInput extends Component {

  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    };
  }

  handleChange = (evt) => {
    const text = evt.target.value;
    this.setState({ text: text });
    this.props.onSave(text);
  };

  handleBlur = (evt) => {
    if (!this.props.newTodo) {
      this.props.onSave(evt.target.value);
    }
  };

  render() {
    return (
      <input
        className={classnames({
          [style.edit]: this.props.editing,
          [style.new]: this.props.newTodo
        })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
      />
    );
  }
}
