import React from 'react';

function Settings() {
  return (
    <div>
      <h3 data-testid="settings-title">Settings</h3>
      <div>
        <section>
        <h4>Category</h4>
        </section>
        <section>
          <h4>Difficult</h4>
          <select name="difficult" id="difficult">
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </section>

        <section>
          <h4>Type</h4>
          <select name="" id="">
            <option value="multiple">Multiple Choice</option>
            <option value="trueOrFalse">True or False</option>
          </select>
        </section>
      </div>
    </div>
  );
}

export default Settings;
