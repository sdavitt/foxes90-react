import { useState, useContext } from 'react';
import { DataContext } from '../DataProvider';
import axios from 'axios';
import { useUser, useDatabase } from 'reactfire';
import { set, ref } from 'firebase/database';

let Shop = () => {
    /* retrieve our products from our flask API */
    /* Add our products to our JSX */
    // set up my api call functions
    let getAnimalData = async () => {
        let data = await axios.get('https://foxes84-tweetyer.herokuapp.com/api/animals');
        return data.status === 200 ? data.data : null
    }

    // function to kick off api call process and mutate state with results
    let loadAnimalData = async () => {
        let data = await getAnimalData();
        console.log(data);
        setAnimals(data.Animals);
    }

    // set up state variable to store api data
    // the initial value being a callback function that calls a function that sets state is a way to provide the initial value for a state variable
    const [animals, setAnimals] = useState(() => { loadAnimalData(); });
    const [msg, setMsg] = useState(false);

    // access our cart from our ContextProvider
    const { cart, setCart } = useContext(DataContext);
    // access firebase systems
    const {data: user} = useUser();
    const db = useDatabase();

    // function to add an animal to our cart:
    const adoptAnimal = animal => {
        // before we add the new animal to our cart, do we have the inventory to do so?
        // if we dont have more inventory than we have animals in the cart, don't allow the adoption
        if (cart.items[animal.id] && cart.items[animal.id].quantity >= animal.inventory) {
            setMsg(`Sorry, you're already planning to adopt all of the ${animal.name}!`);
            return
        }

        // add the animal to the cart - CANT DO THIS DIRECTLY - must mutate state through a copy
        // make a copy
        let mutableCart = { ...cart };
        // modify the copy
        // increase the size of the cart by one
        mutableCart.size++;
        // increase the total of the cart by the price of the new animal
        mutableCart.total += animal.price;
        // if the animal is already in the cart, increase its quantity
        mutableCart.items[animal.id] ?
            mutableCart.items[animal.id].quantity++ :
            // otherwise create the key:value pair for that animal with a quantity of one
            mutableCart.items[animal.id] = { 'obj': animal, 'quantity': 1 }
        // console log for testing purposes
        console.log(mutableCart);
        // mutate db right before setting local state
        if (user) {
            set(ref(db, 'carts/' + user.uid), mutableCart);
        }
        // set the state
        setMsg(`Thank you for adopting a ${animal.name}!`);
        setCart(mutableCart);
    }

    // once we build our cart, the user will need to be able to add one of these animals to their cart
    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <h1>Foxes Animal Market</h1>

            </div>
            <div className='row justify-content-center'>
                {msg ? <h3>{msg}</h3> : null}
            </div>
            <div className='row justify-content-center'>
                {/* write a conditional to check whether or not our animals have loaded */}
                {typeof animals === 'object' && animals[1] ? animals.map((animal, index) => {
                    return <div key={index} className="card m-3" style={{ width: 18 + 'rem' }}>
                        <img src={animal.image} className="card-img-top" alt={animal.sci_name} />
                        <div className="card-body">
                            <h5 className="card-title">{animal.name}</h5>
                            <h5 className="card-title font-italic">{animal.sci_name}</h5>
                            <p className="card-text">{animal.description}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{animal.habitat}</li>
                            <li className="list-group-item">{animal.diet}</li>
                            <li className="list-group-item"><span>Lifespan: {animal.lifespan} years.</span><span className='float-right'>Size: {animal.size}</span></li>
                        </ul>
                        <div className="card-body">
                            <p className="card-link float-left">${animal.price}</p>
                            {animal.inventory < 1 ?
                                <button disabled className="float-right btn btn-sm btn-info">Out of stock</button>
                                :
                                <button onClick={() => { adoptAnimal(animal) }} className="float-right btn btn-sm btn-info">Adopt!</button>
                            }
                        </div>
                    </div>
                })
                    : <h3>Waking animals up...</h3>}
            </div>
        </div>
    )
}

export default Shop;