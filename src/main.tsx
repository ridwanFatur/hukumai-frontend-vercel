import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/query-client.ts'
import GlobalProvider from './global-context/global.tsx'
import ToastProvider from './global-context/toast.tsx'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<GlobalProvider>
				<ToastProvider>
					<App />
				</ToastProvider>
			</GlobalProvider>
		</QueryClientProvider>
	</BrowserRouter>
)
