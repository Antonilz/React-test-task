import React from 'react';
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser
} from '../services/apiMethods';
import { APIContext } from '../services/apiContext';

export class UsersContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      pagination: {
        offset: 0,
        totalCount: 0
      },
      listIsFetching: false,
      idToEdit: null,
      searchQuery: '',
      getUsers: this.getUsers,
      createUser: this.createUser,
      deleteUser: this.deleteUser,
      updateUser: this.updateUser,
      toggleUserToEdit: this.toggleUserToEdit
    };
  }

  getUsers = async ({ offset, name }) => {
    this.setState(state => {
      return { ...state, listIsFetching: true };
    });

    const { users, totalCount } = await getUsers({ offset, name });

    this.setState(state => {
      return {
        ...state,
        users: users.reduce((obj, user) => {
          obj[user.id] = user;
          return obj;
        }, {}),
        pagination: {
          offset,
          totalCount
        },
        searchQuery: name,
        listIsFetching: false
      };
    });
  };

  createUser = async ({ user }) => {
    const result = await createUser(user);
    if (result.error) {
      return result;
    } else {
      await this.getUsers({
        offset: this.state.offset,
        name: this.state.searchQuery
      });
    }
  };

  deleteUser = async ({ id }) => {
    const result = await deleteUser({ id });
    if (result.error) {
      return result;
    } else {
      await this.getUsers({ offset: this.state.offset });
    }
  };

  updateUser = async ({ user }) => {
    const result = await updateUser(user);
    if (result && result.error) {
      return result;
    } else {
      this.setState(state => {
        return {
          ...state,
          idToEdit: null
        };
      });
      await this.getUsers({ offset: this.state.offset });
      return result;
    }
  };

  toggleUserToEdit = ({ id }) => {
    this.setState(state => {
      return { ...state, idToEdit: id, error: null };
    });
  };

  render() {
    return (
      <APIContext.Provider value={this.state}>
        {this.props.children}
      </APIContext.Provider>
    );
  }
}
