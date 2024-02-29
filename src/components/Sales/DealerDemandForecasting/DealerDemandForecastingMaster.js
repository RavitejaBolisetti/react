/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LANGUAGE_EN } from 'language/en';
import { Row, Col, Card, Button, Form, Input, Upload, Typography, Descriptions, Collapse, Divider } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';
import styles from 'assets/sass/app.module.scss';
// import { tableColumn } from './tableColumn'; { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';

import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { translateContent } from 'utils/translateContent';
import AddEditForm from './AddEditForm';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { AddEditOpenModleForm } from './AddEditOpenModleFrom';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ProductHierarchy: { isFilteredListLoaded: isProductHierarchyDataLoaded = false, isLoading: isProductHierarchyLoading, filteredListData: VehicleLovCodeData = [], data: productHierarchyData },
        },
    } = state;

    return {
        userId,
        typeData: typeData['CHK_STATS'],
        typedataMaster: typeData,
        isProductHierarchyDataLoaded,
        isProductHierarchyLoading,
        VehicleLovCodeData,
        productHierarchyData,
    };
};
const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            viewListShowLoading: documentViewDataActions.listShowLoading,
            fetchProductData: productHierarchyDataActions.fetchList,
            ProductLovLoading: productHierarchyDataActions.listShowLoading,
           
        },
        dispatch
    ),
});

export const DealerDemandForecastingMasterBase = (props) => {
    // const { data, totalRecords, moduleTitle } = props;
    const { data, totalRecords, selectedCustomer, saveData, listShowLoading, DrawerFormButton } = props; 

    const { fetchProductData, productHierarchyData, ProductLovLoading, userId } = props;
    const [addressForm] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [filterString, setFilterString] = useState({});
    const [selectedRecord, setSelectedRecord] = useState();
    const [selectedRecordId, setSelectedRecordId] = useState();
    const [checkListDataModified, setcheckListDataModified] = useState([]);
    const [payload, setPayload] = useState([]);
    const [deletedUpload, setdeletedUpload] = useState([]);
    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [previousSection, setPreviousSection] = useState(1);
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [showDataLoading, setShowDataLoading] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({});

    const defaultBtnVisiblity = {
        editBtn: false,
        saveBtn: true,
        saveAndNewBtn: true,
        saveAndNewBtnClicked: false,
        closeBtn: false,
        cancelBtn: false,
        formBtnActive: true,
        transferBtn: false,
        allotBtn: false,
        unAllotBtn: false,
        invoiceBtn: false,
        deliveryNote: false,
        cancelOtfBtn: false,
    };
    const pageIntialState = {
        pageSize: 10,
        current: 1,
    };
    const rulesIntialstate = {
        fromdate: false,
        todate: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    //const [buttonType, setbuttonType] = useState(QUERY_BUTTONS?.APPROVAL_PENDING?.key);

    const [page, setPage] = useState({ ...pageIntialState });
    const dynamicPagination = true;
    const [formData, setFormData] = useState([]);
    // const [otfSearchRules, setOtfSearchRules] = useState({ rules: [validateRequiredInputField('search parametar')] });
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [actionButtonVisibility, setactionButtonVisibility] = useState({ canEdit: false, canView: false, DeleteIcon: false, canAdd: true });
    const [rules, setrules] = useState({ ...rulesIntialstate });
    // const [btnStatus, setBtnStatus] = useState(QUERY_BUTTONS?.APPROVAL_PENDING?.key);
    const { showGlobalNotification, resetPincodeData } = props;

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

    useEffect(() => {
        if (userId) {
            fetchProductData({
                setIsLoading: ProductLovLoading,
                userId,
                onErrorAction: (message) => {
                    showGlobalNotification({ message });
                },
                extraParams: [{ key: 'unit', value: 'Sales' }],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    // const onAdvanceSearchCloseAction = () => {
    //     setAdvanceSearchVisible(false);
    //     setrules({ fromdate: false, todate: false });
    // };
    const handleSearchChange = (value) => {
        const searchValue = value?.trim();
        if (!searchValue) {
            return;
        }
        searchForm.resetFields();
        setFilterString({
            ...filterString,
            grnNumber: value,
            advanceFilter: true,
        });
    };
    const [demandDetailsModal, setDemandDetailsModal] = useState({ isModal: false, action: FROM_ACTION_TYPE?.ADD, groupAdd: true, varinatAdd: false });

    const handleOpenModal = ({ buttonAction, groupAdd = true, varinatAdd = false }) => {
        setDemandDetailsModal({ isModal: true, buttonAction, groupAdd, varinatAdd });
    };

    const demandDetilsModalTitle = useMemo(() => {
        if (demandDetailsModal?.isModal) {
            switch (demandDetailsModal?.buttonAction) {
                case FROM_ACTION_TYPE?.ADD: {
                    return translateContent('global.buttons.add');
                }
                default: {
                    return translateContent('global.buttons.edit');
                }
            }
        }
        return '';
    }, [demandDetailsModal]);

    const addEditOpenModleFormProps = {
        isVisible: demandDetailsModal?.isModal,
        titleOverride: demandDetilsModalTitle + ' Model Details',
        onCloseAction: () => setDemandDetailsModal((prev) => ({ isModal: false, buttonAction: FROM_ACTION_TYPE?.ADD, groupAdd: true, varinatAdd: false })),
        demandDetailsModal,
    };
    const handleResetFilter = (e) => {
        if (filterString) {
            setShowDataLoading(true);
        }
        setFilterString();
        setrules({ ...rulesIntialstate });
        // advanceFilterForm.resetFields();
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();

        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                setPreviousSection(1);
                setSelectedRecord(record);
                setcheckListDataModified([]);
                setPayload([]);
                setdeletedUpload([]);
                //setFileList([]);
                break;
            case EDIT_ACTION:
                setSelectedRecord(record);
                record && setSelectedRecordId(record?.grnNumber ?? '');
                openDefaultSection && setCurrentSection(defaultSection);
                setcheckListDataModified([]);
                setPayload([]);
                setdeletedUpload([]);
                // setFileList([]);

                break;
            case VIEW_ACTION:
                setSelectedRecord(record);
                record && setSelectedRecordId(record?.grnNumber ?? '');
                defaultSection && setCurrentSection(defaultSection);
                setcheckListDataModified([]);
                setPayload([]);
                setdeletedUpload([]);
                //setFileList([]);

                break;
            case NEXT_ACTION:
                const nextSection = Object.values(sectionName)?.find((i) => i.id > currentSection);
                section && setCurrentSection(nextSection?.id);
                setLastSection(!nextSection?.id);
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
            setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        }
        setIsFormVisible(true);
    };

    //const onFinishSearch = (values) => {};
    // const onFinish = (data) => {
    //     console.log('🚀 ~ file: DealerCorporateClaimMaster.js:438 ~ onFinish ~ data:', data);
    // };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const onFinish = () => {
        //     let data = {
        //         customerId: selectedCustomer?.customerId,
        //         customerAddress: addressData?.map((el) => {
        //             const { tehsilName, cityName, districtName, stateName, ...rest } = el;
        //             return { ...rest };
        //         }),
        //     };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const addAddressHandeler = (e) => {
            e.stopPropagation();
            addressForm.resetFields();
            setIsAdding(true);
            setShowAddEditForm(true);
        };
        const onCloseAction = () => {
            form.resetFields();
            form.setFieldsValue();
            setSelectedRecord();
            setIsFormVisible(false);
            setButtonData({ ...defaultBtnVisiblity });
        };

        setIsAdding(false);
        setShowAddEditForm(false);
        setIsEditing(false);
        setEditingData({});
        addressForm.resetFields();
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    // const tableProps = {
    //     dynamicPagination,
    //     totalRecords,
    //     page,
    //     setPage,
    //   //  tableColumn: tableColumn({ handleButtonClick, actionButtonVisibility }),
    //     //tableData: tabledataOth,
    //     showAddButton: false,
    //     handleAdd: handleButtonClick,
    //     noMessge: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
    //     isLoading: showDataLoading,
    // };
    const removeFilter = (key) => {
        if (key === 'fromDate') {
            const { fromDate, toDate, ...rest } = filterString;
            setrules({ ...rulesIntialstate });
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
    };
    const disabledProps = { disabled: true };
   
    const [dlrName, setDlrName] = useState(false);
    const handleDlrChange = (value) => {
        const name = dealerCode.find((el) => el.key === value).key;
        setDlrName(name);
    };
    const formProps = {
        ...props,
        setShowAddEditForm,
        showAddEditForm,
        formActionType,
        styles,
        onFinish,
        form,
        addressForm,
        isEditing,
        setIsEditing,
        setEditingData,
        editingData,
        buttonData,
        setButtonData,
        handleButtonClick,
        handleFormValueChange,
        isAdding,
        setIsAdding,
        showGlobalNotification,
        handleOpenModal,
    };

    const dealerCode = [
        { key: 'Nbs International Ltd.', value: 'SMO11151' },
        { key: 'Bhavna Automobiles Pvt. Ltd.', value: 'SMO11152' },
        { key: 'Prime Automobiles Pvt Ltd', value: 'SMO11153' },
        { key: 'Koncept Automobiles Pvt. Ltd.', value: 'SMO11154' },
    ];
    const finYear = [
        { key: '1', value: '2023-2024' },
        { key: '2', value: '2024-2025' },
        { key: '3', value: '2025-2026' },
        { key: '4', value: '2026-2027' },
        { key: '5', value: '2027-2028' },
    ];

    const month = [
        { key: '1', value: 'March' },
        { key: '2', value: 'April' },
        { key: '3', value: 'May' },
        { key: '4', value: 'June' },
        { key: '5', value: 'July' },
        { key: '6', value: 'August' },
        { key: '7', value: 'September' },
    ];
    const viewProps = {
        showGlobalNotification,
        formActionType,
        listShowLoading,
        saveData,
        userId,
    };

    return (
        <>
            <Form form={addressForm} id="myAdd" onFieldsChange={handleFormValueChange} autoComplete="off" layout="vertical">
                <Card>
                    <Row gutter={24}>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Form.Item label={translateContent('demandForecasting.label.dealerCode')} name="dealerCode" rules={[validateRequiredSelectField(translateContent('demandForecasting.validation.dealerCode'))]}>
                                {customSelectBox({ onChange: handleDlrChange, data: dealerCode, placeholder: preparePlaceholderSelect(translateContent('demandForecasting.label.dealerCode')) })}
                            </Form.Item>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Form.Item label={translateContent('demandForecasting.label.dealerName')}>
                                <Input value={dlrName} placeholder={preparePlaceholderText(translateContent('demandForecasting.placeholder.dealerName'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Form.Item label={translateContent('demandForecasting.label.finYear')} name="finYear" rules={[validateRequiredSelectField(translateContent('demandForecasting.validation.finYear'))]}>
                                {customSelectBox({ data: finYear, placeholder: preparePlaceholderSelect(translateContent('demandForecasting.label.finYear')) })}
                            </Form.Item>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Form.Item label={translateContent('demandForecasting.label.month')} name="month" rules={[validateRequiredSelectField(translateContent('demandForecasting.validation.month'))]}>
                                {customSelectBox({ data: month, placeholder: preparePlaceholderSelect(translateContent('demandForecasting.label.month')) })}
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
            </Form>
            <AddEditForm {...formProps} />
            <AddEditOpenModleForm {...addEditOpenModleFormProps} />
        </>
    );
};
export const DealerDemandForecastingMaster = connect(mapStateToProps, mapDispatchToProps)(DealerDemandForecastingMasterBase);
