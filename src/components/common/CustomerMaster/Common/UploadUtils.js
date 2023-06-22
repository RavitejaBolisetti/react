import React from 'react';
import { Button, Typography, Upload, Row, Col, Empty, Image, Card, Space, Avatar } from 'antd';
import { HiCheck } from 'react-icons/hi';
import styles from 'components/common/Common.module.css';

const { Dragger } = Upload;
const { Text, Title } = Typography;

const UploadUtils = (props) => {
    const { uploadTitle, uploadDescription, uploadBtnName, isViewModeVisible } = props;

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
                    <Card style={{ border: '1px dashed #B5B5B5' }}>
                        <Space direction="vertical">
                            <Space>
                                <Avatar icon={<HiCheck />} />
                                <div>
                                    <Title level={5}>Upload Successful</Title>
                                    <Text>File type should be .png and .jpg and max file size to be 5Mb</Text>
                                </div>
                            </Space>
                            <Space>
                                <Image style={{ borderRadius: '6px' }} width={150} preview={false} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
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
