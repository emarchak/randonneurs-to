import React from 'react'
import { Link } from 'gatsby'

import styles from './styles/tabmenu.module.scss'

type tab = {
    label: string,
    route: string
}

type Props = {
    tabs: tab[]
}

export const TabMenu = ({ tabs }: Props) => (
    <menu className={styles.tabmenu}>
        <ul className={styles.tabmenuList}>
            {tabs.map(tab => (
                <li className={styles.tabmenuListItem}>
                    <Link to={tab.route} className={styles.tabmenuLink} activeClassName={styles.tabmenuLinkActive}>
                        {tab.label}
                    </Link>
                </li>
            ))}
        </ul>
    </menu>
)

