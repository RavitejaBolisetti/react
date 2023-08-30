/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { VEHICLE_DETAIL_SECTION } from 'constants/VehicleDetailSection';

import { VehicleDetailsMaster } from './VehicleDetails';
import { CustomerDetailsMaster } from './CustomerDetails';
import { ProductDetailMaster } from './ProductDetails';
import { SupportingDocumentMaster } from './SupportingDocument';
import { ContactMaster } from './Contacts';
import { EntitlementsAndSchemesMaster } from './EntitlementsAndSchemes';
import { ComingSoonMaster } from './ComingSoon';
import { LeftSidebar } from './LeftSidebar';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const VehicleDetailMainContainerMain = (props) => {
    const { currentSection } = props;

    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (currentSection) {
            case VEHICLE_DETAIL_SECTION.VEHICLE_DETAILS.id: {
                return <VehicleDetailsMaster {...myProps} />;
            }
            case VEHICLE_DETAIL_SECTION.CUSTOMER_DETAILS.id: {
                return <CustomerDetailsMaster {...myProps} />;
            }
            case VEHICLE_DETAIL_SECTION.PRODUCT_DETAILS.id: {
                return <ProductDetailMaster {...myProps} />;
            }
            case VEHICLE_DETAIL_SECTION.DOCUMENTS.id: {
                return <SupportingDocumentMaster {...myProps} />;
            }
            case VEHICLE_DETAIL_SECTION.CONTACTS.id: {
                return <ContactMaster {...myProps} />;
            }
            case VEHICLE_DETAIL_SECTION.ENTITLEMENTS_SCHEMES.id: {
                return <EntitlementsAndSchemesMaster {...myProps} />;
            }
            default: {
                return <ComingSoonMaster {...myProps} />;
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

export const VehicleDetailMainContainer = withDrawer(VehicleDetailMainContainerMain, { width: '90%', footer: null });
