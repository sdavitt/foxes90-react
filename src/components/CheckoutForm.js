import { useEffect, useState, useContext } from 'react';
import { DataContext } from '../DataProvider';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';


const CheckoutForm = () => {
    // access our stripe setup using the provided hooks
    const stripe = useStripe();
    const elements = useElements();

    /* Logical Flow for a payment being submitted
    1. Create payment intent based on the cart (done in Checkout page/flask app)
    2. If stripe has loaded, the form is shown and user can submit their payment information
    3. Use the payment information alongside the payment intent to confirm and process the payment thru stripe's api
    4. While we do that, we display the status of the payment (unsubmitted -> processing -> complete/incomplete) (state variables)
    5. Show the confirmation page/clear cart/etc.
    */

    // set up state variables that we'll use to control what is shown on the page as the user pays
    const [showPay, setShowPay] = useState(true); // controls whether or not payment form is submissible
    const [showForm, setShowForm] = useState(true); // controls whether or not the payment form is shown
    const [errorMessage, setErrorMessage] = useState('');

    // rather than using a useEffect hook tied to changes in Stripe, I'm just gonna use a handleSubmit function
    // handlePay -> means the form has been submitted and we want to do our api call to stripe and handle communication with the stripe servers
    const handlePay = async (event) => {
        // stop the form from reloading the page
        event.preventDefault();
        // the actual logic of processing the payment
        // prevent the user from submitting the form multiple times- utilizing our state variables to disable the button
        setShowPay(false);
        // make the relevant stripe api calls to actually confirm the payment
        const data = await stripe.confirmPayment({
            elements,
            redirect: 'if_required' // usually used with a prebuilt checkout page from stripe
        });
        console.log('payment intent received: ', data);
        if (data['error']) {
            setErrorMessage(data['error']['message']); // if there is an error, set the message as our error message state var
            setShowForm('error');
        } else {
            // payment succeeded
            setShowForm(false);
        }
    }
    return (
        <div className="row mt-4 justify-content-center">
            { // large conditional structure for controlling if the form is shown, or an error is shown, or a confirmation is shown
                showForm === true ?
                    <form id="payment-form" onSubmit={handlePay}>
                        <PaymentElement id="payment-element" />
                        <button disabled={!showPay || !stripe || !elements} id="submit">
                            <span id="button-text">
                                {!showPay ? <div className="spinner" id="spinner"></div> : "Pay meow"}
                            </span>
                        </button>
                    </form>
                    : showForm === 'error' ?
                        <div id="payment-message">There was an error processing your payment: {errorMessage}</div>
                        : // implying showForm is false -> our payment has succeeded and we want to show our confirmation page
                        <h1>Success!</h1>
            }

        </div>
    )

}

export default CheckoutForm;