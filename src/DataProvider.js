import { useState, createContext } from 'react';

const DataProvider = props => {
    // declare any state variables that we want accessible by any children of this provider
    const [cart, setCart] = useState({items: {}, total: 0, size: 0});

    return (
        <DataContext.Provider value={{'cart': cart, 'setCart': setCart}}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;
export let DataContext = createContext();