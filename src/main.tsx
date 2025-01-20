import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			retry: false,
		},
	},
})

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>
)
