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
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, CANCEL_ACTION, btnVisiblity } from 'utils/btnVisiblity';
import AdvanceVinBlockMasterFilter from './AdvanceVinBlockMasterFilter';

import { vinBlockMasterAction } from 'store/actions/data/vehicle/vinBlockMasterAction';
import { vinBlockAction } from 'store/actions/data/vehicle/vinBlockAction';

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

    const moduleTitle = 'Vin Block Master';

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
    const { moduleTitle, vinData, totalRecords, fetchVinDetailList, listVinDetailsShowLoading,  } = props;
    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [refershData, setRefershData] = useState(false);

    const [formData, setFormData] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState();

    const [defaultSection, setDefaultSection] = useState();
    const [selectedOrder, setSelectedOrder] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState();

    const [currentSection, setCurrentSection] = useState();
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [isCancelVisible, setIsCancelVisible] = useState(false);
    const [vinInfo, setvinInfo] = useState();
    const [isLoading, showLoading] = useState(true);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        setRefershData(false);
        setShowDataLoading(false);
    };

    const onErrorAction = (res) => {
        showGlobalNotification({ message: res });
    };

    useEffect(() => {
        if (filterString) {
            setPage({ ...page, current: 1 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);
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
                value: page?.pageSize,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: page?.current,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: page?.sortBy,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: page?.sortType,
                canRemove: true,
                filter: false,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, page]);

    useEffect(() => {
        if (userId) {
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
    }, [formData]);

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        showLoading(true);
        setFormData(record);
        setIsFormVisible(true);
        if (buttonAction === 'edit') {
            setCurrentPage('edit');
        } else {
            setCurrentPage('view');
        }
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                break;
            case EDIT_ACTION:
                setSelectedOrder(record);
                record && setSelectedOrderId(record?.id);
                openDefaultSection && setCurrentSection(defaultSection);
                break;
            case VIEW_ACTION:
                setSelectedOrder(record);
                record && setSelectedOrderId(record?.id);
                defaultSection && setCurrentSection(defaultSection);
                break;
            case CANCEL_ACTION:
                setIsCancelVisible(true);
                break;
            default:
                break;
        }
        if (buttonAction !== NEXT_ACTION) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });
            setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction, orderStatus: record?.status }));
        }
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        page,
        setPage,
        isLoading: showDataLoading,
        tableColumn: tableColumn(handleButtonClick),
        tableData: vinData,
    };

    const handleResetFilter = () => {
        setFilterString();
        searchForm.resetFields();
        setShowDataLoading(false);
    };

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View ';
        } else if (formActionType?.editMode) {
            return 'Edit ';
        } else {
            return 'Add New ';
        }
    }, [formActionType]);
    const handleOnClick = () => {
        setButtonData({ ...defaultBtnVisiblity, saveAndNewBtn: false, cancelBtn: false, saveBtn: true });
        // setIsUploadFormVisible(true);

    };

    const handleSearch = (value) => {
        setFilterString({ ...filterString, vin: value, advanceFilter: true, current: 1 });
        searchForm.resetFields();
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
    
    const title = 'Vin Block Master';

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
        titleOverride: drawerTitle.concat(moduleTitle),
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
        NEXT_ACTION,
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
