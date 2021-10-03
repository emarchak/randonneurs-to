import React from 'react'
import { Link, navigate } from 'gatsby'
import routes from './routes'
import * as styles from '../styles/tabmenu.module.scss'

type RouteSection = keyof typeof routes

type TabMenuProps = {
    activeRoute: string
    section: RouteSection
}

const isActive = (route: string, activeRoute: string) => route === activeRoute

export const TabMenu = ({ activeRoute , section }: TabMenuProps) => {
    const tabs = routes[section]
    return (
    <menu className={styles.tabmenu}>
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
                        ...(isActive(activeRoute, tab.route) ? [styles.tabmenuLinkActive] : [])
                    ].join(' ')}>
                        {tab.label}
                    </Link>
                </li>
            )
            )}
        </ul>
    </menu>
)}

