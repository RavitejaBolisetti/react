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
    const { formData, isLoading, typeData, tableData } = props;
    const {  openAccordian, setOpenAccordian , handleButtonClick, buttonData, setButtonData, onCloseAction} = props;
    const [filterString, setFilterString] = useState('');

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 6, xl: 6, xxl: 6 },
    };

    useEffect(() => {
        //setFilterStringOTFSearch({ ...filterString });
        //setSelectedOrderOTFDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

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

    const sorterPagination = formData?.allotmentStatus !== VEHICLE_TYPE.ALLOTED.key;

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

    const tableProps = {
        srl: false,
        tableColumn: tableColumnVehicleDetails( handleButtonClickVehicleDetails ),
        tableData: formData?.vehicleDetails,
        pagination: sorterPagination,
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h4 className={styles.marT0}>Indent Details</h4>
                    <Card>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Indent Number">{checkAndSetDefaultValue(formData?.indentNumber, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Indent Date">{checkAndSetDefaultValue(formData?.indentDate, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Indent Status">{checkAndSetDefaultValue(formData?.indentStatus ? 'Yes' : 'No', isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Indent To Location">{checkAndSetDefaultValue(formData?.indentToLocation, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Requested By">{checkAndSetDefaultValue(formData?.requestedBy, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Remark">{checkAndSetDefaultValue(formData?.remarks, isLoading)}</Descriptions.Item>
                            </Descriptions>
                    </Card>
                    <Row gutter={24}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}> 
                                <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} collapsible="icon">
                                    <Panel key="1" header={
                                            <Row>
                                                Vehicle Details 
                                                <Col xs={14} sm={14} md={6} lg={6} xl={6}>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        {/* <Button type="primary" icon={<FiPlus/>} onClick={handleAddVehicleDetails}> Add </Button> */}
                                                    </Col>
                                                </Col>
                                            </Row>
                                        }
                                    >
                                        <Divider />
                                        <DataTable {...tableProps} />
                                        {/* <DataTable tableColumn={taxDetailsColumn()} tableData={formData['taxDetails']} pagination={false} /> */}
                                    </Panel>
                                </Collapse>
                            </Col>
                        </Row>


                </Col>
            </Row>
            <VehicleDetailFormButton {...buttonProps} />
        </>
    );
};

export const ViewDetail = withDrawer(ViewDetailMain, { width: '90%', footer: null });
