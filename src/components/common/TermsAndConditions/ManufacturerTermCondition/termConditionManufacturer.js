import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Row, Input, Space, Form, Empty, ConfigProvider } from 'antd';
import { EditIcon, ViewEyeIcon } from 'Icons';
import { TfiReload } from 'react-icons/tfi';
import { notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { tblPrepareColumns } from 'utils/tableCloumn';
import DataTable from 'utils/dataTable/DataTable';
import { showGlobalNotification } from 'store/actions/notification';
import { escapeRegExp } from 'utils/escapeRegExp';
import { tncProductHierarchyDataActions } from 'store/actions/data/termsConditions/tncProductHierarchy';
import { tncDocumentTypeDataActions } from 'store/actions/data/termsConditions/tncDocumentType';
import { tncLanguage } from 'store/actions/data/termsConditions/tncLanguage';
// import { tncFetchDealerListActions } from 'store/actions/data/termsConditions/tncFetchDealerListActions';
import { termConditionManufacturerActions } from 'store/actions/data/termsConditions/termsConditionsManufacturerAction';

import { AddEditForm } from './AddEditForm';

import styles from 'components/common/Common.module.css';
import { FilterIcon } from 'Icons';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { ListDataTable } from 'utils/ListDataTable';
import { tableColumn } from './tableColumn';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { CustomEditor } from 'components/common/CustomEditor';
import moment from 'moment';

const { Search } = Input;

const { termConditionData } = [];

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            TermCondition: {
                ProductHierarchyData: { isLoaded: isDataLoaded = false, data: productHierarchyList, isLoading, isLoadingOnSave, isFormDataLoaded },
                DocumentTypeData: { isLoaded: isDocumentTypeDataLoaded = false, data: documentTypeList },
                LanguageData: { isLoaded: islanguageDataLoaded = false, data: languageList },
                // FetchTermsConditionsList: { isLoaded: isTermConditionDataLoaded = false, data: termsConditionsList },
                ManufacturerTermsConditions: { isLoaded: ManufacturerTermsConditionsDataLoaded = false, data: ManufacturerTermsConditionsData },
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
        ManufacturerTermsConditionsData,
        ManufacturerTermsConditionsDataLoaded,
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

            fetchTermCondition: termConditionManufacturerActions.fetchList,
            saveData: termConditionManufacturerActions.saveData,
            showGlobalNotification,
        },
        dispatch
    ),
});

const initialTableData = [];
const TncManufacturer = ({ moduleTitle, saveData, userId, fetchTermCondition, ManufacturerTermsConditionsDataLoaded, ManufacturerTermsConditionsData, isDataLoaded, resetData, isDocumentTypeDataLoaded, islanguageDataLoaded, fetchProductList, fetchDocumentTypeList, fetchLanguageList, listShowLoading, productHierarchyList, documentTypeList, languageList, fetchList, showGlobalNotification, isLoading, isFormDataLoaded, isLoadingOnSave, onSaveShowLoading }) => {
    const [form] = Form.useForm();

    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [data, setData] = useState(initialTableData);
    const [drawer, setDrawer] = useState(false);
    const [formData, setFormData] = useState({});
    const [isChecked, setIsChecked] = useState(formData?.status === 'Y' ? true : false);

    const [forceFormReset, setForceFormReset] = useState(false);
    const [searchData, setSearchdata] = useState();
    const [refershData, setRefershData] = useState(false);
    const [alertNotification, contextAlertNotification] = notification.useNotification();
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
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [advanceFilterForm] = Form.useForm();
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
            fetchTermCondition({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    useEffect(() => {
        if (!isDocumentTypeDataLoaded && userId) {
            fetchDocumentTypeList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDocumentTypeDataLoaded, userId]);

    useEffect(() => {
        if (!islanguageDataLoaded && userId) {
            fetchLanguageList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [islanguageDataLoaded, userId]);

    // useEffect(() => {
    //     if (!isTermConditionDataLoaded && userId) {
    //         fetchList({ setIsLoading: listShowLoading, userId });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isTermConditionDataLoaded, userId]);

    // useEffect(() => {
    //     setSearchdata(termConditionData);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [termConditionData]);

    useEffect(() => {
        if (userId && refershData) {
            fetchTermCondition({ setIsLoading: listShowLoading, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refershData, userId]);

    useEffect(() => {
        if (ManufacturerTermsConditionsDataLoaded && ManufacturerTermsConditionsData) {
            if (filterString) {
                const filterDataItem = ManufacturerTermsConditionsData?.filter((item) => filterFunction(filterString)(item?.documentTypeCode) || filterFunction(filterString)(item?.productCode));
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

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, isViewModeVisible : buttonAction === VIEW_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(buttonAction === VIEW_ACTION ? { ...defaultBtnVisiblity, closeBtn: true, editBtn: true } : buttonAction === EDIT_ACTION ? { ...defaultBtnVisiblity, saveBtn: true, cancelBtn: true } : { ...defaultBtnVisiblity, saveBtn: true, saveAndNewBtn: false, cancelBtn: true });
        if(buttonAction === "view"){
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
        const recordId = formData?.id || '';
        const newVersion = values.version ? Number(values?.version) + 0.1 : 1.0;
        let toDate = (values?.effectiveto).format('YYYY-MM-DD');
        let fromDate = (values?.effectivefrom).format('YYYY-MM-DD');
        //console.log(fromDate);
        //console.log('typeof', typeof termsAndCondition);
        const termConsitionText = termsAndCondition.replace(/[&\/\\#,+()$~%.'":*?<p></p>\n{}]/g, '');
        const data = { ...values, version: String(newVersion), termsconditiondescription: termConsitionText, effectivefrom:fromDate, effectiveto:toDate };
        //console.log('data', data, termConsitionText);
        //return;
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

    // const handleAdd = () => {
    //     setFormActionType('add');
    //     setIsFormVisible(true);
    //     setSaveAndSaveNew(true);
    //     setSaveBtn(true);
    //     setFooterEdit(false);
    //     setIsViewModeVisible(false);
    //     setSelectedRecord([]);
    //     setIsReadOnly(false);
    //     setsaveclick(false);
    //     setsaveandnewclick(true);
    //     setcodeIsReadOnly(false);
    // };

    const handleUpdate = (record) => {
        setFormActionType('update');
        setSaveAndSaveNew(false);
        setIsFormVisible(true);
        setIsViewModeVisible(false);

        setFooterEdit(false);
        setSaveBtn(true);
        setSelectedRecord(record);

        setFormData(record);

        form.setFieldsValue({
            qualificationCode: record.qualificationCode,
            qualificationName: record.qualificationName,
            status: record.status,
        });

        setIsReadOnly(false);
        setcodeIsReadOnly(true);
    };

    const handleUpdate2 = () => {
        setFormActionType('update');
        setIsFormVisible(true);
        setIsViewModeVisible(false);

        setSaveAndSaveNew(false);
        setFooterEdit(false);
        setSaveBtn(true);

        form.setFieldsValue({
            qualificationCode: selectedRecord.qualificationCode,
            qualificationName: selectedRecord.qualificationName,
            status: selectedRecord.status,
        });
        setsaveclick(true);
        setIsReadOnly(false);
        setcodeIsReadOnly(true);
    };

    const handleView = (record) => {
        setFormActionType('view');
        setIsViewModeVisible(true);
        setSelectedRecord(record);
        setSaveAndSaveNew(false);
        setFooterEdit(true);
        setSaveBtn(false);

        form.setFieldsValue({
            qualificationCode: record.qualificationCode,
            qualificationName: record.qualificationName,
            status: record.status,
        });
        setIsFormVisible(true);
        setIsReadOnly(true);
        setcodeIsReadOnly(true);
    };

    const handleReferesh = (e) => {
        setRefershData(!refershData);
    };

    const onChange = (sorter, filters) => {
        form.resetFields();
    };

    const onSearchHandle = (value) => {
        setFilterString(value);
    };

    const onChangeHandle = (e) => {
        setFilterString(e.target.value);
    };

    const filterFunction = (filterString) => (title) => {
        return title && title.match(new RegExp(escapeRegExp(filterString), 'i'));
    };

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        advanceFilterForm.resetFields();
    };

    const handleFilterChange = (name, type = 'value') => (value) => {
        if (name === 'countryCode') {
            advanceFilterForm.setFieldsValue({ stateCode: undefined });
        }
    };

    const handleResetFilter = () => {
        setFilterString();
        resetData();
        advanceFilterForm.resetFields();
        setShowDataLoading(false);
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        onCloseAction: onAdvanceSearchCloseAction,
        setAdvanceSearchVisible,
        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',
        // isDataCountryLoaded,
        // isCountryLoading,
        // countryData,
        // defaultCountry,

        data,
        handleFilterChange,
        filterString,
        setFilterString,
        advanceFilterForm,
        resetData,
        handleResetFilter,
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
        handleUpdate2,
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
        CustomEditor,
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
    };

    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleAdd={handleAdd} isLoading={isLoading} {...tableProps} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const TermConditionManufacturerMaster = connect(mapStateToProps, mapDispatchToProps)(TncManufacturer);
