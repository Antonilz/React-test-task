import React from 'react';
import { Pagination as PaginationSUI } from 'semantic-ui-react';

export class Pagination extends React.Component {
  async componentDidMount() {
    await this.props.getUsers({ offset: 0, name: '' });
  }
  handlePageChange = async (e, data) => {
    e.preventDefault();
    await this.props.getUsers({
      offset: data.activePage * 10 - 10,
      name: this.props.searchQuery
    });
  };
  render() {
    const { totalCount, offset } = this.props.pagination;
    console.log(this.props.pagination);
    const currentPage = Math.floor(offset / 10 + 1);
    const numOfPages = Math.ceil(totalCount / 10);
    return (
      <PaginationSUI
        secondary
        pointing
        activePage={currentPage}
        totalPages={numOfPages}
        onPageChange={this.handlePageChange}
      />
    );
  }
}
