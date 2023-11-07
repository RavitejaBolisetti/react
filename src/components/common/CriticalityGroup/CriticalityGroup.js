/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useReducer, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Form } from 'antd';
import { showGlobalNotification } from 'store/actions/notification';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { generateRandomNumber } from 'utils/generateRandomNumber';
import { filterFunction } from 'utils/filterFunction';
import { ListDataTable } from 'utils/ListDataTable';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { btnVisiblity } from 'utils/btnVisiblity';
import { tableColumn } from './tableColumn';
import { criticalityDataActions } from 'store/actions/data/criticalityGroup';
import { AddEditForm } from './AddEditForm';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CriticalityGroup: { isLoaded: isDataLoaded = false, isLoading, data: criticalityGroupData = [], isLoadingOnSave },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = translateContent('criticalityGroup.heading.mainTitle');

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        moduleTitle,
        isLoading,
        criticalityGroupData,
        isLoadingOnSave,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: criticalityDataActions.fetchList,
            saveData: criticalityDataActions.saveData,
            saveFormShowLoading: criticalityDataActions.saveFormShowLoading,
            listShowLoading: criticalityDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const CriticalityGroupMain = (props) => {
    const { saveFormShowLoading, isLoadingOnSave, moduleTitle, fetchList, saveData, listShowLoading, isLoading, userId, criticalityGroupData, isDataLoaded, showGlobalNotification } = props;

    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [refershData, setRefershData] = useState(false);
    const [formData, setFormData] = useState({});
    const [forceFormReset, setForceFormReset] = useState(false);
    const [searchData, setSearchdata] = useState(criticalityGroupData);

    const [filterString, setFilterString] = useState();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [timeData, setTimeData] = useState([]);
    const [deletedTime, setDeletedTime] = useState([]);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const errorAction = (message) => {
        showGlobalNotification(message);
    };

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        setRefershData(false);
    };

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, errorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    useEffect(() => {
        if (isDataLoaded && criticalityGroupData && userId) {
            if (filterString) {
                const keyword = filterString?.keyword;
                const filterDataItem = criticalityGroupData?.filter((item) => (keyword ? filterFunction(keyword)(item?.criticalityGroupName) : true));

                setSearchdata(filterDataItem);
            } else {
                setSearchdata(criticalityGroupData?.map((el, i) => ({ ...el, srl: i + 1 })));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, criticalityGroupData, userId]);

    useEffect(() => {
        if (userId && refershData) {
            fetchList({ setIsLoading: listShowLoading, errorAction, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refershData]);

    const onFinish = (values) => {
        saveFormShowLoading(true);
        const modifiedDeletedTime = deletedTime.concat(timeData);

        const modifiedTimeData = modifiedDeletedTime?.map((element) => {
            return { id: element?.id || '', timeSlotFrom: element?.timeSlotFrom, timeSlotTo: element?.timeSlotTo, isDeleted: element?.isDeleted };
        });

        const recordId = formData?.id || '';
        const data = { ...values, id: recordId, allowedTimings: modifiedTimeData || [] };
        setDeletedTime([]);
        const onSuccess = (res) => {
            form.resetFields();
            setForceFormReset(generateRandomNumber());
            setTimeData([]);

            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });

            setButtonData({ ...buttonData, formBtnActive: false });
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                setButtonData({ saveBtn: true, saveAndNewBtn: true, cancelBtn: true });
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message, placement: 'bottomRight' });
        };

        const requestData = {
            data: [data],
            method: 'post',
            setIsLoading: saveFormShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };
    const handleReferesh = () => {
        setRefershData(!refershData);
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        if (buttonAction === 'view' || buttonAction === 'edit') {
            const momentTime = record?.allowedTimings?.map((i) => {
                return {
                    id: i?.id,
                    timeSlotFrom: i.timeSlotFrom,
                    timeSlotTo: i.timeSlotTo,
                    isDeleted: i?.isDeleted,
                };
            });
            setTimeData(momentTime);
        }

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const tableProps = {
        isLoading,
        tableData: searchData,
        tableColumn: tableColumn(handleButtonClick),
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setTimeData([]);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return translateContent('global.drawerTitle.view');
        } else if (formActionType?.editMode) {
            return translateContent('global.drawerTitle.edit');
        } else {
            return translateContent('global.drawerTitle.add');
        }
    }, [formActionType]);

    const formProps = {
        form,
        isVisible: isFormVisible,
        showGlobalNotification,
        onFinish,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
        formData,
        setIsFormVisible,
        formActionType,
        setFormData,
        isLoading,
        forceUpdate,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        handleButtonClick,
        setButtonData,
        defaultBtnVisiblity,
        timeData,
        setTimeData,
        deletedTime,
        setDeletedTime,
        isLoadingOnSave,
    };

    const handleClearInSearch = (e) => {
        if (e?.target?.value === '') {
            setFilterString();
            listFilterForm.resetFields();
        } else if (e.target.value.length > 2) {
            listFilterForm.validateFields(['code']);
        }
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, advanceFilter: false, keyword: value });
        }
    };

    const title = translateContent('criticalityGroup.heading.title');

    const advanceFilterResultProps = {
        advanceFilter: false,
        filterString,
        from: listFilterForm,

        onSearchHandle,
        handleClearInSearch,
        handleReferesh,
        handleButtonClick,
        title,
        tableData: searchData,
    };

    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleAdd={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })} addTitle={'Group'} {...tableProps} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const CriticalityGroup = connect(mapStateToProps, mapDispatchToProps)(CriticalityGroupMain);
