/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';

import { stopPropagation } from '../../../utils/common';
import Option from '../../../components/Option';
import './styles.css';

class LayoutComponent extends Component {
  static propTypes: Object = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  onChange: Function = (event: Object): void => {
    const { onChange } = this.props;
    onChange(event.target.innerHTML);
  };

  renderEmojiModal(): Object {
    const { config: { popupClassName, emojis } } = this.props;
    return (
      <div
        className={classNames('rdw-emoji-modal', popupClassName)}
        onClick={stopPropagation}
      >
        {
          emojis.map((emoji, index) => (<span
            key={index}
            className="rdw-emoji-icon"
            alt=""
            onClick={this.onChange}
          >{emoji}</span>))
        }
      </div>
    );
  }

  render(): Object {
    const {
      config: { icon, className, title },
      expanded,
      onExpandEvent,
      translations,
    } = this.props;
    return (
      <Button.Group>
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
          title={title || translations['components.controls.emoji.emoji']}
        >
          <Icon name="smile" />
        </Option>
        {expanded ? this.renderEmojiModal() : undefined}
      </Button.Group>
    );
  }
}

export default LayoutComponent;
