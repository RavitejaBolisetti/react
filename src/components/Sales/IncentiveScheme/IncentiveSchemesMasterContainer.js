/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';

import { LeftSidebar } from './LeftSidebar';

import styles from 'assets/sass/app.module.scss';
import { ClaimApprovalRequestMaster } from './ClaimApprovalRequest/ClaimApprovalRequestMaster';
import { IncentiveSchemeDetailsMaster } from './IncentiveSchemeDetails';
import VehicleDetailsMaster from './VehicleDetails';
import CorporateCustomerDetailsMaster from './CorporateCustomerDetails';
import { INCENTIVE_SCHEME_SECTION } from 'constants/modules/IncentiveScheme/IncentiveSchemeSections';
import ProductsAndTargets from './ProductsAndTargets';
import IncentiveSlabeAndAmountMaster from './IncentiveSlabeAndAmount';
import SharedByDetailsMaster from './SharedBy';
import ApplicableAssosiatesMaster from './ApplicableAssosiates';
import ApplicableDealersMaster from './ApplicableDealers';

const IncentiveSchemesMasterContainerMain = (props) => {
    const { currentSection } = props;
    const myProps = {
        ...props,
    };
    
    const renderElement = () => {
        switch (currentSection) {
            case INCENTIVE_SCHEME_SECTION.DETAILS.id: {
                return <IncentiveSchemeDetailsMaster {...myProps} />;
            }
            case INCENTIVE_SCHEME_SECTION.VEHICLE_DETAILS.id: {
                return <VehicleDetailsMaster {...myProps} />;
            }
            case INCENTIVE_SCHEME_SECTION.CORPORATE_CUSTOMER_DETAILS.id: {
                return <CorporateCustomerDetailsMaster {...myProps} />;
            }
            case INCENTIVE_SCHEME_SECTION.PRODUCT_AND_TARGETS.id: {
                return <ProductsAndTargets {...myProps} />;
            }
            case INCENTIVE_SCHEME_SECTION.INCENTIVE_SLABS_AND_AMOUNT.id: {
                return <IncentiveSlabeAndAmountMaster {...myProps} />;
            }
            case INCENTIVE_SCHEME_SECTION.SHARED_BY.id: {
                return <SharedByDetailsMaster {...myProps} />;
            }
            case INCENTIVE_SCHEME_SECTION.APPLICABLE_DEALERS.id: {
                return <ApplicableDealersMaster {...myProps} />;
            }
            case INCENTIVE_SCHEME_SECTION.APPLICABLE_ASSOSIATE.id: {
                return <ApplicableAssosiatesMaster {...myProps} />;
            }
            case INCENTIVE_SCHEME_SECTION.APPROVAL_REQUEST.id: {
                return <ClaimApprovalRequestMaster {...myProps} />;
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

export const IncentiveSchemesMasterContainer = withDrawer(IncentiveSchemesMasterContainerMain, { width: '90%', footer: null });
