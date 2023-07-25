/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { VEHICLE_PURCHASE_ORDER_SECTION } from 'constants/VehiclePurchaseOrderSection';

import { VehiclePurchaseOrderDetailMaster } from './VehiclePurchaseOrderDetail';
import { ComingSoonMaster } from './ComingSoon';
import { LeftSidebar } from './LeftSidebar';

import styles from 'components/common/Common.module.css';

const VehiclePurchaseOrderMainContainerMain = (props) => {
    const { currentSection } = props;

    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (currentSection) {
            case VEHICLE_PURCHASE_ORDER_SECTION.PURCHASE_ORDER.id: {
                return <VehiclePurchaseOrderDetailMaster {...myProps} />;
            }
            default: {
                return <ComingSoonMaster {...myProps} />;
            }
        }
    };

    return (
        <Row gutter={0}>
            {/* <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.drawerBodyLeft}>
                <LeftSidebar {...myProps} />
            </Col> */}
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.drawerRightMainContainer}>
                <div>{renderElement()}</div>
            </Col>
        </Row>
    );
};

export const VehiclePurchaseOrderMainContainer = withDrawer(VehiclePurchaseOrderMainContainerMain, { width: '75%', footer: null });
