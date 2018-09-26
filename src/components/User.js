import React from 'react';
import { List, Button, Icon } from 'semantic-ui-react';

export class User extends React.PureComponent {
  state = { hover: false };

  hoverOn = () => {
    this.setState({ hover: true });
  };

  hoverOff = () => {
    this.setState({ hover: false });
  };

  onDeleteButtonClick = () => {
    this.props.onDeleteButtonClick({ id: this.props.id });
  };

  onEditButtonClick = () => {
    this.props.onEditButtonClick({ id: this.props.id });
  };

  render() {
    const { id, firstName, lastName, email, phone, about } = this.props;
    return (
      <List.Item onMouseOver={this.hoverOn} onMouseLeave={this.hoverOff}>
        <List.Content floated="right">
          <Button.Group
            basic
            size="small"
            style={{ visibility: this.state.hover ? 'visible' : 'hidden' }}
          >
            <Button icon onClick={this.onEditButtonClick}>
              <Icon name="edit outline" />
            </Button>
            <Button icon onClick={this.onDeleteButtonClick}>
              <Icon name="delete" />
            </Button>
          </Button.Group>
        </List.Content>
        <List.Icon name="user" style={{ paddingTop: '7px' }} />
        <List.Content style={{ paddingTop: '7px', textAlign: 'left' }}>
          <List.Header>{`${firstName} ${lastName}`}</List.Header>
        </List.Content>
      </List.Item>
    );
  }
}
