import React from 'react';
import { List, Dimmer, Loader } from 'semantic-ui-react';
import { User } from './User';

export class UsersList extends React.PureComponent {
  async componentDidMount() {
    await this.props.getUsers({ offset: 0, name: '' });
  }

  render() {
    return (
      <List
        verticalAlign="middle"
        divided
        selection
        relaxed
        style={{ minHeight: '510px' }}
      >
        <React.Fragment>
          {this.props.isLoading && (
            <Dimmer inverted active>
              <Loader size="large">Loading</Loader>
            </Dimmer>
          )}
          {Object.keys(this.props.users)
            .map(id => this.props.users[id])
            .map(user => (
              <User
                key={user.id}
                onDeleteButtonClick={this.props.deleteUser}
                onEditButtonClick={this.props.toggleUserToEdit}
                {...user}
              />
            ))}
        </React.Fragment>
      </List>
    );
  }
}
