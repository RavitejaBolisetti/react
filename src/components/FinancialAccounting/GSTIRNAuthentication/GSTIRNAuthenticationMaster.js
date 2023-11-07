/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Col, Form, Row } from 'antd';
import { FiEye, FiTrash } from 'react-icons/fi';
import GSTIRNFilter from './GSTIRNFilter';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';
import { GSTIRNMainConatiner } from './GSTIRNMainConatiner';
import { GST_IRN_SECTION } from 'constants/GSTIRNSection';
import { showGlobalNotification } from 'store/actions/notification';
import { UploadUtil } from 'utils/Upload';
import { ViewSupportingDocDetail } from './ViewSupportingDocDetail';
import { GSTLoginForm } from './GSTLoginForm';
import { dealerGstAction } from 'store/actions/data/financialAccounting/dealerGstAction';
// import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { gstIrnLoginAction } from 'store/actions/data/financialAccounting/gstIrnLoginAction';
import { selectGstToDocAction } from 'store/actions/data/financialAccounting/selectGstToDocAction';
import { BASE_URL_GST_DOCID_NAME as customURL } from 'constants/routingApi';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            FinancialAccounting: {
                DealerGstDetails: { data: dealerGstData = [] },
            },
        },
    } = state;

    const moduleTitle = 'GST IRN Authentication';
    let returnValue = {
        userId,
        accessToken,
        token,
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
            downloadFile: supportingDocumentDataActions.downloadFile,
            listShowLoading: supportingDocumentDataActions.listShowLoading,

            saveData: gstIrnLoginAction.saveData,
            fetchListGstLogin: gstIrnLoginAction.fetchList,
            listShowLoadingGstLogin: gstIrnLoginAction.listShowLoading,

            fetchGstDoc: selectGstToDocAction.fetchList,
            listShowLoadingGstDoc: selectGstToDocAction.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const GSTIRNAuthenticationMasterBase = (props) => {
    const { userId, data, showGlobalNotification } = props;
    const { typeData } = props;
    const { filterString, setFilterString, listShowLoadingGst, fetchList, dealerGstData } = props;
    const { listShowLoadingGstLogin, fetchListGstLogin, listShowLoading, saveData } = props;
    const { fetchGstDoc, downloadFile } = props;

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
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [uploadedFile, setUploadedFile] = useState();
    const [emptyList, setEmptyList] = useState(true);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [fileList, setFileList] = useState([]);
    const [singleDisabled, setSingleDisabled] = useState(true);
    const [currentGst, setCurrentGst] = useState();
    const [draggerDisable, setDraggerDisable] = useState(true);
    const [docData, setDocData] = useState();

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
    const onSuccessAction = () => {
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const handleGstinNumber = (value) => {
        setCurrentGst(value);
        // To call a service for file name and docId
        fetchGstDoc({
            setIsLoading: () => {},
            userId,
            extraParams: [
                {
                    key: 'gstin',
                    value: value,
                },
            ],
            customURL,
            onSuccessAction: (res) => {
                if (res.data.documentId) {
                    setFileList([]);
                    setDocData(res.data);
                    setSingleDisabled(true);
                    setDraggerDisable(true);
                    showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                }
            },
            onErrorAction: (res) => {
                setDocData();
                setSingleDisabled(false);
                setDraggerDisable(false);
                showGlobalNotification({ notificationType: 'error', title: 'Error', message: res });
            },
        });
    };

    useEffect(() => {
        if (userId) {
            fetchList({ setIsLoading: listShowLoadingGst, userId, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        const defaultSection = GST_IRN_SECTION.BRANCH_ACCESSIBLE.id;
        setDefaultSection(defaultSection);
        setSetionName(GST_IRN_SECTION);
        setSection(defaultSection);
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

    const handleButtonClick = ({ buttonAction }) => {
        form.resetFields();
        form.setFieldsValue(undefined);
        switch (buttonAction) {
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

    const onFinish = (values) => {
        const data = { ...values, docId: uploadedFile ? uploadedFile : docData.documentId };

        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchListGstLogin({ setIsLoading: listShowLoadingGstLogin, userId, onSuccessAction, onErrorAction });

            setButtonData({ ...buttonData, formBtnActive: false });
            setIsFormVisible(false);
            setCurrentSection(1);
            handleButtonClick({ record: values, VIEW_ACTION, openDefaultSection: false, currentSection: 1 });
        };
        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };
        saveData(requestData);
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onCloseAction = () => {
        setDocData();
        form.resetFields();
        form.setFieldsValue();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setSelectedRecord();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const advanceFilterResultProps = {
        advanceFilter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        advanceFilterForm,
        data,
        typeData,
        searchForm,
        userId,
        dealerGstData,
        handleGstinNumber,
    };

    const containerProps = {
        record: selectedRecord,
        form,
        formActionType,
        setFormActionType,
        onFinish,
        isVisible: isFormVisible,
        onCloseAction,
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
        userId,
        currentGst,
        setCurrentGst,
    };

    const loginProps = {
        onFinish,
    };

    const onDownload = () => {
        const onSuccessAction = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage || 'Your download will start soon' });
        };
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: docData?.documentId,
                name: 'docId',
            },
        ];
        downloadFile({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction });
    };

    const onRemove = () => {
        setDocData();
        setSingleDisabled(false);
        setDraggerDisable(false);
    };
    const uploadProps = {
        messageText: 'Click or drop your file here to upload',
        validationText: 'File type should be .pem and max file size to be 5Mb',
        fileList,
        setFileList,
        emptyList,
        setEmptyList,
        multiple: false,
        supportedFileTypes: [''],
        maxSize: 5,
        accept: '',
        showUploadList: {
            showRemoveIcon: true,
            showDownloadIcon: true,
            removeIcon: <FiTrash />,
            downloadIcon: <FiEye onClick={(e) => onDownload(e)} style={{ color: '#ff3e5b' }} />,
            showProgress: true,
        },
        progress: { strokeWidth: 3, showInfo: true },
        uploadedFile,
        setUploadedFile,
        uploadedFileName,
        setUploadedFileName,
        single: true,
        singleDisabled,
        setSingleDisabled,
        isReplaceEnabled: false,
        undefinedType: true,
        draggerDisable,
        setDraggerDisable,
        downloadFile,
    };

    const fileProps = {
        docData,
        setDocData,
        onDownload,
        onRemove,
    };
    return (
        <>
            <Form form={form} name="login_from" layout="vertical" autocomplete="off" onFinish={onFinish}>
                <GSTIRNFilter {...advanceFilterResultProps} />
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Card>
                            <div className={styles.marB20}>
                                <UploadUtil {...uploadProps} handleFormValueChange={handleFormValueChange} />

                                <ViewSupportingDocDetail {...fileProps} />
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
            </Form>
            <GSTIRNMainConatiner {...containerProps} />
        </>
    );
};

export const GSTIRNAuthenticationMaster = connect(mapStateToProps, mapDispatchToProps)(GSTIRNAuthenticationMasterBase);
