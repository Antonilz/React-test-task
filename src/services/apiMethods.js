import { API_URL, API_KEY } from '../constants/api';

const keyParam = `api_key=${API_KEY}`;

function APIError(message) {
  this.message = message;
  this.name = 'APIError';
}

APIError.prototype.toString = function() {
  return this.name + ': "' + this.message + '"';
};

const getUsers = async ({ offset = 0, name = null }) => {
  const params = {
    method: 'GET',
    mode: 'cors'
  };
  const offsetParam = `&offset=${offset}`;
  const nameParam = name == null ? '' : `&name=${name}`;
  try {
    const response = await fetch(
      `${API_URL}/users?${keyParam}${offsetParam}${nameParam}`,
      params
    );
    if (response.ok) {
      const json = await response.json();
      return {
        users: json.users.map(user => {
          return {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phone: user.phone,
            about: user.about
          };
        }),
        totalCount: json.total_count
      };
    } else {
      const error = await response.json();
      throw new APIError(error.error);
    }
  } catch (error) {
    return error;
  }
};

const createUser = async ({ firstName, lastName, email, phone, about }) => {
  const params = {
    method: 'POST',
    mode: 'cors'
  };
  const firstNameParam = `&first_name=${firstName}`;
  const lastNameParam = `&last_name=${lastName}`;
  const emailParam = `&email=${email}`;
  const phoneParam = `&phone=${phone}`;
  const aboutParam = about === undefined ? '' : `&about=${about}`;

  try {
    const response = await fetch(
      `${API_URL}/users?${keyParam}${firstNameParam}${lastNameParam}${emailParam}${phoneParam}${aboutParam}`,
      params
    );
    if (response.ok) {
      return response.json();
    } else {
      const error = await response.json();
      throw new APIError(error.error);
    }
  } catch (error) {
    return { error };
  }
};

const updateUser = async ({ id, firstName, lastName, email, phone, about }) => {
  const params = {
    method: 'PUT',
    mode: 'cors'
  };
  const firstNameParam = `&first_name=${firstName}`;
  const lastNameParam = `&last_name=${lastName}`;
  const emailParam = `&email=${email}`;
  const phoneParam = `&phone=${phone}`;
  const aboutParam = about === undefined ? '' : `&about=${about}`;

  try {
    const response = await fetch(
      `${API_URL}/users/${id}?${keyParam}${firstNameParam}${lastNameParam}${emailParam}${phoneParam}${aboutParam}`,
      params
    );
    if (response.ok) {
      return response.json();
    } else {
      const error = await response.json();
      throw new APIError(error.error);
    }
  } catch (error) {
    return error;
  }
};

const deleteUser = async ({ id }) => {
  const params = {
    method: 'DELETE',
    mode: 'cors'
  };
  try {
    const response = await fetch(`${API_URL}/users/${id}?${keyParam}`, params);
    if (response.ok) {
      return response.json();
    } else {
      const error = await response.json();
      throw new APIError(error.error);
    }
  } catch (error) {
    return error;
  }
};

export { getUsers, createUser, deleteUser, updateUser };
