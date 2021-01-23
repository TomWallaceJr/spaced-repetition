import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Required, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';
import './RegistrationForm.css';

class RegistrationForm extends Component {
  static contextType = UserContext;
  static defaultProps = {
    onRegistrationSuccess: () => { },
    onLoginSuccess: () => { },
    location: {},
    history: {
      push: () => { },
    }
  };



  state = { error: null };

  firstInput = React.createRef();

  handleLogin = (username, password) => {
    AuthApiService.postLogin({
      username: username,
      password: password,
    })
      .then((res) => {
        this.context.processLogin(res.authToken);
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  handleSubmit = (ev) => {
    console.log("submit");
    this.setState({
      loading: true,
    });
    ev.preventDefault();
    const { name, username, password } = ev.target;
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then((user) => {
        console.log(user);
        this.handleLogin(username.value, password.value);
        this.setState({
          loading: true,
        });
        name.value = "";
        username.value = "";
        password.value = "";
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus()
  };

  render() {
    const { error } = this.state
    return (
      <form
        onSubmit={this.handleSubmit}
        className='center'
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div>
          <Label htmlFor='registration-name-input'>
            Enter your name<Required />
          </Label>
          <Input
            ref={this.firstInput}
            id='registration-name-input'
            name='name'
            required
          />
        </div>
        <div>
          <Label htmlFor='registration-username-input'>
            Choose a username<Required />
          </Label>
          <Input
            id='registration-username-input'
            name='username'
            required
          />
        </div>
        <div>
          <Label htmlFor='registration-password-input'>
            Choose a password<Required />
          </Label>
          <Input
            id='registration-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <footer>
          <Button type='submit'>
            Sign up
          </Button>
          {' '}
          <br />
          <Link to='/login'>Already have an account?</Link>
        </footer>
      </form>
    );
  };
};

export default RegistrationForm;
