import React from 'react'
import {
  Header,
  Footer,
  SideMenu,
  Carousel,
  ProductCollection,
  BusinessPartners
} from '../../components'
import { Row, Col, Typography, Spin } from 'antd'
// import {
//   productList1,
//   productList2,
//   productList3
// } from '../../pages/home/mockups'
import sideImage1 from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import styles from './HomePage.module.css'
import { withTranslation, WithTranslation } from 'react-i18next'
// import axios from 'axios'
import { connect } from 'react-redux'
import { RootState } from '../../redux/store'
// import { Dispatch } from 'redux'
import {
  // fetchRecommendProductFailActionCreator,
  // fetchRecommendProductStartActionCreator,
  // fetchRecommendProductSuccessActionCreator,
  giveMeDataActionCreator
} from '../../redux/recommendProducts/recommendProductsActions'

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchStart: () => {
    //   dispatch(fetchRecommendProductStartActionCreator())
    // },
    // fetchSuccess: (data) => {
    //   dispatch(fetchRecommendProductSuccessActionCreator(data))
    // },
    // fetchError: (e) => {
    //   dispatch(fetchRecommendProductFailActionCreator(e))
    // },
    giveMeData: () => {
      dispatch(giveMeDataActionCreator())
    }
  }
}

type PropsType = WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

class HomePageComponent extends React.Component<PropsType> {
  componentDidMount() {
    // this.props.fetchStart()
    // try {
    //   const { data } = await axios.get('/api/productCollections')
    //   this.props.fetchSuccess(data)
    // } catch (error) {
    //   this.props.fetchSuccess([productList1, productList2, productList3])
    // }
    this.props.giveMeData()
  }

  render() {
    const { t, productList, error, loading } = this.props

    if (loading) {
      return (
        <Spin
          size="large"
          style={{
            marginTop: 200,
            marginBottom: 200,
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%'
          }}
        />
      )
    }
    if (error !== null) {
      return <div>网站出错：{error}</div>
    }
    return (
      <>
        <Header />
        {/* 页面内容 */}
        <div className={styles['page-content']}>
          <Row style={{ marginTop: 20 }}>
            {/* 菜单 */}
            <Col span={6}>
              <SideMenu />
            </Col>
            {/* 轮播图 */}
            <Col span={18}>
              <Carousel />
            </Col>
          </Row>
          {/* 爆款推荐 */}
          <ProductCollection
            title={
              <Typography.Title level={3} type="warning">
                {t('home_page.hot_recommended')}
              </Typography.Title>
            }
            sideImage={sideImage1}
            products={productList[0]}
          />
          {/* 新品上市 */}
          <ProductCollection
            title={
              <Typography.Title level={3} type="danger">
                {t('home_page.new_arrival')}
              </Typography.Title>
            }
            sideImage={sideImage2}
            products={productList[1]}
          />
          {/* 国内游推荐 */}
          <ProductCollection
            title={
              <Typography.Title level={3} type="success">
                {t('home_page.domestic_travel')}
              </Typography.Title>
            }
            sideImage={sideImage3}
            products={productList[2]}
          />
          {/* 合作企业 */}
          <BusinessPartners />
        </div>
        <Footer />
      </>
    )
  }
}

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(HomePageComponent))
