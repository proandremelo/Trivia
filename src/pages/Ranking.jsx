import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MD5 } from 'crypto-js';

class Ranking extends Component {
  state = {
    arr: [],
  };

  componentDidMount() {
    const getArray = JSON.parse(localStorage.getItem('player'));
    let arrayOrganizado = [];
    console.log(getArray.length);
    if (getArray.length > 1) {
      arrayOrganizado = getArray.sort((a, b) => b.score - a.score);
      this.setState({ arr: arrayOrganizado });
    } else {
      this.setState({ arr: getArray });
    }
  }

  render() {
    const { arr } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          arr.map((e, i) => (
            <div key={ i }>
              <img
                src={ `https://www.gravatar.com/avatar/${MD5(e.email).toString()}` }
                alt="gravatar"
              />
              <p data-testId={ `player-name-${i}` }>{ e.nome }</p>
              <p data-testId={ `player-score-${i}` }>{ e.score }</p>
            </div>
          ))
        }
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Home</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
