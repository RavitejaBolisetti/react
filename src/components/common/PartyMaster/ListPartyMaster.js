/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';

import { geoPinCodeDataActions } from 'store/actions/data/geo/pincodes';
import { partyMasterDataActions } from 'store/actions/data/partyMaster';

import { ListDataTable } from 'utils/ListDataTable';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';

import { tableColumn } from './tableColumn';
import { btnVisiblity } from 'utils/btnVisiblity';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { showGlobalNotification } from 'store/actions/notification';

import { filterFunction } from 'utils/filterFunction';
import { AddEditForm } from './AddEditForm';
import { translateContent } from 'utils/translateContent';
import { drawerTitle } from 'utils/drawerTitle';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isPartyDataLoaded = false, isPartyDataLoading, data: configData = [], filteredListData: typeData = [] },
            PartyMaster: { isLoaded: isDataLoaded = false, isLoading, data, detailData, isDetailLoading },
            Geo: {
                Pincode: { isLoaded: isPinCodeDataLoaded = false, isLoading: isPinCodeLoading, data: pincodeData },
            },
        },
    } = state;

    let returnValue = {
        userId,
        isPartyDataLoaded,
        isPartyDataLoading,
        configData,
        typeData,
        isDataLoaded,
        isPinCodeDataLoaded,
        isPinCodeLoading,
        data,
        detailData,
        isLoading,
        pincodeData: pincodeData?.pinCodeDetails,
        moduleTitle: translateContent('partyMaster.heading.moduleTitle'),

        isDetailLoading,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: partyMasterDataActions.fetchList,
            fetchDetail: partyMasterDataActions.fetchDetail,
            listDetailShowLoading: partyMasterDataActions.listDetailShowLoading,
            resetDetailData: partyMasterDataActions.resetDetail,
            saveData: partyMasterDataActions.saveData,
            listShowLoading: partyMasterDataActions.listShowLoading,
            showGlobalNotification,

            listPinCodeShowLoading: geoPinCodeDataActions.listShowLoading,
            fetchPincodeDetail: geoPinCodeDataActions.fetchList,
        },
        dispatch
    ),
});

export const ListPartyMasterBase = (props) => {
    const { data, detailData, saveData, fetchList, fetchDetail, userId, isDataLoaded, listShowLoading, showGlobalNotification, moduleTitle } = props;
    const { typeData } = props;
    const { isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail, pincodeData, resetDetailData, listDetailShowLoading, isDetailLoading } = props;
    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [recordData, setRecordData] = useState();

    const defaultSaveBtnLoading = { isSaveAndNewBtnLoading: false, isSaveBtnLoading: false };
    const [onSaveShowLoading, setOnSaveShowLoading] = useState(defaultSaveBtnLoading);

    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (userId && !isDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataLoaded]);

    useEffect(() => {
        if (userId && refershData) {
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    useEffect(() => {
        if (isDataLoaded && data && userId) {
            if (filterString) {
                const keyword = filterString?.keyword;
                const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.partyName) : true));
                setSearchdata(filterDataItem);
                setShowDataLoading(false);
            } else {
                setSearchdata(data);
                setShowDataLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, data, userId]);

    const handleReferesh = () => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);
        forceUpdate();
        [EDIT_ACTION, VIEW_ACTION]?.includes(buttonAction) && setRecordData(record);
        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        setIsFormVisible(true);
    };

    const onFinish = (values) => {
        let data = { ...values };

        setOnSaveShowLoading({ isSaveAndNewBtnLoading: buttonData?.saveAndNewBtnClicked, isSaveBtnLoading: !buttonData?.saveAndNewBtnClicked });
        const onSuccess = (res) => {
            setOnSaveShowLoading(defaultSaveBtnLoading);
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });

            setButtonData({ ...buttonData, formBtnActive: false });
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
            setOnSaveShowLoading(defaultSaveBtnLoading);
        };

        saveData({
            data,
            method: formActionType?.editMode ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        });
    };

    const onCloseAction = () => {
        form.resetFields();
        setFormData([]);
        setRecordData({});
        resetDetailData();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, advanceFilter: false, keyword: value });
        }
    };

    const handleClearInSearch = (e) => {
        if (e?.target?.value === '') {
            setFilterString();
            listFilterForm.resetFields();
            setShowDataLoading(false);
        } else if (e.target.value.length > 2) {
            listFilterForm.validateFields(['code']);
        }
    };

    const formProps = {
        form,
        formData,
        formActionType,
        setFormActionType,
        onFinish,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle(formActionType).concat(' ').concat(moduleTitle),
        tableData: searchData,
        typeData,
        fetchDetail,
        recordData,
        listShowLoading,
        userId,
        setFormData,
        detailData,

        listPinCodeShowLoading,
        fetchPincodeDetail,
        isPinCodeLoading,
        pincodeData,

        forceUpdate,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
        showGlobalNotification,
        onSaveShowLoading,
        isLoading: isDetailLoading,
        listDetailShowLoading,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick),
        tableData: searchData,
    };

    const advanceFilterResultProps = {
        advanceFilter: false,
        filterString,
        from: listFilterForm,

        onSearchHandle,
        handleClearInSearch,
        handleReferesh,
        handleButtonClick,
        title: translateContent('partyMaster.label.partyName'),
        tableData: searchData,
    };

    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={showDataLoading} {...tableProps} handleAdd={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const ListPartyMaster = connect(mapStateToProps, mapDispatchToProps)(ListPartyMasterBase);
