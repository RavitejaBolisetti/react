/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect } from 'react';
import { Row, Col, Space, Form, Card } from 'antd';

import { VehicleDetailFormButton } from '../VehicleDetailFormButton';

import styles from 'components/common/Common.module.css';

export const ComingSoonMasterBase = (props) => {
    const { form, fetchList, userId, isDataLoaded,  listShowLoading, showGlobalNotification, handleButtonClick, NEXT_ACTION } = props;
    const { section, selectedRecordId  } = props;

    const extraParams = [
        {
            key: 'vin',
            title: 'vin',
            value: selectedRecordId,
            name: 'VIN ',
        },
    ];
    const errorAction = (message) => {
        // showGlobalNotification(message);
    };

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, errorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    const myProps = {
        ...props,
        buttonData: { ...props.buttonData, nextBtn: true, saveBtn: false },
    };

    const onFinish = (values) => {
        handleButtonClick({ record: undefined, buttonAction: NEXT_ACTION });
    };
    const onFinishFailed = () => {};

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    <Space size="middle" direction="vertical" className={styles.accordianContainer}>
                        <Card>Coming Soon</Card>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleDetailFormButton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const ComingSoonMaster = ComingSoonMasterBase;
