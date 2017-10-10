import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import action from './action';
import './style.scss';

const propTypes = {
  getUserArticles: PropTypes.func.isRequired,
  topics: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class Home extends Component {
  componentDidMount() {
    this.props.getUserArticles(1);
  }

  renderTopics = () => (
    map(this.props.topics, topic => (
      <div
        key={topic.id}
        className="topic"
      >
        {topic.title}
      </div>
    ))
  );

  render() {
    return (
      <div className="home" />
    );
  }
}

const mapStateToProps = state => ({
  topics: state.home.topics,
});

const mapDispatchToProps = {
  getTopics: action.getTopics,
  getUser: action.getUser,
  getUserArticles: action.getUserArticles,
};

Home.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
