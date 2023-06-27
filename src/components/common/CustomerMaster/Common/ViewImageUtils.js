/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Button, Typography, Image, Card, Space, Avatar } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';

import { HiCheck } from 'react-icons/hi';
import styles from 'components/common/Common.module.css';

const { Text, Title } = Typography;

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
    const { listShowLoading, userId, uploadFile, fecthViewDocument, listShowLoadingOnLoad, setUploadImgDocId } = props;
    const [uploadedFile, setUploadedFile] = useState();
    const [visible, setVisible] = useState(false);

    const onDrop = (e) => {
        // console.log('Dropped files', e.dataTransfer.files);
    };

    useEffect(() => {
        if (uploadedFile || formData?.docId) {
            setUploadImgDocId(uploadedFile);
            const extraParams = [
                {
                    key: 'docId',
                    title: 'docId',
                    value: uploadedFile || formData?.docId,
                    name: 'docId',
                },
            ];
            fecthViewDocument({ setIsLoading: listShowLoadingOnLoad, userId, extraParams });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadedFile, formData?.docId]);

    return (
        <>
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
                            <Button type="link">Replace Image</Button>
                        </Space>
                    </Space>
                </Card>
            </>
        </>
    );
};
const ViewImageUtils = connect(mapStateToProps, mapDispatchToProps)(ViewImageUtilsMain);

export default ViewImageUtils;
