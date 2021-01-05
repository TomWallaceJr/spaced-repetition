import React, { Component } from 'react';
import UserContext from "../../contexts/UserContext";
import TokenService from "../../services/token-service";
import API from "../../config";

class DashboardRoute extends Component {
  static contextType = UserContext;

  componentDidMount() {
    fetch(`${API.API_ENDPOINT}/language`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res => res.json)
      .then(res => {
        this.context.setLanguage(res.language.name);
        this.context.setWords(res.words);
        this.context.setTotalScore(res.language.total_score);
      })
  }

  render() {
    return (
      <section>
        implement and style me
      </section>
    );
  }
}

export default DashboardRoute
