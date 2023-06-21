import React, { useState, useEffect, useReducer, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Form, Row } from 'antd';
import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import AdvanceOtfFilter from './AdvanceOtfFilter';
import { filterFunction } from 'utils/filterFunction';
import { btnVisiblity } from 'utils/btnVisiblity';
import { AddEditForm } from './AddEditForm';
import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { OTF_STATUS } from 'constants/OTFStatus';

import { showGlobalNotification } from 'store/actions/notification';


import { otfDetailsDataActions } from 'store/actions/data/otf/otfDetails';

import { FilterIcon } from 'Icons';

const otfSearchList = [
    { id: 'OTF No', value: 'OTF No.' },
    { id: 'Mobile No', value: 'Mobile No.' },
    { id: 'Customer Name', value: 'Customer Name' },
];

const initialTableData = [
    { otfNumber: 'OTF001', otfDate: '1 Dec 2022', customerName: 'John', mobileNumber: '9988122299', model: 'Model', orderStatus: 'Booked', status: 1 },
    { otfNumber: 'OTF002', otfDate: '1 Dec 2012', customerName: 'John', mobileNumber: '8988122299', model: 'Model', orderStatus: 'Alloted', status: 2 },
    { otfNumber: 'OTF1123', otfDate: '1 Jan 2023', customerName: 'Michel', mobileNumber: '9977122299', model: 'Model', orderStatus: 'Cancelled', status: 3 },
    { otfNumber: 'OTF1124', otfDate: '1 Jan 2023', customerName: 'Michel', mobileNumber: '9999122299', model: 'Model', orderStatus: 'Invoiced', status: 4 },
    { otfNumber: 'OTF1125', otfDate: '1 Jan 2023', customerName: 'Michel', mobileNumber: '6988122299', model: 'Model', orderStatus: 'Delivered', status: 5 },
    { otfNumber: 'OTF1126', otfDate: '1 Jan 2023', customerName: 'Michel', mobileNumber: '6988122299', model: 'Model', orderStatus: 'Transferred', status: 6 },
    { otfNumber: 'OTF1127', otfDate: '1 Jan 2023', customerName: 'Michel', mobileNumber: '7988122299', model: 'Model', orderStatus: 'Pending for Cancellation', status: 7 },
];

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                OtfDetails: { isLoaded: isDataLoaded = false, isLoading, data: otfData = [] },
            },
        },
    } = state;
    const moduleTitle = 'OTF Details';

    let returnValue = {
        userId,

        isDataLoaded,

        otfData,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: otfDetailsDataActions.fetchList,
            saveData: otfDetailsDataActions.saveData,
            resetData: otfDetailsDataActions.reset,
            listShowLoading: otfDetailsDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const OtfMasterBase = (props) => {
    const { fetchList, saveData, listShowLoading, userId, isDataLoaded, otfData, isLoading } = props;

    const [form] = Form.useForm();
    const [otfSearchResult, setOtfSearchResult] = useState(initialTableData);
    const [listFilterForm] = Form.useForm();
    const [showDataLoading, setShowDataLoading] = useState(false);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [isNewDataLoading, setIsNewDataLoading] = useState(false);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

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

    const errorAction = (message) => {
        showGlobalNotification(message);
    };

   

    // useEffect(() => {
    //     if (!isDataLoaded && userId) {
    //         fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, errorAction, userId });
    //     }
    //     setFormData(otfData);
    //     // forceUpdate();

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId]);

  

    // useEffect(() => {
    //     if (userId && refershData) {
    //         fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId, refershData]);

    // useEffect(() => {
    //     if (isDataLoaded && data && userId) {
    //         if (filterString) {
    //             const keyword = filterString?.keyword;
    //             const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.companyName) : true));
    //             setSearchdata(filterDataItem);
    //             setShowDataLoading(false);
    //         } else {
    //             setSearchdata(data);
    //             setShowDataLoading(false);
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [filterString, isDataLoaded, data, userId]);

    const handleReferesh = () => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);
        const extraParams = [
            {
                key: 'otfNumber',
                title: 'otfNumber',
                value: record?.otfNumber,
                name: 'OTF Number',
            },
        ];
        fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, errorAction, userId });


        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));


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
        setFormData,
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
            if (name === 'code') {
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
        otfStatusList: Object.values(OTF_STATUS),
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

export const OtfMaster = connect(mapStateToProps, mapDispatchToProps)(OtfMasterBase);
