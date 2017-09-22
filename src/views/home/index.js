import React, { Component } from 'react';
import { connect } from 'react-redux';
import action from './action';
import './style.scss';

class Home extends Component {
  componentDidMount() {
    this.props.getStores();
  }

  render() {
    return (
      <div className="home">
        {this.props.stores}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const home = state.home;
  return {
    stores: home.stores,
  };
};

const mapDispatchToProps = {
  getStores: action.getStores,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
