import './css/App.css';
// need curly brackets if importing a single function
import React, { useState } from 'react';
import Navbar from './components/Navbar';

function App() {
  /* JavaScript code inside of the function to configure the component/manage state/listen for events */
  // how do I create state variables?
  // by using the State Hook - initial value of the state variable is provided with the input to the useState hook
  const [count, setCount] = useState(0);
  const [students, setStudents] = useState(['Sven', 'Donovan', 'Tyler', 'Craig', 'Yasir', 'DeVante', 'Jose', 'Brandon', 'Kristen', 'Nadia']);

  const changeCounter = () => {
    console.log('current count:' + count);
    setCount(count + 1);
  }

  const shuffleStudents = () => {
    console.log('shuffling...')
    /* BAD students.sort(() => Math.random() - 0.5); DON'T MUTATE STATE DIRECTLY */
    // Make a copy, mutate that copy - use the JS spread operator to create a copy
    let tempStudents = [...students];
    // can change whatever we want about the copy
    tempStudents.sort(() => Math.random() - 0.5);
    // then pass the mutated copy into the setter
    setStudents(tempStudents);
  }
  /* 
  Your component will return JSX - the actual HTML (and some javascript) to show on the page
  Every component must be contained within a single HTML element - if you really need to have two elements, use a react fragment or an empty element
  In Jinja - we inserted variables using {{ }} and added python code using {% %}
  In JSX - we insert variables and add JS code using {}
  Always remember to change HTML class attribute to className for JSX
  */
  return (
    <div className="App">
      <Navbar studentsFromApp={students} setStudentsFromApp={setStudents}/>
      {console.log('Hello, Foxes!')}
      <h1 className='counter'>{count}</h1>
      <button onClick={changeCounter}>Change Count</button>
      <h1 className='students'>{students}</h1>
      <button onClick={shuffleStudents}>Shuffle Students</button>
    </div>
  );
}

export default App;
