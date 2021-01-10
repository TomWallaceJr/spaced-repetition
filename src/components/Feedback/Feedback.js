import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import { Link } from 'react-router-dom';


export default class Feedback extends Component {
    static contextType = UserContext;

    handleClick = () => {
        window.location.reload();
    }

    render() {
        return (
            <>

                <button type='button' onClick={() => this.handleClick()}>Try Another Word</button>
                <div className="feedback-display">
                    <p>
                        The correct answer was {' '}
                        {this.context.response.answer}{' '}
                        and you chose {' '}{this.context.guess}!
                    </p>
                </div>
            </>
        );
    }
}