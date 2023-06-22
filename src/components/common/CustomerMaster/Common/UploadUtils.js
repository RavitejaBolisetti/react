
/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Typography, Upload, Row, Col, Empty, Image, Card, Space, Avatar } from 'antd';
import { HiCheck } from 'react-icons/hi';
import styles from 'components/common/Common.module.css';

const { Dragger } = Upload;
const { Text, Title } = Typography;

const UploadUtils = (props) => {
    const { uploadTitle, uploadDescription, uploadBtnName, isViewModeVisible, uploadImgTitle,viewDocument } = props;

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
                                            <span>{uploadTitle || 'Upload Your Profile Picture temp'}</span>
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
                    <Card className={styles.dashedBorder}>
                        <Space direction="vertical">
                            <Space>
                                <Avatar icon={<HiCheck />} />
                                <div>
                                    <Title level={5}>{uploadImgTitle || 'Profile Picture'}</Title>
                                    <Text>File type should be .png and .jpg and max file size to be 5Mb</Text>
                                </div>
                            </Space>
                            <Space>
                                <Image style={{ borderRadius: '6px' }} width={150} preview={false} src={`data:image/png;base64,${viewDocument?.base64}` } />
                                <Button type="link">Replace Image</Button>
                            </Space>
                        </Space>
                    </Card>
                </>
            )}
        </>
    );
};

export default UploadUtils;
