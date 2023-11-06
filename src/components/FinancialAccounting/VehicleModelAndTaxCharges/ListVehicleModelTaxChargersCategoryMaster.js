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
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { ListDataTable } from 'utils/ListDataTable';
import { btnVisiblity } from 'utils/btnVisiblity';
import { tableColumn } from './tableColumn';
import { AddEditForm } from './AddEditForm';
import ContentHeader from './ContentHeader';
import { VehicleTaxChargesDataActions } from 'store/actions/data/VehicleModelTaxChargesCategory/VehicleModelTaxChargesCategoryMain';
import { ProductModelGroupsDataActions } from 'store/actions/data/VehicleModelTaxChargesCategory/productModelGroup';
import { AccountCategoryLovdataActions } from 'store/actions/data/VehicleModelTaxChargesCategory/accountCategorylov';
import { TaxChargesLovdataActions } from 'store/actions/data/VehicleModelTaxChargesCategory/taxChargeslov';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            VehicleModelandTaxChargesCategory: {
                VehicleModelTaxChargesCategoryMain: { isLoaded: VehicleModelTaxChargesCategoryDataLoaded = false, VehicleModelTaxChargesCategoryisLoading, data: VehicleModelTaxChargesCategoryData = [] },
                ProductModelGroup: { isLoaded: isProductHierarchyDataLoaded = false, isLoading: isProductHierarchyDataLoading = false, data: ProductHierarchyData = [] },
                AccountCategorylov: { isFilteredListLoaded: isAccountDataLoaded = false, isLoading: isAccountDataLoading, filteredListData: AccountData },
                TaxChargeCategoryLov: { isFilteredListLoaded: isTaxCategoryDataLoaded = false, isLoading: isTaxCategoryDataLoading, filteredListData: TaxCategoryData },
            },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;
    const moduleTitle = translateContent('vehicleModelAndTaxCharges.heading.moduleTitle');

    let returnValue = {
        collapsed,
        userId,
        moduleTitle,

        ProductHierarchyData,
        isProductHierarchyDataLoading,
        isProductHierarchyDataLoaded,

        VehicleModelTaxChargesCategoryData,
        VehicleModelTaxChargesCategoryisLoading,
        VehicleModelTaxChargesCategoryDataLoaded,

        isAccountDataLoaded,
        isAccountDataLoading,
        AccountData,

        isTaxCategoryDataLoaded,
        isTaxCategoryDataLoading,
        TaxCategoryData,

        showGlobalNotification,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: VehicleTaxChargesDataActions.fetchList,
            listShowLoading: VehicleTaxChargesDataActions.listShowLoading,
            saveData: VehicleTaxChargesDataActions.saveData,
            resetData: VehicleTaxChargesDataActions.reset,

            fetchModelList: ProductModelGroupsDataActions.fetchList,
            listModelShowLoading: ProductModelGroupsDataActions.listShowLoading,
            resetProductData: ProductModelGroupsDataActions.reset,

            fetchAccountCategoryLov: AccountCategoryLovdataActions.fetchFilteredList,
            listAccountCategoryLovLoading: AccountCategoryLovdataActions.listShowLoading,
            resetAccountCategory: AccountCategoryLovdataActions.reset,

            fetchTaxCategoryLov: TaxChargesLovdataActions.fetchFilteredList,
            listTaxCategoryLovLoading: TaxChargesLovdataActions.listShowLoading,
            resetTax: TaxChargesLovdataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleModelAndTaxChargersCategoryMain = (props) => {
    const { userId, moduleTitle } = props;

    const { VehicleModelTaxChargesCategoryData, VehicleModelTaxChargesCategoryisLoading, VehicleModelTaxChargesCategoryDataLoaded } = props;
    const { ProductHierarchyData, isProductHierarchyDataLoading, isProductHierarchyDataLoaded } = props;
    const { isAccountDataLoaded, AccountData, listAccountCategoryLovLoading } = props;
    const { isTaxCategoryDataLoaded, TaxCategoryData } = props;
    const { fetchList, listShowLoading, fetchModelList, listModelShowLoading, showGlobalNotification, saveData, fetchAccountCategoryLov, fetchTaxCategoryLov, listTaxCategoryLovLoading } = props;

    const { resetData, resetProductData, resetAccountCategory, resetTax } = props;

    const [form] = Form.useForm();

    const [formData, setFormData] = useState({});
    const [searchData, setSearchdata] = useState([]);
    const [ModelOptions, setModelOptions] = useState([]);
    const [TaxChargesOptions, setTaxChargesOptions] = useState([]);
    const [AccountDataOptions, setAccountDataOptions] = useState([]);

    const [refershData, setRefershData] = useState(false);
    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const [selectedModelGroup, setselectedModelGroup] = useState('');

    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [showDataLoading, setshowDataLoading] = useState(true);

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const errorAction = (message) => {
        showGlobalNotification(message);
    };
    const onErrorAction = () => {
        resetData();
        setSearchdata([]);
        setshowDataLoading(false);
    };

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        setRefershData(false);
        setshowDataLoading(false);
    };
    const extraParams = useMemo(() => {
        return [
            {
                key: 'code',
                title: 'Code',
                value: selectedModelGroup,
                canRemove: true,
                filter: false,
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
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, selectedModelGroup]);

    useEffect(() => {
        if (userId) {
            if (!VehicleModelTaxChargesCategoryDataLoaded) {
                setshowDataLoading(true);
                fetchList({ setIsLoading: listShowLoading, onErrorAction, extraParams, userId, onSuccessAction });
            } else if (!isProductHierarchyDataLoaded) {
                fetchModelList({ setIsLoading: listModelShowLoading, errorAction, userId, onSuccessAction });
            } else if (!isAccountDataLoaded) {
                fetchAccountCategoryLov({ setIsLoading: listAccountCategoryLovLoading, errorAction, userId, onSuccessAction });
            } else if (!isTaxCategoryDataLoaded) {
                fetchTaxCategoryLov({ setIsLoading: listTaxCategoryLovLoading, errorAction, userId, onSuccessAction });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isProductHierarchyDataLoaded, isAccountDataLoaded, VehicleModelTaxChargesCategoryDataLoaded, isTaxCategoryDataLoaded, userId]);

    useEffect(() => {
        if (isProductHierarchyDataLoaded && ProductHierarchyData) {
            setModelOptions(ProductHierarchyData);
        }
        if (isAccountDataLoaded && AccountData) {
            setAccountDataOptions(AccountData);
        }
        if (isTaxCategoryDataLoaded && TaxCategoryData) {
            setTaxChargesOptions(TaxCategoryData);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isProductHierarchyDataLoaded, isAccountDataLoaded, isTaxCategoryDataLoaded]);
    useEffect(() => {
        return () => {
            resetData();
            resetProductData();
            resetAccountCategory();
            resetTax();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userId && refershData) {
            setshowDataLoading(true);
            const ModelParams = [
                {
                    key: 'code',
                    title: 'code',
                    value: 'MG',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, onErrorAction, userId, onSuccessAction, extraParams });
            fetchModelList({ setIsLoading: listModelShowLoading, errorAction, userId, extraParams: ModelParams });
            fetchAccountCategoryLov({ setIsLoading: listAccountCategoryLovLoading, errorAction, userId });
            fetchTaxCategoryLov({ setIsLoading: listTaxCategoryLovLoading, errorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refershData]);

    useEffect(() => {
        if (userId) {
            setshowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, onErrorAction, extraParams, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedModelGroup]);

    useEffect(() => {
        if (VehicleModelTaxChargesCategoryDataLoaded && VehicleModelTaxChargesCategoryData['vehicleModel'] && userId) {
            setSearchdata(VehicleModelTaxChargesCategoryData['vehicleModel']?.map((el, i) => ({ ...el, srl: i + 1 })));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [VehicleModelTaxChargesCategoryDataLoaded, VehicleModelTaxChargesCategoryData['vehicleModel'], userId]);

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const data = { ...values, id: recordId };
        const onSuccess = (res) => {
            form.resetFields();

            fetchList({ setIsLoading: listShowLoading, errorAction, userId, onSuccessAction, extraParams });

            setButtonData({ ...buttonData, formBtnActive: false });
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                setButtonData({ saveBtn: true, saveAndNewBtn: true, cancelBtn: true });
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message, placement: 'bottomRight' });
        };

        const requestData = {
            data: data,
            method: recordId ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const handleReferesh = () => {
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

    const tableProps = {
        page,
        setPage,
        VehicleModelTaxChargesCategoryisLoading,
        tableData: searchData,
        tableColumn: tableColumn(handleButtonClick),
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
        form,
        isVisible: isFormVisible,
        showGlobalNotification,
        onFinish,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
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
        ModelOptions,
        TaxChargesOptions,
        AccountDataOptions,
        selectedModelGroup,
    };
    const handleAdd = () => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD });
    const handleChange = (modelValue) => {
        if (!modelValue) {
            setselectedModelGroup('');
            return;
        }
        setselectedModelGroup(modelValue);
    };

    const ContentHeaderProps = {
        isProductHierarchyDataLoading,
        Form,
        onFinish,
        handleAdd,
        titleHierarchy: translateContent('vehicleModelAndTaxCharges.heading.titleHierarchy'),
        VehicleModelTaxChargesCategoryData: VehicleModelTaxChargesCategoryData['vehicleModel'],
        ModelOptions,
        handleReferesh,
        handleChange,
    };

    const listNotableData = !showDataLoading && !VehicleModelTaxChargesCategoryData['vehicleModel']?.length;

    const ListDataTableProps = {
        ...tableProps,
        handleButtonClick: handleAdd,
        showAddButton: listNotableData,
        isLoading: showDataLoading,
    };
    return (
        <>
            <ContentHeader {...ContentHeaderProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...ListDataTableProps} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const VehicleModelAndTaxChargersCategory = connect(mapStateToProps, mapDispatchToProps)(VehicleModelAndTaxChargersCategoryMain);
