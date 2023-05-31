import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Input, Form } from 'antd';

import { showGlobalNotification } from 'store/actions/notification';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { generateRandomNumber } from 'utils/generateRandomNumber';
import { filterFunction } from 'utils/filterFunction';
import { ListDataTable } from 'utils/ListDataTable';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { tableColumn } from './tableColumn';

import { criticalityDataActions } from 'store/actions/data/criticalityGroup';
import { AddEditForm } from './AddEditForm';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CriticalityGroup: { isLoaded: isDataLoaded = false, isLoading, data: criticalityGroupData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'Application Criticality Group';

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        moduleTitle,
        isLoading,
        criticalityGroupData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: criticalityDataActions.fetchList,
            saveData: criticalityDataActions.saveData,
            listShowLoading: criticalityDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const CriticalityGroupMain = (props) => {
    const { moduleTitle, fetchList, saveData, listShowLoading, isLoading, userId, criticalityGroupData, isDataLoaded, showGlobalNotification } = props;

    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();

    const [refershData, setRefershData] = useState(false);
    const [formData, setFormData] = useState({});
    const [forceFormReset, setForceFormReset] = useState(false);
    const [searchData, setSearchdata] = useState(criticalityGroupData);

    const [filterString, setFilterString] = useState();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [page, setPage] = useState(1);

    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [timeData, setTimeData] = useState([]);
    const [deletedTime, setDeletedTime] = useState([]);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const errorAction = (message) => {
        showGlobalNotification(message);
    };

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
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
                const filterDataItem = criticalityGroupData?.filter((item) => (keyword ? filterFunction(keyword)(item?.criticalityGroupCode) || filterFunction(keyword)(item?.criticalityGroupName) : true));

                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
                setShowDataLoading(false);
            } else {
                setSearchdata(criticalityGroupData?.map((el, i) => ({ ...el, srl: i + 1 })));
                setShowDataLoading(false);
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
        const modifiedDeletedTime = deletedTime.concat(timeData);

        const modifiedTimeData = modifiedDeletedTime?.map((element) => {
            return { id: element?.id || '', timeSlotFrom: element?.timeSlotFrom, timeSlotTo: element?.timeSlotTo, isDeleted: element?.isDeleted };
        });

        const recordId = formData?.id || '';
        const data = { ...values, id: recordId, allowedTimings: modifiedTimeData || [] };
        setDeletedTime([]);
        const onSuccess = (res) => {
            setShowDataLoading(true);
            form.resetFields();
            setForceFormReset(generateRandomNumber());
            setTimeData([]);

            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                setButtonData({ saveBtn: true, saveAndNewBtn: true, cancelBtn: true });
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message, placement: 'bottomRight' });
        };

        const requestData = {
            data: [data],
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleReferesh = () => {
        setShowDataLoading(true);
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
        setButtonData(buttonAction === VIEW_ACTION ? { ...defaultBtnVisiblity, closeBtn: true, editBtn: true } : buttonAction === EDIT_ACTION ? { ...defaultBtnVisiblity, saveBtn: true, cancelBtn: true } : { ...defaultBtnVisiblity, saveBtn: true, saveAndNewBtn: true, cancelBtn: true });

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const tableProps = {
        isLoading,
        tableData: searchData,
        tableColumn: tableColumn(handleButtonClick, page?.current, page?.pageSize),
        setPage,
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setTimeData([]);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const formProps = {
        form,
        isVisible: isFormVisible,
        showGlobalNotification,
        onFinish,
        onFinishFailed,

        onCloseAction,
        titleOverride: (formActionType?.viewMode ? 'View ' : formActionType?.editMode ? 'Edit ' : 'Add ').concat(moduleTitle),
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
        buttonData,
        setButtonData,
        defaultBtnVisiblity,

        timeData,
        setTimeData,
        deletedTime,
        setDeletedTime,
    };

    const handleClearInSearch = (e) => {
        if (e?.target?.value === '') {
            setFilterString();
            listFilterForm.resetFields();
            setShowDataLoading(false);
        }
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, advanceFilter: false, keyword: value });
        }
    };

    const title = 'Criticality Group Name';

    const advanceFilterResultProps = {
        advanceFilter: false,
        filterString,
        from: listFilterForm,

        onSearchHandle,
        handleClearInSearch,
        handleReferesh,
        handleButtonClick,
        title,
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
