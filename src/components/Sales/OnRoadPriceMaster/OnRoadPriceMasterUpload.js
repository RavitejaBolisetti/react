/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import { Row, Col, Form, Button, Space } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { PARAM_MASTER } from 'constants/paramMaster';
import { UploadUtil } from 'utils/Upload'; 
import styles from 'assets/sass/app.module.scss';

const OnRoadPriceMasterUploadMain = (uploadProps) => {
    const { listShowLoading, downloadFile, form, formData, onCloseAction, onFinish, onFinishFailed } = uploadProps;

    const { handleButtonClick } = uploadProps;
    const { typeData, userId } = uploadProps;

    const defaultBtnVisiblity = { editBtn: false, saveBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: true, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const handleTemplateDownLoad = () => {
        const filteredTypeData = typeData[PARAM_MASTER.FILE_DOWNLOAD_TMPLT.id].filter((value) => value.key === PARAM_MASTER.ONRDPRCMSTTMPLT.id);

        let templateID = null;
        if (filteredTypeData.length === 1) {
            templateID = filteredTypeData[0];
        }
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: templateID?.value,
                name: 'docId',
            },
        ];
        downloadFile({ setIsLoading: listShowLoading, userId, extraParams });
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Space direction="vertical">
                            <Space className={styles.accordianIconWithText}>On Road Price Master Form</Space>
                            <Space> Please download "OnRoad Price Template" using below button</Space>
                            <Space>
                                <Button type="primary" onClick={handleTemplateDownLoad} >
                                    Download Template
                                </Button>
                            </Space>
                        </Space>
                    </div>

                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <UploadUtil {...uploadProps} handleFormValueChange={handleFormValueChange} />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const OnRoadPriceMasterUpload = withDrawer(OnRoadPriceMasterUploadMain, {});
