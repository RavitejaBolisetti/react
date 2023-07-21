/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'antd';
import { bindActionCreators } from 'redux';

import { geoStateDataActions } from 'store/actions/data/geo/states';
import { taxChargeCategoryTypeDataActions } from 'store/actions/data/financialAccounting/taxChargeType';
import { taxChargeCategoryDataActions } from 'store/actions/data/financialAccounting/taxChargesCategory';
import { financialAccTaxChargeCategoryDataActions } from 'store/actions/data/financialAccounting/taxChargesCode'
import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { showGlobalNotification } from 'store/actions/notification';

import { ListDataTable } from 'utils/ListDataTable';
import { filterFunction } from 'utils/filterFunction';
import { btnVisiblity } from 'utils/btnVisiblity';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { PARAM_MASTER } from 'constants/paramMaster';
import { AddEditForm } from './AddEditForm';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: saleData = [] },
            Geo: {
                State: { isLoaded: isStateDataLoaded = false, isLoading: isStateLoading = false, data: stateData = [] },
            },
            FinancialAccounting: {
                TaxChargeCategoryType: { isLoaded: isTaxChargeCategoryTypeLoaded = false, isLoading: isTaxChargeCategoryTypeLoading = false, data: taxChargeCategoryTypeData = [] },
                TaxChargesCategory: { isLoaded: isTaxChargeCategoryLoaded = false, isLoading: isTaxChargeCategoryLoading = false, data: taxChargeCategoryData = [] },
                TaxChargesCode: { isLoaded: isTaxCategoryCodeLoaded = false, isLoading: isTaxCategoryCodeLoading, data: taxChargeCategoryCodeData = [] }
            },
        },
    } = state;
    console.log(state,'sjgasdhgkshgdhg')

    const moduleTitle = 'Tax & Charges Category'

    let returnValue = {
        userId,

        moduleTitle,
        isStateDataLoaded,
        isStateLoading,
        stateData,
        saleData: saleData && saleData[PARAM_MASTER.SALE_TYP.id],
        isTaxChargeCategoryTypeLoaded,
        taxChargeCategoryTypeData,
        isTaxChargeCategoryTypeLoading,
        isTaxCategoryCodeLoading,
        isTaxChargeCategoryLoaded,
        isTaxCategoryCodeLoaded,
        isTaxChargeCategoryLoading,
        taxChargeCategoryData,
        taxChargeCategoryCodeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {

            fetchStateList: geoStateDataActions.fetchList,
            listStateShowLoading: geoStateDataActions.listShowLoading,

            fetchTaxChargeCategoryType: taxChargeCategoryTypeDataActions.fetchList,
            listShowLoadingTaxChargeCategoryType: taxChargeCategoryTypeDataActions.listShowLoading,

            fetchTaxCodeList: financialAccTaxChargeCategoryDataActions.fetchList,
            listTaxCodeLoading: financialAccTaxChargeCategoryDataActions.listShowLoading,

            fetchTaxChargeCategory: taxChargeCategoryDataActions.fetchList,
            listShowLoadingTaxChargeCategory: taxChargeCategoryDataActions.listShowLoading,
            saveData: taxChargeCategoryDataActions.saveData,


            showGlobalNotification,
        },
        dispatch
    ),
});

export const TaxChargesCategoryMain = (props) => {
    const { data, saveData, userId, isDataLoaded, showGlobalNotification, taxChargeCategoryCodeData, isStateDataLoaded, fetchStateList, listStateShowLoading, stateData, saleData, isTaxChargeCategoryTypeLoaded, fetchTaxCodeList, isTaxCategoryCodeLoaded, listTaxCodeLoading, fetchTaxChargeCategoryType, taxChargeCategoryTypeData, listShowLoadingTaxChargeCategoryType, isTaxChargeCategoryLoaded, fetchTaxChargeCategory, listShowLoadingTaxChargeCategory, taxChargeCategoryData } = props;
    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    console.log(taxChargeCategoryData, 'taxChargeCategoryDatataxChargeCategoryDatataxChargeCategoryDatataxChargeCategoryData');
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

    const extraParams = [
        {
            key: 'pageNumber',
            title: 'Page Number',
            value: 1,
            name: 1,
        },
        {
            key: 'pageSize',
            title: 'Page Size',
            value: 10,
            name: 10,
        },
        {
            key: 'searchType',
            title: 'Search Type',
            value: 'taxCategoryCode',
            name: 'taxCategoryCode',
        },
        {
            key: 'searchParam',
            title: 'Search Param',
            value: 'GST12',
            name: 'GST12',
        },
        {
            key: 'sortBy',
            title: 'Sort By',
            value: 'taxCategoryCode',
            name: 'taxCategoryCode',
        },
        {
            key: 'sortIn',
            title: 'Sort In',
            value: 'DESC',
            name: 'DESC',
        },
    ];


    useEffect(() => {
        if (userId && !isStateDataLoaded) {
            fetchStateList({ setIsLoading: listStateShowLoading, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isStateDataLoaded]);

    useEffect(() => {
        if (userId && !isTaxChargeCategoryTypeLoaded) {
            fetchTaxChargeCategoryType({ setIsLoading: listShowLoadingTaxChargeCategoryType, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isTaxChargeCategoryTypeLoaded]);

const handleCodeFunction =(value)=>{
    const extraParams = [
        {
            key: 'taxChargeType',
            title: 'taxChargeType',
            value: value,
            name: 'taxChargeType',
        },
    ];
        fetchTaxCodeList({ setIsLoading: listShowLoadingTaxChargeCategory, userId, extraParams, onSuccessAction });
}
    // eslint-disable-next-line react-hooks/exhaustive-deps


    useEffect(() => {
        if (userId && !isTaxChargeCategoryLoaded) {
            fetchTaxChargeCategory({ setIsLoading: listShowLoadingTaxChargeCategory, userId, extraParams, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isTaxChargeCategoryTypeLoaded]);

    useEffect(() => {
        if (userId && refershData) {
            fetchTaxChargeCategory({ setIsLoading: listShowLoadingTaxChargeCategory, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    useEffect(() => {
        if (isDataLoaded && data && userId) {
            if (filterString) {
                const keyword = filterString?.keyword;
                const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.name) : true));
                setSearchdata(filterDataItem);
                setShowDataLoading(false);
            } else {
                setSearchdata(data);
                setShowDataLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, data, userId]);

    const handleReferesh = () => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, advanceFilter: false, keyword: value });
        }
    };

    const handleResetFilter = (e) => {
        setFilterString();
        listFilterForm.resetFields();
        setShowDataLoading(false);
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

    const onFinish = (values) => {
        let data = { ...values };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchTaxChargeCategory({ setIsLoading: listShowLoadingTaxChargeCategory, userId, onSuccessAction });

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
            method: formActionType?.editMode ? 'put' : 'post',
            setIsLoading: listShowLoadingTaxChargeCategory,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => { });
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
        form,
        formData,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,

        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat('Tax & Charges Category'),
        tableData: searchData,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
        stateData,
        saleData,
        taxChargeCategoryTypeData,
        taxChargeCategoryCodeData,
        handleCodeFunction,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick),
        //tableData: searchData,
        tableData: taxChargeCategoryData?.taxCategoryHeaderListDto,
    };

    const title = 'Tax & Charges Category';

    const advanceFilterResultProps = {
        advanceFilter: false,
        filterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        onSearchHandle,
        handleResetFilter,
        handleClearInSearch,
        handleReferesh,
        handleButtonClick,
        title,
    };

    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={showDataLoading} {...tableProps} handleAdd={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const TaxChargesCategory = connect(mapStateToProps, mapDispatchToProps)(TaxChargesCategoryMain);