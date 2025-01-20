import { Outlet } from "react-router-dom"
import { HomepageProvider } from "../../context/HomepageProvider"

const HomepageLayout: React.FC = (): JSX.Element => {
	return (
		<HomepageProvider>
			<Outlet />
		</HomepageProvider>
	)
}

export default HomepageLayout
