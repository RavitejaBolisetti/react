/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Card, Descriptions, Col, Row, Divider } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { OTF_STATUS } from 'constants/OTFStatus';
import { DATA_TYPE } from 'constants/dataType';
import { withDrawer } from 'components/withDrawer';
import { VehicleDetailFormButton } from 'components/Sales/VehicleDetail/VehicleDetailFormButton';
import { showGlobalNotification } from 'store/actions/notification';

import { otfDataActions } from 'store/actions/data/otf/otf';
import { SearchBox } from 'components/utils/SearchBox';
import { defaultPageProps } from 'utils/defaultPageProps';
import { DataTable } from 'utils/dataTable';
import { PARAM_MASTER } from 'constants/paramMaster';
import { tableColumnSearchOTF } from './tableColumnSearchOTF';
import { VEHICLE_TYPE } from 'constants/VehicleType';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            OTF: {
                OtfSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isOTFSearchLoading, data, isDetailLoaded },
            },
            vehicleAllotmentData: {
                vehicleAllotment: { detailData: allotmentSummaryDetails, isLdata: allotmentSearchedList, filter: filterString },
            },
        },
    } = state;

    let returnValue = {
        userId,
        typeData,
        isDataLoaded: isDetailLoaded,
        data: data?.otfDetails,
        totalOTFRecords: data?.totalRecords,
        isOTFSearchLoading,
        isSearchDataLoaded,
        filterString,
        allotmentSummaryDetails,
        allotmentSearchedList,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchOTFSearchedList: otfDataActions.fetchList,
            resetOTFData: otfDataActions.reset,
            listShowLoading: otfDataActions.listShowLoading,
            resetOTFSearchedList: otfDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const ViewDetailMain = (props) => {
    const { userId, isOTFSearchLoading, fetchOTFSearchedList, listShowLoading, toggleButton, formData, isLoading, typeData, searchForm, totalOTFRecords, tableData } = props;
    const { resetAdvanceFilter, setResetAdvanceFilter, handleButtonClick, buttonData, setButtonData, onCloseAction, selectedOTFDetails, setSelectedOrderOTFDetails } = props;
    const [filterString, setFilterString] = useState('');
    const [filterStringOTFSearch, setFilterStringOTFSearch] = useState('');
    const [showDataLoading, setShowDataLoading] = useState(false);
    const [page, setPage] = useState({ pageSize: 10, current: 1 });

    const dynamicPagination = true;
    useEffect(() => {
        if (filterString) {
            setPage({ ...page, current: 1 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const searchOTFExtraParams = useMemo(() => {
        const defaultPage = defaultPageProps(page);
        return [
            {
                key: 'searchType',
                title: 'Type',
                name: filterString?.searchType ? typeData?.[PARAM_MASTER.OTF_SER.id]?.find((i) => i?.key === filterString?.searchType)?.value : '',
                value: filterStringOTFSearch?.searchType,
                filter: true,
            },
            {
                key: 'searchParam',
                title: 'Value',
                name: filterStringOTFSearch?.searchParam,
                value: filterStringOTFSearch?.searchParam,
                filter: true,
            },
            {
                key: 'otfStatus',
                title: 'Status',
                value: OTF_STATUS?.BOOKED?.key,
            },
            {
                key: 'modelCode',
                title: 'Model Code',
                value: formData?.modelCode || formData?.modelCd,
            },
            ...defaultPage,
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterStringOTFSearch, formData, page]);

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (userId && toggleButton === VEHICLE_TYPE.UNALLOTED.key && !isOTFSearchLoading && formData) {
            setShowDataLoading(true);
            fetchOTFSearchedList({ setIsLoading: listShowLoading, userId, extraParams: searchOTFExtraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchOTFExtraParams, formData]);

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 6, xl: 6, xxl: 6 },
    };

    useEffect(() => {
        searchForm.resetFields();
        setFilterStringOTFSearch({ ...filterString, advanceFilter: true });
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
        defaultOption: 'otfNumber',
        allowClear: false,
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
        onChange: (_, selectedRows) => {
            setSelectedOrderOTFDetails(selectedRows?.[0]);
        },
        getCheckboxProps: () => {
            return {
                disabled: formData?.allotmentStatus === VEHICLE_TYPE.ALLOTED.key,
            };
        },
    };

    const tableDataItem = (formData?.vehicleOTFDetails && [formData?.vehicleOTFDetails]) || tableData;
    const sorterPagination = totalOTFRecords > tableDataItem?.length;

    const tableProps = {
        srl: false,
        rowKey: 'otfNumber',
        rowSelection: {
            ...rowSelection,
        },
        setPage,
        dynamicPagination,
        isLoading: showDataLoading,
        tableColumn: tableColumnSearchOTF(sorterPagination),
        totalRecords: totalOTFRecords,
        tableData: tableDataItem,
        pagination: sorterPagination,
    };

    // const handleResetFilter = () => {
    //     resetOTFData();
    //     setFilterStringOTFSearch();
    // };

    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h4 className={styles.marT0}>Vehicle Summary</h4>
                    <Card>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="VIN/Chassis">{checkAndSetDefaultValue(formData?.vehicleIdentificationNumber, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Age In Days">{checkAndSetDefaultValue(formData?.ageInDays, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="PDI Done?">{checkAndSetDefaultValue(formData?.pdiDone, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Vehicle Status">{checkAndSetDefaultValue(getCodeValue(typeData?.VEHCL_STATS, formData?.vehicleStatus), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="M&M Invoice Date">{checkAndSetDefaultValue(formData?.mnmInvoiceDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                            <Descriptions.Item label="M&M Invoice No.">{checkAndSetDefaultValue(formData?.mnmInvoiceNo, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Model Description">{checkAndSetDefaultValue(formData?.modelDescription, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                    <Divider className={styles.marT20} />
                    <h4>Allot Booking</h4>
                    <Card>
                        {formData?.allotmentStatus !== VEHICLE_TYPE.ALLOTED.key && (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <SearchBox {...serachBoxProps} />
                                    </Col>
                                </Row>
                            </>
                        )}
                        {tableDataItem?.length > 0 && <DataTable {...tableProps} />}
                    </Card>
                </Col>
            </Row>
            <VehicleDetailFormButton {...buttonProps} />
        </>
    );
};

export const ViewDetail = withDrawer(connect(mapStateToProps, mapDispatchToProps)(ViewDetailMain), { width: '90%', footer: null });
