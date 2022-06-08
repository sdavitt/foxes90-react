import App from './App';
import DataProvider from './DataProvider';
// firebase related imports
import { getAuth } from 'firebase/auth';
// reactfire imports
import { useFirebaseApp, AuthProvider } from 'reactfire';

const ProviderLayer = () => {
    const app = useFirebaseApp(); // access our firebase app from the FirebaseAppProvider

    // grab the auth system for this firebase app (call to a firebase function not a reactfire hook)
    const auth = getAuth(app);

    return (
        <AuthProvider sdk={auth}>
            <DataProvider>
                <App />
            </DataProvider>
        </AuthProvider>
    )
}

export default ProviderLayer;