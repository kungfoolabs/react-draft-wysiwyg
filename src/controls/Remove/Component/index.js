/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';

import Option from '../../../components/Option';

const RemoveComponent = ({ config, onChange, translations }) => {
  const { className, title } = config;
  return (
    <Button.Group>
      <Option
        className={classNames(className)}
        onClick={onChange}
        title={title || translations['components.controls.remove.remove']}
      >
        <Icon name='erase' />
      </Option>
    </Button.Group>
  );
};

RemoveComponent.propTypes = {
  onChange: PropTypes.func,
  config: PropTypes.object,
  translations: PropTypes.object,
};

export default RemoveComponent;
