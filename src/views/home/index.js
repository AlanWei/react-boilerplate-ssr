import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './style.scss';

const propTypes = {
  getTopics: PropTypes.func.isRequired,
};

class Home extends Component {
  componentDidMount() {
    this.props.getTopics();
  }

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
};

Home.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
