import { Link } from "react-router-dom";
import { useState, useContext } from 'react';
import { DataContext } from '../DataProvider';


let Navbar = () => {

    const [count, setCount] = useState(0);

    const changeCounter = () => {
        console.log('current count:' + count);
        setCount(count + 1);
    }

    // access cart context
    const { cart } = useContext(DataContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to='/'>Foxes90</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/shop">Shop</Link>
                    </li>
                    <li className="nav-item disabled">
                        <Link className="nav-link" to="">IDK</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto align-items-center">
                    <li className="nav-item">
                        <p className="nav-link m-0">Welcome!</p>
                    </li>
                    <li className="nav-item">
                        {cart.size === 0 ?
                            <Link className="btn btn-sm btn-info" to='/shop'><i className="fa fa-shopping-cart mr-2"></i>Adopt a Pet</Link>
                            :
                            <Link className="btn btn-sm btn-info" to='/cart'><i className="fa fa-shopping-cart mr-2"></i>{cart.size} | ${cart.total.toFixed(2)}</Link>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;