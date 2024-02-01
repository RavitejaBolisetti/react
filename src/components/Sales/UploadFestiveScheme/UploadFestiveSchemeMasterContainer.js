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
import { HeaderDetailsMaster } from './HeaderDetails';
import { SchemeDetailsMaster } from './SchemeDetails';
import { UPLOAD_FESTIVE_SCHEME_SECTION } from 'constants/modules/IncentiveScheme/UploadFestiveScheme';
import UploadReferenceSheetMaster from './UploadReferenceSheet';
import UploadSchemeDataMaster from './UploadSchemeData';

const UploadFestiveSchemeMasterContainerMain = (props) => {
    const { currentSection } = props;
    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (currentSection) {
            case UPLOAD_FESTIVE_SCHEME_SECTION.DETAILS.id: {
                return <HeaderDetailsMaster {...myProps} />;
            }
            case UPLOAD_FESTIVE_SCHEME_SECTION.UPLOAD_SHEME_DATA.id: {
                return <UploadSchemeDataMaster {...myProps} />;
            }
            case UPLOAD_FESTIVE_SCHEME_SECTION.UPLOAD_REFERANCE_SHEET.id: {
                return <UploadReferenceSheetMaster {...myProps} />;
            }
            case UPLOAD_FESTIVE_SCHEME_SECTION.SCHEME_DETAILS.id: {
                return <SchemeDetailsMaster {...myProps} />;
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

export const UploadFestiveSchemeMasterContainer = withDrawer(UploadFestiveSchemeMasterContainerMain, { width: '90%', footer: null });
