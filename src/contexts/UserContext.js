import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'

const UserContext = React.createContext({
  user: {},
  error: null,
  language: null,
  words: null,
  nextWord: null,
  response: null,
  guess: null,
  submitted: false,
  setGuess: () => { },
  setResponse: () => { },
  setError: () => { },
  clearError: () => { },
  setUser: () => { },
  processLogin: () => { },
  processLogout: () => { },
  setLanguage: () => { },
  setWords: () => { },
  setNextWord: () => { },
  setTotalScore: () => { },
  setClicked: () => { },
})

export default UserContext

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    const state = {
      user: {},
      error: null,
      language: null,
      words: null,
      nextWord: null,
      totalScore: null,
      currWord: null,
      guess: null,
      response: null,
      submitted: false,
      currentWord: "",
    }

    const jwtPayload = TokenService.parseAuthToken()

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      }

    this.state = state;
    IdleService.setIdleCallback(this.logoutBecauseIdle)
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setUser = user => {
    this.setState({ user })
  }

  setLanguage = (language) => {
    this.setState({
      language: language,
    });
  };

  setWords = (words) => {
    this.setState({
      words: words,
    });
  };

  setCurrentWord = (word) => {
    this.setState({
      currentWord: word,
    });
  };

  setNextWord = (word) => {
    this.setState({
      nextWord: word,
    });
  };

  setResponse = (response) => {
    this.setState({
      response: response,
    });
  };

  setGuess = (guess) => {
    this.setState({
      guess: guess,
    });
  };

  setTotalScore = (totalScore) => {
    this.setState({
      totalScore: totalScore,
    });
  };

  setClicked = (t) => {
    this.setState({
      submitted: t,
    });
  };

  processLogin = authToken => {
    TokenService.saveAuthToken(authToken)
    const jwtPayload = TokenService.parseAuthToken()
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
    });
    IdleService.regiserIdleTimerResets()
    TokenService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken()
    });
  };

  processLogout = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.setUser({});
  };

  logoutBecauseIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.setUser({ idle: true });
  }

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken()
        });
      })
      .catch(err => {
        this.setError(err)
      });
  };

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      totalScore: this.state.totalScore,
      submitted: this.state.submitted,
      language: this.state.language,
      guess: this.state.guess,
      words: this.state.words,
      nextWord: this.state.nextWord,
      setCurrWord: this.setCurrWord,
      response: this.state.response,
      currentWord: this.state.currentWord,
      setClicked: this.setClicked,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      setLanguage: this.setLanguage,
      setWords: this.setWords,
      setNextWord: this.setNextWord,
      setTotalScore: this.setTotalScore,
      setGuess: this.setGuess,
      setResponse: this.setResponse,
      setCurrentWord: this.setCurrentWord,
    };

    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    );
  };
};
