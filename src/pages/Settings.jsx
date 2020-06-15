import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { getCategory } from '../services/apiRequest';
import changeCategory from '../actions/changeCategory';
import changeDifficulty from '../actions/changeDifficulty';
import changeType from '../actions/changeType';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
    this.setCategories = this.setCategories.bind(this);
    this.categorySelect = this.categorySelect.bind(this);
    this.typeSelect = this.typeSelect.bind(this);
    this.difficultSelect = this.difficultSelect.bind(this);
  }

  componentDidMount() {
    this.setCategories();
  }

  async setCategories() {
    const categories = await getCategory();
    this.setState({
      categories: categories.trivia_categories,
    });
  }

  categorySelect() {
    const { categories } = this.state;
    const { changeCtgry } = this.props;
    return (
      <div>
        <label htmlFor="category">Category</label>
        <div className="input-field col s12">
          <select
            onChange={(e) => changeCtgry(e.target.value)}
            className="browser-default"
            name="category"
            id="category"
          >
            <option value="" disabled selected>
              Choose your option
            </option>
            <option value="">All</option>
            {categories.map((el) => (
              <option value={el.id}>{el.name}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  typeSelect() {
    const { changeTyp } = this.props;
    return (
      <div>
        <label htmlFor="type">Type</label>
        <div className="input-field col s12">
          <select onChange={(e) => changeTyp(e.target.value)} className="browser-default" id="type">
            <option value="" disabled selected>
              Choose your option
            </option>
            <option value="">All</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True or False</option>
          </select>
        </div>
      </div>
    );
  }

  difficultSelect() {
    const { changeDffclty } = this.props;
    return (
      <div>
        <label htmlFor="difficult">Difficult</label>
        <div className="input-field col s12">
          <select
            onChange={(e) => changeDffclty(e.target.value)}
            className="browser-default"
            id="difficult"
          >
            <option value="" disabled selected>
              Choose your option
            </option>
            <option value="">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row black-coral white-text radius-border-10">
          <div className="center-align">
            <h3 data-testid="settings-title">Settings</h3>
            <div className="col s6 offset-s3">
              {this.categorySelect()}
              {this.difficultSelect()}
              {this.typeSelect()}
              <Link className="waves-effect deep-orange btn col s4 offset-s4 margin-20p" to="/">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { changeCtgry: changeCategory, changeDffclty: changeDifficulty, changeTyp: changeType },
    dispatch,
  );

Settings.propTypes = {
  changeCtgry: PropTypes.func.isRequired,
  changeTyp: PropTypes.func.isRequired,
  changeDffclty: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
