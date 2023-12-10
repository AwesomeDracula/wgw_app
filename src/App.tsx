import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';

import { ThemeProvider } from '@/theme';
import { Provider } from 'react-redux';
import ApplicationNavigator from './navigators/Application';
import './translations';
import { store } from './store/store';

const queryClient = new QueryClient();

export const storage = new MMKV();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider storage={storage}>
				<Provider store={store}>
					<ApplicationNavigator />
				</Provider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
