/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { CO_DEALER_SECTIONS } from 'components/Sales/CoDealerInvoiceGeneration/constants';

import { LeftSidebar } from './LeftSidebar';

import styles from 'assets/sass/app.module.scss';
import { VehicleDetailsMaster } from '../Common/VehicleDetails';
import { IndentDetailsMaster } from './IndentDetails';
import { CoDealerFormButton } from './CoDealerFormButton';

const CoDealerInvoiceContainerMain = (props) => {
    const { currentSection, selectedOtfNumber, selectedOrderId, soldByDealer, vehicleChallanData, customerDetailsDataSearched } = props;
    const { requestPayload, setRequestPayload } = props;

    const myProps = {
        ...props,
        FormActionButton: CoDealerFormButton,
        selectedOrderId: selectedOtfNumber,
        selectedInvoiceId: selectedOrderId,
        showOptionalService: false,
    };

    const renderSections = () => {
        switch (currentSection) {
            case CO_DEALER_SECTIONS?.INDENT_DETAILS?.id:
                return <IndentDetailsMaster {...myProps} />;
            case CO_DEALER_SECTIONS?.VEHICLE_DETAILS?.id:
                return <VehicleDetailsMaster {...myProps} />;
            case CO_DEALER_SECTIONS?.THANK_YOU_PAGE?.id:
                return <></>;
            default: {
                return <></>;
            }
        }
    };
    return (
        <Row gutter={0}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.drawerBodyLeft}>
                <LeftSidebar {...myProps} />
            </Col>
            <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18} className={styles.drawerRightMainContainer}>
                {renderSections()}
            </Col>
        </Row>
    );
};

export const CoDealerInvoiceMainContainer = withDrawer(CoDealerInvoiceContainerMain, { width: '90%', footer: null });
