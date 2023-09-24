/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form } from 'antd';

import { connect } from 'react-redux';

import { tableColumn } from './tableColumn';
import styles from 'assets/sass/app.module.scss';
import { ListDataTable } from 'utils/ListDataTable';
import { VehicleDeliveryNoteFormButton } from '../VehicleDeliveryNoteFormButton';

export const DeliverableChecklistMasterBase = (props) => {
    const { section, deliveryNoteOnFinish, form, handleFormValueChange, setButtonData, buttonData } = props;

    useEffect(() => {
        setButtonData({ ...buttonData, formBtnActive: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleFieldsChange = () => {};

    const onFinishFailed = () => {};

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFieldsChange} onFinish={deliveryNoteOnFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBodyRight}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Row>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <h2>{section?.title}</h2>
                            </Col>
                        </Row>

                        <ListDataTable pagination={false} tableColumn={tableColumn()} showAddButton={false} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <VehicleDeliveryNoteFormButton {...props} />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const DeliverableChecklistMaster = connect(null, null)(DeliverableChecklistMasterBase);
