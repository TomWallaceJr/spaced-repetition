import React, { Component } from "react";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import WordsList from "../../components/WordsList/WordsList";
import { Link } from 'react-router-dom';
import API from "../../config";
import "./DashboardRoute.css";


class DashboardRoute extends Component {
  static contextType = UserContext;

  async componentDidMount() {
    try {
      const response = await fetch(`${API.API_ENDPOINT}/language`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
        mode: 'no-cors',
      });
      const res = await response.json();
      this.context.setLanguage(res.language.name);
      this.context.setWords(res.words);
      console.log(res.words)
      this.context.setTotalScore(res.language.total_score);
      document.getElementById("learn").focus();
    } catch (error) {
      this.context.setError(error);
    }
  }

  render() {
    return (
      <section>
        <h1>Welcome Back To Your Spanish Lessons {this.context.user.name}!</h1>
        <p>
          {this.context.totalScore
            ? `To date, you have ${this.context.totalScore} correct answers`
            : null}
        </p>
        <Link to='/learn'>
          <button type='button'>Go To Lessons</button>
        </Link>

        <h3>Current Progress</h3>
        <section className="words-display">
          {this.context.words ? (
            <WordsList words={this.context.words} />
          ) : (
              <h4>Loading...</h4>
            )}
        </section>

      </section>
    );
  }
}

export default DashboardRoute;
