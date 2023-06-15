import React, { useState, useEffect, useReducer, useMemo } from 'react';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'antd';
import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import AdvanceOtfFilter from './AdvanceOtfFilter';
import { filterFunction } from 'utils/filterFunction';
import { btnVisiblity } from 'utils/btnVisiblity';
import { AddEditForm } from './AddEditForm';
import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';

import { FilterIcon } from 'Icons';

const otfSearchList = [
    { id: 'OTF No', value: 'OTF No.' },
    { id: 'Mobile No', value: 'Mobile No.' },
    { id: 'Customer Name', value: 'Customer Name' },
];
const otfStatusList = [
    { key: 'Invoiced', value: 'Invoiced' },
    { key: 'Transferred', value: 'Transferred' },
    { key: 'Cancelled', value: 'Cancelled' },
    { key: 'Pending for Cancellation', value: 'Pending for Cancellation' },
    { key: 'Alloted', value: 'Alloted' },
    { key: 'Booked', value: 'Booked' },
];

const initialTableData = [
    { otfNumber: 'OTF1121', otfDate: '1 Dec 2022', customerName: 'John', mobileNumber: '9988122299', model: 'Model', orderStatus: 'Booked' },
    { otfNumber: 'OTF1131', otfDate: '1 Jan 2023', customerName: 'Michel', mobileNumber: '9977122299', model: 'Model', orderStatus: 'Cancelled' },
    { otfNumber: 'OTF1131', otfDate: '1 Jan 2023', customerName: 'Michel', mobileNumber: '9999122299', model: 'Model', orderStatus: 'Invoiced' },
    { otfNumber: 'OTF1131', otfDate: '1 Jan 2023', customerName: 'Michel', mobileNumber: '6988122299', model: 'Model', orderStatus: 'Transferred' },
    { otfNumber: 'OTF1131', otfDate: '1 Jan 2023', customerName: 'Michel', mobileNumber: '7988122299', model: 'Model', orderStatus: 'Pending for Cancellation' },
    { otfNumber: 'OTF1131', otfDate: '1 Jan 2023', customerName: 'Michel', mobileNumber: '9988122299', model: 'Model', orderStatus: 'Transferred' },
    { otfNumber: 'OTF1124', otfDate: '1 Dec 2012', customerName: 'John', mobileNumber: '8988122299', model: 'Model', orderStatus: 'Alloted' },
];

export const OtfMasterBase = (props) => {
    const { data, saveData, fetchList, userId, isDataLoaded, listShowLoading, showGlobalNotification, isPinCodeLoading, pinCodeShowLoading } = props;
    const { dealerParentData, isDealerParentDataLoaded, fetchDealerParentList, listDealerParentShowLoading, pincodeData, fetchPincodeDetail } = props;

    const [form] = Form.useForm();
    const [otfSearchResult, setOtfSearchResult] = useState(initialTableData);
    const [listFilterForm] = Form.useForm();
    const [showDataLoading, setShowDataLoading] = useState(false);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const [otfSearchvalue, setOtfSearchvalue] = useState();
    const [otfSearchSelected, setOtfSearchSelected] = useState('');
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

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

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, advanceFilter: false, keyword: value });
        }

        if (otfSearchSelected !== undefined && otfSearchSelected && otfSearchSelected?.length > 0) console.log('otfSearchSelected', otfSearchSelected);

        if (value === '') {
            return;
        }

        if (otfSearchSelected === 'OTF No') setOtfSearchResult(initialTableData.filter((data) => data.otfNumber.includes(value)));
        else if (otfSearchSelected === 'Mobile No') setOtfSearchResult(initialTableData.filter((data) => data.mobileNumber.includes(value)));
        else if (otfSearchSelected === 'Customer Name') setOtfSearchResult(initialTableData.filter((data) => data.customerName.includes(value)));
    };

    const handleResetFilter = (e) => {
        setFilterString();
        listFilterForm.resetFields();
        form.resetFields();
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
        titleOverride: drawerTitle.concat('OTF Details'),
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
        tableColumn: tableColumn(handleButtonClick),
        tableData: otfSearchResult,
    };

    const handleOTFChange = (selectedvalue) => {
        setOtfSearchSelected(selectedvalue); // will use this on search data.
        setOtfSearchResult(initialTableData); // Set All data which is coming from API.
        setOtfSearchvalue(''); // Cleared search value
    };

    const ChangeSearchHandler = (event) => {
        setOtfSearchvalue(event.target.value);
    };

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            //const filterValue = type === 'text' ? value.target.value : value;

            if (name === 'code') {
                // setFilteredDepartmentData(departmentData?.filter((i) => i?.patentKey === filterValue));
                // advanceFilterForm.setFieldsValue({ departmentCode: undefined });
            }
        };
    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        form.resetFields();
    };

    const title = 'Search OTF';

    const advanceFilterResultProps = {
        advanceFilter: true,
        otfFilter: true,
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
        otfSearchList,
        ChangeSearchHandler,
        handleOTFChange,
        otfSearchvalue,
        setAdvanceSearchVisible,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,

        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',

        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        handleFilterChange,
        filterString,
        setFilterString,
        form,
        setAdvanceSearchVisible,
        otfStatusList,
    };

    return (
        <>
            <AdvanceOtfFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleAdd={handleButtonClick} isLoading={showDataLoading} {...tableProps} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <AddEditForm {...formProps} />
        </>
    );
};

export const OtfMaster = connect(null, null)(OtfMasterBase);
