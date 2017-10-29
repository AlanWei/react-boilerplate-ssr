import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import get from 'lodash/get';
import action from './action';
import selector from './selector';
import logo from '../../assets/logo.svg';
import './style.scss';

const propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.arrayOf(PropTypes.object),
    topics: PropTypes.arrayOf(PropTypes.object),
  })).isRequired,
  userTopics: PropTypes.shape({
    user: PropTypes.arrayOf(PropTypes.object),
    topics: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  getTopics: PropTypes.func.isRequired,
};

class Home extends Component {
  componentWillMount() {
    this.props.getTopics();
  }
  componentDidMount() {
    this.props.getTopics();
  }

  renderTopics = () => (
    map(this.props.topics, topic => (
      <div key={topic.id}>{topic.title}</div>
    ))
  )

  renderUserTopics = () => (
    <div>{get(this.props.userTopics, 'user[0].name')}</div>
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
        <h1>Frontend Framework</h1>
        {this.renderTopics}
        <h1>Selected User</h1>
        {this.renderUserTopics}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  topics: state.home.topics,
  userTopics: selector.userTopicSelector(state),
});

const mapDispatchToProps = {
  getTopics: action.getTopics,
};

Home.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
