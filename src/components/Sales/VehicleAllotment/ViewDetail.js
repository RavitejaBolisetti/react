/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Col, Row, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import { DATA_TYPE } from 'constants/dataType';
import { withDrawer } from 'components/withDrawer';
import { VehicleDetailFormButton } from 'components/Sales/VehicleDetail/VehicleDetailFormButton';
import { SearchBox } from 'components/utils/SearchBox';
import { DataTable } from 'utils/dataTable';
import { PARAM_MASTER } from 'constants/paramMaster';
import { tableColumnSearchOTF } from './tableColumnSearchOTF';
import { VEHICLE_TYPE } from 'constants/VehicleType';

import styles from 'components/common/Common.module.css';

const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData, setFilterStringOTFSearch, searchForm, tableData } = props;
    const { handleButtonClick, buttonData, setButtonData, onCloseAction, setSelectedOrderOTFDetails } = props;
    const [filterString, setFilterString] = useState('');

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 6, xl: 6, xxl: 6 },
    };

    useEffect(() => {
        console.log('AVYUKT');
        setButtonData(formData?.allotmentStatus === VEHICLE_TYPE.UNALLOTED.desc ? { cancelBtn: true, allotBtn: true } : { cancelBtn: true, unAllot: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFilterStringOTFSearch({ ...filterString });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const serachBoxProps = {
        searchForm,
        filterString,
        optionType: typeData?.[PARAM_MASTER.OTF_SER.id].filter((searchType) => searchType.key !== 'mobileNumber'),
        setFilterString,
        selectWide: true,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const rowSelection = {
        type: 'checkbox',
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedOrderOTFDetails(selectedRows);
        },
        getCheckboxProps: () => ({}),
    };

    const tableProps = {
        srl: false,
        rowKey: 'otfNumber',
        rowSelection: {
            ...rowSelection,
        },
        pagination: false,
        tableColumn: tableColumnSearchOTF(handleButtonClick),

        render: (text) => convertDateMonthYear(text),
        tableData: tableData || [formData?.vehicleOTFDetails] || [],
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h4 className={styles.marT0}>Vehicle Summary</h4>
                    <Card>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="VIN/Chassis">{checkAndSetDefaultValue(formData?.vehicleIdentificationNumber, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Age In Days">{checkAndSetDefaultValue(formData?.ageInDays, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="PDI Done?">{checkAndSetDefaultValue(formData?.pdiDone === true ? 'Yes' : 'No', isLoading)}</Descriptions.Item>

                            <Descriptions.Item label="Vehicle Status">{checkAndSetDefaultValue(formData?.allotmentStatus, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="M&M Invoices Date">{checkAndSetDefaultValue(formData?.mnmInvoiceDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                            <Descriptions.Item label="M&M Invoices No.">{checkAndSetDefaultValue(formData?.mnmInvoiceNo, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Model Description">{checkAndSetDefaultValue(formData?.modelDescription, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                    <Divider className={styles.marT20} />
                    <h4>Allot OTF</h4>
                    <Card>
                        {/* {formData?.allotmentStatus === VEHICLE_TYPE.UNALLOTED.desc && ( */}
                        {formData?.allotmentStatus === VEHICLE_TYPE.ALLOTED.desc && (
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.marB20}>
                                    <SearchBox {...serachBoxProps} />
                                </Col>
                            </Row>
                        )}
                        <DataTable {...tableProps} />
                    </Card>
                </Col>
            </Row>
            <VehicleDetailFormButton {...buttonProps} />
        </>
    );
};

export const ViewDetail = withDrawer(ViewDetailMain, { width: '90%', footer: null });
