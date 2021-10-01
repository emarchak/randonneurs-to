import React from 'react'
import { slide as Burger } from 'react-burger-menu'
import { Link } from "./link"

import { routes as lonelinessRoutes } from 'src/pages/loneliness'
import { routes as seasonsRoutes } from 'src/pages/seasons'
import { routes as registrationRoutes } from 'src/pages/registration'
import { routes as shopRoutes } from 'src/pages/shop'

import * as styles from './styles/menu.module.scss'

export const menuConfig = {
  pageWrapId: 'pageWrap', outerContainerId: 'outerContainer',
}

const spacing = {
  large: '2.25rem',
  normal: '1.45rem'
}

const crossButtonHeight = '2rem'

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
    borderLeft: '0.1rem solid #bfbfbf',
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

const SectionTitle = (props: any) => <Link {...props} className={styles.link} />
const SectionItem = (props: any) => <li><Link {...props} className={styles.linkSecondary} /></li>
const List = (props: any) => <ul {...props} className={styles.list} />
const ListItem = (props: any) => <ul {...props} className={styles.listItem} />

const renderSectionItems = page => <SectionItem key={page.route} to={page.route}>{page.description || page.label}</SectionItem>

export const Menu = ({ isOpen, onMenuChange }: MenuProps) => (
  <Burger {...menuConfig} styles={menuStyles} isOpen={isOpen} onStateChange={onMenuChange} customBurgerIcon={false} right>
    <List>
      <ListItem><SectionTitle to='/'>Home</SectionTitle></ListItem>
      <ListItem>
        <SectionTitle to='/registration/'>Register for a ride</SectionTitle>
        <List>
          {registrationRoutes.map(renderSectionItems)}
        </List>
      </ListItem>
      <ListItem>
        <SectionTitle>Seasons</SectionTitle>
        <List>
        {seasonsRoutes.map(renderSectionItems)}
        </List>
      </ListItem>
      <ListItem>
        <SectionTitle>Shop</SectionTitle>
        <List>
        {shopRoutes.map(renderSectionItems)}
        </List>
      </ListItem>
      <ListItem>
        <SectionTitle href='http://randonneursontario.ca'>Randonneurs Ontario</SectionTitle>
        <List>
          <SectionItem href='https://ridewithgps.com/organizations/1406-randonneurs-ontario/events'>Events</SectionItem>
          <SectionItem href='https://ridewithgps.com/organizations/1406-randonneurs-ontario/events'>Blog</SectionItem>
        </List>
      </ListItem>
    </List>
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
