/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Typography, Image, Card, Space, Avatar } from 'antd';
import { connect } from 'react-redux';

import { HiCheck } from 'react-icons/hi';
import styles from 'components/common/Common.module.css';

const { Text, Title } = Typography;

const UploadUtilsMain = (props) => {
    const { uploadImgTitle, viewDocument, formData } = props;

    return (
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
                        <Image style={{ borderRadius: '6px' }} width={150} preview={false} src={`data:image/png;base64,${viewDocument?.base64}` || `data:image/png;base64,${formData?.viewDocument?.base64}`} />
                        <Button type="link">Replace Image</Button>
                    </Space>
                </Space>
            </Card>
        </>
    );
};
const UploadUtils = connect()(UploadUtilsMain);

export default UploadUtils;
