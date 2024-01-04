/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Form, Row } from 'antd';
import { tableColumn } from './tableColumn';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, CANCEL_INVOICE, btnVisiblity } from 'utils/btnVisiblity';

import { ListDataTable } from 'utils/ListDataTable';
import { showGlobalNotification } from 'store/actions/notification';

import { CentralFameSubsidyFilter } from './CentralFameSubsidyFilter';
import { CentralFameSubsidySearchDataActions } from 'store/actions/data/CentralFameSubsidy';
import { translateContent } from 'utils/translateContent';
import { PARAM_MASTER } from 'constants/paramMaster';
import { convertDateTime, dateFormatView, formatDateToCalenderDate } from 'utils/formatDateTime';
import { getCodeValue } from 'utils/getCodeValue';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { vehicleModelDetailsDataActions } from 'store/actions/data/vehicle/modelDetails';
import { vehicleVariantDetailsDataActions } from 'store/actions/data/vehicle/variantDetails';
import { BASE_URL_OTF_FAME_DETAILS_SAVE, BASE_URL_PRODUCT_MODEL_GROUP, BASE_URL_PRODUCT_VARIENT } from 'constants/routingApi';
import { SELECT_BOX_NAME_CONSTANTS } from './fameSubsidryConstants';
import { drawerTitle } from 'utils/drawerTitle';
import { NoDataFound } from 'utils/noDataFound';

import styles from 'assets/sass/app.module.scss';

const defaultBtnVisiblity = {
    editBtn: false,
    saveBtn: false,
    saveAndNewBtn: false,
    saveAndNewBtnClicked: false,
    closeBtn: false,
    cancelBtn: false,
    formBtnActive: false,
};
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            CentralFameSubsidy: {
                CentralFameSubsidySearch: { data, filter: filterString },
            },
            Vehicle: {
                ModelVehicleDetails: { isLoading: isModelLoading, data: modelData = [] },
                VariantVehicleDetails: { isLoading: isVariantLoading, data: variantData = [] },
            },
        },
    } = state;

    const moduleTitle = translateContent('centralFameSubsidy.heading.title');

    let returnValue = {
        userId,
        typeData,
        data: data?.paginationData || [],
        totalRecords: data?.totalRecords || [],
        moduleTitle,
        isModelLoading,
        modelData,
        isVariantLoading,
        variantData,
        filterString,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchModelLovList: vehicleModelDetailsDataActions.fetchList,
            listModelShowLoading: vehicleModelDetailsDataActions.listShowLoading,
            resetModel: vehicleModelDetailsDataActions.reset,

            fetchVariantLovList: vehicleVariantDetailsDataActions.fetchList,
            listVariantShowLoading: vehicleVariantDetailsDataActions.listShowLoading,
            resetVariant: vehicleVariantDetailsDataActions.reset,

            fetchSubsidery: CentralFameSubsidySearchDataActions.fetchList,
            showSubsideryloading: CentralFameSubsidySearchDataActions.listShowLoading,
            resetSubsidery: CentralFameSubsidySearchDataActions.reset,
            setFilterString: CentralFameSubsidySearchDataActions.setFilter,
            saveData: CentralFameSubsidySearchDataActions.saveData,

            showGlobalNotification,
        },
        dispatch
    ),
});
export const CentralFameSubsidyMain = ({ filterString, setFilterString, totalRecords, data, vehicleModelData, userId, modelData, variantData, isModelLoading, isVariantLoading, moduleTitle, ...rest }) => {
    const { fetchModelLovList, listModelShowLoading, saveData, fetchVariantLovList, listVariantShowLoading, resetVariant, fetchSubsidery, showSubsideryloading, resetSubsidery } = rest;

    const [form] = Form.useForm();
    const [modelVariantForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [cancelInvoiceForm] = Form.useForm();

    const [showdataLoading, setShowDataLoading] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const onSuccessAction = () => {
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    const extraParams = useMemo(() => {
        return [
            {
                key: 'modelGroupCode',
                value: filterString?.modelGroupCode,
                canRemove: false,
                filter: false,
            },
            {
                key: 'variantCode',
                value: filterString?.variantCode,
                canRemove: false,
                filter: false,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: filterString?.current,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: filterString?.pageSize,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: filterString?.sortBy,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: filterString?.sortType,
                canRemove: true,
                filter: false,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    useEffect(() => {
        if (userId) {
            fetchModelLovList({ customURL: BASE_URL_PRODUCT_MODEL_GROUP.concat('/lov'), setIsLoading: listModelShowLoading, userId });
            fetchSubsidery({ setIsLoading: showSubsideryloading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (formActionType?.addMode && isFormVisible) {
            form.setFieldsValue({ ...filterString });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType, isFormVisible]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        form.setFieldsValue(undefined);
        setFormActionType({ addMode: buttonAction === ADD_ACTION, viewMode: buttonAction === VIEW_ACTION, editMode: buttonAction === EDIT_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        record && setFormData(record);
        setIsFormVisible(true);
    };

    const onCloseAction = () => {
        setIsFormVisible(false);
    };

    const tableProps = {
        dynamicPagination: true,
        totalRecords,
        setPage: setFilterString,
        page: filterString,
        tableColumn: tableColumn({ handleButtonClick }),
        tableData: data,
        handleButtonClick,
        isLoading: showdataLoading,
        showAddButton: false,
        filterString,
    };

    const handleModelVariantSelect = (type) => (value) => {
        switch (type) {
            case SELECT_BOX_NAME_CONSTANTS?.MODEL?.key: {
                setFilterString({ ...filterString, modelGroupCode: value });
                if (value) {
                    fetchVariantLovList({ customURL: BASE_URL_PRODUCT_VARIENT.concat('/lov'), setIsLoading: listVariantShowLoading, userId, extraParams: [{ key: 'model', value }] });
                } else {
                    resetVariant();
                    modelVariantForm.resetFields(['variantCode']);
                    setFilterString({ ...filterString, variantCode: undefined });
                }
                break;
            }
            case SELECT_BOX_NAME_CONSTANTS?.VARIANT?.key: {
                setFilterString({ ...filterString, variantCode: value });
                break;
            }
            default: {
                break;
            }
        }
    };
    const handleFormValueChange = (values) => {
        const isBatteryOrIncentivePresent = Object?.keys(values)?.find((item) => item === 'batteryCapacity' || item === 'demandIncentive');
        setButtonData((prev) => ({ ...prev, formBtnActive: true }));
    };

    const onFinish = () => {
        let finalPayload = {};
        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const onSuccess = (res) => {};

        const requestData = {
            data: finalPayload,
            method: formData?.id ? 'put' : 'post',
            setIsLoading: showSubsideryloading,
            userId,
            onError,
            onSuccess,
            customURL: BASE_URL_OTF_FAME_DETAILS_SAVE,
        };
        saveData(requestData);
    };

    const CentralFameSubsidyFilterProps = {
        filterString,
        setFilterString,
        onFinish,
        advanceFilterForm,
        data,
        modelData,
        variantData,
        handleButtonClick,
        handleModelVariantSelect,
        isVariantLoading,
        modelVariantForm,
    };
    const formProps = {
        form,
        isVisible: isFormVisible,
        showGlobalNotification,
        onFinish: () => {},
        onCloseAction,
        titleOverride: drawerTitle(formActionType).concat(' ').concat(moduleTitle),
        formData,
        setIsFormVisible,
        formActionType,
        setFormData,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        handleButtonClick,
        setButtonData,
        defaultBtnVisiblity,

        handleFormValueChange,
        modelData,
        variantData,
    };
    return (
        <>
            <CentralFameSubsidyFilter {...CentralFameSubsidyFilterProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} />
                </Col>
            </Row>
            {formActionType?.viewMode ? <ViewDetail {...formProps} /> : <AddEditForm {...formProps} />}
        </>
    );
};

export const CentralFameSubsidyMaster = connect(mapStateToProps, mapDispatchToProps)(CentralFameSubsidyMain);
