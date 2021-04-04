import React from 'react'
import { Link } from 'gatsby'

import styles from './styles/tabmenu.module.scss'

type tab = {
    label: string,
    route: string
}

type Props = {
    tabs: tab[],
    activeRoute: string
}

export const TabMenu = ({ tabs, activeRoute }: Props) => (
    <menu className={styles.tabmenu}>
        <ul className={styles.tabmenuList}>
            {tabs.map(tab => (
                <li key={tab.route} className={styles.tabmenuListItem}>
                    <Link to={tab.route} className={[
                        styles.tabmenuLink,
                        ...(activeRoute === tab.route ? [styles.tabmenuLinkActive] : [])
                    ].join(' ')}>
                        {tab.label}
                    </Link>
                </li>
            )
            )}
        </ul>
    </menu>
)

