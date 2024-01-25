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
import ApprovalDetailsMaster from './ApprovalDetails';
import BinWiseStockDetailsMaster from './BinWiseStockDetails';
import InventoryDetailsMaster from './InventoryDetails';
import PartPlantDetailsMaster from './PartPlantDetails';
import PartMasterDetailsMaster from './PartDetails';
import PriceDetailsMaster from './PriceDetails';
import  StockDetailsMaster  from './StockDetails';
import { PART_MASTER_SECTION } from 'constants/modules/Spares/partMasterSections';

const PartMasterContainerMain = (props) => {
    const { currentSection } = props;
    const myProps = {
        ...props,
    };

    const renderElement = () => {
        switch (currentSection) {
            case PART_MASTER_SECTION.PART_DETAILS.id: {
                return <PartMasterDetailsMaster {...myProps} />;
            }
            case PART_MASTER_SECTION.PRICE_DETAILS.id: {
                return <PriceDetailsMaster {...myProps} />;
            }
            case PART_MASTER_SECTION.INVENTORY_DETAILS.id: {
                return <InventoryDetailsMaster {...myProps} />;
            }

            case PART_MASTER_SECTION.STOCK_DETAILS.id: {
                return <StockDetailsMaster {...myProps} />;
            }

            case PART_MASTER_SECTION.BIN_STOCK_DETAILS.id: {
                return <BinWiseStockDetailsMaster {...myProps} />;
            }
            case PART_MASTER_SECTION.PART_PLANT_DETAILS.id: {
                return <PartPlantDetailsMaster {...myProps} />;
            }
            case PART_MASTER_SECTION.APPROVAL_DETAILS.id: {
                return <ApprovalDetailsMaster {...myProps} />;
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

export const PartMasterContainer = withDrawer(PartMasterContainerMain, { width: '90%', footer: null });
