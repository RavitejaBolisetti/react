/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Col, Row, Divider, Collapse, Button } from 'antd';
import { FiPlus } from 'react-icons/fi';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';

import { DATA_TYPE } from 'constants/dataType';
import { withDrawer } from 'components/withDrawer';
import { VehicleDetailFormButton } from 'components/Sales/VehicleDetail/VehicleDetailFormButton';
import { expandIcon } from 'utils/accordianExpandIcon';
import { DataTable } from 'utils/dataTable';
import { PARAM_MASTER } from 'constants/paramMaster';
import { tableColumnVehicleDetails } from './tableColumnVehicleDetails';
import { VEHICLE_TYPE } from 'constants/VehicleType';

import { EDIT_ACTION, DELETE_ACTION  } from 'utils/btnVisiblity';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, isLoading, buttonDataVehicleDetails, tableData } = props;
    const {  openAccordian, setOpenAccordian , handleButtonClick, buttonData, setButtonData, onCloseAction} = props;
    const [filterString, setFilterString] = useState('');

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 4, xl: 4, xxl: 4 },
    };

    useEffect(() => {
        // if(formData?.vehicleDetails?.length > 0)
        //     handleCollapse(1);
    }, []);

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const tableDataItem = (formData?.vehicleOTFDetails && [formData?.vehicleOTFDetails]) || tableData;

    const handleButtonClickVehicleDetails = ({ record = null, buttonAction, openDefaultSection = true, index }) => {
        switch (buttonAction) {
            case EDIT_ACTION:

                break;
            case DELETE_ACTION:
                break;
            
            default:
                break;
        }
    };
    const sorterPagination = false;

    const tableProps = {
        srl: true,
        tableColumn: tableColumnVehicleDetails( handleButtonClickVehicleDetails, sorterPagination, buttonDataVehicleDetails ),
        tableData: formData?.vehicleDetails,
        pagination: sorterPagination,
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Card>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Indent Number">{checkAndSetDefaultValue(formData?.indentNumber, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Indent Date">{checkAndSetDefaultValue(formData?.indentDate ? formData?.indentDate : undefined, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                            <Descriptions.Item label="Indent Status">{checkAndSetDefaultValue(formData?.indentStatus, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Indent To Parent">{checkAndSetDefaultValue(formData?.indentToParent, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Indent To Location">{checkAndSetDefaultValue(formData?.indentToLocation, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Requested By">{checkAndSetDefaultValue(formData?.requestedBy, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Remark">{checkAndSetDefaultValue(formData?.remarks, isLoading)}</Descriptions.Item>
                            </Descriptions>
                    </Card>

                    <Card>
                        <Row gutter={24}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <h4>Vehicle Details</h4>
                                <Divider />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <DataTable {...tableProps} />
                            </Col> 
                        </Row>
                    </Card>
                    {/* <Row gutter={24}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}> 
                                <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} collapsible="icon">
                                    <Panel key="1" header={"Vehicle Details"}>
                                        <Divider />
                                        <DataTable {...tableProps} />
                                     </Panel>
                                </Collapse>
                            </Col>
                        </Row> */}


                </Col>
            </Row>
            <VehicleDetailFormButton {...buttonProps} />
        </>
    );
};

export const ViewDetail = withDrawer(ViewDetailMain, { width: '90%', footer: null });
