import React from 'react';
import { Form, Button, Header, Message } from 'semantic-ui-react';

const defaultState = {
  fields: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    about: ''
  },
  isLoading: false,
  pristine: true,
  error: null
};
export class UserEditForm extends React.Component {
  state = { ...defaultState };

  componentDidUpdate(prevProps) {
    if (this.props.idToEdit !== null && this.state.pristine) {
      this.setState(state => {
        return {
          ...state,
          mode: 'edit',
          fields: {
            ...this.props.users[this.props.idToEdit]
          },
          pristine: false
        };
      });
    }
  }

  resetForm = () => {
    this.setState({
      ...defaultState
    });
  };

  handleSubmit = async () => {
    this.setState(state => {
      return { ...state, isLoading: true };
    });
    let result;
    if (this.props.idToEdit === null) {
      result = await this.props.createUser({
        user: { ...this.state.fields }
      });
    } else {
      result = await this.props.updateUser({ user: { ...this.state.fields } });
    }
    if (result && result.error) {
      this.setState(state => {
        return { ...state, error: result.error.toString(), isLoading: false };
      });
    } else {
      this.resetForm();
    }
  };

  handleResetClick = async () => {
    await this.props.toggleUserToEdit({ id: null });
    this.resetForm();
  };

  handleChange = (e, { name, value }) => {
    this.setState(state => {
      return { ...state, fields: { ...state.fields, [name]: value } };
    });
  };

  render() {
    const { firstName, lastName, email, phone, about } = this.state.fields;
    return (
      <React.Fragment>
        <Form
          size="large"
          loading={this.state.isLoading}
          error={this.state.error}
        >
          <Header
            as="h3"
            color="teal"
            textAlign="center"
            style={{ marginBottom: '15px' }}
          >
            {this.props.idToEdit !== null
              ? `Modify user id=${this.props.idToEdit}`
              : 'Create new user'}
          </Header>
          <Form.Input
            required
            label="First Name"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            label="Last Name"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            label="Email"
            name="email"
            placeholder="email"
            value={email}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            label="Phone Number"
            name="phone"
            placeholder="phone"
            value={phone}
            onChange={this.handleChange}
          />
          <Form.TextArea
            label="About"
            name="about"
            placeholder="About (Optional)"
            value={about}
            onChange={this.handleChange}
          />
          {this.state.error && (
            <Message error header="Submit error" content={this.state.error} />
          )}
          <Form.Group style={{ justifyContent: 'center' }}>
            <Button.Group size="big">
              <Button color="teal" onClick={this.handleSubmit}>
                Submit
              </Button>
              <Button.Or />
              <Button onClick={this.handleResetClick}>Reset</Button>
            </Button.Group>
          </Form.Group>
        </Form>
      </React.Fragment>
    );
  }
}
