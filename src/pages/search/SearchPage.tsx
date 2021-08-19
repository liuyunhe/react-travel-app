import React, { useEffect } from 'react'
import { Header, Footer, FilterArea, ProductList } from '../../components'
import styles from './SearchPage.module.css'
import { useParams } from 'react-router'
import { Spin } from 'antd'
import { searchProduct } from '../../redux/productSearch/slice'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

interface MatchParams {
  keywords: string
}

export const SearchPage: React.FC = () => {
  const { keywords } = useParams<MatchParams>()
  const loading = useSelector((state) => state.productSearch.loading)
  const error = useSelector((state) => state.productSearch.error)
  const productList = useSelector((state) => state.productSearch.data)
  const pagination = useSelector((state) => state.productSearch.pagination)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(searchProduct({ keywords, nextPage: 1, pageSize: 10 }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]) // location盯住url变化

  const onPageChange = (nextPage, pageSize) => {
    dispatch(searchProduct({ keywords, nextPage, pageSize }))
  }

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
        {/* 分类过滤器 */}
        <div className={styles['product-list-container']}>
          <FilterArea />
        </div>
        {/* 产品列表  */}
        <div className={styles['product-list-container']}>
          <ProductList
            data={productList}
            paging={pagination}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}
