import React, { useState, useEffect, useReducer, useMemo } from 'react';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'antd';
import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { filterFunction } from 'utils/filterFunction';
import { btnVisiblity } from 'utils/btnVisiblity';
import { AddEditForm } from './AddEditForm';
import { ListDataTable } from 'utils/ListDataTable';

export const OtfMasterBase = (props) => {
    const { data, saveData, fetchList, userId, isDataLoaded, listShowLoading, showGlobalNotification, isPinCodeLoading, pinCodeShowLoading } = props;
    const { dealerParentData, isDealerParentDataLoaded, fetchDealerParentList, listDealerParentShowLoading, pincodeData, fetchPincodeDetail } = props;

    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (userId && !isDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, onErrorAction });
        }
        if (userId && !isDealerParentDataLoaded) {
            fetchDealerParentList({ setIsLoading: listDealerParentShowLoading, userId });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataLoaded, isDealerParentDataLoaded]);

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
                const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.companyName) : true));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
                setShowDataLoading(false);
            } else {
                setSearchdata(data?.map((el, i) => ({ ...el, srl: i + 1 })));
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

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, advanceFilter: false, keyword: value });
        }
    };

    const handleResetFilter = (e) => {
        setFilterString();
        listFilterForm.resetFields();
        setShowDataLoading(false);
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

    const onFinish = (values) => {
        const recordId = formData?.parentId || form.getFieldValue('parentId');
        let data = { ...values, parentId: recordId };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });

            setButtonData({ ...buttonData, formBtnActive: false });
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            }
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

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View ';
        } else if (formActionType?.editMode) {
            return 'Edit ';
        } else {
            return 'Add ';
        }
    }, [formActionType]);

    const formProps = {
        form,
        formData,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat('Otf Details'),
        tableData: searchData,
        buttonData,
        setButtonData,
        handleButtonClick,
        handleResetFilter,
        listShowLoading,
        pincodeData,
        fetchPincodeDetail,
        dealerParentData,
        isPinCodeLoading,
        forceUpdate,
        pinCodeShowLoading,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick, page?.current, page?.pageSize),
        tableData: [{}],
        setPage,
    };

    const title = 'Search OTF';

    const advanceFilterResultProps = {
        advanceFilter: false,
        filterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        onSearchHandle,
        handleResetFilter,
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
                    <ListDataTable handleAdd={handleButtonClick} isLoading={showDataLoading} {...tableProps} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const OtfMaster = connect(null, null)(OtfMasterBase);
