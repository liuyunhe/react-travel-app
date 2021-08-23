import React, {
  useEffect
  // useState
} from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom'
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
import { ProductIntro, ProductComments } from '../../components'
import { MainLayout } from '../../layout/mainLayout'
import { commentMockData } from './mockup'
import {
  // productDetailSlice,
  getProductDetail
} from '../../redux/productDetail/slice'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
const { RangePicker } = DatePicker

interface MatchParams {
  touristRouteId: string
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = () =>
  // props
  {
    const { touristRouteId } = useParams<MatchParams>()

    // const [loading, setLoading] = useState<boolean>(true)
    // const [product, setProduct] = useState<any>(null)
    // const [error, setError] = useState<string | null>(null)
    const loading = useSelector((state) => state.productDetail.loading)
    const error = useSelector((state) => state.productDetail.error)
    const product = useSelector((state) => state.productDetail.data)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getProductDetail(touristRouteId))
      // dispatch(productDetailSlice.actions.fetchStart())
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <MainLayout>
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
      </MainLayout>
    )
    // return <h1>旅游路线详情页面，路线ID:{props.match.params.touristRouteId}</h1>
  }
