import App from './App';
import DataProvider from './DataProvider';
// firebase related imports
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// reactfire imports
import { useFirebaseApp, AuthProvider, DatabaseProvider } from 'reactfire';

const ProviderLayer = () => {
    const app = useFirebaseApp(); // access our firebase app from the FirebaseAppProvider

    // grab the auth system for this firebase app (call to a firebase function not a reactfire hook)
    const auth = getAuth(app);

    // grab the realtime database system from firebase
    const db = getDatabase(app);

    return (
        <AuthProvider sdk={auth}>
            <DatabaseProvider sdk={db}>
                <DataProvider>
                    <App />
                </DataProvider>
            </DatabaseProvider>
        </AuthProvider>
    )
}

export default ProviderLayer;