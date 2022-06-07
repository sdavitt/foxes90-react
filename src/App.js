import './css/App.css';
// need curly brackets if importing a single function
import React, { useState } from 'react';
import Navbar from './components/Navbar';
// imports for routing
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Shop from './views/Shop';
import Cart from './views/Cart';

function App() {
  /* JavaScript code inside of the function to configure the component/manage state/listen for events */
  // how do I create state variables?
  // by using the State Hook - initial value of the state variable is provided with the input to the useState hook
  const [students, setStudents] = useState(['Sven', 'Donovan', 'Tyler', 'Craig', 'Yasir', 'DeVante', 'Jose', 'Brandon', 'Kristen', 'Nadia']);

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
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route children path='/' element={<Home students={students} shuffleStudents={shuffleStudents} />} />
        <Route children path='/shop' element={<Shop />} />
        <Route children path='/cart' element={<Cart />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
