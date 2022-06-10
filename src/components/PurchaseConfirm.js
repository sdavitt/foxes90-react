import { useEffect } from "react";

const PurchaseConfirm = (props) => {
    // how do I want to gain access to the confirmation number here in this component
    // option 1 - props
    // option 2 - a state variable in our application context
    useEffect(()=>{console.log(props.confirmData.num);}, [props]);
    return (
        <>
            <div className="row mt-3 justify-content-center">
                <h1>Thank you for adopting a new pet!</h1>
            </div>
            <div className="row mt-3 justify-content-center">
                <h3>Here is your confirmation number: {props.confirmData.num}</h3>
            </div>
        </>
    )
}

export default PurchaseConfirm;