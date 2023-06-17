import React from 'react';
import { Button, Typography, Upload, Row, Col, Space, Image, Card } from 'antd';

import Svg from 'assets/images/Filter.svg';
import { FaCheckCircle } from 'react-icons/fa';
import styles from '../../../Common.module.css';

const { Dragger } = Upload;
const { Text, Title } = Typography;

const UploadUtils = (props) => {
    const { uploadTitle, uploadDescription, uploadBtnName, isViewModeVisible } = props;
    
    return (
        <>
            {!isViewModeVisible ? (
                <Row gutter={20} justify="center" style={{ marginBotton: '40px' }} className={styles.uploadContainer}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Dragger {...props}>
                            <Space gutter={20} direction="vertical">
                                <Row gutter={20} justify="center">
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <img src={Svg} alt="message icon" />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Text strong>{uploadTitle || 'Upload Your Profile Picture temp'}</Text>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Text>{uploadDescription || 'File type should be .png and .jpg and max file size to be 5MB temp '}</Text>
                                    </Col>
                                </Row>
                                <Row justify="center">
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Button danger>{uploadBtnName || 'Upload File temp'}</Button>
                                    </Col>
                                </Row>
                            </Space>
                        </Dragger>
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
