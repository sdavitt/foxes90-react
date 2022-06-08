import { Link } from "react-router-dom";
import { useEffect, useContext } from 'react';
import { DataContext } from '../DataProvider';
import { useAuth, useUser, useDatabase } from 'reactfire';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { ref, child, get } from 'firebase/database';


let Navbar = () => {
    // access auth provider with reactfire hook
    const auth = useAuth();
    // access the db provider with reactfire hook
    const db = useDatabase();

    // access cart context
    const { cart, setCart } = useContext(DataContext);

    // access our current user object so that we can design systems around whether or not a user is signed in
    const { status, data: user } = useUser();

    // sign-in function
    const signin = async () => {
        const provider = new GoogleAuthProvider();
        let u = await signInWithPopup(auth, provider);
        console.log(u);
    }

    // sign-out function
    const signout = async () => {
        await signOut(auth);
        console.log('signed user out', user);
        setCart({items: {}, total: 0, size: 0});
    }

    // create a useEffect hook that runs a callback to query our database every time there is a change in our user object
    // we want to check whether or not there is a cart for this user, and if there is, change the local cart to be the database cart
    useEffect(() => {
        if (user) {
            // check the database for a user cart
            get(child(ref(db), `carts/${user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    // if the cart exists in the database
                    console.log(snapshot.val());
                    // set the local state cart to the same value
                    setCart(snapshot.val());
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [user]);

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
                    {/* A conditional structure based on whether or not we have a signed-in user */}
                    {status === 'loading' ?
                        <li className="nav-item">
                            <p className="nav-link m-0">Logging in...</p>
                        </li>
                        : user ?
                            <>
                                <li className="nav-item">
                                    <p className="nav-link m-0">Welcome, {user.displayName}!</p>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-sm btn-info mr-2" onClick={signout}>Sign out</button>
                                </li>
                            </>
                            :
                            <li className="nav-item">
                                <button className="btn btn-sm btn-info mr-2" onClick={signin}>Sign in</button>
                            </li>
                    }
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