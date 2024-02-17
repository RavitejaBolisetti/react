/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form } from 'antd';

import { otfSoMappingDataActions, OtfSoMappingDealerParentActions, OtfSoMappingDealerLocationDataActions } from 'store/actions/data/otfSoMappingUnmapping';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';
import { BASE_URL_OTF_SO_MAPPING_SWAP as CustomUrl, BASE_URL_SO_MAPPING_SEARCH as CustomSearchUrl, BASE_URL_OTF_SO_MAPPING_MAIN as reserveQuotaUrl } from 'constants/routingApi';

import { MasterContainer } from './MasterContainer';
import { setAllkeysToNull } from './Constants';
import { OTF_SO_MAPPING_UNMAPPING_CONSTANTS, HEADER_CONSTANTS, FORM_TYPE_CONSTANSTS } from './Constants';
import { converDateDayjs } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';
import SomappingUnmappingFilter from './SomappingUnmappingFilter';
import { OTF_STATUS } from 'constants/OTFStatus';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [], isLoading: isConfigurableLoading = false },
            OTFSoMapping: {
                DealerParent: { isFilteredListLoaded: isParentLovLoaded = false, isLoading: isParentLovLoading = false, filteredListData: DealerParentData = [] },
                DealerParentLocation: { isLoaded: isLocationLoaded = false, isLoading: isLocationLoading = false, data: LocationData = [] },
                OtfSoMapping: { isLoaded: isOtfSoMappingLoaded = false, isLoading: isOtfSoMappingLoading = false, data: otfSomappingData = [], filter: advanceFilterString, isLoadingOnSave },
            },
        },
        common: {
            Header: { data: loginUserData = [], isLoaded: isDataLoaded = false },
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = translateContent('bookingSoMapping.heading.pageTitle');

    const SORTING_COULUMN_NAME = {
        PO_NUMBER: {
            id: 1,
            key: 'poNumber',
            value: 'purchaseOrderNumber',
        },
        SO_DATE: {
            id: 2,
            key: 'Date',
            value: 'soDate',
        },
    };
    let returnValue = {
        collapsed,
        userId,
        moduleTitle,
        typeData,

        isParentLovLoaded,
        isParentLovLoading,
        DealerParentData,

        isLocationLoaded,
        isLocationLoading,
        LocationData,

        isOtfSoMappingLoaded,
        isOtfSoMappingLoading,
        otfSomappingData,

        isConfigurableLoading,

        loginUserData,
        isDataLoaded,
        advanceFilterString,
        SORTING_COULUMN_NAME,

        isLoadingOnSave,
    };

    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchDealerParentLov: OtfSoMappingDealerParentActions.fetchFilteredList,
            listDealerParentLoading: OtfSoMappingDealerParentActions.listShowLoading,
            resetDealerParentData: OtfSoMappingDealerParentActions.reset,

            fetchDealerLocation: OtfSoMappingDealerLocationDataActions.fetchList,
            listDealerLocation: OtfSoMappingDealerLocationDataActions.listShowLoading,
            resetDealerLocationData: OtfSoMappingDealerLocationDataActions.reset,

            fetchList: otfSoMappingDataActions.fetchList,
            listShowLoading: otfSoMappingDataActions.listShowLoading,
            saveData: otfSoMappingDataActions.saveData,
            resetData: otfSoMappingDataActions.reset,
            setadvanceFilterString: otfSoMappingDataActions.setFilter,
            saveFormShowLoading: otfSoMappingDataActions.saveFormShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const OtfListMasterBase = (props) => {
    const { userId, typeData } = props;
    const { DealerParentData, fetchDealerParentLov, listDealerParentLoading, resetDealerParentData } = props;
    const { isLocationLoading, LocationData, fetchDealerLocation, listDealerLocation, resetDealerLocationData } = props;
    const { isOtfSoMappingLoaded, isOtfSoMappingLoading, otfSomappingData, resetData, fetchList, listShowLoading, saveData, showGlobalNotification } = props;
    const { isConfigurableLoading, loginUserData } = props;
    const { setadvanceFilterString, advanceFilterString, SORTING_COULUMN_NAME, isLoadingOnSave, saveFormShowLoading } = props;

    const pageIntialState = {
        pageSize: 10,
        current: 1,
    };

    const disabledProps = { disabled: true };

    const [filterString, setfilterString] = useState({});
    const [status, setstatus] = useState();
    const [selectedKey, setselectedKey] = useState();
    const [DropDownData, setDropDownData] = useState([]);
    const [descriptiondata, setDescriptionData] = useState([]);
    const [page, setPage] = useState({ ...pageIntialState });

    const [form] = Form.useForm();
    const [SoForm] = Form.useForm();
    const [searchForm] = Form.useForm();

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const handleDropDownData = (data, loginUserData) => {
        const { userRoles, userType } = loginUserData;
        const hiddenKeys = ['SOCAU', 'SOM', 'SOU'];

        switch (userType) {
            case HEADER_CONSTANTS?.DLR?.key: {
                return data;
            }
            case HEADER_CONSTANTS?.ADMN?.key: {
                const found = userRoles?.find((element) => element?.roleCode === 'R0L003');
                if (found) {
                    return data?.filter((i) => !hiddenKeys?.includes(i?.key));
                }
                return data;
            }
            default: {
                return data;
            }
        }
    };

    useEffect(() => {
        if (userId && typeData) {
            setDropDownData(handleDropDownData(typeData?.[PARAM_MASTER?.SO_MAP?.id], loginUserData));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, typeData]);

    useEffect(() => {
        return () => {
            resetDealerParentData();
            resetData();
            resetDealerLocationData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleSortyByColumnName = (key) => {
        if (!key) {
            return null;
        } else {
            switch (key) {
                case SORTING_COULUMN_NAME?.PO_NUMBER?.key:
                    return SORTING_COULUMN_NAME?.PO_NUMBER?.value;
                case SORTING_COULUMN_NAME?.SO_DATE?.key:
                    return SORTING_COULUMN_NAME?.SO_DATE?.value;
                default:
                    return key;
            }
        }
    };
    const extraParams = useMemo(() => {
        return [
            {
                key: 'otfNumber',
                title: 'otfNumber',
                value: filterString?.otfNumber,
            },
            {
                key: 'soNumber',
                title: 'soNumber',
                value: filterString?.soNumber,
            },
            {
                key: 'soStatus',
                title: 'soStatus',
                value: filterString?.soStatusCode,
            },
            {
                key: 'parentGroupCode',
                title: 'parentGroupCode',
                value: filterString?.parentGroupCode,
            },
            {
                key: 'dealerLocationCode',
                title: 'dealerLocationCode',
                value: filterString?.dealerLocationCode,
            },
            {
                key: 'reserveQuota',
                title: 'reserveQuota',
                value: filterString?.reserveQuota,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const SOParams = useMemo(() => {
        return [
            {
                key: 'mapStatusCode',
                title: 'mapStatusCode',
                value: advanceFilterString?.status,
                canRemove: false,
                filter: false,
            },
            {
                key: 'searchType',
                title: 'Type',
                value: advanceFilterString?.searchType,
                name: typeData?.[PARAM_MASTER.OTF_SO_MAPPING_UNMAPPING_SER.id]?.find((i) => i?.key === advanceFilterString?.searchType)?.value,
                canRemove: false,
                filter: true,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: advanceFilterString?.searchParam,
                name: advanceFilterString?.searchParam,
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: advanceFilterString?.pageSize ?? 10,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: advanceFilterString?.current ?? 1,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: handleSortyByColumnName(advanceFilterString?.sortBy),
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: advanceFilterString?.sortType,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [advanceFilterString]);

    const CanSearch = SOParams && advanceFilterString && Object?.keys(advanceFilterString)?.length && advanceFilterString?.status;
    const canFetchData = extraParams && filterString && Object?.keys(filterString)?.length;
    const isSearchDataLoadedAndSet = otfSomappingData && typeof otfSomappingData === 'object' && Object?.keys(otfSomappingData)?.length && isOtfSoMappingLoaded && !otfSomappingData?.hasOwnProperty('paginationData');
    const isreserveQuota = selectedKey === OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.RESERVE_QUOTA?.key;

    useEffect(() => {
        if (userId) {
            fetchDealerParentLov({ setIsLoading: listDealerParentLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (canFetchData) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [extraParams]);

    useEffect(() => {
        if (CanSearch) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams: SOParams, onErrorAction, customURL: CustomSearchUrl });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [advanceFilterString]);

    useEffect(() => {
        if (isSearchDataLoadedAndSet) {
            SoForm.setFieldsValue({ [filterString?.formType]: { ...otfSomappingData, otfNumber: filterString?.otfNumber, soNumber: filterString?.soNumber || otfSomappingData?.soNumber, otfDate: converDateDayjs(otfSomappingData?.otfDate), soDate: converDateDayjs(otfSomappingData?.soDate) } });
            setfilterString();
            resetData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otfSomappingData, isOtfSoMappingLoaded]);
    useEffect(() => {
        const setDealerCodeValue = [OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.BILLED_TO_BILLED?.key, OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.BILLED_TO_LIVE?.key, OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.LIVE_TO_LIVE?.key, OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.RESERVE_QUOTA?.key]?.includes(selectedKey);
        if (loginUserData?.userType === HEADER_CONSTANTS?.DLR?.key && setDealerCodeValue && loginUserData?.parentGroupCode) {
            SoForm.setFieldValue('parentGroupCode', loginUserData?.parentGroupCode);
            handleDealerParent(loginUserData?.parentGroupCode);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedKey, loginUserData?.parentGroupCode]);

    const MappingUnmapping = (key) => {
        if (key) {
            setadvanceFilterString({ ...advanceFilterString, status: key });
            // userId && SOParams && fetchList({ setIsLoading: listShowLoading, userId, extraParams: SOParams, onSuccessAction, onErrorAction, customURL: CustomSearchUrl });
        }
    };

    const handleClear = () => {
        const parentGroupCode = SoForm.getFieldsValue()?.parentGroupCode;
        SoForm.resetFields();
        if (loginUserData?.userType === HEADER_CONSTANTS?.DLR?.key) {
            SoForm.setFieldValue('parentGroupCode', parentGroupCode);
            setfilterString();
            setDescriptionData([]);
        } else {
            resetDealerLocationData();
            setfilterString();
            setDescriptionData([]);
        }
    };

    const handleCancel = () => {
        setselectedKey();
        SoForm.resetFields();
        form.resetFields();
    };

    const ClearAllData = () => {
        SoForm.resetFields();
        setfilterString();
        resetDealerLocationData();
    };

    const handleSelect = (key) => {
        if (key) {
            ClearAllData();
            setselectedKey(key);
            setstatus(
                Object?.values(OTF_SO_MAPPING_UNMAPPING_CONSTANTS)?.reduce((prev, curr) => {
                    if (curr?.key === key) {
                        prev = curr;
                    }
                    return prev;
                }, {})
            );
        } else {
            setselectedKey();
            ClearAllData();
            setstatus();
        }
    };

    const handleSearchChange = (value, type) => {
        if (value) {
            SoForm.validateFields(['parentGroupCode', 'locationCode'])
                .then(() => {
                    const formValues = SoForm.getFieldsValue();
                    setfilterString({ reserveQuota: isreserveQuota ? 'Y' : undefined, otfNumber: formValues?.[type]?.otfNumber, soNumber: formValues?.[type]?.soNumber, soStatusCode: type === FORM_TYPE_CONSTANSTS?.FORM_1?.id ? status?.CRD_1 : status?.CRD_2, parentGroupCode: formValues?.parentGroupCode, dealerLocationCode: formValues?.locationCode, formType: type });
                })
                .catch(() => {});
        }
    };
    const handleResetData = (type, exception = undefined) => {
        switch (type) {
            case FORM_TYPE_CONSTANSTS?.FORM_1?.id: {
                SoForm.setFieldsValue({ FORM_1: setAllkeysToNull(exception) });
                break;
            }
            case FORM_TYPE_CONSTANSTS?.FORM_2?.id: {
                SoForm.setFieldsValue({ FORM_2: setAllkeysToNull(exception) });
                break;
            }
            default: {
                break;
            }
        }
    };

    const handleNullcheck = (obj1, obj2, exception = false) => {
        let f1 = false;
        let f2 = false;
        for (const key in obj1) {
            if (!obj1[key]) {
                if (exception && key === 'otfNumber') continue;
                f1 = true;
                break;
            }
        }
        for (const key in obj2) {
            if (!obj2[key]) {
                f2 = true;
                break;
            }
        }
        return f1 ?? f2;
    };
    const checkIfCanProceedWithSwapping = ({ formOneData, formTwoData }) => {
        const isModelGroupPresent = formOneData?.modelGroup && formTwoData?.modelGroup;
        const bothOtfAreBooked = formOneData?.orderStatus === OTF_STATUS?.BOOKED?.key && formTwoData?.orderStatus === OTF_STATUS?.BOOKED?.key;
        const isModelChangeRequestSent = formOneData?.revisedModel || formTwoData?.revisedModel;
        if (formOneData?.otfNumber === formTwoData?.otfNumber) {
            showGlobalNotification({ title: translateContent('global.notificationSuccess.error'), message: translateContent('bookingSoMappUnmapp.errorMsg.otfNumberAreSame') });
            return false;
        } else if (!isModelGroupPresent) {
            showGlobalNotification({ title: translateContent('global.notificationSuccess.error'), message: translateContent('bookingSoMappUnmapp.errorMsg.modelGroupNotPresent') });
            return false;
        } else {
            if (formOneData?.modelGroup !== formTwoData?.modelGroup) {
                showGlobalNotification({ title: translateContent('global.notificationSuccess.error'), message: translateContent('bookingSoMappUnmapp.errorMsg.modelGroupDifferent') });
                return false;
            } else if (!bothOtfAreBooked) {
                showGlobalNotification({ title: translateContent('global.notificationSuccess.error'), message: translateContent('bookingSoMappUnmapp.errorMsg.bookingNumberAreNotBooked') });
                return false;
            } else if (isModelChangeRequestSent) {
                showGlobalNotification({ title: translateContent('global.notificationSuccess.error'), message: translateContent('bookingSoMappUnmapp.errorMsg.modelChangeRequestSent') });
                return false;
            } else {
                return true;
            }
        }
    };
    const onFinish = (values) => {
        let requestedFinalPayload = {};
        const formOneData = values?.[FORM_TYPE_CONSTANSTS?.FORM_1?.id];
        const formTwoData = values?.[FORM_TYPE_CONSTANSTS?.FORM_2?.id];

        const onSuccess = (res) => {
            const { responseMessage } = res;
            handleClear();
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: responseMessage });
        };

        if (isreserveQuota) {
            requestedFinalPayload = {
                otfNumber: formTwoData?.otfNumber,
                soNumber: formOneData?.soNumber,
                action: 'MAP',
                cancellationRemarks: '',
                mapStatusCode: OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.SO_UNMAPPING?.key,
                reserveQuota: filterString?.reserveQuota,
            };
        } else {
            if (checkIfCanProceedWithSwapping({ formOneData, formTwoData })) {
                const { locationCode: dealerLocationCode, parentGroupCode, resonCategoryCode, reasonDescriptionCode } = values;
                const form_1_Values = {
                    otfNumber: values[FORM_TYPE_CONSTANSTS?.FORM_1?.id]?.otfNumber || '',
                    soNumber: values[FORM_TYPE_CONSTANSTS?.FORM_1?.id]?.soNumber,
                    soStatusCode: values[FORM_TYPE_CONSTANSTS?.FORM_1?.id]?.soStatusCode,
                };
                const form_2_Values = {
                    otfNumber: values[FORM_TYPE_CONSTANSTS?.FORM_2?.id]?.otfNumber || '',
                    soNumber: values[FORM_TYPE_CONSTANSTS?.FORM_2?.id]?.soNumber,
                    soStatusCode: values[FORM_TYPE_CONSTANSTS?.FORM_2?.id]?.soStatusCode,
                };

                if (handleNullcheck(form_1_Values, form_2_Values, status?.key === OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.RESERVE_QUOTA?.key)) {
                    showGlobalNotification({ title: translateContent('global.notificationSuccess.error'), message: translateContent('bookingSoMappUnmapp.errorMsg.message') });
                    return false;
                }

                requestedFinalPayload = { mapStatusCode: selectedKey, dealerLocationCode, parentGroupCode, resonCategoryCode, reasonDescriptionCode, soDetails: [form_1_Values, form_2_Values] };
            } else {
                return false;
            }
        }
        const customURL = isreserveQuota ? reserveQuotaUrl : CustomUrl;

        const requestData = {
            customURL,
            data: requestedFinalPayload,
            method: 'put',
            setIsLoading: saveFormShowLoading,
            userId,
            onError: onErrorAction,
            onSuccess,
        };

        saveData(requestData);
    };

    const handleDealerParent = (parentCode) => {
        if (!parentCode) {
            resetDealerLocationData();
            SoForm.resetFields(['locationCode']);
            return false;
        }
        SoForm.resetFields(['locationCode']);
        const DealerParams = [
            {
                key: 'dealerParentCode',
                title: 'dealerParentCode',
                value: parentCode,
            },
        ];
        fetchDealerLocation({ setIsLoading: listDealerLocation, userId, extraParams: DealerParams });
    };
    const removeFilter = (key) => {
        let obj = { ...advanceFilterString };
        if (key === 'searchParam') {
            delete obj?.searchParam;
            delete obj?.searchType;
            setadvanceFilterString({ ...obj });
        } else {
            const obj = { ...advanceFilterString };
            delete obj?.[key];
        }
        setadvanceFilterString({ ...obj });
    };
    const containerProps = {
        dynamicPagination: true,
        selectedKey,
        typeData,
        SoForm,
        handleSearchChange,
        status,
        onFinish,
        DealerParentData,
        handleDealerParent,
        LocationData,
        handleClear,
        handleCancel,
        isLocationLoading,
        isLoading: isOtfSoMappingLoading,
        filterString,
        handleResetData,
        disabledProps,
        page,
        setPage,
        MappingUnmapping,
        advanceFilterString,
        setadvanceFilterString,
        loginUserData,

        isLoadingOnSave,
        descriptiondata,
        setDescriptionData,
    };
    const SomappingUnmappingFilterProps = {
        form,
        isConfigurableLoading,
        selectBoxkey: 'code',
        selectBoxProps: {
            loading: !DropDownData?.length,
            options: DropDownData,
            fieldNames: { label: 'value', value: 'key' },
            onChange: handleSelect,
            placeholder: translateContent('global.placeholder.select'),
            allowClear: true,
            showSearch: true,
            optionFilterProp: 'value',
        },
        searchBoxProps: {
            searchForm,
            optionType: typeData?.[PARAM_MASTER.OTF_SO_MAPPING_UNMAPPING_SER.id],
            defaultOption: 'soNumber',
            setFilterString: setadvanceFilterString,
            filterString: advanceFilterString,
            allowClear: false,
        },
        extraParams: SOParams,
        status,
        advanceFilter: true,
        removeFilter,
        handleResetFilter: () => setadvanceFilterString({ status: advanceFilterString?.status }),
    };

    return (
        <>
            <SomappingUnmappingFilter {...SomappingUnmappingFilterProps} />
            <MasterContainer {...containerProps} />
        </>
    );
};

export const OtfListMaster = connect(mapStateToProps, mapDispatchToProps)(OtfListMasterBase);
