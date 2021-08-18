import React, { useEffect, useState } from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom'
import axios from 'axios'
import {
  Anchor,
  Col,
  DatePicker,
  Divider,
  Menu,
  Row,
  Spin,
  Typography
} from 'antd'
import styles from './DetailPage.module.css'
import { Header, Footer, ProductIntro, ProductComments } from '../../components'
import { commentMockData } from './mockup'
const { RangePicker } = DatePicker

interface MatchParams {
  touristRouteId: string
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = () =>
  // props
  {
    const { touristRouteId } = useParams<MatchParams>()

    const [loading, setLoading] = useState<boolean>(true)
    const [product, setProduct] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true)
        try {
          const { data } = await axios.get(
            `/api/touristRoutes/${touristRouteId}`
          )
          setProduct(data)
          setLoading(false)
        } catch (e) {
          setError(e.message)
          setLoading(false)
        }
      }
      fetchData()
    }, [])
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
        <div className={styles['page-content']}>
          {/* 产品简介 与 日期选择 */}
          <div className={styles['product-intro-container']}>
            <Row>
              <Col span={13}>
                <ProductIntro
                  title={product.title}
                  shortDescription={product.description}
                  price={product.originalPrice}
                  coupons={product.coupons}
                  points={product.points}
                  discount={product.price}
                  rating={product.rating}
                  pictures={product.touristRoutePictures.map((p) => p.url)}
                />
              </Col>
              <Col span={11}>
                <RangePicker open style={{ marginTop: 20 }} />
              </Col>
            </Row>
          </div>
          {/* 锚点菜单 */}
          <Anchor className={styles['product-detail-anchor']}>
            <Menu mode="horizontal">
              <Menu.Item key={1}>
                <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
              </Menu.Item>
              <Menu.Item key={3}>
                <Anchor.Link href="#fees" title="费用"></Anchor.Link>
              </Menu.Item>
              <Menu.Item key={4}>
                <Anchor.Link href="#notes" title="预订须知"></Anchor.Link>
              </Menu.Item>
              <Menu.Item key={5}>
                <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
              </Menu.Item>
            </Menu>
          </Anchor>
          {/* 产品特色 */}
          <div id="feature" className={styles['product-detail-container']}>
            <Divider orientation={'center'}>
              <Typography.Title level={3}>产品特色</Typography.Title>
            </Divider>
            <div
              dangerouslySetInnerHTML={{ __html: product.features }}
              style={{ margin: 50 }}
            ></div>
          </div>
          {/* 费用 */}
          <div id="fees" className={styles['product-detail-container']}>
            <Divider orientation={'center'}>
              <Typography.Title level={3}>费用</Typography.Title>
            </Divider>
            <div
              dangerouslySetInnerHTML={{ __html: product.fees }}
              style={{ margin: 50 }}
            ></div>
          </div>
          {/* 预订须知 */}
          <div id="notes" className={styles['product-detail-container']}>
            <Divider orientation={'center'}>
              <Typography.Title level={3}>预订须知</Typography.Title>
            </Divider>
            <div
              dangerouslySetInnerHTML={{ __html: product.notes }}
              style={{ margin: 50 }}
            ></div>
          </div>
          {/* 商品评价*/}
          <div id="comments" className={styles['product-detail-container']}>
            <Divider orientation={'center'}>
              <Typography.Title level={3}>用户评价</Typography.Title>
            </Divider>
            <div style={{ margin: 40 }}>
              <ProductComments data={commentMockData} />
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
    // return <h1>旅游路线详情页面，路线ID:{props.match.params.touristRouteId}</h1>
  }
