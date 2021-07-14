import React from 'react'
import styles from './SideMenu.module.css'
import { sideMenuList } from './mockup'
import { Menu } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'

export const SideMenu: React.FC = () => {
  return (
    <Menu mode="vertical" className={styles['side-menu']}>
      {sideMenuList.map((m, i) => (
        <Menu.SubMenu
          key={`side-menu-${i}`}
          title={
            <span>
              <GlobalOutlined />
              {m.title}
            </span>
          }
        >
          {m.subMenu.map((sm, si) => (
            <Menu.SubMenu
              key={`sub-menu-${i}-${si}`}
              title={
                <span>
                  <GlobalOutlined />
                  {sm.title}
                </span>
              }
            >
              {sm.subMenu.map((sms, ssi) => (
                <Menu.Item key={`sub-sub-menu-${i}-${si}-${ssi}`}>
                  <span>
                    <GlobalOutlined />
                    {sms}
                  </span>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  )
}
