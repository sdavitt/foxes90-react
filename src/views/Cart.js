import '../css/cartstyles.css'
import { useContext, useState } from 'react';
import { DataContext } from '../DataProvider';
import { useDatabase, useUser } from 'reactfire';
import { set, ref } from 'firebase/database';

let Cart = () => {
    // access user and database systems
    const {data: user} = useUser();
    const db = useDatabase();

    const { cart, setCart } = useContext(DataContext);
    const [msg, setMsg] = useState(false);
    /*
    Functions for modifying the cart:
    1. Increase the quantity of an animal in the cart
    2. Decrease the quantity of an animal in the cart
    3. Fully remove an animal from the cart
    4. Clear the entire cart
    */

    const incQuantity = animal => {
        // check inventory
        if (cart.items[animal.obj.id].quantity >= animal.obj.inventory) {
            setMsg(`Sorry, you're already planning to adopt all of the ${animal.obj.name}!`);
            return
        }
        // mutate cart state, increasing the quantity of the specified animal by one
        // create a copy of current state
        let mutableCart = { ...cart }
        // modify the copy
        // increase size by 1
        mutableCart.size++;
        // increase total by the price of the specified animal
        mutableCart.total += animal.obj.price;
        // increase the quantity of that animal in the cart.items
        mutableCart.items[animal.obj.id].quantity++;
        // right before we change the state of the local cart, IF there is a user, change the database cart to match!
        if (user) {
            set(ref(db, 'carts/' + user.uid), mutableCart);
        }
        // set state
        setCart(mutableCart);
        setMsg(false);
    }

    const decQuantity = animal => {
        // mutate cart state, decreasing the quantity of the specified animal by one
        // create a copy of current state
        let mutableCart = { ...cart }
        // modify the copy
        // decrease size by 1
        mutableCart.size--;
        // decrease total by the price of the specified animal
        mutableCart.total -= animal.obj.price;
        // decrease the quantity of that animal in the cart.items
        // if the quantity is currently greater than one, decrease the quantity by one, otherwise delete that animal from cart.items
        mutableCart.items[animal.obj.id].quantity > 1 ?
            mutableCart.items[animal.obj.id].quantity-- :
            delete mutableCart.items[animal.obj.id];
        // right before we change the state of the local cart, IF there is a user, change the database cart to match!
        if (user) {
            set(ref(db, 'carts/' + user.uid), mutableCart);
        }
        // set state
        setCart(mutableCart);
        setMsg(false);
    }

    const removeAnimal = animal => {
        // mutate cart state, removing the specified animal
        // create a copy of current state
        let mutableCart = { ...cart }
        // modify the copy
        // decrease size by the quantity of the specified animal that is currently in the cart
        mutableCart.size -= mutableCart.items[animal.obj.id].quantity;
        // decrease total by the price of the specified animal * the quantity of that animal that is in the cart
        mutableCart.total -= animal.obj.price * mutableCart.items[animal.obj.id].quantity;
        // remove the animal from cart.items
        delete mutableCart.items[animal.obj.id];
        // right before we change the state of the local cart, IF there is a user, change the database cart to match!
        if (user) {
            set(ref(db, 'carts/' + user.uid), mutableCart);
        }
        // set state
        setCart(mutableCart);
        setMsg(false);
    }

    const clearCart = () => {
        // set the cart back to empty
        // create a new entirely empty cart
        let newCart = { items: {}, total: 0, size: 0 };
        // right before we change the state of the local cart, IF there is a user, change the database cart to match!
        if (user) {
            set(ref(db, 'carts/' + user.uid), null);
        }
        // set state to that new cart
        setCart(newCart);
        setMsg(false);
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-center row">
                <div className="col-md-8">
                    <div className="p-2">
                        <h4>Animals to adopt:</h4>
                    </div>
                    {msg ?
                        <div className='d-flex flex-row'>
                            <p>{msg}</p>
                        </div> :
                        null
                    }
                    {/* Map creating row for each unique animal */}
                    {Object.values(cart.items).map((animal, index) => {
                        return <div key={index} className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                            <div className="mr-1"><img className="rounded" alt={animal.obj.description} src={animal.obj.image} width="70" /></div>
                            <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">{animal.obj.name}</span>
                                <div className="d-flex flex-row product-desc">
                                    <div className="size mr-1"><span className="font-weight-bold">{animal.obj.sci_name}</span></div>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center qty">
                                <i className="fa fa-minus text-danger" onClick={() => { decQuantity(animal); }}></i>
                                <h5 className="text-grey mt-1 mr-1 ml-1">{animal.quantity}</h5>
                                <i className="fa fa-plus text-success" onClick={() => { incQuantity(animal); }}></i>
                            </div>
                            <div>
                                <h5 className="text-grey">${animal.obj.price.toFixed(2)} ea.</h5>
                            </div>
                            <div className="d-flex align-items-center"><i className="fa fa-trash mb-1 text-danger" onClick={() => { removeAnimal(animal); }}></i></div>
                        </div>
                    })
                    }

                    <div className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                        <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">Total:</span>
                        </div>
                        <div>
                            <h4 className="text-grey">${cart.total.toFixed(2)}</h4>
                        </div>
                        <div className="d-flex align-items-center">
                            {cart.size === 0 ?
                                <button disabled className="btn btn-sm btn-success">Your cart is empty.</button>
                                :
                                <button className="btn btn-sm btn-danger" onClick={clearCart}>Clear Cart</button>
                            }
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded">
                        <button className="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button" disabled={cart.size === 0 ? true : false}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;