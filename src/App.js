import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { UsersContainer } from './containers/UsersContainer';
import { Search } from './components/Search';
import { APIContext } from './services/apiContext';
import { UserEditForm } from './components/UserEditForm';
import { Pagination } from './components/Pagination';
import { UsersList } from './components/UsersList';

import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <UsersContainer>
        <APIContext.Consumer>
          {({
            users,
            pagination,
            getUsers,
            createUser,
            deleteUser,
            updateUser,
            listIsFetching,
            idToEdit,
            toggleUserToEdit
          }) => (
            <Grid
              container
              columns={2}
              relaxed
              stackable
              style={{ paddingTop: '40px' }}
            >
              <Grid.Column stretched>
                <Segment textAlign="center" style={{ minHeight: '660px' }}>
                  <Search getUsers={getUsers} />
                  <UsersList
                    getUsers={getUsers}
                    deleteUser={deleteUser}
                    toggleUserToEdit={toggleUserToEdit}
                    users={users}
                    isLoading={listIsFetching}
                  />
                  {pagination.totalCount > 10 && (
                    <Pagination getUsers={getUsers} pagination={pagination} />
                  )}
                </Segment>
              </Grid.Column>
              <Grid.Column stretched>
                <Segment>
                  <UserEditForm
                    createUser={createUser}
                    updateUser={updateUser}
                    users={users}
                    idToEdit={idToEdit}
                    toggleUserToEdit={toggleUserToEdit}
                  />
                </Segment>
              </Grid.Column>
            </Grid>
          )}
        </APIContext.Consumer>
      </UsersContainer>
    );
  }
}

export default App;
