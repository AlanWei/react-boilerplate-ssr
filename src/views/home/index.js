import React, { Component } from 'react';
import { connect } from 'react-redux';
import action from './action';
import './style.scss';

class Home extends Component {
  componentDidMount() {
    this.props.getBanners();
  }

  render() {
    return (
      <div className="home">
        Home
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const home = state.home;
  return {
    banners: home.banners,
  };
};

const mapDispatchToProps = {
  getBanners: action.getBanners,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
