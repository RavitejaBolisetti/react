import React from 'react';

import { Button, Typography, Upload, Row, Col, Space } from 'antd';

import Svg from 'assets/images/Filter.svg';

import styles from '../../../Common.module.css';
const { Dragger } = Upload;
const { Text } = Typography;

const UploadUtils = (props) => {
    const { uploadTitle, uploadDescription, uploadBtnName } = props;

    return (
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
    );
};

export default UploadUtils;
