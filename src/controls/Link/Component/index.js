/* @flow */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Button, Icon, Modal, Input, Header, Form, Checkbox} from 'semantic-ui-react';

import Option from '../../../components/Option';
import './styles.css';

class LayoutComponent extends Component {
  static propTypes = {
    onExpandEvent: PropTypes.func,
    config: PropTypes.object,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    showModal: false,
    linkTarget: '',
    linkTitle: '',
    linkTargetOption: this.props.config.defaultTargetOption,
  };

  removeLink: Function = (): void => {
    const {onChange} = this.props;
    onChange('unlink');
  };

  addLink: Function = (): void => {
    const {onChange} = this.props;
    const {linkTitle, linkTarget, linkTargetOption} = this.state;
    onChange('link', linkTitle, linkTarget, linkTargetOption);
  };

  updateValue: Function = (event: Object, data: Object): void => {
    console.log(event.target.name);
    console.log(data);
    console.log(data.value);
    this.setState({
      [`${event.target.name}`]: data.value,
    });
  };

  updateTarget: Function = (event: Object, data: Object): void => {
    this.setState({
      linkTargetOption: data.checked ? '_blank' : '_self',
    });
  };

  hideModal: Function = (): void => {
    this.setState({
      showModal: false,
    });
  };

  signalExpandShowModal = () => {
    const {onExpandEvent, currentState: {link, selectionText}} = this.props;
    const {linkTargetOption} = this.state;
    onExpandEvent();
    this.setState({
      showModal: true,
      linkTarget: link && link.target,
      linkTargetOption: (link && link.targetOption) || linkTargetOption,
      linkTitle: (link && link.title) || selectionText,
    });
  }

  forceExpandAndShowModal: Function = (): void => {
    const {doExpand, currentState: {link, selectionText}} = this.props;
    const {linkTargetOption} = this.state;
    doExpand();
    this.setState({
      showModal: true,
      linkTarget: link && link.target,
      linkTargetOption: (link && link.targetOption) || linkTargetOption,
      linkTitle: (link && link.title) || selectionText,
    });
  }

  renderAddLinkModal() {
    const {translations} = this.props;
    const {linkTitle, linkTarget, linkTargetOption} = this.state;
    return (
      <Modal size='tiny'
             open={this.state.showModal}
             onClose={this.hideModal}>
        <Header icon='linkify' content='Link'/>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>{translations['components.controls.link.linkTitle']}</label>
              <Input
                placeholder={translations['components.controls.link.linkTitle']}
                onChange={this.updateValue}
              />
            </Form.Field>
            <Form.Field>
              <label>{translations['components.controls.link.linkTarget']}</label>
              <Input

                placeholder={translations['components.controls.link.linkTarget']}
                onChange={this.updateValue}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                checked={linkTargetOption === '_blank'}
                onClick={this.updateTarget}
                label={translations['components.controls.link.linkTargetOption']}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button disabled={!linkTarget || !linkTitle} color='green' onClick={this.addLink}>
            <Icon name='checkmark'/> {translations['generic.add']}
          </Button>
          <Button onClick={this.hideModal}>
            <Icon name='remove'/> {translations['generic.cancel']}
          </Button>
        </Modal.Actions>
      </Modal>
      //
      // <div
      //     className={classNames('rdw-link-modal', popupClassName)}
      //     onClick={stopPropagation}
      //   >
      //     <span className="rdw-link-modal-label">
      //       {translations['components.controls.link.linkTitle']}
      //     </span>
      //     <input
      //       className="rdw-link-modal-input"
      //       onChange={this.updateValue}
      //       onBlur={this.updateValue}
      //       name="linkTitle"
      //       value={linkTitle}
      //     />
      //     <span className="rdw-link-modal-label">
      //       {translations['components.controls.link.linkTarget']}
      //     </span>
      //     <input
      //       className="rdw-link-modal-input"
      //       onChange={this.updateValue}
      //       onBlur={this.updateValue}
      //       name="linkTarget"
      //       value={linkTarget}
      //     />
      //     <span className="rdw-link-modal-target-option">
      //       <input
      //         type="checkbox"
      //         defaultChecked={linkTargetOption === '_blank'}
      //         value="_blank"
      //         onChange={this.updateTarget}
      //       />
      //       <span>{translations['components.controls.link.linkTargetOption']}</span>
      //     </span>
      //     <span className="rdw-link-modal-buttonsection">
      //       <button
      //         className="rdw-link-modal-btn"
      //         onClick={this.addLink}
      //         disabled={!linkTarget || !linkTitle}
      //       >
      //
      //       </button>
      //       <button
      //         className="rdw-link-modal-btn"
      //         onClick={doCollapse}
      //       >

      // </button>
      //     </span>
      //   </div>
    );
  }

  renderInFlatList(): Object {
    const {
      config: {options, link, unlink},
      currentState,
      translations,
    } = this.props;

    return (
      <div>
        <Button.Group>
          {options.indexOf('link') >= 0 && <Option
            value="unordered-list-item"
            className={classNames(link.className)}
            onClick={this.signalExpandShowModal}
            title={link.title || translations['components.controls.link.link']}
          >
            <Icon name='linkify'/>
          </Option>}

          {options.indexOf('unlink') >= 0 && <Option
            disabled={!currentState.link}
            value="ordered-list-item"
            className={classNames(unlink.className)}
            onClick={this.removeLink}
            title={unlink.title || translations['components.controls.link.unlink']}
          >
            <Icon name='unlinkify'/>
          </Option>}

        </Button.Group>
        {this.renderAddLinkModal()}
      </div>
    );
  }

  render(): Object {
    return this.renderInFlatList();
  }
}

export default LayoutComponent;
