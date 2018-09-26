import React, { PureComponent } from 'react';
import { Input } from 'semantic-ui-react';

export class Search extends PureComponent {
  state = {
    value: ''
  };

  constructor(props) {
    super(props);
    this.timeout = 0;
  }

  handleSearchChange = (e, { value }) => {
    const self = this;
    if (this.timeout) clearTimeout(this.timeout);
    this.setState({
      isLoading: true,
      value
    });

    this.timeout = setTimeout(async () => {
      await self.props.getUsers(value.length > 0 && { name: value });
      this.setState(state => {
        return {
          ...state,
          isLoading: false
        };
      });
    }, 1000);
  };

  render() {
    const { value, isLoading } = this.state;
    return (
      <Input
        fluid
        icon="search"
        placeholder="Search..."
        value={value}
        loading={isLoading}
        onChange={this.handleSearchChange}
      />
    );
  }
}
