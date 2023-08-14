/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { CREDIT_DEBIT_SECTION } from 'constants/CreditDebitSection';

import { LeftSidebar } from './LeftSidebar';

import styles from 'components/common/Common.module.css';
import { VoucherAndPartyDetailsMaster } from './VoucherAndPartyDetails';
import { VoucherDetailsMaster } from './VoucherDetails';
import { ApportionDetailsMaster } from './ApportionDetails';

const CreditDebitNoteMainContainerMain = (props) => {
    const { currentSection } = props;

    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (currentSection) {
            case CREDIT_DEBIT_SECTION.VOUCHER_AND_PARTY_DETAILS.id: {
                return <VoucherAndPartyDetailsMaster {...myProps} />;
            }
            case CREDIT_DEBIT_SECTION.VOUCHER_DETAILS.id: {
                return <VoucherDetailsMaster {...myProps} />;
            }
            case CREDIT_DEBIT_SECTION.APPORTION_DETAILS.id: {
                return <ApportionDetailsMaster {...myProps} />;
            }
            default: {
                return <VoucherAndPartyDetailsMaster {...myProps} />;
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

export const CreditDebitNoteMainContainer = withDrawer(CreditDebitNoteMainContainerMain, { width: '90%', footer: null });
