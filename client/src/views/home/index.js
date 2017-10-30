import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import map from 'lodash/map';
import action from './action';
import logo from '../../assets/logo.svg';
import './style.scss';

const propTypes = {
  frameworks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  getFrameworks: PropTypes.func.isRequired,
};

class Home extends Component {
  componentDidMount() {
    this.props.getFrameworks();
  }

  renderFrameworks = () => (
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
        <Link to="/user">
          <h1>Frontend Frameworks</h1>
        </Link>
        {this.renderFrameworks()}
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
