/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { TARGET_TYPE_SECTION } from 'constants/TargetType';

import LeftSidebar from 'utils/LeftSidebar';
// import PaymentDetailsMaster from './PaymentDetails';
// import PartyDetailsMaster from './PartyDetails';
import TargetTypeDetailsMaster from './TargetTypesDetails';

import { VehicleInvoiceFormButton } from './VehicleInvoiceFormButton';

import styles from 'assets/sass/app.module.scss';
import { SALES_MODULE_TYPE } from 'constants/salesModuleType';

const TargetTypeMainConatinerMain = (props) => {
    const { currentSection, handleIRNGeneration, selectedOtfNumber, requestPayload, setRequestPayload, selectedOtfId, profileCardData } = props;
    const formData = { selectedRecordId: selectedOtfId, modelCode: requestPayload?.vehicleDetails?.modelCode, viewOnly: true };
    const onFinishCustom = ({ key, values }) => {
        setRequestPayload({ ...requestPayload, [key]: values });
    };

    const myProps = {
        ...props,
        ...formData,
        wrapForm: false,
        salesModuleType: SALES_MODULE_TYPE.INVOICE.KEY,
        handleIRNGeneration,
        onFinishCustom,
        selectedOrderId: selectedOtfNumber,
        FormActionButton: VehicleInvoiceFormButton,
        vehicleInvoiceMasterData: requestPayload,
        otfData: { ...profileCardData },
    };
    const renderElement = () => {
        switch (currentSection) {
            case TARGET_TYPE_SECTION.TARGET_TYPE_DETAILS.id: {
                return <TargetTypeDetailsMaster {...myProps} />;
            }

            default: {
                return <TargetTypeDetailsMaster {...myProps} />;
            }
        }
    };

    return (
        <Row gutter={0}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.drawerBodyLeft}>
                <LeftSidebar {...myProps} />
            </Col>
            <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18} className={styles.drawerRightMainContainer}>
                <div>{renderElement()}</div>
            </Col>
        </Row>
    );
};

export const TargetTypeMainConatiner = withDrawer(TargetTypeMainConatinerMain, { width: '90%', footer: null });
