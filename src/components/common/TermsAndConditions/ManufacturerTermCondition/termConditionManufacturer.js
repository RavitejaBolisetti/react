/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Form } from 'antd';
import { showGlobalNotification } from 'store/actions/notification';
import { escapeRegExp } from 'utils/escapeRegExp';
import { tncProductHierarchyDataActions } from 'store/actions/data/termsConditions/tncProductHierarchy';
import { tncDocumentTypeDataActions } from 'store/actions/data/termsConditions/tncDocumentType';
import { tncLanguage } from 'store/actions/data/termsConditions/tncLanguage';
import { termConditionManufacturerActions } from 'store/actions/data/termsConditions/termsConditionsManufacturerAction';
import { changeHistoryManufacturerDataActions } from 'store/actions/data/termsConditions/changeHistoryManufacturerAction';
import { ChangeHistory } from './changeHistoryForm';
import { AddEditForm } from './AddEditForm';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { ListDataTable } from 'utils/ListDataTable';
import { btnVisiblity } from 'utils/btnVisiblity';
import { CustomEditor } from 'components/common/CustomEditor';

import { formatDate } from 'utils/formatDateTime';
import { tableColumn } from './tableColumn';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import moment from 'moment';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            TermCondition: {
                ProductHierarchyData: { isLoaded: isDataLoaded = false, data: productHierarchyList, isLoading, isLoadingOnSave, isFormDataLoaded },
                DocumentTypeData: { isLoaded: isDocumentTypeDataLoaded = false, data: documentTypeList },
                LanguageData: { isLoaded: islanguageDataLoaded = false, data: languageList },
                ManufacturerTermsConditions: { isLoaded: ManufacturerTermsConditionsDataLoaded = false, data: ManufacturerTermsConditionsData },
                ChangeHistoryManufacturerTermsConditions: { isLoaded: ChangeHistoryTermsConditionsDataLoaded = false, data: ChangeHistoryTermsConditionsData },
            },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = translateContent('termConditionManufacturer.heading.moduletitle');

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
            changeHistoryData: changeHistoryManufacturerDataActions.fetchList,
            listShowChangeHistoryLoading: changeHistoryManufacturerDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const TncManufacturer = ({ moduleTitle, saveData, userId, fetchTermCondition, ManufacturerTermsConditionsDataLoaded, ManufacturerTermsConditionsData, isDataLoaded, isDocumentTypeDataLoaded, islanguageDataLoaded, fetchProductList, fetchDocumentTypeList, fetchLanguageList, changeHistoryData, ChangeHistoryTermsConditionsData, ChangeHistoryTermsConditionsDataLoaded, listShowLoading, listShowChangeHistoryLoading, productHierarchyList, documentTypeList, languageList, fetchList, showGlobalNotification, isLoading, isFormDataLoaded, isLoadingOnSave, onSaveShowLoading }) => {
    const [form] = Form.useForm();

    const [formActionType, setFormActionType] = useState('');
    const [formData, setFormData] = useState({});
    const [isChecked, setIsChecked] = useState(formData?.status === 'Y' ? true : false);

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [searchData, setSearchdata] = useState();
    const [refershData, setRefershData] = useState(false);
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [filterString, setFilterString] = useState();
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [saveclick, setsaveclick] = useState();
    const [saveandnewclick, setsaveandnewclick] = useState();
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [listFilterForm] = Form.useForm();
    const [productName, setProductName] = useState();
    const [documentName, setDocumentName] = useState();
    const [languageName, setLanguageName] = useState();
    const [effectiveFrom, seteffectiveFrom] = useState('');
    const [effectiveTo, seteffectiveTo] = useState('');
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const [termsAndCondition, setTermsAndCondition] = useState(undefined);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };
    const onErrorAction = (res) => {
        setRefershData(false);
        setShowDataLoading(false);
    };
    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchProductList({ setIsLoading: listShowLoading, userId });
            fetchDocumentTypeList({ setIsLoading: listShowLoading, userId });
            fetchLanguageList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [islanguageDataLoaded, userId]);

    useEffect(() => {
        if (userId) {
            fetchTermCondition({ setIsLoading: listShowLoading, userId, onSuccessAction, onErrorAction });
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, ManufacturerTermsConditionsDataLoaded, ManufacturerTermsConditionsData]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, isViewModeVisible: buttonAction === VIEW_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction, saveAndNewBtn: false }));

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
        tableColumn: tableColumn(handleButtonClick),
        tableData: searchData,
    };

    const onFinish = (values, e) => {
        const recordId = formData?.id || '';
        const newVersion = (values.version ? Number(values?.version) : 1.0).toFixed(1);
        const termConditionText = typeof values.termsconditiondescription === 'string' ? values.termsconditiondescription : values.termsconditiondescription.editor.getData();
        const data = { ...values, version: String(newVersion), id: recordId, termsconditiondescription: termConditionText, effectivefrom: formatDate(values?.effectivefrom), effectiveto: formatDate(values?.effectiveto) };

        const onSuccess = (res) => {
            listShowLoading(false);
            form.resetFields();
            setSelectedRecord({});
            setShowDataLoading(false);
            setIsFormVisible(false);
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        };
        setTimeout(() => {
            fetchTermCondition({ setIsLoading: listShowLoading, userId });
        }, 2000);

        const onError = (message) => {
            listShowLoading(false);
            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationSuccess.error'), message, placement: 'bottomRight' });
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
        form.validateFields()
            .then((values) => {})
            .catch((err) => console.error(err));
    };

    const handleReferesh = (e) => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const onSearchHandle = (value) => {
        setFilterString(value);
    };

    const handleClearInSearch = (e) => {
        if (e.target.value.length > 2) {
            listFilterForm.validateFields(['code']);
        } else if (e?.target?.value === '') {
            setFilterString();
            listFilterForm.resetFields();
            setShowDataLoading(false);
        }
    };

    const filterFunction = (filterString) => (title) => {
        return title && title.match(new RegExp(escapeRegExp(filterString), 'i'));
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
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
        isVisible: isFormVisible,
        isViewModeVisible,
        saveclick,
        setsaveclick,
        setsaveandnewclick,
        saveandnewclick,
        setIsFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
        selectedRecord,
        formBtnDisable,
        setFormBtnDisable,
        onFinishFailed,
        onFinish,
        form,
        handleAdd,
        isChecked,
        formData,
        setIsChecked,
        formActionType,
        setFormData,
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
        CustomEditor,
    };

    const title = translateContent('termConditionManufacturer.heading.moduletitle');

    const showChangeHistoryList = () => {
        setButtonData({ cancelBtn: true });
        setIsHistoryVisible(true);
        changeHistoryData({ setIsLoading: listShowLoading, userId });
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
        tableData: searchData,
        showChangeHistoryList,
    };

    const changeHistoryClose = () => {
        setIsHistoryVisible(false);
    };

    const changeHistoryProps = {
        isVisible: isHistoryVisible,
        ChangeHistoryTermsConditionsData,
        onCloseAction: changeHistoryClose,
        isChangeHistoryContainer: false,
        tableData: searchData,
    };

    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleButtonClick={handleAdd} isLoading={showDataLoading} {...tableProps} showAddButton={true} />
                </Col>
            </Row>
            <ChangeHistory {...changeHistoryProps} />
            <AddEditForm {...formProps} />
        </>
    );
};

export const TermConditionManufacturerMaster = connect(mapStateToProps, mapDispatchToProps)(TncManufacturer);
