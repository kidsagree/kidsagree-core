import React from 'react'
import { spring, Motion } from 'react-motion'
import {
  styled,
  theme,
  unselectable,
  spring as springConf,
  IconHome,
  IconSettings,
  IconWallet,
  IconNotifications,
} from '@kidsagree/ui'
import NotificationsPanel from '../NotificationsPanel/NotificationsPanel'
import { lerp } from '../../math-utils'
import MenuPanelAppGroup from './MenuPanelAppGroup'

import logo from './assets/logo.svg'

const appHome = { id: 'home', name: 'Home', icon: <IconHome /> }
const appSettings = { id: 'settings', name: 'Settings', icon: <IconSettings /> }

class MenuPanel extends React.Component {
  state = {
    notificationsOpened: false,
  }
  handleNotificationsClick = () => {
    this.setState({
      notificationsOpened: !this.state.notificationsOpened,
    })
  }
  handleActivateItem = (app, instance) => {
    const { onPathChange } = this.props
    if (app === 'home') {
      return onPathChange('/')
    }
    onPathChange(`/${app}${instance ? `/${instance}` : ''}`)
  }
  render() {
    const { apps, notifications, activeApp, activeInstance } = this.props
    const { notificationsOpened } = this.state
    const menuApps = [appHome, ...apps, appSettings]
    return (
      <Main>
        <In>
          <Header>
            <img src={logo} alt="Kidsagree" height="36" />
            <div className="actions">
              <a role="button" tabIndex="0">
                <IconWallet />
              </a>
              <a
                role="button"
                tabIndex="0"
                onClick={this.handleNotificationsClick}
              >
                <IconNotifications />
              </a>
            </div>
          </Header>
          <Content>
            <div className="in">
              <h1>Apps</h1>
              <ul>
                {menuApps.map(({ id, name, icon, instances = [] }) => (
                  <li key={id}>
                    <MenuPanelAppGroup
                      name={name}
                      icon={icon}
                      appId={id}
                      active={id === activeApp}
                      instances={instances}
                      activeInstance={activeInstance}
                      onActivate={this.handleActivateItem}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Content>
        </In>

        <Motion
          style={{
            openProgress: spring(
              Number(notificationsOpened),
              springConf('fast')
            ),
          }}
        >
          {({ openProgress }) => (
            <NotificationsWrapper
              style={{
                transform: `translateX(${lerp(openProgress, -100, 0)}%)`,
                boxShadow: `1px 0 15px rgba(232, 232, 232, ${openProgress})`,
              }}
            >
              <NotificationsPanel notifications={notifications} />
            </NotificationsWrapper>
          )}
        </Motion>
      </Main>
    )
  }
}

const Main = styled.div`
  flex-shrink: 0;
  top: 0;
  bottom: 0;
  width: 220px;
  ${unselectable};
`

const In = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  border-right: 1px solid #e8e8e8;
  box-shadow: 1px 0 15px #e8e8e8;
`

const NotificationsWrapper = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 220px;
`

const Header = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 64px;
  border-bottom: 1px solid #e8e8e8;

  .actions {
    display: flex;
  }
  .actions a {
    display: flex;
    align-items: center;
    margin-left: 10px;
    color: ${theme.textSecondary};
    cursor: pointer;
    outline: 0;
  }
  .actions a:hover {
    color: ${theme.textPrimary};
  }
`

const Content = styled.nav`
  overflow-y: auto;
  height: 100%;
  .in {
    padding: 10px 0 10px;
  }
  h1 {
    margin: 10px 30px;
    color: ${theme.textSecondary};
    text-transform: lowercase;
    font-variant: small-caps;
    font-weight: 600;
  }
  ul {
    list-style: none;
  }
  li {
    display: flex;
    align-items: center;
  }
`

export default MenuPanel
