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
import { CorporateApprovalRequestMaster } from './CorporateSchemeApprovalRequest';
import { CorporateAdditionalDiscountDetailsMaster } from './CorporateAdditionalDiscountDetails/CorporateAdditionalDiscountDetailsMaster';
import { SupportingDocumentMaster } from './SupportingDocument';
import { CORPORATE_ADDITIONAL_DISCOUNT_SECTION } from 'constants/modules/CorporateAdditionalDiscountRegistration/CorporateSchemeSection';


const CorporateAdditionalDiscountRegistrationContainerMain = (props) => {
    const { currentSection } = props;
    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (currentSection) {
            case CORPORATE_ADDITIONAL_DISCOUNT_SECTION.CLAIM_DETAILS.id: {
                return <CorporateAdditionalDiscountDetailsMaster {...myProps} />;
            }
            // case CORPORATE_ADDITIONAL_DISCOUNT_SECTION.DOCUMENTS.id: {
            //     return <SupportingDocumentMaster {...myProps} />;
            // }
            case CORPORATE_ADDITIONAL_DISCOUNT_SECTION.APPROVAL_REQUEST.id: {
                return <CorporateApprovalRequestMaster {...myProps} />;
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

export const CorporateAdditionalDiscountRegistrationMainContainer = withDrawer(CorporateAdditionalDiscountRegistrationContainerMain, { width: '90%', footer: null });
