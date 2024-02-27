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

import DemandForeCastingFormButtons from './DemandForeCastingFormButtons';
import DealerDemandForecastingMaster from './DealerDemandForecasting';
import { DEMANDFORECASTING_SECTION } from 'constants/modules/demandForecasting/demandForecastingSections';
const DemandForecastingMasterContainerMain = (props) => {
    const { currentSection } = props;

    const myProps = {
        ...props,
        DrawerFormButton: DemandForeCastingFormButtons,
    };

    const renderElement = () => {
        switch (currentSection) {
            case DEMANDFORECASTING_SECTION?.DEALERDEMAND_DETAILS?.id: {
                return <DealerDemandForecastingMaster {...myProps} />;
            }

            default: {
                return <></>;
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

export const DemandForecastingMasterContainer = withDrawer(DemandForecastingMasterContainerMain, { width: '90%', footer: null });
