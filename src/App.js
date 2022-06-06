import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  /* JavaScript code inside of the function to configure the component/manage state/listen for events */

  /* 
  Your component will return JSX - the actual HTML (and some javascript) to show on the page
  Every component must be contained within a single HTML element - if you really need to have two elements, use a react fragment or an empty element
  In Jinja - we inserted variables using {{ }} and added python code using {% %}
  In JSX - we insert variables and add JS code using {}
  Always remember to change HTML class attribute to className for JSX
  */
  return (
    <div class="App">
      {console.log('Hello, Foxes!')}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
