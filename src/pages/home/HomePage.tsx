import React from 'react'
import {
  Header,
  Footer,
  SideMenu,
  Carousel,
  ProductCollection,
  BusinessPartners
} from '../../components'
import { Row, Col, Typography } from 'antd'
import {
  productList1,
  productList2,
  productList3
} from '../../pages/home/mockups'
import sideImage1 from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import styles from './HomePage.module.css'
import { withTranslation, WithTranslation } from 'react-i18next'

class HomePageComponent extends React.Component<WithTranslation> {
  render() {
    const { t } = this.props

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
            products={productList1}
          />
          {/* 新品上市 */}
          <ProductCollection
            title={
              <Typography.Title level={3} type="danger">
                {t('home_page.new_arrival')}
              </Typography.Title>
            }
            sideImage={sideImage2}
            products={productList2}
          />
          {/* 国内游推荐 */}
          <ProductCollection
            title={
              <Typography.Title level={3} type="success">
                {t('home_page.domestic_travel')}
              </Typography.Title>
            }
            sideImage={sideImage3}
            products={productList3}
          />
          {/* 合作企业 */}
          <BusinessPartners />
        </div>
        <Footer />
      </>
    )
  }
}

export const HomePage = withTranslation()(HomePageComponent)
