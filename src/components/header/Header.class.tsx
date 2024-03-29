import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { RootState } from '../../redux/store'
import store from '../../redux/store'
// import { languageState } from '../../redux/language/languageReducer'
import {
  addLanguageActionCreator,
  changeLanguageActionCreator
  // LanguageActionTypes
} from '../../redux/language/languageActions'
import { withTranslation, WithTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

// interface State extends languageState {}

const mapStateToProps = (state: RootState) => {
  return {
    language: state.language.language,
    languageList: state.language.languageList
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (code: 'zh' | 'en') => {
      const action = changeLanguageActionCreator(code)
      dispatch(action)
    },
    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name, code)
      dispatch(action)
    }
  }
}

type PropsType = RouteComponentProps & // react-router 路由类型
  WithTranslation & // i18n props类型
  ReturnType<typeof mapStateToProps> & // redux store 映射类型
  ReturnType<typeof mapDispatchToProps> // redux dispatch 映射类型

class HeaderComponent extends React.Component<PropsType> {
  // constructor(props) {
  //   super(props)
  //   const storeState = store.getState()
  //   this.state = {
  //     language: storeState.language,
  //     languageList: storeState.languageList
  //   }
  //   store.subscribe(() => {
  //     this.setState(this.handleStoreChange)
  //   })
  // }

  // handleStoreChange = () => {
  //   const storeState = store.getState()
  //   this.setState({
  //     language: storeState.language,
  //     languageList: storeState.languageList
  //   })
  // }

  menuClickHandler = (e) => {
    console.log(e)
    if (e.key === 'new') {
      // 处理新语言添加
      // const action: LanguageActionTypes = {
      //   type: 'add_language',
      //   payload: {
      //     code: 'new_language',
      //     name: '新语言'
      //   }
      // }
      // store.dispatch(action)
      this.props.addLanguage('新语言', 'new_language')
    } else {
      // const action: LanguageActionTypes = {
      //   type: 'change_language',
      //   payload: e.key
      // }
      // store.dispatch(action)
      this.props.changeLanguage(e.key)
    }
  }

  render() {
    const { history, t } = this.props
    return (
      <div className={styles['app-header']}>
        {/* top-header */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>{t('header.slogan')}</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu onClick={this.menuClickHandler}>
                  {this.props.languageList.map((l) => {
                    return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                  })}
                </Menu>
              }
              icon={<GlobalOutlined />}
            >
              {this.props.language === 'zh' ? '中文' : 'English'}
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Button onClick={() => history.push('/register')}>
                {t('header.register')}
              </Button>
              <Button onClick={() => history.push('/signIn')}>
                {t('header.signin')}
              </Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <span onClick={() => history.push('/')}>
            <img className={styles['App-logo']} src={logo} alt="" />
            <Typography.Title level={3} className={styles.title}>
              {t('header.title')}
            </Typography.Title>
          </span>

          <Input.Search
            className={styles['search-input']}
            placeholder="请输入旅游目的地、主题、或关键字"
          />
        </Layout.Header>
        <Menu mode={'horizontal'} className={styles['main-menu']}>
          <Menu.Item key="1"> {t('header.home_page')} </Menu.Item>
          <Menu.Item key="2"> {t('header.weekend')} </Menu.Item>
          <Menu.Item key="3"> {t('header.group')} </Menu.Item>
          <Menu.Item key="4"> {t('header.backpack')} </Menu.Item>
          <Menu.Item key="5"> {t('header.private')} </Menu.Item>
          <Menu.Item key="6"> {t('header.cruise')} </Menu.Item>
          <Menu.Item key="7"> {t('header.hotel')} </Menu.Item>
          <Menu.Item key="8"> {t('header.local')} </Menu.Item>
          <Menu.Item key="9"> {t('header.theme')} </Menu.Item>
          <Menu.Item key="10"> {t('header.custom')} </Menu.Item>
          <Menu.Item key="11"> {t('header.study')} </Menu.Item>
          <Menu.Item key="12"> {t('header.visa')} </Menu.Item>
          <Menu.Item key="13"> {t('header.enterprise')} </Menu.Item>
          <Menu.Item key="14"> {t('header.high_end')} </Menu.Item>
          <Menu.Item key="15"> {t('header.outdoor')} </Menu.Item>
          <Menu.Item key="16"> {t('header.insurance')} </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(withRouter(HeaderComponent)))
