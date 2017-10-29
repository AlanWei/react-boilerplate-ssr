import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import action from './action';
import logo from '../../assets/logo.svg';
import './style.scss';

const propTypes = {
  frameworks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};

class Home extends Component {
  renderTopics = () => (
    map(this.props.frameworks, framework => (
      <div
        key={framework.id}
        className="App-framework"
      >
        {framework.title}
      </div>
    ))
  )

  render() {
    return (
      <div className="home">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/views/home/index.js</code> and save to reload.
        </p>
        <h1>Frontend Frameworks</h1>
        {this.renderTopics()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  frameworks: state.home.frameworks,
});

const mapDispatchToProps = {
  getFrameworks: action.getFrameworks,
};

Home.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
