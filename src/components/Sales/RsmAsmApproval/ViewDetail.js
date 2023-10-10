/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Card, Descriptions, Divider } from 'antd';
import styles from 'assets/sass/app.module.scss';
import { withDrawer } from 'components/withDrawer';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { RsmAsmApprovalButtons } from './RsmAsmApprovalButtons';
import { getCodeValue } from 'utils/getCodeValue';

const ViewDetailMain = (props) => {
    const { formData, typeData, isLoading, onCloseAction, buttonData, setButtonData, handleButtonClick, handleRequest } = props;

    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
        // setRejectRequest,
        handleRequest,
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
                        <Descriptions {...viewOneColProps}>
                            <Descriptions.Item label="Request Type">{checkAndSetDefaultValue(formData?.requestType, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Request Status">{checkAndSetDefaultValue(getCodeValue(typeData?.CDLR_INV_APP_STATUS, formData?.requestStatus), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Request Number">{checkAndSetDefaultValue(formData?.requestNumber, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Request Date">{checkAndSetDefaultValue(formData?.requestDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                            <Descriptions.Item label="Delivery Note/Invoice ID">{checkAndSetDefaultValue(formData?.deliveryOrInvoiceId, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Delivery Note/Invoice Date">{checkAndSetDefaultValue(formData?.deliveryOrInvoiceDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                            <Descriptions.Item label="Dealer Name">{checkAndSetDefaultValue(formData?.dealerName, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Col>
            </Row>
            <RsmAsmApprovalButtons {...buttonProps} />
        </>
    );
};

export const ViewDetail = withDrawer(ViewDetailMain, {});
