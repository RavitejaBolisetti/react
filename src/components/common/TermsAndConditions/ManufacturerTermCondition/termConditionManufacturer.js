import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Form } from 'antd';
import { notification } from 'antd';

import { showGlobalNotification } from 'store/actions/notification';
import { escapeRegExp } from 'utils/escapeRegExp';
import { tncProductHierarchyDataActions } from 'store/actions/data/termsConditions/tncProductHierarchy';
import { tncDocumentTypeDataActions } from 'store/actions/data/termsConditions/tncDocumentType';
import { tncLanguage } from 'store/actions/data/termsConditions/tncLanguage';

import { termConditionManufacturerActions } from 'store/actions/data/termsConditions/termsConditionsManufacturerAction';
import { changeHistoryDataActions } from 'store/actions/data/termsConditions/changeHistoryAction';
import { ChangeHistory } from './changeHistoryForm';
import { AddEditForm } from './AddEditForm';

import { FilterIcon } from 'Icons';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { ListDataTable } from 'utils/ListDataTable';
import { tableColumn } from './tableColumn';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import moment from 'moment';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            TermCondition: {
                ProductHierarchyData: { isLoaded: isDataLoaded = false, data: productHierarchyList, isLoading, isLoadingOnSave, isFormDataLoaded },
                DocumentTypeData: { isLoaded: isDocumentTypeDataLoaded = false, data: documentTypeList },
                LanguageData: { isLoaded: islanguageDataLoaded = false, data: languageList },
                ManufacturerTermsConditions: { isLoaded: ManufacturerTermsConditionsDataLoaded = false, data: ManufacturerTermsConditionsData },
                ChangeHistoryTermsConditions: { isLoaded: ChangeHistoryTermsConditionsDataLoaded = false, data: ChangeHistoryTermsConditionsData },
            },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'Term & Condition';

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        isDocumentTypeDataLoaded,
        islanguageDataLoaded,
        isLoading,
        productHierarchyList,
        documentTypeList,
        languageList,
        isLoadingOnSave,
        isFormDataLoaded,
        moduleTitle,
        ManufacturerTermsConditionsData,
        ManufacturerTermsConditionsDataLoaded,
        ChangeHistoryTermsConditionsData,
        ChangeHistoryTermsConditionsDataLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchProductList: tncProductHierarchyDataActions.fetchList,
            listShowLoading: tncProductHierarchyDataActions.listShowLoading,

            fetchDocumentTypeList: tncDocumentTypeDataActions.fetchList,
            fetchLanguageList: tncLanguage.fetchList,

            fetchTermCondition: termConditionManufacturerActions.fetchList,
            saveData: termConditionManufacturerActions.saveData,
            changeHistoryData: changeHistoryDataActions.fetchList,
            showGlobalNotification,
        },
        dispatch
    ),
});

const initialTableData = [];
const TncManufacturer = ({ moduleTitle, saveData, userId, fetchTermCondition, ManufacturerTermsConditionsDataLoaded, ManufacturerTermsConditionsData, isDataLoaded, isDocumentTypeDataLoaded, islanguageDataLoaded, fetchProductList, fetchDocumentTypeList, fetchLanguageList, changeHistoryData, ChangeHistoryTermsConditionsData, ChangeHistoryTermsConditionsDataLoaded, listShowLoading, productHierarchyList, documentTypeList, languageList, fetchList, showGlobalNotification, isLoading, isFormDataLoaded, isLoadingOnSave, onSaveShowLoading }) => {
    const [form] = Form.useForm();

    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [data, setData] = useState(initialTableData);
    const [formData, setFormData] = useState({});
    const [isChecked, setIsChecked] = useState(formData?.status === 'Y' ? true : false);

    const [forceFormReset, setForceFormReset] = useState(false);
    const [searchData, setSearchdata] = useState();
    const [refershData, setRefershData] = useState(false);
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [filterString, setFilterString] = useState();
    const [footerEdit, setFooterEdit] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [saveAndSaveNew, setSaveAndSaveNew] = useState(false);
    const [saveBtn, setSaveBtn] = useState(false);
    const [saveclick, setsaveclick] = useState();
    const [saveandnewclick, setsaveandnewclick] = useState();
    const [successAlert, setSuccessAlert] = useState(false);
    const [codeIsReadOnly, setcodeIsReadOnly] = useState(false);
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [showDataLoading, setShowDataLoading] = useState(true);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [listFilterForm] = Form.useForm();
    const [productName, setProductName] = useState();
    const [documentName, setDocumentName] = useState();
    const [languageName, setLanguageName] = useState();
    const [termsAndCondition, setTermsAndCondition] = useState(undefined);
    const [effectiveFrom, seteffectiveFrom] = useState('');
    const [effectiveTo, seteffectiveTo] = useState('');
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const [searchDataChangeHistory, setSearchdataChangeHistory] = useState();

    const [page, setPage] = useState(1);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;
    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

    useEffect(() => {
        form.resetFields();
        form.setFieldValue(formData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchProductList({ setIsLoading: listShowLoading, userId });
            fetchDocumentTypeList({ setIsLoading: listShowLoading, userId });
            fetchLanguageList({ setIsLoading: listShowLoading, userId });
            fetchTermCondition({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [islanguageDataLoaded, userId]);

    useEffect(() => {
        if (userId && refershData) {
            fetchTermCondition({ setIsLoading: listShowLoading, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refershData, userId]);

    useEffect(() => {
        if (ManufacturerTermsConditionsDataLoaded && ManufacturerTermsConditionsData) {
            if (filterString) {
                const filterDataItem = ManufacturerTermsConditionsData?.filter((item) => filterFunction(filterString)(item?.documentTypeCode) || filterFunction(filterString)(item?.productName) || filterFunction(filterString)(item?.languageDesc));
                setSearchdata(filterDataItem);
            } else {
                setSearchdata(ManufacturerTermsConditionsData);
            }
        }
    }, [filterString, ManufacturerTermsConditionsDataLoaded, ManufacturerTermsConditionsData]);

    useEffect(() => {
        if (ChangeHistoryTermsConditionsDataLoaded && ChangeHistoryTermsConditionsData) {
            setSearchdataChangeHistory(ChangeHistoryTermsConditionsData);
        }
    }, [ChangeHistoryTermsConditionsDataLoaded, ChangeHistoryTermsConditionsData]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, isViewModeVisible: buttonAction === VIEW_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(buttonAction === VIEW_ACTION ? { ...defaultBtnVisiblity, closeBtn: true, editBtn: true } : buttonAction === EDIT_ACTION ? { ...defaultBtnVisiblity, saveBtn: true, cancelBtn: true } : { ...defaultBtnVisiblity, saveBtn: true, saveAndNewBtn: false, cancelBtn: true });
        if (buttonAction === 'view') {
            setIsViewModeVisible(true);
        }
        record && setFormData(record);
        if (record?.effectivefrom && record?.effectiveto && (formActionType?.editMode || formActionType?.viewMode)) {
            const effectiveFromDateData = moment(record?.effectivefrom).format('YYYY/MM/DD');
            const effectiveToDateData = moment(record?.effectiveto).format('YYYY/MM/DD');

            seteffectiveFrom(effectiveFromDateData);
            seteffectiveTo(effectiveToDateData);
        }

        setTimeout(() => {
            setIsFormVisible(true);
        }, 150);
    };
    const handleAdd = () => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD });

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick, page?.current, page?.pageSize),
        tableData: searchData,
        setPage,
    };

    const onFinish = (values, e) => {
        const newVersion = values.version ? Number(values?.version) + 0.1 : 1.0;
        let toDate = (values?.effectiveto).format('YYYY-MM-DD');
        let fromDate = (values?.effectivefrom).format('YYYY-MM-DD');

        const termConsitionText = values.termsAndCondition.editor.getData().replace(/[&\/\\#,+()$~%.'":*?<p></p>\n{}]/g, '');
        const data = { ...values, version: String(newVersion), termsconditiondescription: termConsitionText, effectivefrom: fromDate, effectiveto: toDate };

        const onSuccess = (res) => {
            listShowLoading(false);
            form.resetFields();
            setSelectedRecord({});
            setSuccessAlert(true);
            if (saveclick === true) {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            } else {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            }
        };

        setTimeout(() => {
            fetchTermCondition({ setIsLoading: listShowLoading, userId });
        }, 2000);

        const onError = (message) => {
            listShowLoading(false);
            showGlobalNotification({ notificationType: 'error', title: 'Error', message, placement: 'bottomRight' });
        };

        const requestData = {
            data: data,
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

    const handleReferesh = (e) => {
        setRefershData(!refershData);
    };

    const onSearchHandle = (value) => {
        setFilterString(value);
    };

    const filterFunction = (filterString) => (title) => {
        return title && title.match(new RegExp(escapeRegExp(filterString), 'i'));
    };

    const formProps = {
        isVisible: isFormVisible,
        isViewModeVisible,
        codeIsReadOnly,
        saveclick,
        setsaveclick,
        setsaveandnewclick,
        saveandnewclick,
        setIsFormVisible,
        onCloseAction: () => (setIsFormVisible(false), setFormBtnDisable(false), form.resetFields()),
        titleOverride: (formActionType?.viewMode ? 'View ' : formActionType?.editMode ? 'Edit ' : 'Add ').concat(moduleTitle),
        selectedRecord,
        formBtnDisable,
        saveAndSaveNew,
        saveBtn,
        setFormBtnDisable,
        onFinishFailed,
        onFinish,
        form,
        handleAdd,
        data,
        isChecked,
        formData,
        setIsChecked,
        formActionType,
        isReadOnly,
        setFormData,
        setForceFormReset,
        footerEdit,
        isLoadingOnSave,
        setIsViewModeVisible,
        productHierarchyList,
        documentTypeList,
        languageList,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
        productName,
        setProductName,
        documentName,
        setDocumentName,
        setTermsAndCondition,
        languageName,
        setLanguageName,
        termsAndCondition,
        effectiveFrom,
        effectiveTo,
        seteffectiveFrom,
        seteffectiveTo,
    };

    const title = 'Term & Condition';
    const handleClearInSearch = (e) => {
        if (e?.target?.value === '') {
            setFilterString();
            listFilterForm.resetFields();
            setShowDataLoading(false);
        }
    };

    const extraParams = [
        {
            key: 'id',
            title: 'id',
            value: '',
            name: 'id',
        },
    ];

    const showChangeHistoryList = () => {
        setButtonData({ cancelBtn: true });
        setIsHistoryVisible(true);
        extraParams['0']['value'] = '1ebc0d34-409b-44f3-a7e3-ffb70f1cc888';
        changeHistoryData({ setIsLoading: listShowLoading, userId, extraParams });
    };

    const advanceFilterResultProps = {
        advanceFilter: false,
        filterString,
        from: listFilterForm,

        onSearchHandle,
        handleClearInSearch,
        handleReferesh,
        handleButtonClick,
        title,
        showAddButton: ManufacturerTermsConditionsData?.length > 0 ? true : false,
        showChangeHistoryButton: ManufacturerTermsConditionsData?.length > 0 ? true : false,
        showChangeHistoryList,
    };

    const changeHistoryClose = () => {
        setIsHistoryVisible(false);
    };

    const changeHistoryProps = {
        isVisible: isHistoryVisible,
        ChangeHistoryTermsConditionsData,
        onCloseAction: changeHistoryClose,
    };

    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleAdd={handleAdd} isLoading={isLoading} {...tableProps} />
                </Col>
            </Row>
            <ChangeHistory {...changeHistoryProps} />
            <AddEditForm {...formProps} />
        </>
    );
};

export const TermConditionManufacturerMaster = connect(mapStateToProps, mapDispatchToProps)(TncManufacturer);
