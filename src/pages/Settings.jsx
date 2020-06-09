import React from 'react';

async function getCategory() {
  const select = document.querySelector('select[name=category]')
  return fetch('https://opentdb.com/api_category.php')
    .then((res) => res
      .json()
      .then((json) => {
        select.innerHTML += json.map((el) => `<option value="${el.id}">${el.name}</option>`)
      })
    )
}

const categorySelect = () => (
  <div>
  <div className="input-field col s12">
    <select className="browser-default" name="category" id="category">
      <option value="" disabled selected>
        Choose your option
      </option>
      
      {getCategory().map(el => (
        <option value={el}>{el}</option>  
      ))}

    </select>
  </div>
  <label htmlFor="difficult">Difficult</label>
</div>
)

const difficultSelect = () => (
  <div>
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
    <label htmlFor="difficult">Difficult</label>
  </div>
);

const typeSelect = () => (
  <div>
    <div className="input-field col s12">
      <select className="browser-default" id="type">
        <option value="" disabled selected>
          Choose your option
        </option>
        <option value="multiple">Multiple Choice</option>
        <option value="trueOrFalse">True or False</option>
      </select>
    </div>
    <label htmlFor="type">Type</label>
  </div>
);

const Settings = () => (
  <div className="container">
    <div className="row black-coral white-text radius-border-10">
      <div className="center-align">
        <h3 data-testid="settings-title">Settings</h3>
        <div className="col s6 offset-s3">
          <h4>Category</h4>
          {categorySelect()}
          {difficultSelect()}
          {typeSelect()}
        </div>
      </div>
    </div>
  </div>
);

export default Settings;
