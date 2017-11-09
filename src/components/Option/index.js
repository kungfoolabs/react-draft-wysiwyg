/* @flow */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Popup} from 'semantic-ui-react';
import './styles.css';

export default class Option extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.any,
    value: PropTypes.string,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    title: PropTypes.string,
  };

  onClick: Function = () => {
    const { disabled, onClick, value } = this.props;
    if (!disabled) {
      onClick(value);
    }
  };

  render() {
    const { children, active, disabled, title } = this.props;

    const button = (
      <Button active={active} onClick={this.onClick} disabled={disabled} icon>
        {children}
      </Button>
    )

    if (!title) {
      return button;
    }

    return (
      <Popup
        trigger={button}
        content={title}
      />
    );
  }
}
