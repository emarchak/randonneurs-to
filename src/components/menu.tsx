import React from 'react'
import { slide as Burger } from 'react-burger-menu'
import { Link } from 'gatsby'

export const menuConfig = {
  pageWrapId: 'pageWrap', outerContainerId: 'outerContainer',
}
import styles from './styles/menu.module.scss'

const spacing = {
  large: '2.25rem',
  normal: '1.45rem'
}

const crossButtonHeight = '0.25rem'

const menuStyles = {
  bmBurgerBarsHover: {
    background: 'hsla(0, 0%, 0%, 0.5)',
  },
  bmCrossButton: {
    height: crossButtonHeight,
    width: crossButtonHeight,
  },
  bmCross: {
    background: 'hsla(0, 0%, 0%, 0.8)',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    boxShadow: '3px 3px 5px 3px hsla(0, 0%, 0%, 0.1)'
  },
  bmMenu: {
    background: '#d8d8d8',
    padding: `${spacing.large} ${spacing.normal} 0`,
  },
  bmOverlay: {
    background: 'hsla(0, 0%, 0%, 0.3)',
  }
}

export type MenuState = {
  isOpen: boolean
}

type MenuProps = {
  isOpen: boolean,
  onMenuChange?({ }: MenuState): void
}

export const Menu = ({ isOpen, onMenuChange }: MenuProps) => (
  <Burger {...menuConfig} styles={menuStyles} isOpen={isOpen} onStateChange={onMenuChange} customBurgerIcon={false} right>
    <ul className={styles.list}>
      <li className={styles.listItem}><Link className={styles.link} to='/'>Home</Link></li>
      <li className={styles.listItem}>
        <Link className={styles.link} to='/registration'>Register for a ride</Link>
        <ul className={styles.list}>
          <li><a className={styles.linkSecondary} href='http://randonneursontario.ca/who/how.html'>Become a member</a></li>
          <li><Link className={styles.linkSecondary} to='/registration'>Scheduled rides</Link></li>
          <li><Link className={styles.linkSecondary} to='/registration/permanent'>Permanents</Link></li>
        </ul>
      </li>
      <li className={styles.listItem}><Link className={styles.link} to='/loneliness'>Club audax à distance</Link></li>
      <li className={styles.listItem}>
        <a className={styles.link} href='http://randonneursontario.ca'>Randonneurs Ontario</a>
        <ul className={styles.list}>
          <li><a className={styles.linkSecondary} href='https://ridewithgps.com/organizations/1406-randonneurs-ontario/events'>Events</a></li>
          <li><a className={styles.linkSecondary} href='https://ridewithgps.com/organizations/1406-randonneurs-ontario/events'>Blog</a></li>
        </ul>

      </li>
    </ul>
  </Burger>
)

type MenuTriggerProps = {
  onTrigger(): void
}

export const MenuTrigger = ({ onTrigger }: MenuTriggerProps) => (
  <nav className={styles.triggerWrapper}>
    <button className={styles.triggerButton} onClick={onTrigger}>
      Menu
      <svg className={styles.triggerIcon} viewBox="0 0 105 105" aria-label="Menu">
        <rect width="105" height="15"></rect>
        <rect y="45" width="105" height="15"></rect>
        <rect y="90" width="105" height="15"></rect>
      </svg>
    </button>
  </nav>
)