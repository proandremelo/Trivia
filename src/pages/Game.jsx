import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { triviaAPI } from '../redux/actions';

class Play extends Component {
  state = {
    indexQuestao: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    dispatch(triviaAPI(token));
  }

  removeItem = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push("/");
  }

  render() {
    const { isInvalid, perguntas } = this.props;
    const { indexQuestao } = this.state;
    console.log(perguntas);
    return (
      <div>
        { isInvalid && this.removeItem() }
        <Header />
        {/* { perguntas.map((e) => (
          <div>
            <h1>{e.category}</h1>
          </div>
        ))} */}
        <h1>{perguntas[0].category}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  perguntas: state.perguntasReducer.perguntas,
  isInvalid: state.perguntasReducer.isInvalid,
});

export default connect(mapStateToProps)(Play);
