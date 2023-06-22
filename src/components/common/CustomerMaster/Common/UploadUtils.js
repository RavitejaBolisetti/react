/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React from 'react';
import { Button, Typography, Upload, Row, Col, Empty, Image, Card } from 'antd';

import { FaCheckCircle } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';

const { Dragger } = Upload;
const { Text, Title } = Typography;

const UploadUtils = (props) => {
    const { uploadTitle, uploadDescription, uploadBtnName, isViewModeVisible,imgUrl } = props;
    
    return (
        <>
            {!isViewModeVisible ? (
                <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.uploadDragger}>
                        <Dragger {...props}>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 100,
                                }}
                                description={
                                    <>
                                        <span>
                                        {uploadTitle || 'Upload Your Profile Picture temp'}
                                        </span>
                                        <span>
                                            <br />
                                            {uploadDescription || 'File type should be .png and .jpg and max file size to be 5MB temp '}
                                        </span>
                                    </>
                                }
                            />

                            <Button type="primary">{uploadBtnName || 'Upload File temp'}</Button>
                        </Dragger>
                    </div>
                </Col>
            </Row>
            ) : (
                <>
                    <Card style={{border: '1px dashed grey'}}>
                        <Row align="middle">
                            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                <FaCheckCircle size={40} fill="#52c41a" />
                            </Col>
                            <Col xs={22} sm={22} md={22} lg={22} xl={22}>
                                <Title level={5}>Upload Successful</Title>
                                <Text>File type should be .png and .jpg and max file size to be 5Mb</Text>
                            </Col>
                        </Row>
                        <Row justify="start" align="bottom">
                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                <Image style={{ borderRadius: '6px' }} width={150} preview={false} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                            </Col>
                            <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                                <Button type="link">Replace Image</Button>
                            </Col>
                        </Row>
                    </Card>
                </>
            )}
        </>
    );
};

export default UploadUtils;
