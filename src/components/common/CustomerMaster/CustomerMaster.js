import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row, Input, Space, Form, Empty, ConfigProvider, Select } from 'antd';
import { tblPrepareColumns } from 'utils/tableCloumn';
import DataTable from 'utils/dataTable/DataTable';
import { AddEditForm } from './AddEditForm';
import { FiEdit } from 'react-icons/fi';
import styles from 'components/common/Common.module.css';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import AdvanceFilter from './AdvanceFilter';
import { ListDataTable } from 'utils/ListDataTable';
import { tableColumn } from './tableColumn';
import { btnVisiblity } from 'utils/btnVisiblity';

const { Search } = Input;
const { Option } = Select;

const initialTableData = [
    { customerId: 'SH1121', customerName: 'Deepak Palariya', customerType: 'C T 1', mobileNo: '9988122299', emailAddress: 'dp@gmail.com', membershipType: 'M T', registrationNumber: 'RG001', chassisNumber: '9912', vpin: '1212', type: 'individual' },
    { customerId: 'SH1122', customerName: 'Rohan S', customerType: 'C T 1', mobileNo: '8888122299', emailAddress: 'dp@gmail.com', membershipType: 'M T', registrationNumber: 'RG001', chassisNumber: '9912', vpin: '1212', type: 'individual' },
    { customerId: 'SH1123', customerName: 'Deepak 2', customerType: 'C T 1', mobileNo: '9909122299', emailAddress: 'dp@gmail.com', membershipType: 'M T', registrationNumber: 'RG001', chassisNumber: '9912', vpin: '1212', type: 'individual' },
    { customerId: 'SH1124', customerName: 'Rohan 2', customerType: 'C T 1', mobileNo: '9900122299', emailAddress: 'dp@gmail.com', membershipType: 'M T', registrationNumber: 'RG001', chassisNumber: '9912', vpin: '1212', type: 'individual' },
    { customerId: 'SH1125', customerName: 'Deepak 3', customerType: 'C T 1', mobileNo: '9988122299', emailAddress: 'dp@gmail.com', membershipType: 'M T', registrationNumber: 'RG001', chassisNumber: '9912', vpin: '1212', type: 'company' },
];

const dealersData = ['Dealer 1', 'Dealer 2', 'Dealer 3', 'Dealer 4', 'Dealer 5', 'Dealer 6 '];
const dealersDataList = [
    { dealerId: 'Customer ID', dealerNm: 'Customer ID', type: 'individual' },
    { dealerId: 'Customer Name', dealerNm: 'Customer Name', type: 'individual' },
    { dealerId: 'Mobile Number', dealerNm: 'Mobile Number', type: 'individual' },
    { dealerId: 'Registration Number', dealerNm: 'Registration Number', type: 'individual' },
    { dealerId: 'Chassis Number', dealerNm: 'Chassis Number', type: 'individual' },
    { dealerId: 'VIN', dealerNm: 'VIN', type: 'individual' },
    { dealerId: 'ABC', dealerNm: 'ABC', type: 'company' },
    { dealerId: 'Company-1', dealerNm: 'Company-1', type: 'company' },
];
let showDealersDataList = dealersDataList.filter((d) => d.type === 'individual');

const CustomerMasterMain = ({ saveData, userId, isDataLoaded, listShowLoading, showGlobalNotification, isLoading, isFormDataLoaded, onSaveShowLoading }) => {
    const [form] = Form.useForm();

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [formData, setFormData] = useState({});
    const [showDataLoading, setShowDataLoading] = useState(false);
    const [searchData, setSearchdata] = useState();
    const [filterString, setFilterString] = useState();
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [saveBtn, setSaveBtn] = useState(false);
    const [saveclick, setsaveclick] = useState();
    const [saveandnewclick, setsaveandnewclick] = useState();
    const [DealerSearchvalue, setDealerSearchvalue] = useState();
    const [DealerSelected, setDealerSelected] = useState();
    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);
    const [showSaveBtn, setShowSaveBtn] = useState(true);
    const [data, setData] = useState(initialTableData);
    const [error, setError] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, closeBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;
    console.log('buttonData', buttonData);
    const [toggleButton, settoggleButton] = useState('Individual');
    const moduleTitle = 'Customer Details';

    const onFieldsChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    useEffect(() => {
        if (DealerSelected?.length > 0 && DealerSelected !== undefined) {
            setError(false);
        }
        if (DealerSelected === undefined) {
            setDealerSearchvalue('');
            setError(false);
        }
    }, [DealerSearchvalue, DealerSelected]);
    const handleButtonVisibility = (buttonAction) => {
        switch (buttonAction) {
            case ADD_ACTION: {
                setButtonData({ ...buttonData, editBtn: false, saveBtn: true, closeBtn: true, formBtnActive: false });
                break;
            }
            case EDIT_ACTION: {
                setButtonData({ ...buttonData, editBtn: false, saveBtn: true, closeBtn: true, formBtnActive: false });
                break;
            }
            case VIEW_ACTION: {
                setButtonData({ ...buttonData, editBtn: true, saveBtn: false, closeBtn: true, formBtnActive: false });
                break;
            }
            default: {
                setButtonData({ ...buttonData, editBtn: false, saveBtn: true, closeBtn: true, formBtnActive: false });
                break;
            }
        }
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        handleButtonVisibility(buttonAction);

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const tableProps = {
        isLoading: isLoading,
        tableData: data,
        tableColumn: tableColumn(handleButtonClick),
    };

    const onSuccess = (res) => {
        listShowLoading(false);
        form.resetFields();
        setSelectedRecord({});
        if (saveclick === true) {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        } else {
            setIsFormVisible(false);

            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'topRight' });
        }
    };

    const onSearchHandle = (value) => {
        console.log('This is the searched Value : ', value);
        setDealerSearchvalue(value);
        if (value === '') {
            return;
        }
        if (DealerSearchvalue?.length > 0 && DealerSelected?.length > 0 && DealerSelected !== undefined) {
            // /fetchDealerDetails({ setIsLoading: listShowLoading, userId, id: DealerSearchvalue, FetchError });
        }
        if (value === 'B6G431') {
            setError(true);
        } else if (value === 'B6G433') {
            setError(false);
        }
        setFilterString(value);
        if (DealerSelected === 'Customer Name') setData(initialTableData.filter((d) => d.customerName.includes(value)));
        if (DealerSelected === 'Mobile Number') setData(initialTableData.filter((d) => d.mobileNo.includes(value)));
    };

    const handleChange = (selectedvalue) => {
        setDealerSelected(selectedvalue);
    };
    const ChangeSearchHandler = (event) => {
        if (event.target.value === undefined) {
            setError(false);
        }
        setDealerSearchvalue(event.target.value);
    };

    const handleClickCustomerType = (custType) => {
        showDealersDataList = dealersDataList.filter((d) => d.type === custType);
        //setCustomerType(custType);
    };

    const formProps = {
        saveclick,
        onFieldsChange,
        buttonData,
        setButtonData,
        setsaveclick,
        isVisible: isFormVisible,
        isViewModeVisible,
        setIsViewModeVisible,
        form,
        formActionType,
        titleOverride: formActionType?.addMode ? 'Add New Customer' : (formActionType?.viewMode ? 'View ' : 'Edit ').concat(moduleTitle),
        onCloseAction: () => setIsFormVisible(false),
        toggleButton,
        settoggleButton,
        handleButtonClick,
    };

    const advanceFilterProps = {
        titleOverride: 'Advance Filters',
        showDealersDataList,
        DealerSearchvalue,
        ChangeSearchHandler,
        onSearchHandle,
        handleChange,
        settoggleButton,
        toggleButton,
        handleAdd: handleButtonClick,
        FROM_ACTION_TYPE,
    };

    return (
        <>
            <AdvanceFilter {...advanceFilterProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={showDataLoading} {...tableProps} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const CustomerMaster = connect(null, null)(CustomerMasterMain);
