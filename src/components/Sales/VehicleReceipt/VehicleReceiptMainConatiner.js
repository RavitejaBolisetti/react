/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { VEHICLE_RECEIPT_SECTION } from 'constants/VehicleReceiptSection';

import { SupplierInvoiceDetailsMaster } from './SupplierInvoiceDetail';
import { VehicleDetailsMaster } from './VehicleDetails';

import { LeftSidebar } from './LeftSidebar';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const VehicleReceiptMainConatinerMain = (props) => {
    const { currentSection } = props;

    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (currentSection) {
            case VEHICLE_RECEIPT_SECTION.SUPPLIER_INVOICE_DETAILS.id: {
                return <SupplierInvoiceDetailsMaster {...myProps} />;
            }
            case VEHICLE_RECEIPT_SECTION.VEHICLE_DETAILS.id: {
                return <VehicleDetailsMaster {...myProps} />;
            }
            default: {
                return <SupplierInvoiceDetailsMaster {...myProps} />;
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

export const VehicleReceiptMainConatiner = withDrawer(VehicleReceiptMainConatinerMain, { width: '90%', footer: null });
