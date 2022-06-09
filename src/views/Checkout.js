import { useState, useEffect, useContext } from 'react';
import { useUser } from 'reactfire';
import { DataContext } from '../DataProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import '../css/stripecss.css';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe("pk_test_51L8nYBLICWRY3zav3KnyL5yOzDEz4Ym52kdylig8tEA2x0HZQhjwRh1Itq0rCSIuyb2qpbjk5YPu57HXfJI9tpSB00zs0ZYhta");

const Checkout = () => {
    // accessing the information we need (cart, user)
    const { cart } = useContext(DataContext);
    const { data: user } = useUser();
    // setting the state to hold the response from our flask app
    const [clientSecret, setClientSecret] = useState("");

    // utilize the useEffect to cause an API call to our flask app to happen when this page first loads (aka after the checkout button is pressed)
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (user) {
            fetch("http://127.0.0.1:5000/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 'user': user, 'cart': cart }),
            })
                .then((res) => { console.log(res); return res.json() })
                .then((data) => setClientSecret(data['clientSecret']));
        }
    }, []);

    // constants for configuring appearance and props for the Elements
    const appearance = {
        theme: 'night',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className='container'>
            {(clientSecret &&
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>)
            }
        </div>
    )
}

export default Checkout;