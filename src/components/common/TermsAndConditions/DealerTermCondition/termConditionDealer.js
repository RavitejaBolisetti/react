import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Row, Form } from 'antd';
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

import { FROM_ACTION_TYPE } from 'constants/formActionType';
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
                // FetchTermsConditionsList: { isLoaded: isTermConditionDataLoaded = false, data: termsConditionsList },
                DealerTermsConditions: { isLoaded: DealerTermsConditionsDataLoaded = false, data: DealerTermsConditionsData },
                ManufacturerTermsConditions: { isLoaded: manufacturerTncLoaded = false, data: ManufacturerData },
                ChangeHistoryTermsConditions: { isLoaded: ChangeHistoryTermsConditionsDataLoaded = false, data: ChangeHistoryTermsConditionsData },
            },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    console.log('Redux state:', state);

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
        // isTermConditionDataLoaded,
        // termsConditionsList,
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
            // fetchList: tncFetchDealerListActions.fetchList,
            fetchProductList: tncProductHierarchyDataActions.fetchList,
            resetData: tncProductHierarchyDataActions.reset,
            listShowLoading: tncProductHierarchyDataActions.listShowLoading,

            fetchDocumentTypeList: tncDocumentTypeDataActions.fetchList,
            fetchLanguageList: tncLanguage.fetchList,

            fetchManufacturerTermConditionDetail: termConditionManufacturerActions.fetchList,
            fetchTermCondition: tncDealerSaveActions.fetchList,
            saveData: tncDealerSaveActions.saveData,
            changeHistoryData: changeHistoryDataActions.fetchList,
            showGlobalNotification,
        },
        dispatch
    ),
});

const initialTableData = [];
const TncDealer = ({ moduleTitle, saveData, userId, fetchTermCondition, ChangeHistoryTermsConditionsData, DealerTermsConditionsDataLoaded, ChangeHistoryTermsConditionsDataLoaded, DealerTermsConditionsData, changeHistoryData, isDataLoaded, resetData, isDocumentTypeDataLoaded, islanguageDataLoaded, fetchProductList, fetchDocumentTypeList, fetchLanguageList, fetchManufacturerTermConditionDetail, listShowLoading, productHierarchyList, documentTypeList, languageList, showGlobalNotification, isLoading, isLoadingOnSave, ManufacturerData, manufacturerTncLoaded }) => {
    const [form] = Form.useForm();
    const [formActionType, setFormActionType] = useState('');
    const [data, setData] = useState(initialTableData);
    // const [drawer, setDrawer] = useState(false);
    const [formData, setFormData] = useState({});
    const [isChecked, setIsChecked] = useState(formData?.status === 'Y' ? true : false);

    const [forceFormReset, setForceFormReset] = useState(false);
    const [searchData, setSearchdata] = useState();
    const [searchDataChangeHistory, setSearchdataChangeHistory] = useState();
    const [refershData, setRefershData] = useState(false);
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [filterString, setFilterString] = useState();
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [saveBtn, setSaveBtn] = useState(false);
    const [saveclick, setsaveclick] = useState();
    // const [saveandnewclick, setsaveandnewclick] = useState();
    const [successAlert, setSuccessAlert] = useState(false);
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [showDataLoading, setShowDataLoading] = useState(true);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [listFilterForm] = Form.useForm();
    const [productName, setProductName] = useState();
    const [documentName, setDocumentName] = useState();
    const [languageName, setLanguageName] = useState();
    const [termsAndCondition, setTermsAndCondition] = useState();
    const [effectiveFrom, seteffectiveFrom] = useState('');
    const [effectiveTo, seteffectiveTo] = useState('');
    const [CustomEditorLoad, setCustomEditorLoad] = useState(Math.random());

    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
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
    }, [forceFormReset]);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchProductList({ setIsLoading: listShowLoading, userId });
            fetchDocumentTypeList({ setIsLoading: listShowLoading, userId });
            fetchLanguageList({ setIsLoading: listShowLoading, userId });
            fetchTermCondition({ setIsLoading: listShowLoading, userId });
        }
    }, [isDataLoaded, userId]);

    useEffect(() => {
        if (userId && refershData) {
            fetchTermCondition({ setIsLoading: listShowLoading, userId, onSuccessAction });
        }
    }, [refershData, userId]);

    useEffect(() => {
        if (DealerTermsConditionsDataLoaded && DealerTermsConditionsData) {
            if (filterString) {
                const filterDataItem = DealerTermsConditionsData?.filter((item) => filterFunction(filterString)(item?.documentTypeCode) || filterFunction(filterString)(item?.productName) || filterFunction(filterString)(item?.language));
                setSearchdata(filterDataItem);
            } else {
                setSearchdata(DealerTermsConditionsData);
            }
        }
    }, [filterString, DealerTermsConditionsDataLoaded, DealerTermsConditionsData]);

    useEffect(() => {
        if (ChangeHistoryTermsConditionsDataLoaded && ChangeHistoryTermsConditionsData) {
            setSearchdataChangeHistory(ChangeHistoryTermsConditionsData);
        }
    }, [ChangeHistoryTermsConditionsDataLoaded, ChangeHistoryTermsConditionsData]);

    useEffect(() => {
        if (manufacturerTncLoaded && ManufacturerData) {
            setFormData(ManufacturerData[0]);
        }
    }, [manufacturerTncLoaded, ManufacturerData]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(buttonAction === VIEW_ACTION ? { ...defaultBtnVisiblity, closeBtn: true, editBtn: true } : buttonAction === EDIT_ACTION ? { ...defaultBtnVisiblity, saveBtn: true, cancelBtn: true } : { ...defaultBtnVisiblity, saveBtn: true, saveAndNewBtn: false, cancelBtn: true });

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
        if (record?.manufracturerTnCId != 'NA' && record?.manufracturerTnCId != '') {
            setIsFormVisible(true);
            extraParams['0']['value'] = record?.manufracturerTnCId;
            fetchManufacturerTermConditionDetail({ setIsLoading: listShowLoading, userId, extraParams });
        }
        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData({ cancelBtn: true });
    };
    const handleAdd = () => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD });

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick, handleManufacturerButtonClick, page?.current, page?.pageSize),
        tableData: searchData,
        setPage,
    };

    const onFinish = (values, e) => {
        const recordId = formData?.id || '';
        const newVersion = (values.version ? Number(values?.version) + 0.1 : 1.0).toFixed(1);
        // console.log('typeof', typeof termsAndCondition);
        const termConditionText = values.termConditionDescription.editor.getData().replace(/[&\/\\#,+()$~%.'":*?<p></p>\n{}]/g, '');
        const data = { ...values, version: String(newVersion), id: recordId, termConditionDescription: termConditionText };
        const onSuccess = (res) => {
            listShowLoading(false);
            form.resetFields();
            setSelectedRecord({});
            setSuccessAlert(true);
            setIsFormVisible(false);
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
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

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const formProps = {
        isVisible: isFormVisible,
        isViewModeVisible,
        saveclick,
        setsaveclick,
        setIsFormVisible,
        onCloseAction,
        titleOverride: (formActionType?.viewMode ? 'View ' : formActionType?.editMode ? 'Edit ' : 'Add ').concat(moduleTitle),
        selectedRecord,
        formBtnDisable,
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
        setFormData,
        setForceFormReset,
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
        CustomEditorLoad,
        setCustomEditorLoad,
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
        showAddButton: DealerTermsConditionsData?.length > 0 ? true : false,
        showChangeHistoryButton: DealerTermsConditionsData?.length > 0 ? true : false,
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

export const TermConditionDealerMaster = connect(mapStateToProps, mapDispatchToProps)(TncDealer);
