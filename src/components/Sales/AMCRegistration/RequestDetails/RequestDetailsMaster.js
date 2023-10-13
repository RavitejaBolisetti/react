/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Form, Row, Col } from 'antd';

import ViewDetail from './ViewDetail';

import styles from 'assets/sass/app.module.scss';

const RequestDetailsMasterBase = (props) => {
    const { typeData } = props;
    const { buttonData, setButtonData, section, isLoading } = props;
    const { selectedAMC, formActionType, handleCancelRequest, handleMNMApproval, handleMNMRejection } = props;
    const { form, FormActionButton, requestPayload, handleButtonClick, NEXT_ACTION, isPendingForCancellation, setIsPendingForCancellation } = props;

    const onFinish = () => {
        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const onFinishFailed = () => {};

    const viewProps = {
        selectedAMC,
        typeData,
        formActionType,
        styles,
        isLoading,
        wrapForm: false,
        handleCancelRequest,
        handleMNMApproval,
        handleMNMRejection,
        isPendingForCancellation,
        setIsPendingForCancellation,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>

                    {formActionType?.viewMode && <ViewDetail {...viewProps} formData={[requestPayload?.amcRequestDetails]} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <FormActionButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

const RequestDetailsMaster = RequestDetailsMasterBase;
export default RequestDetailsMaster;
