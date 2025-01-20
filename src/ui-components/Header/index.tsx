import React, { FC, ReactNode } from "react"
import styles from "./Header.module.scss"

const Header: FC<{
	title: string
	description?: ReactNode
	showInfo?: ReactNode
}> = ({ title, description, showInfo }) => {
	return (
		<header className={styles["homepage__header"]}>
			<div className={styles["homepage__header-content"]}>
				<h1 className={styles["homepage__title"]}>{title}</h1>
				<div className={styles["homepage__subtitle"]}>
					{description}
				</div>
			</div>
			{showInfo}
		</header>
	)
}

export default Header
