/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'antd';
import { tableColumn } from './tableColumn';
import ListDataTable from 'utils/ListDataTable/ListDataTable';
import { showGlobalNotification } from 'store/actions/notification';
import { ViewDetail } from './ViewDetail';
import AdvanceVinBlockMasterFilter from './AdvanceVinBlockMasterFilter';

import { vinBlockMasterAction } from 'store/actions/data/vehicle/vinBlockMasterAction';
import { vinBlockAction } from 'store/actions/data/vehicle/vinBlockAction';
import { translateContent } from 'utils/translateContent';
import { drawerTitle } from 'utils/drawerTitle';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            Vehicle: {
                VinBlockMasterDetails: { isLoaded: isVinDataLoaded = false, isLoading: isvinInfoLoading, data: vinData = [], filter: filterString },
                VinBlockDetails: { detailData },
            },
        },
    } = state;

    const moduleTitle = translateContent('vinBlockMaster.heading.moduleTitle');

    let returnValue = {
        userId,
        accessToken,
        token,
        moduleTitle,
        typeData,
        filterString,
        isvinInfoLoading,
        isVinDataLoaded,
        vinData: vinData?.paginationData,
        totalRecords: vinData?.totalRecords,
        detailData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchVinBlockList: vinBlockMasterAction.fetchList,
            listVinShowLoading: vinBlockMasterAction.listShowLoading,
            setFilterString: vinBlockMasterAction.setFilter,

            fetchVinDetailList: vinBlockAction.fetchList,
            listVinDetailsShowLoading: vinBlockAction.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const VinBlockMasterBase = (props) => {
    const { filterString, setFilterString, saveData, userId, showGlobalNotification, fetchOnRoadViewPriceDetail } = props;
    const { typeData, fetchVinBlockList, listVinShowLoading } = props;
    const { moduleTitle, vinData, totalRecords, fetchVinDetailList } = props;
    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [showDataLoading, setShowDataLoading] = useState(true);

    const [formData, setFormData] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const page = { current: 1, pageSize: 10 };

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [vinInfo, setvinInfo] = useState();
    const [isLoading, showLoading] = useState(true);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: true, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    useEffect(() => {
        setFilterString({ ...filterString, pageSize: 10, current: 1 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dynamicPagination = true;

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        setShowDataLoading(false);
    };

    const onErrorAction = (res) => {
        setShowDataLoading(false);
        showGlobalNotification({ message: res });
    };

    const extraParams = useMemo(() => {
        return [
            {
                key: 'vin',
                title: 'VIN',
                value: filterString?.vin,
                name: filterString?.vin,
                canRemove: true,
                filter: true,
            },
            {
                key: 'modelDescription',
                title: 'Model Description',
                value: filterString?.modelDescription,
                name: filterString?.modelDescription,
                canRemove: true,
                filter: true,
            },

            {
                key: 'dealerCode',
                title: 'Dealer Code',
                value: filterString?.dealerCode,
                name: filterString?.dealerCode,
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: filterString?.pageSize || page?.pageSize,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: filterString?.current || page?.current,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: filterString?.sortBy,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: filterString?.sortType,
                canRemove: true,
                filter: false,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    useEffect(() => {
        if (userId && extraParams) {
            setShowDataLoading(true);
            fetchVinBlockList({ setIsLoading: listVinShowLoading, userId, extraParams, onErrorAction, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams]);

    useEffect(() => {
        if (formData?.id) {
            fetchVinDetailList({
                setIsLoading: () => {},
                userId,
                extraParams: [
                    {
                        key: 'id',
                        value: formData?.id,
                    },
                ],
                onSuccessAction: (res) => {
                    setvinInfo(res.data);
                    showLoading(false);
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        showLoading(true);
        setFormData(record);
        setIsFormVisible(true);
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };
    const setPage = (page) => {
        setFilterString({ ...filterString, ...page });
    };
    const tableProps = {
        dynamicPagination,
        filterString,
        totalRecords,
        setPage: setFilterString,
        page: filterString,
        isLoading: showDataLoading,
        tableColumn: tableColumn(handleButtonClick),
        tableData: vinData,
    };

    const handleResetFilter = (e) => {
        const { pageSize } = filterString;
        if (filterString) {
            setShowDataLoading(true);
        }
        setFilterString({ pageSize, current: 1 });
        searchForm.resetFields();
    };

    const handleOnClick = () => {
        setButtonData({ ...defaultBtnVisiblity, saveAndNewBtn: false, cancelBtn: false, saveBtn: true });
    };

    const handleSearch = (value) => {
        if (value !== '') {
            setFilterString({ ...filterString, vin: value, advanceFilter: true, current: 1 });
            searchForm.resetFields();
        }
    };

    const removeFilter = (key) => {
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
    };

    const title = translateContent('vinBlockMaster.heading.title');

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        advanceFilter: true,
        vinFilter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        handleResetFilter,
        advanceFilterForm,
        title,
        typeData,
        searchForm,
        handleOnClick,
        handleSearch,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData: { ...defaultBtnVisiblity },
        setButtonData,
        handleButtonClick,
    };
    const viewProps = {
        titleOverride: drawerTitle(formActionType).concat(moduleTitle),
        isVisible: isFormVisible,
        onCloseAction,
        formData,
        buttonProps,
        buttonData,
        setButtonData,
        onErrorAction,
        vinInfo,
        setvinInfo,
        isLoading,
        fetchOnRoadViewPriceDetail,
        saveData,
        handleButtonClick,
        userId,
        form,
        isFormVisible,
        setIsFormVisible,
        showGlobalNotification,
    };

    return (
        <>
            <AdvanceVinBlockMasterFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable showAddButton={false} isLoading={false} {...tableProps} />
                </Col>
            </Row>
            <ViewDetail {...viewProps} />
        </>
    );
};

export const VinBlockMaster = connect(mapStateToProps, mapDispatchToProps)(VinBlockMasterBase);
