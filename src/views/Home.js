import axios from "axios";
import { useEffect, useState } from 'react';

let Home = props => {
    // we want to explore utilizing data from an API here on our homepage
    // async process responsible for making the API call
    // we want that async process to end in mutating state rather than changing html
    // state variable to hold the data
    const [catfact, setCatfact] = useState();
    // useState hook replaces class-based react state (essentially a state property of a class-based object)
        // allows us to CAUSE changes in component lifecycle by updating the value of the state variable thru its setter

    // api call to get data
    const getCatFact = async () => {
        let response = await axios.get('https://catfact.ninja/fact');
        return response.status === 200 ? response.data : null;
    }
    // function to load api call and pass data into state
    const loadCatFact = async () => {
        let fact = await getCatFact();
        console.log(fact, typeof fact);
        // take the new api data and set our state with it
        setCatfact(fact.fact);
    }
    // something to cause that api call -> useEffect hook!
    // the useEffect hook
        // 1. By default, runs every time the component is rendered or updated
        // alternatively, you can declare a "dependency array" of state variables that control when the useEffect hook runs
            // an empty dependency array causes the useEffect to run only when the component initially renders
    useEffect(() => {loadCatFact();}, [props.students]);
    // the useEffect hook is the modern equivalent of class-based react functions componentDidMount() and componentDidUpdate()
        // allows us to run code as a result of changes in component lifecycle (renders/rerenders)

    return (
        <div className="container mt-2">
            <div className='row'>
                {console.log('Hello, Foxes!')}
                <button className='btn btn-block btn-info' onClick={props.shuffleStudents}>Shuffle Student</button>
            </div>
            <div className="row justify-content-center">
                <h1>{props.students[0]}'s Favorite CatFact:</h1>
            </div>
            <div className="row justify-content-center">
                <h3>{catfact}</h3>
            </div>
        </div>
    )
}

export default Home;