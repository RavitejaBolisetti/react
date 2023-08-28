/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Button, Typography, Image, Card, Space, Avatar, Row, Col, Upload, Empty } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';

import { HiCheck } from 'react-icons/hi';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const { Text, Title } = Typography;
const { Dragger } = Upload;

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            SupportingDocument: { isLoaded: isDataLoaded = false, isLoading },
            CustomerMaster: {
                ViewDocument: { data: viewDocument },
            },
        },
    } = state;

    let returnValue = {
        userId,
        accessToken,
        token,
        isDataLoaded,
        isLoading,
        viewDocument,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            saveData: supportingDocumentDataActions.saveData,
            uploadFile: supportingDocumentDataActions.uploadFile,
            listShowLoading: supportingDocumentDataActions.listShowLoading,

            fecthViewDocument: documentViewDataActions.fetchList,
            listShowLoadingOnLoad: documentViewDataActions.listShowLoading,
        },
        dispatch
    ),
});

const ViewImageUtilsMain = (props) => {
    const { uploadImgTitle, viewDocument, formData } = props;
    const { handleUpload, uploadProps } = props;
    const [visible, setVisible] = useState(false);
    const [showImage, setShowImage] = useState(false);

    const onHandleImage = () => {
        setShowImage(true);
    };

    const onHandleCancel = () => {
        setShowImage(false);
    };
    return (
        <>
            <>
                {formData?.image && !showImage ? (
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
                                <Image
                                    style={{ borderRadius: '6px' }}
                                    width={150}
                                    preview={{
                                        visible,
                                        scaleStep: 0.5,
                                        src: `data:image/png;base64,${viewDocument?.base64}`,
                                        onVisibleChange: (value) => {
                                            setVisible(value);
                                        },
                                    }}
                                    placeholder={<Image preview={false} src={`data:image/png;base64,${viewDocument?.base64}`} width={200} />}
                                    src={`data:image/png;base64,${viewDocument?.base64}`}
                                />
                                <Button onClick={onHandleImage} type="link">
                                    Replace Image
                                </Button>
                            </Space>
                        </Space>
                    </Card>
                ) : showImage ? (
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Dragger customRequest={handleUpload} {...uploadProps}>
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: 100,
                                    }}
                                    description={
                                        <>
                                            <span>
                                                Click or drop your file here to upload the signed and <br />
                                                scanned customer form.
                                            </span>
                                            <span>
                                                <br />
                                                File type should be png, jpg or pdf and max file size to be 5Mb
                                            </span>
                                        </>
                                    }
                                />
                                <Button type="primary">Upload File</Button>
                            </Dragger>
                            <div>
                                <Button onClick={onHandleCancel} type="link">
                                    Cancel Upload
                                </Button>
                            </div>
                        </Col>
                    </Row>
                ) : (
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Dragger customRequest={handleUpload} {...uploadProps}>
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: 100,
                                    }}
                                    description={
                                        <>
                                            <span>
                                                Click or drop your file here to upload the signed and <br />
                                                scanned customer form.
                                            </span>
                                            <span>
                                                <br />
                                                File type should be png, jpg or pdf and max file size to be 5Mb
                                            </span>
                                        </>
                                    }
                                />
                                <Button type="primary">Upload File</Button>
                            </Dragger>
                        </Col>
                    </Row>
                )}
            </>
        </>
    );
};
const ViewImageUtils = connect(mapStateToProps, mapDispatchToProps)(ViewImageUtilsMain);

export default ViewImageUtils;
