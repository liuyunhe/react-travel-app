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

export class HomePage extends React.Component {
  render() {
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
                爆款推荐
              </Typography.Title>
            }
            sideImage={sideImage1}
            products={productList1}
          />
          {/* 新品上市 */}
          <ProductCollection
            title={
              <Typography.Title level={3} type="danger">
                新品上市
              </Typography.Title>
            }
            sideImage={sideImage2}
            products={productList2}
          />
          {/* 国内游推荐 */}
          <ProductCollection
            title={
              <Typography.Title level={3} type="success">
                国内游推荐
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
