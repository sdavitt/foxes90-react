import { Link } from "react-router-dom";
import { useState } from 'react';


let Navbar = () => {

    const [count, setCount] = useState(0);

    const changeCounter = () => {
        console.log('current count:' + count);
        setCount(count + 1);
      }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Foxes90</a>
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
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <p className="nav-link m-0">{count}</p>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-sm btn-info" onClick={changeCounter}>Count</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;