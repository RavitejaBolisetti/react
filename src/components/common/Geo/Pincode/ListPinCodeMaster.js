import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Empty, ConfigProvider } from 'antd';
import { bindActionCreators } from 'redux';
import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { ListDataTable } from 'utils/ListDataTable';
import { RxCross2 } from 'react-icons/rx';

import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { AdvancedSearch } from './AdvancedSearch';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { filterFunction } from 'utils/filterFunction';

import { TfiReload } from 'react-icons/tfi';

import { PlusOutlined } from '@ant-design/icons';
import { FilterIcon } from 'Icons';

import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { geoCountryDataActions } from 'store/actions/data/geo/country';
import { geoStateDataActions } from 'store/actions/data/geo/state';
import { geoDistrictDataActions } from 'store/actions/data/geo/district';
import { geoTehsilDataActions } from 'store/actions/data/geo/tehsil';
import { geoCityDataActions } from 'store/actions/data/geo/city';
import { geoPincodeDataActions } from 'store/actions/data/geo/pincode';

import { validatePincodeField } from 'utils/validation';

import styles from 'components/common/Common.module.css';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isConfigDataLoaded = false, isLoading: isConfigLoading, paramdata: typeData = [] },
            Geo: {
                Country: { isLoaded: isDataCountryLoaded = false, isLoading: isCountryLoading = false, data: countryData = [] },
                State: { isLoaded: isStateDataLoaded = false, isLoading: isStateLoading, data: stateData },
                District: { isLoaded: isDistrictDataLoaded = false, isLoading: isDistrictLoading, data: districtData },
                Tehsil: { isLoaded: isTehsilDataLoaded = false, isLoading: isTehsilLoading, data: tehsilData },
                City: { isLoaded: isCityDataLoaded = false, isLoading: isCityLoading, data: cityData },
                Pincode: { isLoaded: isDataLoaded = false, isLoading, data },
            },
        },
    } = state;

    const moduleTitle = 'Pincode Master List';

    const finalCountryData = countryData?.map((item, index) => {
        return { ...item, default: index <= 0 || false };
    });

    const defaultCountry = finalCountryData && finalCountryData?.find((i) => i.default)?.countryCode;
    let returnValue = {
        userId,
        isDataCountryLoaded,
        isCountryLoading,
        countryData: finalCountryData,
        defaultCountry,
        isStateDataLoaded,
        isLoading,
        isDistrictLoading,
        isStateLoading,
        isDistrictDataLoaded,
        districtData,
        isTehsilDataLoaded,
        isTehsilLoading,
        tehsilData,
        isCityDataLoaded,
        isCityLoading,
        cityData,
        data,
        stateData,
        isDataLoaded,
        isConfigDataLoaded,
        isConfigLoading,
        typeData,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchConfigList: configParamEditActions.fetchList,
            listConfigShowLoading: configParamEditActions.listShowLoading,
            fetchCountryList: geoCountryDataActions.fetchList,
            listCountryShowLoading: geoCountryDataActions.listShowLoading,
            fetchStateList: geoStateDataActions.fetchList,
            listStateShowLoading: geoStateDataActions.listShowLoading,
            fetchDistrictList: geoDistrictDataActions.fetchList,
            listDistrictShowLoading: geoDistrictDataActions.listShowLoading,
            fetchTehsilList: geoTehsilDataActions.fetchList,
            listTehsilShowLoading: geoTehsilDataActions.listShowLoading,
            fetchCityList: geoCityDataActions.fetchList,
            listCityShowLoading: geoCityDataActions.listShowLoading,
            fetchList: geoPincodeDataActions.fetchList,
            listShowLoading: geoPincodeDataActions.listShowLoading,
            saveData: geoPincodeDataActions.saveData,
            resetData: geoPincodeDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});
const ListPinCodeMasterBase = (props) => {
    const { data, saveData, fetchList, resetData, userId, isDataLoaded, isLoading, listShowLoading, showGlobalNotification, moduleTitle } = props;
    const { isDataCountryLoaded, isCountryLoading, countryData, defaultCountry, fetchCountryList, listCountryShowLoading } = props;

    const { isStateDataLoaded, isStateLoading, stateData, listStateShowLoading, fetchStateList } = props;
    const { isDistrictDataLoaded, isDistrictLoading, districtData, listDistrictShowLoading, fetchDistrictList } = props;
    const { isTehsilDataLoaded, isTehsilLoading, tehsilData, listTehsilShowLoading, fetchTehsilList } = props;
    const { isCityDataLoaded, isCityLoading, cityData, listCityShowLoading, fetchCityList } = props;
    const { isConfigDataLoaded, isConfigLoading, typeData, listConfigShowLoading, fetchConfigList } = props;

    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();

    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(false);
    const [filteredStateData, setFilteredStateData] = useState([]);
    const [filteredDistrictData, setFilteredDistrictData] = useState([]);
    const [filteredCityData, setFilteredCityData] = useState([]);
    const [filteredTehsilData, setFilteredTehsilData] = useState([]);

    const [refershData, setRefershData] = useState(false);
    const [page, setPage] = useState(1);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [searchData, setSearchdata] = useState([]);

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
        setAdvanceSearchVisible(false);
    };

    useEffect(() => {
        if (userId) {
            if (!isDataCountryLoaded && !isCountryLoading) {
                fetchCountryList({ setIsLoading: listCountryShowLoading, userId });
            }

            if (!isStateDataLoaded && !isStateLoading) {
                fetchStateList({ setIsLoading: listStateShowLoading, userId });
            }

            if (!isDistrictDataLoaded && !isDistrictLoading) {
                fetchDistrictList({ setIsLoading: listDistrictShowLoading, userId });
            }

            if (!isCityDataLoaded && !isCityLoading) {
                fetchCityList({ setIsLoading: listCityShowLoading, userId });
            }

            if (!isTehsilDataLoaded && !isTehsilLoading) {
                fetchTehsilList({ setIsLoading: listTehsilShowLoading, userId });
            }

            if (!isConfigDataLoaded && !isConfigLoading) {
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: 'PIN_CATG' });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataCountryLoaded, isStateDataLoaded, isDistrictDataLoaded, isCityDataLoaded, isTehsilDataLoaded, isDataLoaded]);

    useEffect(() => {
        if (userId && refershData && extraParams) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    useEffect(() => {
        if (isDataCountryLoaded && defaultCountry && isStateDataLoaded) {
            // setFilterString({ countryCode: defaultCountry });
            setFilteredStateData(stateData?.filter((i) => i?.countryCode === defaultCountry));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataCountryLoaded, isStateDataLoaded]);

    useEffect(() => {
        if (!showDataLoading && data && userId) {
            if (filterString) {
                const keyword = filterString?.code ? filterString?.code : filterString?.keyword;
                const state = filterString?.stateCode;
                const district = filterString?.districtCode;
                const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.pinCode) || filterFunction(keyword)(item?.pinCategory) : true) && (state ? filterFunction(state)(item?.stateCode) : true) && (district ? filterFunction(district)(item?.districtCode) : true));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
                setShowDataLoading(false);
            } else {
                setSearchdata(data?.map((el, i) => ({ ...el, srl: i + 1 })));
                setShowDataLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, data, userId]);

    const extraParams = [
        {
            key: 'countryCode',
            title: 'Country',
            value: filterString?.countryCode,
            name: countryData?.find((i) => i?.countryCode === filterString?.countryCode)?.countryName,
            canRemove: false,
        },
        {
            key: 'stateCode',
            title: 'State',
            value: filterString?.stateCode,
            name: filteredStateData?.find((i) => i?.code === filterString?.stateCode)?.name,
            canRemove: true,
        },
        {
            key: 'districtCode',
            title: 'District',
            value: filterString?.districtCode,
            name: filteredDistrictData?.find((i) => i?.code === filterString?.districtCode)?.name,
            canRemove: true,
        },
        {
            key: 'tehsilCode',
            title: 'Tehsil',
            value: filterString?.tehsilCode,
            name: filteredTehsilData?.find((i) => i?.code === filterString?.tehsilCode)?.name,
            canRemove: true,
        },
        {
            key: 'cityCode',
            title: 'City',
            value: filterString?.cityCode,
            name: filteredCityData?.find((i) => i?.code === filterString?.cityCode)?.name,
            canRemove: true,
        },
        {
            key: 'code',
            title: 'Pincode',
            value: filterString?.code,
            name: filterString?.code,
            canRemove: true,
        },
    ];

    useEffect(() => {
        if (userId && filterString) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams: extraParams, onSuccessAction });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, userId]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(buttonAction === VIEW_ACTION ? { ...defaultBtnVisiblity, closeBtn: true, editBtn: true } : buttonAction === EDIT_ACTION ? { ...defaultBtnVisiblity, saveBtn: true, cancelBtn: true } : { ...defaultBtnVisiblity, saveBtn: true, saveAndNewBtn: true, cancelBtn: true });

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const handleReferesh = () => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            const filterValue = type === 'text' ? value.target.value : value;

            if (name === 'countryCode') {
                setFilteredStateData(stateData?.filter((i) => i?.countryCode === filterValue));
                advanceFilterForm.setFieldsValue({ stateCode: undefined });
                advanceFilterForm.setFieldsValue({ districtCode: undefined });
                advanceFilterForm.setFieldsValue({ cityCode: undefined });
                advanceFilterForm.setFieldsValue({ tehsilCode: undefined });
            }

            if (name === 'stateCode') {
                setFilteredDistrictData(districtData?.filter((i) => i?.stateCode === filterValue));
                advanceFilterForm.setFieldsValue({ districtCode: undefined });
                advanceFilterForm.setFieldsValue({ cityCode: undefined });
                advanceFilterForm.setFieldsValue({ tehsilCode: undefined });
            }

            if (name === 'districtCode') {
                setFilteredCityData(cityData?.filter((i) => i?.districtCode === filterValue));
                setFilteredTehsilData(tehsilData?.filter((i) => i?.districtCode === filterValue));
                advanceFilterForm.setFieldsValue({ cityCode: undefined });
                advanceFilterForm.setFieldsValue({ tehsilCode: undefined });
            }
        };

    const onFinish = (values) => {
        let data = { ...values, localityCode: '01' };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, extraParams, userId, onSuccessAction });

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

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const formProps = {
        form,
        formData,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,

        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: (formActionType?.viewMode ? 'View ' : formActionType?.editMode ? 'Edit ' : 'Add ').concat(moduleTitle),
        tableData: data,

        isDataCountryLoaded,
        isCountryLoading,
        countryData,
        defaultCountry,

        districtData,
        stateData,
        cityData,
        tehsilData,
        data,

        typeData,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick, page?.current, page?.pageSize),
        tableData: searchData,
        setPage,
    };

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        advanceFilterForm.resetFields();
    };

    const handleResetFilter = () => {
        resetData();
        setFilterString();
        advanceFilterForm.resetFields();
        setShowDataLoading(false);
        setAdvanceSearchVisible(false);
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        onCloseAction: onAdvanceSearchCloseAction,
        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',
        isDataCountryLoaded,
        isCountryLoading,
        countryData,
        defaultCountry,
        districtData,
        stateData,
        data,

        handleFilterChange,
        filteredStateData,
        filteredDistrictData,
        filteredCityData,
        filteredTehsilData,
        advanceFilterForm,
        resetData,
        handleResetFilter,
        filterString,
        setFilterString,
        setAdvanceSearchVisible,
    };

    const onSearchHandle = (value) => {
        value ? setFilterString({ ...filterString, advanceFilter: true, code: value }) : handleResetFilter();
    };

    const removeFilter = (key) => {
        if (key === 'countryCode') {
            setFilterString(undefined);
        } else if (key === 'stateCode') {
            setFilterString({ countryCode: filterString?.countryCode, stateCode: filterString?.stateCode });
            const { stateCode, districtCode, tehsilCode, cityCode, code, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'districtCode') {
            setFilterString({ countryCode: filterString?.countryCode, stateCode: filterString?.stateCode, districtCode: filterString?.districtCode });
            const { districtCode, tehsilCode, cityCode, code, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'tehsilCode') {
            const { tehsilCode, cityCode, code, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'cityCode') {
            const { cityCode, code, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'code') {
            const { [key]: names, ...rest } = filterString;
            advanceFilterForm.setFieldsValue({ keyword: undefined, code: undefined });
            setFilterString({ ...rest });
        }
    };

    const handleAdd = () => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD });

    const title = 'Pincode';
    const advanceFilterResultProps = {
        advanceFilter: true,
        filterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        extraParams,
        removeFilter,
        handleResetFilter,
        onSearchHandle,
        setAdvanceSearchVisible,
        handleReferesh,
        handleButtonClick,
        advanceFilterProps,
        filterString,
        setFilterString,
        title,
        pincode : true,
    };
    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.tableProduct}>
                        <ListDataTable isLoading={showDataLoading} scroll={2400} {...tableProps} />
                    </div>
                </Col>
            </Row>

            <AdvancedSearch {...advanceFilterProps} />

            <AddEditForm {...formProps} />
        </>
    );
};

export const ListPinCodeMaster = connect(mapStateToProps, mapDispatchToProps)(ListPinCodeMasterBase);
