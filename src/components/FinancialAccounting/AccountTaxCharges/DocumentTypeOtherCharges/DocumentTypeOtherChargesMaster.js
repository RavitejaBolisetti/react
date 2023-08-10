/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'antd';
import { bindActionCreators } from 'redux';

import { financialAccountHeadDataActions } from 'store/actions/data/financialAccounting/financialAccountHead';
import { documentTypeLedgerDataActions } from 'store/actions/data/financialAccounting/documentTypeLedger';
import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { BASE_URL_DOCUMENT_TYPE_LEDGER_SEARCH as customURL } from 'constants/routingApi';

import { showGlobalNotification } from 'store/actions/notification';

import { ListDataTable } from 'utils/ListDataTable';
import { btnVisiblity } from 'utils/btnVisiblity';
import { PARAM_MASTER } from 'constants/paramMaster';
import { AddEditForm } from './AddEditForm';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            FinancialAccounting: {
                DocumentTypeLedger: { isLoaded: isDocumentTypeLedgerLoaded = false, isLoading: isDocumentTypeLedgerLoading = false, data: docTypeLedgerData = [] },
                FinancialAccountHead: { isLoaded: isFinancialAccountHeadLoaded = false, data: financialAccount = [] },
            },
        },
    } = state;

    const moduleTitle = 'Doc Type - Charges & Ledger Mapping';

    let returnValue = {
        userId,
        moduleTitle,
        isDocumentTypeLedgerLoaded,
        isDocumentTypeLedgerLoading,
        isFinancialAccountHeadLoaded,
        typeData: typeData && typeData[PARAM_MASTER.ACC_HEAD.id],
        financialAccount,
        docTypeLedgerData: docTypeLedgerData?.paginationData,
        totalRecords: docTypeLedgerData?.totalRecords,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchDocTypeLedger: documentTypeLedgerDataActions.fetchList,
            listShowLoadingDocTypeLedger: documentTypeLedgerDataActions.listShowLoading,
            saveData: documentTypeLedgerDataActions.saveData,

            fetchFinancialAccountHead: financialAccountHeadDataActions.fetchList,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const DocumentTypeOtherChargesMain = (props) => {
    const { moduleTitle, saveData, userId, showGlobalNotification, typeData, fetchFinancialAccountHead, financialAccount, isFinancialAccountHeadLoaded, taxChargeCategoryTypeData, fetchDocTypeLedger, listShowLoadingDocTypeLedger, totalRecords, docTypeLedgerData } = props;
    const [form] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [refershData, setRefershData] = useState(false);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormBtnActive, setFormBtnActive] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const [editForm] = Form.useForm();
    const [docTypeHeadMappingForm] = Form.useForm();
    const [formEdit, setFormEdit] = useState(false);
    const [docTypeHeadMappingList, setDocTypeHeadMappingList] = useState([]);
    const [dropdownItems, setDropdownItems] = useState([]);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

    const extraParams = useMemo(() => {
        return [
            {
                key: 'module',
                title: 'Module',
                value: 'finance',
                name: 'finance',
            },
            {
                key: 'searchParam',
                title: 'Search Param',
                value: filterString?.keyword,
                name: 'DOC',
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: page?.current,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: page?.pageSize,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: page?.sortBy,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: page?.sortType,
                canRemove: true,
                filter: false,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, page]);

    useEffect(() => {
        if (userId) {
            fetchDocTypeLedger({ setIsLoading: listShowLoadingDocTypeLedger, userId, customURL, extraParams, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData, extraParams]);

    useEffect(() => {
        if (!isFinancialAccountHeadLoaded && userId) {
            fetchFinancialAccountHead({ setIsLoading: listShowLoadingDocTypeLedger, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFinancialAccountHeadLoaded, userId]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);
        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        record && setFormData(record);
        setIsFormVisible(true);
        setFormBtnActive(false);
    };

    const onFinish = (values) => {
        const tempdata = { ...values, id: formData?.documentTypeId || '', accountLedgerMappingDtoList: docTypeHeadMappingList };
        const { applicationName, documentTypeName, documentTypeCode, ...data } = tempdata;

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchDocTypeLedger({ setIsLoading: listShowLoadingDocTypeLedger, userId, customURL, extraParams, onSuccessAction });

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
            method: data?.accountLedgerMappingDtoList?.find((i) => i?.id) ? 'put' : 'post',
            setIsLoading: listShowLoadingDocTypeLedger,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const onCloseAction = () => {
        setFormEdit(false);
        form.resetFields();
        docTypeHeadMappingForm.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
        setDocTypeHeadMappingList(() => []);
        setDropdownItems(() => []);
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
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        setFilterString,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
        taxChargeCategoryTypeData,
        editForm,
        docTypeHeadMappingForm,
        formEdit,
        setFormEdit,
        docTypeHeadMappingList,
        setDocTypeHeadMappingList,
        dropdownItems,
        setDropdownItems,
        isFormBtnActive,
        financialAccount,
        typeData,
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        setPage,
        isLoading: showDataLoading,
        tableColumn: tableColumn(handleButtonClick),
        tableData: docTypeLedgerData,
        showAddButton: false,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} handleAdd={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const DocumentTypeOtherChargesMaster = connect(mapStateToProps, mapDispatchToProps)(DocumentTypeOtherChargesMain);
