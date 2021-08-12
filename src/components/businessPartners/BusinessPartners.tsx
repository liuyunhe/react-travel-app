import React from 'react'
import { Row, Col, Typography, Divider } from 'antd'
import styles from './BusinessPartners.module.css'
import { useTranslation } from 'react-i18next'

import image1 from '../../assets/images/microsoft-80658_640.png'
import image2 from '../../assets/images/icon-720944_640.png'
import image3 from '../../assets/images/follow-826033_640.png'
import image4 from '../../assets/images/facebook-807588_640.png'

const companies = [
  { src: image1, title: 'Microsoft' },
  { src: image2, title: 'Youtube' },
  { src: image3, title: 'Ins' },
  { src: image4, title: 'Facebook' }
]

export const BusinessPartners: React.FC = (props) => {
  const { t } = useTranslation()
  return (
    <div className={styles.content}>
      <Divider orientation="left">
        <Typography.Title level={3}>
          {t('home_page.joint_venture')}
        </Typography.Title>
      </Divider>
      <Row style={{ alignItems: 'center' }}>
        {companies.map((c, index) => (
          <Col span={6} key={'bussiness-partner-' + index}>
            <img
              alt="bussiness-partner"
              src={c.src}
              style={{
                width: '80%',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}
