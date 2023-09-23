/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Col, Form, Row } from 'antd';
import GSTIRNFilter from './GSTIRNFilter';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';
 import { GSTIRNMainConatiner } from './GSTIRNMainConatiner';
import { GST_IRN_SECTION } from 'constants/GSTIRNSection';
import { showGlobalNotification } from 'store/actions/notification';
import { UploadUtil } from 'utils/Upload';
import { ViewSupportingDocDetail } from './ViewSupportingDocDetail';
import { GSTLoginForm } from './GSTLoginForm';
// import { FilterIcon } from 'Icons';
import { dealerGstAction } from 'store/actions/data/financialAccounting/dealerGstAction';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            // ConfigurableParameterEditing: { filteredListData: typeData = [] },
            FinancialAccounting: {
                DealerGstDetails: {  data: dealerGstData = [] },
            },            
        },
    } = state;

    const moduleTitle = 'GST IRN Authentication';
    let returnValue = {
        userId,        
        moduleTitle,
        dealerGstData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: dealerGstAction.fetchList,
            listShowLoadingGst: dealerGstAction.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const GSTIRNAuthenticationMasterBase = (props) => {
    const { userId, data, showGlobalNotification } = props;
    const { typeData, moduleTitle } = props;
    const { filterString, setFilterString, listShowLoadingGst, fetchList, dealerGstData } = props;
    const { ...viewProps } = props;

    const [listFilterForm] = Form.useForm();
    const [selectedRecord, setSelectedRecord] = useState();
    const [selectedId, setSelectedId] = useState();
    const [finalData, setFinalData] = useState([]);
    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);
    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    // const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = {
        editBtn: false,
        saveBtn: false,
        saveAndNewBtn: false,
        saveAndNewBtnClicked: false,
        closeBtn: false,
        cancelBtn: false,
        formBtnActive: false,
        deliveryNote: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [formData, setFormData] = useState([]);
    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        // setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        // setShowDataLoading(false);
    };

   
    useEffect(() => {
        if(userId){
          fetchList({setIsLoading: listShowLoadingGst, userId, onSuccessAction, onErrorAction });
        }
    },[userId]);

    useEffect(() => {
        const defaultSection = GST_IRN_SECTION.BRANCH_ACCESSIBLE.id;
        setDefaultSection(defaultSection);
        setSetionName(GST_IRN_SECTION);
        setSection(defaultSection);
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

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        form.setFieldsValue(undefined);
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                record && setSelectedId(record?.supplierInvoiceNumber);
                break;
            case EDIT_ACTION:
                setSelectedRecord(record);
                record && setSelectedId(record?.supplierInvoiceNumber);
                openDefaultSection && setCurrentSection(defaultSection);
                break;
            case VIEW_ACTION:
                setSelectedRecord(record);
                record && setSelectedId(record?.supplierInvoiceNumber);
                defaultSection && setCurrentSection(defaultSection);
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

    const onFinishSearch = (values) => {};

    const handleResetFilter = (e) => {
        // setShowDataLoading(false);
        setFilterString();
        advanceFilterForm.resetFields();
    };

    const onFinish = (values) => {
        console.log('values',values);
        setCurrentSection(1);
        handleButtonClick({record:values, VIEW_ACTION, openDefaultSection:false, currentSection:1, });    
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };
    // const onFinish = (values) => {
    //     const data = { supplierInvoiceNumber: selectedId };
    //     const onSuccess = (res) => {
    //         form.resetFields();
    //         setShowDataLoading(true);
    //         showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
    //         fetchVehicleReceiptList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
    //         setButtonData({ ...buttonData, formBtnActive: false });
    //         setIsFormVisible(false);
    //     };
    //     const onError = (message) => {
    //         showGlobalNotification({ message });
    //     };
    //     const requestData = {
    //         data: data,
    //         method: 'put',
    //         setIsLoading: listShowLoading,
    //         userId,
    //         onError,
    //         onSuccess,
    //     };
    //     saveData(requestData);
    // };

    // const onFinishFailed = (errorInfo) => {
    //     return;
    // };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onCloseAction = () => {
        form.resetFields();
        form.setFieldsValue();

        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        // setAdvanceSearchVisible(false);

        setSelectedRecord();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
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

    
    // const handleChange = (e) => {
    //     setSearchValue(e.target.value);
    // };

    // const handleSearch = (value) => {
    //     setFilterString({ ...filterString, grnNumber: value });
    //     setSearchValue(value);
    // };

    const advanceFilterResultProps = {
        removeFilter,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        handleResetFilter,
        advanceFilterForm,
        data,
        typeData,
        searchForm,
        onFinishSearch,
        userId,
        dealerGstData,
    };

    // const advanceFilterProps = {
    //     isVisible: isAdvanceSearchVisible,
    //     icon: <FilterIcon size={20} />,
    //     titleOverride: 'Advance Filters',
    //     onCloseAction: onAdvanceSearchCloseAction,
    //     handleResetFilter,
    //     filterString,
    //     setFilterString,
    //     advanceFilterForm,
    //     setAdvanceSearchVisible,
    //     // vehicleReceiptStatusList,
    //     grnTypeData,
    //     onFinishSearch,
    // };

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View ';
        } else if (formActionType?.editMode) {
            return 'Edit ';
        } else {
            return 'Add New ';
        }
    }, [formActionType]);

    const containerProps = {
        record: selectedRecord,
        form,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
        tableData: data,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        NEXT_ACTION,
        buttonData,
        setIsFormVisible,
        finalData,
        setFinalData,
        setButtonData,
        handleButtonClick,
        defaultFormActionType,
        defaultBtnVisiblity,
        selectedId,
        setSelectedId,
        selectedRecord,
        setSelectedRecord,
        section,
        currentSection,
        sectionName,
        setCurrentSection,
        formData,
        setFormData,
        handleFormValueChange,
        isLastSection,
        typeData,
        saveButtonName: isLastSection ? 'Submit' : 'Next',
        addMode: formActionType?.addMode,
        editMode: formActionType?.editMode,
    };

    const loginProps = {
        onFinish,
        onFinishFailed,
    };
    const uploadProps = {         
        // uploadedFile,
        // setUploadedFile,
        // fileList,
        // setFileList,
        uploadButtonName: 'Upload File',
        messageText: 'Click or drop your file here to upload',
        validationText: 'File type should be .pem and max file size to be 5Mb',
        supportedFileTypes: ['image/.pem'],
        maxSize: 5,
        supportingDocs: true,
        // setMandatoryFields,
        // onRemove,
    };
    return (
        <>
            <GSTIRNFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Card>
                        <div className={styles.marB20}>
                            <UploadUtil {...uploadProps} handleFormValueChange={handleFormValueChange} />
                            <ViewSupportingDocDetail {...viewProps} />
                        </div>
                    </Card>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Card>
                        <div style={{ background: '#ffffff', marginBottom: '20px', padding: '15px' }}>
                            <GSTLoginForm {...loginProps} />
                        </div>
                    </Card>
                </Col>
            </Row>
            <GSTIRNMainConatiner {...containerProps} />
        </>
    );
};

export const GSTIRNAuthenticationMaster = connect(mapStateToProps, mapDispatchToProps)(GSTIRNAuthenticationMasterBase);
