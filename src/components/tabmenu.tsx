import React from 'react'
import { Link, navigate } from 'gatsby'

import * as styles from './styles/tabmenu.module.scss'

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
        {console.log(activeRoute)}
        <select
            name={'sub menu'}
            onChange={(evt) => { navigate(evt.currentTarget.value) }}
            value={activeRoute}
            className={styles.tabmenuSelect}
        >
            {tabs.map((tab) => (
                <option key={tab.route} value={tab.route}>
                    {tab.label}
                </option>)
            )}
        </select>
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

