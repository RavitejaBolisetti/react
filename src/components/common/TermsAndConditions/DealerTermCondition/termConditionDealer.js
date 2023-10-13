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
import { tncDealerSaveActions } from 'store/actions/data/termsConditions/tncDealerSave';
import { termConditionManufacturerActions } from 'store/actions/data/termsConditions/termsConditionsManufacturerAction';
import { changeHistoryDataActions } from 'store/actions/data/termsConditions/changeHistoryAction';
import { ChangeHistory } from './changeHistoryForm';

import { AddEditForm } from './AddEditForm';

import { formatDate } from 'utils/formatDateTime';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { btnVisiblity } from 'utils/btnVisiblity';
import { ListDataTable } from 'utils/ListDataTable';
import { tableColumn } from './tableColumn';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            TermCondition: {
                ProductHierarchyData: { isLoaded: isDataLoaded = false, data: productHierarchyList, isLoading, isLoadingOnSave, isFormDataLoaded },
                DocumentTypeData: { isLoaded: isDocumentTypeDataLoaded = false, data: documentTypeList },
                LanguageData: { isLoaded: islanguageDataLoaded = false, data: languageList },
                DealerTermsConditions: { isLoaded: DealerTermsConditionsDataLoaded = false, data: DealerTermsConditionsData },
                ManufacturerTermsConditions: { isLoaded: manufacturerTncLoaded = false, data: ManufacturerData },
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
        DealerTermsConditionsData,
        DealerTermsConditionsDataLoaded,
        ChangeHistoryTermsConditionsData,
        ChangeHistoryTermsConditionsDataLoaded,
        ManufacturerData,
        manufacturerTncLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchProductList: tncProductHierarchyDataActions.fetchList,
            resetData: tncProductHierarchyDataActions.reset,
            listShowLoading: tncProductHierarchyDataActions.listShowLoading,

            fetchDocumentTypeList: tncDocumentTypeDataActions.fetchList,
            fetchLanguageList: tncLanguage.fetchList,

            fetchManufacturerTermConditionDetail: termConditionManufacturerActions.fetchList,
            fetchTermCondition: tncDealerSaveActions.fetchList,
            saveData: tncDealerSaveActions.saveData,
            changeHistoryData: changeHistoryDataActions.fetchList,
            listShowChangeHistoryLoading: changeHistoryDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const TncDealer = ({ moduleTitle, saveData, userId, fetchTermCondition, ChangeHistoryTermsConditionsData, DealerTermsConditionsDataLoaded, ChangeHistoryTermsConditionsDataLoaded, DealerTermsConditionsData, changeHistoryData, isDataLoaded, resetData, isDocumentTypeDataLoaded, islanguageDataLoaded, fetchProductList, fetchDocumentTypeList, fetchLanguageList, fetchManufacturerTermConditionDetail, listShowLoading, listShowChangeHistoryLoading, productHierarchyList, documentTypeList, languageList, showGlobalNotification, isLoading, isLoadingOnSave, ManufacturerData, manufacturerTncLoaded }) => {
    const [form] = Form.useForm();
    const [formActionType, setFormActionType] = useState('');
    const [formData, setFormData] = useState({});
    const [isChecked, setIsChecked] = useState(formData?.status === 'Y' ? true : false);

    const [searchData, setSearchdata] = useState();
    const [refershData, setRefershData] = useState(false);
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [filterString, setFilterString] = useState();
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [listFilterForm] = Form.useForm();
    const [productName, setProductName] = useState();
    const [documentName, setDocumentName] = useState();
    const [languageName, setLanguageName] = useState();
    const [termsAndCondition, setTermsAndCondition] = useState();
    const [effectiveFrom, seteffectiveFrom] = useState('');
    const [effectiveTo, seteffectiveTo] = useState('');
    const [showDataLoading, setShowDataLoading] = useState(true);

    const [isHistoryVisible, setIsHistoryVisible] = useState(false);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
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
        if (!isDocumentTypeDataLoaded && userId) {
            fetchDocumentTypeList({ setIsLoading: listShowLoading, userId });
            fetchLanguageList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    useEffect(() => {
        if (DealerTermsConditionsDataLoaded && DealerTermsConditionsData) {
            if (filterString) {
                const filterDataItem = DealerTermsConditionsData?.filter((item) => filterFunction(filterString)(item?.documentTypeCode) || filterFunction(filterString)(item?.productName) || filterFunction(filterString)(item?.language));
                setSearchdata(filterDataItem);
            } else {
                setSearchdata(DealerTermsConditionsData);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, DealerTermsConditionsDataLoaded, DealerTermsConditionsData]);

    useEffect(() => {
        if (manufacturerTncLoaded && ManufacturerData) {
            setFormData(ManufacturerData[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [manufacturerTncLoaded, ManufacturerData]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction, saveAndNewBtn: false }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const extraParams = [
        {
            key: 'id',
            title: 'id',
            value: '',
            name: 'id',
        },
    ];
    const handleManufacturerButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);
        if (record?.manufracturerTnCId !== 'NA' && record?.manufracturerTnCId !== '') {
            setIsFormVisible(true);
            extraParams['0']['value'] = record?.manufracturerTnCId;
            fetchManufacturerTermConditionDetail({ setIsLoading: listShowLoading, userId, extraParams });
        }
        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData({ cancelBtn: true });
    };

    const handleAdd = () => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD });

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick, handleManufacturerButtonClick),
        tableData: searchData,
    };

    const onFinish = (values, e) => {
        const recordId = formData?.id || '';
        const newVersion = (values.version ? Number(values?.version) : 1.0).toFixed(1);
        const termConditionText = typeof values.termConditionDescription === 'string' ? values.termConditionDescription : values.termConditionDescription.editor.getData();
        // .replace(/[&/\\#,+()$~%.'":*?<p></p>\n{}]/g, '')
        const data = { ...values, version: String(newVersion), id: recordId, termConditionDescription: termConditionText, effectiveFrom: formatDate(values?.effectiveFrom), effectiveTo: formatDate(values?.effectiveTo) };

        const onSuccess = (res) => {
            listShowLoading(false);
            form.resetFields();
            setSelectedRecord({});
            setIsFormVisible(false);
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
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
            method: formActionType?.editMode ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {}).catch(err => console.error(err));
    };

    const handleReferesh = (e) => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const onSearchHandle = (value) => {
        setFilterString(value);
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
            return 'View ';
        } else if (formActionType?.editMode) {
            return 'Edit ';
        } else {
            return 'Add ';
        }
    }, [formActionType]);

    const formProps = {
        isVisible: isFormVisible,
        isViewModeVisible,
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
        data: '',
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
        handleManufacturerButtonClick,
        productName,
        setProductName,
        documentName,
        setDocumentName,
        languageName,
        setLanguageName,
        termsAndCondition,
        setTermsAndCondition,
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
    const showChangeHistoryList = () => {
        setButtonData({ cancelBtn: true });
        setIsHistoryVisible(true);
        // extraParams['0']['value'] = '1ebc0d34-409b-44f3-a7e3-ffb70f1cc888';
        changeHistoryData({ setIsLoading: listShowChangeHistoryLoading, userId });
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
        showAddButton: DealerTermsConditionsData?.length > 0 ? true : false,
        showChangeHistoryButton: DealerTermsConditionsData?.length > 0 ? true : false,
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

export const TermConditionDealerMaster = connect(mapStateToProps, mapDispatchToProps)(TncDealer);
