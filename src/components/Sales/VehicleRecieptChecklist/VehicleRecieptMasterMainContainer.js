/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { VEHICLE_RECIEPT_CHECKLIST_SECTION } from 'constants/VehicleRecieptCheckListSection';

import { VehicleRecieptCheckListMaster } from './CheckListDetails';
import { SupportingDocumentMaster } from './SupportingDocument';
import { LeftSidebar } from './LeftSidebar';

import styles from 'assets/sass/app.module.scss';

const VehicleRecieptMasterMainContainerMain = (props) => {
    const { currentSection } = props;
    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (currentSection) {
            case VEHICLE_RECIEPT_CHECKLIST_SECTION.CHECKLIST_DETAILS.id: {
                return <VehicleRecieptCheckListMaster {...myProps} />;
            }
            case VEHICLE_RECIEPT_CHECKLIST_SECTION.DOCUMENTS.id: {
                return <SupportingDocumentMaster {...myProps} />;
            }
            default: {
                return false;
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

export const VehicleRecieptMasterMainContainer = withDrawer(VehicleRecieptMasterMainContainerMain, { width: '90%', footer: null });
