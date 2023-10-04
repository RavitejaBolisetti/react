/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { GST_IRN_SECTION } from 'constants/GSTIRNSection';

import { GstBranchAccessibleMaster } from './GstBranchAccessible';
import { IrnTransactionListMaster } from './IrnTransactionList';

import { LeftSidebar } from './LeftSidebar';

import styles from 'assets/sass/app.module.scss';


const GSTIRNMainConatinerMain = (props) => {
    const { currentSection } = props;

    const myProps = {
        ...props,
        nextBtn:true,
    };
    const myPropsIrnTrans = {
        ...props,
        nextBtn:false
    };
    const renderElement = () => {
        switch (currentSection) {
            
            case GST_IRN_SECTION.BRANCH_ACCESSIBLE.id: {
                return <GstBranchAccessibleMaster {...myProps} />;
            }
            case GST_IRN_SECTION.IRN_TRANSACTION.id: {
                return <IrnTransactionListMaster {...myPropsIrnTrans} />;
            }
            default: {
                return <GstBranchAccessibleMaster {...myProps} />;
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

export const GSTIRNMainConatiner = withDrawer(GSTIRNMainConatinerMain, { width: '90%', footer: null });
