/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { RECEIPT_SECTION } from 'constants/ReceiptSection';

import { PartyDetailMaster } from './PartyDetails';
import { ReceiptDetailMaster } from './ReceiptDetails';
import { ApportionDetailMaster } from './ApportionDetails';
import { ThankYouMaster } from './ThankYou';

import { LeftSidebar } from './LeftSidebar';

import styles from 'components/common/Common.module.css';

const ReceiptMainConatinerMain = (props) => {
    const { currentSection } = props;

    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (currentSection) {
            case RECEIPT_SECTION.PARTY_DETAILS.id: {
                return <PartyDetailMaster {...myProps} />;
            }
            case RECEIPT_SECTION.RECEIPT_DETAILS.id: {
                return <ReceiptDetailMaster {...myProps} />;
            }
            case RECEIPT_SECTION.APPORTION_DETAILS.id: {
                return <ApportionDetailMaster {...myProps} />;
            }
            // case RECEIPT_SECTION.THANK_YOU_PAGE.id: {
            //     return <ThankYouMaster {...myProps} />;
            // }
            default: {
                return <PartyDetailMaster {...myProps} />;
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

export const ReceiptMainConatiner = withDrawer(ReceiptMainConatinerMain, { width: '90%', footer: null });
