import React, { Component } from 'react';
import { getCategory } from '../services/apiRequest';

const difficultSelect = () => (
  <div>
    <label htmlFor="difficult">Difficult</label>
    <div className="input-field col s12">
      <select className="browser-default" id="difficult">
        <option value="" disabled selected>
          Choose your option
        </option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  </div>
);

const typeSelect = () => (
  <div>
    <label htmlFor="type">Type</label>
    <div className="input-field col s12">
      <select className="browser-default" id="type">
        <option value="" disabled selected>
          Choose your option
        </option>
        <option value="multiple">Multiple Choice</option>
        <option value="trueOrFalse">True or False</option>
      </select>
    </div>
  </div>
);

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
    this.setCategories = this.setCategories.bind(this);
    this.categorySelect = this.categorySelect.bind(this);
  }

  async setCategories() {
    const categories = await getCategory();
    this.setState({
      categories: categories.trivia_categories,
    });
  }

  categorySelect() {
    const { categories } = this.state;
    return (
      <div>
        <label htmlFor="category">Category</label>
        <div className="input-field col s12">
          <select className="browser-default" name="category" id="category">
            <option value="" disabled selected>
              Choose your option
            </option>
            {categories.map((el) => (
              <option value={el.id}>{el.name}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setCategories();
  }

  render() {
    return (
      <div className="container">
        <div className="row black-coral white-text radius-border-10">
          <div className="center-align">
            <h3 data-testid="settings-title">Settings</h3>
            <div className="col s6 offset-s3">
              {this.categorySelect()}
              {difficultSelect()}
              {typeSelect()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
