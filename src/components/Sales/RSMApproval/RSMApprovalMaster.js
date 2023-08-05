/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Form, Row } from 'antd';

import { tableColumn } from './tableColumn';
import AdvanceFilter from './AdvanceFilter';
import { VIEW_ACTION } from 'utils/btnVisiblity';

import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { showGlobalNotification } from 'store/actions/notification';
import { vehicleDetailDataActions } from 'store/actions/data/vehicle/vehicleDetail';
import { ViewDetail } from './ViewDetail';
import { RejectRequest } from './RejectRequest';
import { RSM_APPROVAL_STATUS } from './utils/RSMApprovalStatus';

import { validateRequiredInputField } from 'utils/validation';
import { LANGUAGE_EN } from 'language/en';

import { PARAM_MASTER } from 'constants/paramMaster';
import { FilterIcon } from 'Icons';
import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            Vehicle: {
                VehicleDetail: { isLoaded: isDataLoaded = false, isLoading, isDetailLoaded, detailData: vehicleDetailData = [], data, filter: filterString },
            },
        },
    } = state;

    const moduleTitle = 'Vehicle Reciept Checklist';

    let returnValue = {
        userId,
        typeData: typeData[PARAM_MASTER.VH_DTLS_SER.id],
        isDataLoaded: true,
        data: data?.vehicleSearch,
        totalRecords: data?.totalRecords || [],
        vehicleDetailData: [],
        moduleTitle,
        isLoading: false,
        isDetailLoaded: true,
        filterString,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: vehicleDetailDataActions.fetchList,
            fetchDetail: vehicleDetailDataActions.fetchDetail,
            listShowLoading: vehicleDetailDataActions.listShowLoading,
            setFilterString: vehicleDetailDataActions.setFilter,
            resetData: vehicleDetailDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const RSMApprovalMasterBase = (props) => {
    const { fetchList, saveData, listShowLoading, userId, data, totalRecords, vehicleDetailData } = props;
    const { typeData, moduleTitle } = props;
    const { filterString, setFilterString, vehicleDetailStatusList } = props;

    const [listFilterForm] = Form.useForm();
    const [rejectForm] = Form.useForm();

    const [selectedRecord, setSelectedRecord] = useState();
    const [selectedRecordId, setSelectedRecordId] = useState();

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [rejectRequest, setRejectRequest] = useState(false);

    const defaultBtnVisiblity = {
        closeBtn: true,
        cancelBtn: false,
        formBtnActive: true,
        reject: true,
        approve: true,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: true };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const [formData, setFormData] = useState([]);
    const [otfSearchRules, setOtfSearchRules] = useState({ rules: [validateRequiredInputField('search parametar')] });
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [isRejectModalVisible, setRejectModalVisible] = useState(false);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };
    const handleButtonQuery = (buttonName) => {
        switch (buttonName) {
            case RSM_APPROVAL_STATUS?.PENDING?.key: {
                setButtonData({ ...defaultBtnVisiblity });
                break;
            }
            case RSM_APPROVAL_STATUS?.APPROVED?.key: {
                setButtonData({ ...defaultBtnVisiblity, cancelBtn: false, reject: false, approve: false });
                break;
            }
            case RSM_APPROVAL_STATUS?.REJECTED?.key: {
                setButtonData({ ...defaultBtnVisiblity, cancelBtn: false, reject: false, approve: false });
                break;
            }
            default: {
                break;
            }
        }
    };

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: filterString?.searchType,
                name: typeData?.find((i) => i?.key === filterString?.searchType)?.value,
                canRemove: false,
                filter: true,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: filterString?.searchParam,
                name: filterString?.searchParam,
                canRemove: true,
                filter: true,
            },
            {
                key: 'recieptFromDate',
                title: 'Reciept From Date',
                value: filterString?.fromDate,
                name: filterString?.fromDate,
                canRemove: true,
                filter: true,
            },
            {
                key: 'reciepttoDate',
                title: 'Reciept To Date',
                value: filterString?.toDate,
                name: filterString?.toDate,
                canRemove: true,
                filter: true,
            },
            {
                key: 'otfStatus',
                title: 'OTF Status',
                value: filterString?.otfStatus,
                name: vehicleDetailStatusList?.find((i) => i?.title === filterString?.otfStatus)?.desc,
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: page?.pageSize,
                canRemove: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: page?.current,
                canRemove: true,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: page?.sortBy,
                canRemove: true,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: page?.sortType,
                canRemove: true,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, page]);

    useEffect(() => {
        if (userId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams]);

    useEffect(() => {
        return () => {
            setFilterString();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (currentSection && sectionName) {
            const section = Object.values(sectionName)?.find((i) => i.id === currentSection);
            setSection(section);

            const nextSection = Object.values(sectionName)?.find((i) => i?.displayOnList && i.id > currentSection);
            setLastSection(!nextSection?.id);
        }
        form.resetFields();
        form.setFieldsValue(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection, sectionName]);

    const onAdvanceSearchCloseAction = () => {
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
    };

    const handleReject = () => {
        setRejectModalVisible(true);
        setIsFormVisible(false);
        setRejectRequest(true);
    };
    const handleApprove = () => {
        setRejectModalVisible(true);
        setIsFormVisible(false);
        setRejectRequest(false);
    };

    const handleResetFilter = (e) => {
        if (filterString) {
            setShowDataLoading(true);
        }
        setFilterString();
        // advanceFilterForm.resetFields();
        // setAdvanceSearchVisible(false);
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ viewMode: buttonAction === VIEW_ACTION });
        // setButtonData(btnVisiblity({ defaultBtnVisiblity }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const onFinishSearch = (values) => {};

    const onFinish = (values) => {
        const recordId = formData?.parentId || form.getFieldValue('parentId');
        let data = { ...values, parentId: recordId };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });

            setButtonData({ ...buttonData, formBtnActive: false });

            setIsFormVisible(false);
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: formActionType?.editMode ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const rejectModalCloseAction = () => {
        setRejectModalVisible(false);
        setIsFormVisible(true);
    };

    const onCloseAction = () => {
        form.resetFields();
        form.setFieldsValue();
        setSelectedRecord();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        setPage,
        tableColumn: tableColumn(handleButtonClick),
        tableData: [{}],
        showAddButton: false,
        handleButtonClick,
        noMessge: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
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

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        vehicleDetailStatusList,
        advanceFilter: true,
        filter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        title: '',
        // title: <QueryButtons handleButtonQuery={handleButtonQuery} />,
        handleButtonQuery,
        data,
        typeData,
        otfSearchRules,
        setOtfSearchRules,
        searchForm,
        onFinishSearch,
        handleResetFilter,
        isAdvanceSearchVisible,
        setAdvanceSearchVisible,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,

        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',

        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        typeData,
        onFinishSearch,
    };

    const viewProps = {
        isVisible: isFormVisible,
        styles,
        onCloseAction,
        titleOverride: 'View RSM Approval Details',
        handleButtonClick,
        buttonData,
        setButtonData,
        handleReject,
        setRejectRequest,
        handleApprove,
    };

    const rejectRequestProps = {
        isVisible: isRejectModalVisible,
        handleReject,
        onCloseAction: rejectModalCloseAction,
        titleOverride: 'Reject Co-Dealer Invoice',
        rejectForm,
        rejectModalCloseAction,
        rejectRequest,
        setRejectRequest,
        handleApprove,
    };

    return (
        <>
            <AdvanceFilter {...advanceFilterResultProps} />
            <AdvancedSearch {...advanceFilterProps} />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={false} {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            {formActionType?.viewMode && <ViewDetail {...viewProps} />}
            <RejectRequest {...rejectRequestProps} />
        </>
    );
};

const RSMApprovalMaster = connect(mapStateToProps, mapDispatchToProps)(RSMApprovalMasterBase);
export default RSMApprovalMaster;
