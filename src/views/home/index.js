import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import get from 'lodash/get';
import action from './action';
import selector from './selector';
import './style.scss';

const propTypes = {
  topics: PropTypes.arrayOf(PropTypes.object).isRequired,
  userTopics: PropTypes.shape({
    user: PropTypes.arrayOf(PropTypes.object),
    topics: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  getTopics: PropTypes.func.isRequired,
};

class Home extends Component {
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
        Home
        {this.renderTopics()}
        {this.renderUserTopics()}
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
