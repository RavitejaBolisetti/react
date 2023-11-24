/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Form, Row } from 'antd';
import { tableColumn } from './tableColumn';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, btnVisiblity } from 'utils/btnVisiblity';

import { AddEditForm } from './AddEditForm';
import { SearchBox } from 'components/utils/SearchBox';

import { ListDataTable } from 'utils/ListDataTable';
import { receiptDataActions } from 'store/actions/data/receipt/receipt';
import { receiptDetailDataActions } from 'store/actions/data/receipt/receiptDetails';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

import { showGlobalNotification } from 'store/actions/notification';
import { drawerTitle } from 'utils/drawerTitle';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
    } = state;
    const moduleTitle = translateContent('digitalSignature.heading.moduleTitle');
    let returnValue = {
        userId,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchReceiptDetails: receiptDetailDataActions.fetchList,
            saveData: receiptDataActions.saveData,
            setFilterString: receiptDataActions.setFilter,
            resetData: receiptDataActions.reset,
            fetchList: receiptDataActions.fetchList,
            listShowLoading: receiptDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const DigitalSignatureMasterBase = (props) => {
    const { userId, fetchList, listShowLoading, data } = props;
    const { typeData, moduleTitle, totalRecords } = props;
    const { filterString, setFilterString } = props;
    
    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const defaultBtnVisiblity = {
        editBtn: false,
        saveBtn: false,
        saveAndNewBtn: false,
        saveAndNewBtnClicked: false,
        closeBtn: false,
        cancelBtn: false,
        formBtnActive: false,
        deliveryNote: false,
        nextBtn: false,
        cancelReceiptBtn: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [formData, setFormData] = useState([]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (userId) {
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, filterString, page]);

    useEffect(() => {
        if (userId) {
            const extraParams = [
                {
                    key: 'id',
                    title: 'id',
                    name: 'id',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction, saveAndNewBtn: false }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        page,
        setPage,
        tableColumn: tableColumn(handleButtonClick),
        tableData: data,
        showAddButton: false,
        typeData,
    };

    const searchBoxProps = {
        searchForm,
        filterString,
        setFilterString,
        selectWide: true,
    };

    const formProps = {
        isVisible: isFormVisible,
        titleOverride: drawerTitle(formActionType).concat(" ").concat(moduleTitle),
        formActionType,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,
        typeData,
        formData,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                <SearchBox {...searchBoxProps} />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleButtonClick={handleButtonClick} isLoading={showDataLoading} {...tableProps} showAddButton={false} />
                </Col>
            </Row>

            <AddEditForm {...formProps} />
        </>
    );
};

export const DigitalSignatureMaster = connect(mapStateToProps, mapDispatchToProps)(DigitalSignatureMasterBase);
