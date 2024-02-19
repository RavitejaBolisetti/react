/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Form, Row, Typography, Input } from 'antd';

import { tableColumn } from './tableColumn';
import { AdvancedSearch } from './AdvancedSearch';

import ListDataTable from 'utils/ListDataTable/ListDataTable';
import { showGlobalNotification } from 'store/actions/notification';

import { ViewDetail } from './ViewDetail';

import { PARAM_MASTER } from 'constants/paramMaster';
import AdvanceVehiclePriceMasterFilter from './AdvanceVehiclePriceMasterFilter';
import { translateContent } from 'utils/translateContent';
import { tableColumnBranch } from './tableColumnBranch';
import styles from 'assets/sass/app.module.scss';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { tableColumnPlant } from './tableColumnPlant';

const { Search } = Input;
const { Text } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        common: {
            Header: { data: loginUserData = [], dealerLocationId },
        },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
    } = state;

    let returnValue = {
        userId,
        accessToken,
        token,
        userType: loginUserData?.userType,

        moduleTitle: 'Branch Wise Stock',
        data: [{}],
        typeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            showGlobalNotification,
        },
        dispatch
    ),
});

export const BranchWiseStockViewMasterBase = (props) => {
    const { filterString, typeData, moduleTitle, setFilterString, saveData, userId, showGlobalNotification } = props;
    const { data, userType } = props;

    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [searchForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);

    const [formData, setFormData] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [filteredStateData, setFilteredStateData] = useState([]);
    const [filteredCityData, setFilteredCityData] = useState([]);
    const [filteredDistrictData, setFilteredDistrictData] = useState([]);
    const [resetAdvanceFilter, setResetAdvanceFilter] = useState(false);
    const [showMoreList, setShowMoreList] = useState({ isDealer: false, isPlant: false });

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: true, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    useEffect(() => {
        if (filterString) {
            setPage({ ...page, current: 1 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        setFormData(record);
        setIsFormVisible(true);
    };

    const onFinish = () => {
        let data = {};
        const onSuccess = (res) => {
            setShowDataLoading(true);

            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        };

        const onError = (res, data) => {
            let message = res;
            // if (data?.docId) {
            //     message = (
            //         <>
            //             {message}
            //             <Button type="link" onClick={() => downloadReport(data?.docId)}>
            //                 {translateContent('vehiclePriceMaster.label.downloadHere')}
            //             </Button>
            //         </>
            //     );
            // }

            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: message });
        };

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: false,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };
    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
        setResetAdvanceFilter(true);
    };

    const tableProps = {
        dynamicPagination,
        // totalRecords: data.length,
        // page,
        // setPage,
        isLoading: false,
        tableColumn: tableColumn(handleButtonClick),
        tableData: new Array(3).fill({}) || data,
        showAddButton: false,
        isLoading: false,
        pagination: false,
    };

    const tablePropsBranch = {
        dynamicPagination,
        isLoading: false,
        tableColumn: tableColumnBranch(handleButtonClick),
        tableData: data,
        showAddButton: false,
        isLoading: false,
        pagination: false,
    };

    const tablePropsPlant = {
        dynamicPagination,
        isLoading: false,
        tableColumn: tableColumnPlant(handleButtonClick),
        tableData: data,
        showAddButton: false,
        isLoading: false,
        pagination: false,
    };

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        advanceFilterForm.resetFields();
    };

    const handleResetFilter = () => {
        if (filterString) {
            setShowDataLoading(true);
        }
        setFilterString();
        advanceFilterForm.resetFields();
        setShowDataLoading(false);
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, advanceFilter: true, keyword: value });
            listFilterForm.setFieldsValue({ code: undefined });
        }
    };
    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        onCloseAction: onAdvanceSearchCloseAction,
        titleOverride: translateContent('vehiclePriceMaster.label.advanceFilters'),
        // handleFilterChange,
        filteredStateData,
        filteredCityData,
        filteredDistrictData,
        filterString,
        setFilterString,
        advanceFilterForm,
        handleResetFilter,
        onSearchHandle,
        setAdvanceSearchVisible,
    };

    const title = translateContent('vehiclePriceMaster.heading.mainTitle');

    const advanceFilterResultProps = {
        from: listFilterForm,
        onFinish,
        setAdvanceSearchVisible,
        showMoreList,
        setShowMoreList,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData: { ...defaultBtnVisiblity },
        setButtonData,
        handleButtonClick,
    };
    const viewProps = {
        titleOverride: translateContent('global.drawerTitle.view').concat(' ').concat(moduleTitle),
        isVisible: isFormVisible,
        onCloseAction,
        formData,
        buttonProps,
    };
    return (
        <>
            <AdvanceVehiclePriceMasterFilter {...advanceFilterResultProps} />
            <AdvancedSearch {...advanceFilterProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} />
                </Col>
                {showMoreList?.isDealer && (
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <div className={styles.contentHeaderBackground}>
                            <Text strong className={styles.marB20}>
                                Dealer Wise Stock
                            </Text>
                            <Form
                                layout="inline"
                                // layout="vertical"
                                autoComplete="off"
                                colon={false}
                            >
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.marB10}>
                                        <Form.Item label={'Area Code'} name={'areaCode'}>
                                            <Search maxLength={50} placeholder={preparePlaceholderText('Area Code')} loading={false} allowClear />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                            <ListDataTable {...tablePropsBranch} />
                        </div>
                    </Col>
                )}
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {showMoreList?.isPlant && (
                        <div className={styles.contentHeaderBackground}>
                            <Text strong className={styles.marB20}>
                                Plant Wise Stock
                            </Text>
                            <ListDataTable {...tablePropsPlant} />
                        </div>
                    )}
                </Col>
            </Row>

            <ViewDetail {...viewProps} />
        </>
    );
};

export const BranchWiseStockViewMaster = connect(mapStateToProps, mapDispatchToProps)(BranchWiseStockViewMasterBase);
