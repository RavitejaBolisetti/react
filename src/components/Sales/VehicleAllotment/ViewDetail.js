/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Col, Row, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';

import { DATA_TYPE } from 'constants/dataType';
import { withDrawer } from 'components/withDrawer';
import { VehicleDetailFormButton } from 'components/Sales/VehicleDetail/VehicleDetailFormButton';
import { SearchBox } from 'components/utils/SearchBox';
import { DataTable } from 'utils/dataTable';
import { PARAM_MASTER } from 'constants/paramMaster';
import { tableColumnSearchOTF } from './tableColumnSearchOTF';
import { VEHICLE_TYPE } from 'constants/VehicleType';

import styles from 'assets/sass/app.module.scss';

//import style from 'components/utils/SearchBox/SearchBox.module.scss';
import style from 'components/utils/SearchBox/SearchBox.module.css';

const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData, setFilterStringOTFSearch, searchForm, tableData } = props;
    const { resetAdvanceFilter, setResetAdvanceFilter, handleButtonClick, buttonData, setButtonData, onCloseAction, selectedOTFDetails, setSelectedOrderOTFDetails } = props;
    const [filterString, setFilterString] = useState('');

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 6, xl: 6, xxl: 6 },
    };

    useEffect(() => {
        searchForm.resetFields();
        setFilterStringOTFSearch({ ...filterString });
        setSelectedOrderOTFDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const serachBoxProps = {
        searchForm,
        filterString,
        optionType: typeData?.[PARAM_MASTER.OTF_SER.id].filter((searchType) => searchType.key !== 'mobileNumber'),
        setFilterString,
        selectWide: true,
        resetAdvanceFilter,
        setResetAdvanceFilter,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const rowSelection = {
        selectedRowKeys: [selectedOTFDetails?.otfNumber],
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedOrderOTFDetails(selectedRows?.[0]);
        },
        getCheckboxProps: (record) => {
            return {
                disabled: formData?.allotmentStatus === VEHICLE_TYPE.ALLOTED.key,
            };
        },
    };

    const tableDataItem = (formData?.vehicleOTFDetails && [formData?.vehicleOTFDetails]) || tableData;

    const tableProps = {
        srl: false,
        rowKey: 'otfNumber',
        rowSelection: {
            ...rowSelection,
        },
        tableColumn: tableColumnSearchOTF(),
        tableData: tableDataItem,
        pagination: formData?.allotmentStatus !== VEHICLE_TYPE.UNALLOTED.key,
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
                            <Descriptions.Item label="PDI Done?">{checkAndSetDefaultValue(formData?.pdiDone ? 'Yes' : 'No', isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Vehicle Status">{checkAndSetDefaultValue(getCodeValue(typeData?.VEHCL_STATS, formData?.vehicleStatus), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="M&M Invoice Date">{checkAndSetDefaultValue(formData?.mnmInvoiceDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                            <Descriptions.Item label="M&M Invoice No.">{checkAndSetDefaultValue(formData?.mnmInvoiceNo, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Model Description">{checkAndSetDefaultValue(formData?.modelDescription, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                    <Divider className={styles.marT20} />
                    <h4>Allot OTF</h4>
                    <Card>
                        {formData?.allotmentStatus !== VEHICLE_TYPE.ALLOTED.key && (
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.marB20}>
                                    <SearchBox {...serachBoxProps} />
                                </Col>
                            </Row>
                        )}
                        {tableDataItem?.length > 0 && <DataTable {...tableProps} />}
                    </Card>
                </Col>
            </Row>
            <VehicleDetailFormButton {...buttonProps} />
        </>
    );
};

export const ViewDetail = withDrawer(ViewDetailMain, { width: '90%', footer: null });
