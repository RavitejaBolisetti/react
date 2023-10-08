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
import { NormalSearch } from './search/NormalSearch';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION } from 'utils/btnVisiblity';
import { AddViewFormMaster } from './addViewForm/AddViewFormMaster';

import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './search/AdvancedSearch';
import { CUSTOMER_TYPE } from 'constants/CustomerType';
import { PARAM_MASTER } from 'constants/paramMaster';
import { BASE_URL_CRM_SCHEME_ENROLLMENT_DETAILS as customURL } from 'constants/routingApi';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';

import { crmSchemeEnrollmentDataActions } from 'store/actions/data/crmSchemeEnrollment';
import { vehicleBatteryDetailsDataActions } from 'store/actions/data/vehicleDeliveryNote/vehicleBatteryDetails';
import { customerVerificationtDataActions } from 'store/actions/data/customerMaster/customerVerification';
import { addressIndividualDataActions } from 'store/actions/data/customerMaster/individual/address/individualAddress';
import { addressCorporateDataActions } from 'store/actions/data/customerMaster/corporate/address/individualAddress';
import { salesConsultantActions } from 'store/actions/data/otf/salesConsultant';

import { showGlobalNotification } from 'store/actions/notification';

import { FilterIcon } from 'Icons';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            CustomerMaster: {
                AddressIndividual: { isLoaded: isAddressLoaded = false, isLoading: isAddressLoading, data: addressIndData = [] },
                CorporateAddress: { isLoaded: isCompanyAddressLoaded = false, isLoading: isCorporateAddressLoading, data: addressCompanyData = [] },
            },
            OTF: {
                salesConsultantLov: { isLoaded: isSalesConsultantDataLoaded, data: salesConsultantLov = [] },
            },
            VehicleDeliveryNote: {
                VehicleBatteryDetails: { isLoaded: isVehicleDataLoaded = false, isLoading, data: vehicleData = {} },
            },
            CustomerMaster: {
                CustomerVerification: { isLoaded: isCustomerDataLoaded = false, isLoading: isCustomerDataLoading, data: customerVerificationData = {} },
            },
            CRMSchemeEnrollmentList: { isLoaded: isSearchDataLoaded = false, isLoading: isSearchLoading, data, filter: filterString, isDetailLoaded, detailData = [] },
        },
    } = state;

    const moduleTitle = 'Dealer List';
    let returnValue = {
        userId,
        typeData,
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        moduleTitle,
        isSearchLoading,
        isSearchDataLoaded,
        filterString,
        isSalesConsultantDataLoaded,
        salesConsultantLov,
        isVehicleDataLoaded,
        isLoading,
        vehicleData,
        isCustomerDataLoaded,
        isCustomerDataLoading,
        customerVerificationData,
        isAddressLoaded,
        isAddressLoading,
        addressCompanyData: addressCompanyData?.customerAddress,
        addressIndData: addressIndData?.customerAddress,
        isCompanyAddressLoaded,
        isCorporateAddressLoading,
        isDetailLoaded,
        detailData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: crmSchemeEnrollmentDataActions.fetchList,
            listShowLoading: crmSchemeEnrollmentDataActions.listShowLoading,
            setFilterString: crmSchemeEnrollmentDataActions.setFilter,
            resetData: crmSchemeEnrollmentDataActions.reset,

            fetchDetail: crmSchemeEnrollmentDataActions.fetchDetail,
            listDetailShowLoading: crmSchemeEnrollmentDataActions.listShowLoading,
            saveData: crmSchemeEnrollmentDataActions.saveData,

            fetchSalesConsultant: salesConsultantActions.fetchList,
            listConsultantShowLoading: salesConsultantActions.listShowLoading,

            fetchVehicleList: vehicleBatteryDetailsDataActions.fetchList,
            listVehicleShowLoading: vehicleBatteryDetailsDataActions.listShowLoading,

            fetchCustomerVerifyList: customerVerificationtDataActions.fetchList,
            listCustomerVerifyShowLoading: customerVerificationtDataActions.listShowLoading,

            fetchListIndividual: addressIndividualDataActions.fetchList,
            listShowLoadingIndividual: addressIndividualDataActions.listShowLoading,

            fetchListCorporate: addressCorporateDataActions.fetchList,
            listShowLoadingCorporate: addressCorporateDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const CrmScreenEnrolmentBase = (props) => {
    const { filterString, setFilterString, addressIndData, addressCompanyData, listShowLoadingIndividual, listShowLoadingCorporate, fetchListIndividual, fetchListCorporate, fetchCustomerVerifyList, listCustomerVerifyShowLoading, customerVerificationData, fetchVehicleList, listVehicleShowLoading, vehicleData, fetchSalesConsultant, isSalesConsultantDataLoaded, listConsultantShowLoading, salesConsultantLov, fetchList, saveData, data, listShowLoading, userId } = props;
    const { typeData, totalRecords, showGlobalNotification, fetchDetail, listDetailShowLoading, detailData } = props;
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [openAccordian, setOpenAccordian] = useState('');
    const [isEnrolmentGenerated, setIsEnrolmentGenerated] = useState(false);
    const [activeKey, setActiveKey] = useState([]);
    const [keyValue, setKeyValue] = useState();
    const [changePress, setChangePress] = useState(false);

    const [customerData, setCustomerData] = useState([]);
    const [vehicleDataDetails, setVehicleDataDetails] = useState([]);

    const [addressData, setAddressData] = useState([]);

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const defaultBtnVisiblity = {
        cancelBtn: false,
        printDownloadBtn: false,
        closeBtn: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [formData, setFormData] = useState([]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (!isSalesConsultantDataLoaded && userId) {
            fetchSalesConsultant({ setIsLoading: listConsultantShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSalesConsultantDataLoaded, userId]);

    useEffect(() => {
        if (filterString) {
            setPage({ ...page, current: 1 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: filterString?.searchType,
                name: typeData?.[PARAM_MASTER.CRM_SCHEME_TYPE_SEARCH.id]?.find((i) => i?.key === filterString?.searchType)?.value,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: filterString?.searchParam,
                name: filterString?.searchParam,
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: page?.current,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: page?.pageSize,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: page?.sortBy,
                filter: false,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: page?.sortType,
                filter: false,
            },
            {
                key: 'schemeType',
                title: 'Scheme Type',
                value: filterString?.schemeType,
                name: filterString?.schemeTypeName,
                canRemove: true,
                filter: true,
            },
            {
                key: 'fromDate',
                title: 'Start Date',
                value: filterString?.fromDate,
                name: filterString?.fromDate ? convertDateTime(filterString?.fromDate, dateFormatView) : '',
                canRemove: true,
                filter: true,
            },
            {
                key: 'toDate',
                title: 'End Date',
                value: filterString?.toDate,
                name: filterString?.toDate ? convertDateTime(filterString?.toDate, dateFormatView) : '',
                canRemove: true,
                filter: true,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, page]);

    useEffect(() => {
        if (userId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, page, filterString]);

    useEffect(() => {
        if (vehicleData?.ownerCustomer) {
            const extraParams = [
                {
                    key: 'customerCode',
                    title: 'customerCode',
                    value: vehicleData?.ownerCustomer,
                    name: 'Customer Code',
                },
            ];
            fetchCustomerVerifyList({ setIsLoading: listCustomerVerifyShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleData?.ownerCustomer]);

    useEffect(() => {
        if (customerVerificationData?.customerId) {
            const extraParams = [
                {
                    key: 'customerId',
                    title: 'customerId',
                    value: customerVerificationData?.customerId,
                    name: 'Customer ID',
                },
            ];
            if (customerVerificationData?.customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id) {
                fetchListIndividual({ setIsLoading: listShowLoadingIndividual, userId, extraParams });
            } else if (customerVerificationData?.customerType === CUSTOMER_TYPE?.CORPORATE?.id) {
                fetchListCorporate({ setIsLoading: listShowLoadingCorporate, userId, extraParams });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerVerificationData?.customerId]);

    useEffect(() => {
        if (addressIndData?.length > 0) {
            addressIndData?.map((item) => (item?.addressType === 'R' ? setAddressData(item) : null));
        } else if (addressCompanyData?.length > 0) {
            addressCompanyData?.map((item) => (item?.addressType === 'R' ? setAddressData(item) : null));
        }
    }, [addressCompanyData, addressIndData]);

    useEffect(() => {
        if (formActionType?.addMode) {
            form.resetFields();
            setVehicleDataDetails([]);
            setCustomerData([]);
            setIsFormVisible(true);
            setButtonData({ ...defaultBtnVisiblity, cancelBtn: true, saveBtn: true, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType]);

    useEffect(() => {
        if (isEnrolmentGenerated) setButtonData({ ...defaultBtnVisiblity, cancelBtn: false, closeBtn: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEnrolmentGenerated]);

    useEffect(() => {
        const isPresent = activeKey?.includes(keyValue);
        if (isPresent & (keyValue !== 3 && keyValue !== 4)) {
            setActiveKey([]);
            setButtonData({ ...buttonData, saveBtn: true, formBtnActive: true });
        } else if (keyValue === 2) {
            setActiveKey([keyValue, 3]);
            setButtonData({ ...buttonData, saveBtn: true, formBtnActive: true });
        } else if ((keyValue === 3 && isPresent) || (keyValue === 4 && isPresent)) {
            setActiveKey([2]);
            setButtonData({ ...buttonData, saveBtn: true, formBtnActive: true });
        } else if (keyValue === 3) {
            setActiveKey([2, keyValue]);
            setButtonData({ ...buttonData, saveBtn: true, formBtnActive: true });
        } else if (keyValue === 4) {
            setActiveKey([2, keyValue]);
            setButtonData({ ...defaultBtnVisiblity, cancelBtn: true, printDownloadBtn: true });
        } else {
            setActiveKey([keyValue]);
            setButtonData({ ...buttonData, cancelBtn: true, saveBtn: true, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyValue, changePress]);

    useEffect(() => {
        if (formActionType?.viewMode) {
            setVehicleDataDetails(detailData?.enrolmentVehicleDetailsDto);
            setCustomerData(detailData?.enrolmentCustomerDetailsDto);
        } else if (formActionType?.addMode) {
            setVehicleDataDetails(vehicleData);
            setCustomerData({ ...customerVerificationData, ...addressData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailData, vehicleData, customerVerificationData, addressData]);

    const onHandleRegistrationNumber = (value) => {
        if (value) {
            const extraParams = [
                {
                    key: 'vin',
                    value: value,
                },
            ];
            fetchVehicleList({ setIsLoading: listVehicleShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
    };

    const addFormOpen = () => {
        setFormActionType({ ...defaultFormActionType, addMode: true });
        setIsEnrolmentGenerated(false);
        setKeyValue(1);
    };

    const handleSearch = (value) => {
        setFilterString({ ...filterString, dealerParent: value, advanceFilter: true });
        searchForm.resetFields();
    };

    const handleResetFilter = () => {
        setShowDataLoading(false);
        setFilterString();
        advanceFilterForm.resetFields();
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        setFormData([]);
        setKeyValue(1);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData({ defaultBtnVisiblity, buttonAction, saveAndNewBtn: false, cancelBtn: true, saveBtn: true, formBtnActive: true, printDownloadBtn: true });
        record && setFormData(record);
        setIsFormVisible(true);

        setIsEnrolmentGenerated(false);

        if (buttonAction !== ADD_ACTION) {
            const extraParams = [
                {
                    key: 'id',
                    title: 'id',
                    value: record?.id,
                    name: 'id',
                },
            ];
            fetchDetail({ setIsLoading: listDetailShowLoading, userId, extraParams, customURL });
        }
    };

    const onFinishSearch = (values) => {};

    const onFinish = (values) => {
        if (formActionType?.addMode) {
            const data = { ...values };
            const onSuccess = (res) => {
                form.resetFields();
                setShowDataLoading(true);
                showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage + 'Receipt No.:' + res?.data?.receiptsDetails?.receiptNumber });
                fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
                setButtonData({ ...buttonData, formBtnActive: false });
                setIsFormVisible(false);
                setIsEnrolmentGenerated(true);
            };

            const onError = (message) => {
                showGlobalNotification({ message });
            };

            const requestData = {
                data: data,
                method: 'post',
                setIsLoading: listShowLoading,
                userId,
                onError,
                errorData: true,
                onSuccess,
                customURL,
            };

            saveData(requestData);
        } else if (formActionType?.viewMode) {
            if (activeKey?.length <= 0) {
                setKeyValue(1);
            } else if (keyValue === 1) {
                setKeyValue(keyValue + 2);
            } else {
                setKeyValue(keyValue + 1);
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const onCloseAction = () => {
        form.resetFields();
        setKeyValue([]);
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
        form.resetFields();
        advanceFilterForm.resetFields();
        setAdvanceSearchVisible(false);
    };

    const handleCollapse = (key) => {
        openAccordian?.includes(key) ? setOpenAccordian([]) : setOpenAccordian([key]);
    };

    const onChange = (values) => {
        setKeyValue(values);
        setChangePress(() => !changePress);
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
        scroll: {
            x: 1500,
        },
    };

    const onAdvanceSearchCloseAction = () => {
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
    };

    const removeFilter = (key) => {
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'fromDate' || key === 'toDate') {
            const { fromDate, toDate, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'schemeType') {
            const { schemeTypeName, schemeType, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
    };

    const title = 'CRM Scheme Enrolment Screens';
    const drawerShortTitle = ' Scheme Enrolment Details';

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View' + drawerShortTitle;
        } else if (formActionType?.editMode) {
            return 'Edit' + drawerShortTitle;
        } else {
            return 'Add' + drawerShortTitle;
        }
    }, [formActionType]);

    const normalSearchProps = {
        extraParams,
        removeFilter,
        advanceFilter: true,
        filterString,
        setFilterString,
        onFinish,
        onFinishFailed,
        handleResetFilter,
        advanceFilterForm,
        handleButtonClick,
        handleSearch,
        title,
        data,
        setAdvanceSearchVisible,
        typeData,
        searchForm,
        addFormOpen,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,

        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',

        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        typeData,
        onFinishSearch,
    };

    const formProps = {
        isVisible: isFormVisible,
        titleOverride: drawerTitle,
        handleButtonClick,
        formActionType,
        onCloseAction,
        buttonData,
        setButtonData,
        formData,
        form,
        onFinish,
        handleCollapse,
        isEnrolmentGenerated,
        activeKey,
        onChange,
        typeData,
        salesConsultantLov,
        onHandleRegistrationNumber,
        detailData,
        customerData,
        vehicleDataDetails,
    };

    return (
        <>
            <NormalSearch {...normalSearchProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleButtonClick={handleButtonClick} isLoading={showDataLoading} {...tableProps} showAddButton={false} />
                </Col>
            </Row>

            <AdvancedSearch {...advanceFilterProps} />

            <AddViewFormMaster {...formProps} />
        </>
    );
};

export const CrmScreenEnrolmentMaster = connect(mapStateToProps, mapDispatchToProps)(CrmScreenEnrolmentBase);
