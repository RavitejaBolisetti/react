import React from 'react';
import { Button, Col, Form, Row, Empty, Input, Tree } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import styles from 'pages/common/Common.module.css';
import styled from '../Common.module.css';


let treedata = [];

const ViewApplicationDetails = () => {


  return (
    <div>
         <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <div className={styles.contentHeaderBackground}>
                            <Row gutter={20}>
                                <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                    <p style={{ fontSize: '16px', padding: '6px' }}> Application Details</p>
                                </Col>
                            </Row>
                        </div>
                        <div className={styled.content}>
                            {!treedata ? (
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        imageStyle={{
                                            height: 60,
                                        }}
                                        description={
                                            <>
                                                <span>Select Tree Leaf to view Details.</span>
                                            </>
                                        }
                                    ></Empty>
                                </Col>
                            ) : (
                                // <Row>
                                //     <Col>
                                //     </Col>
                                // </Row>
                                // <Row>

                                // </Row>



                                'DATA'


                            )}
                        </div>
                    </Col>
    </div>
  )
}

export default ViewApplicationDetails