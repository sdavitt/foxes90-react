import App from './App';
import DataProvider from './DataProvider';

const ProviderLayer = () => {
    return (
        <DataProvider>
            <App />
        </DataProvider>
    )
}

export default ProviderLayer;