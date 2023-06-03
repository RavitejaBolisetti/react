import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { ListDataTable } from 'utils/ListDataTable';

import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { AdvancedSearch } from './AdvancedSearch';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { filterFunction } from 'utils/filterFunction';
import { searchValidatorPincode } from 'utils/validation';

import { FilterIcon } from 'Icons';

import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { geoCountryDataActions } from 'store/actions/data/geo/country';
import { geoStateDataActions } from 'store/actions/data/geo/state';
import { geoDistrictDataActions } from 'store/actions/data/geo/district';
import { geoTehsilDataActions } from 'store/actions/data/geo/tehsil';
import { geoCityDataActions } from 'store/actions/data/geo/city';
import { geoPincodeDataActions } from 'store/actions/data/geo/pincode';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'components/common/Common.module.css';

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

    const moduleTitle = 'Pincode';

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
        districtData: districtData?.filter((i) => i.status),
        isTehsilDataLoaded,
        isTehsilLoading,
        tehsilData: tehsilData?.filter((i) => i.status),
        isCityDataLoaded,
        isCityLoading,
        cityData: cityData?.filter((i) => i.status),
        data,
        stateData: stateData?.filter((i) => i.status),
        isDataLoaded,
        isConfigDataLoaded,
        isConfigLoading,
        typeData: typeData && typeData[PARAM_MASTER.PIN_CATG.id],
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

    const [tehsilCodeValue, setTehsilCodeValue] = useState();
    const [cityCodeValue, setCityCodeValue] = useState();

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

    const onErrorAction = (message) => {
        resetData();
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    useEffect(() => {
        return () => {
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const loadPinCodeDataList = () => {
        // && (filterString?.tehsilCode || filterString?.cityCode)
        if (userId && (filterString?.pincode || (filterString?.countryCode && filterString?.stateCode && filterString?.districtCode))) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        } else {
            // onErrorAction('Please enter pincode OR country, state, tehsil, city to search data');
        }
    };

    useEffect(() => {
        if (refershData) {
            loadPinCodeDataList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    useEffect(() => {
        if (isDataCountryLoaded && defaultCountry && isStateDataLoaded) {
            setFilterString({ countryCode: defaultCountry });
            setFilteredStateData(stateData?.filter((i) => i?.countryCode === defaultCountry));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataCountryLoaded, isStateDataLoaded]);

    useEffect(() => {
        if (!showDataLoading && data && userId) {
            if (filterString?.length > 0) {
                const keyword = filterString?.pincode ? filterString?.pincode : filterString?.keyword;
                const state = filterString?.stateCode;
                const district = filterString?.districtCode;
                const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.pincode) || filterFunction(keyword)(item?.pinCategory) : true) && (state ? filterFunction(state)(item?.stateCode) : true) && (district ? filterFunction(district)(item?.districtCode) : true));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
                setShowDataLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, userId]);

    useEffect(() => {
        setSearchdata(data?.map((el, i) => ({ ...el, srl: i + 1 })));
    }, [data]);

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
            canRemove: false,
        },
        {
            key: 'districtCode',
            title: 'District',
            value: filterString?.districtCode,
            name: filteredDistrictData?.find((i) => i?.code === filterString?.districtCode)?.name,
            canRemove: false,
        },
        {
            key: 'tehsilCode',
            title: 'Tehsil',
            value: filterString?.tehsilCode,
            name: filteredTehsilData?.find((i) => i?.code === filterString?.tehsilCode)?.name,
            canRemove: false,
        },
        {
            key: 'cityCode',
            title: 'City',
            value: filterString?.cityCode,
            name: filteredCityData?.find((i) => i?.code === filterString?.cityCode)?.name,
            canRemove: false,
        },
        {
            key: 'pincode',
            title: 'Pincode',
            value: filterString?.pincode,
            name: filterString?.pincode,
            canRemove: true,
        },
    ];

    useEffect(() => {
        if (userId && filterString) {
            loadPinCodeDataList();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, userId]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(buttonAction === VIEW_ACTION ? { ...defaultBtnVisiblity, closeBtn: true, editBtn: true } : buttonAction === EDIT_ACTION ? { ...defaultBtnVisiblity, saveBtn: true, cancelBtn: true } : { ...defaultBtnVisiblity, saveBtn: true, saveAndNewBtn: true, cancelBtn: true });

        const pinCategoryName = typeData?.find((category) => category.key === record?.pinCategory)?.value;
        record && setFormData({ ...record, pinCategoryName: pinCategoryName });
        setIsFormVisible(true);
    };

    const handleReferesh = () => {
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

            if (name === 'cityCode') {
                setCityCodeValue(filterValue);
            }

            if (name === 'tehsilCode') {
                setTehsilCodeValue(filterValue);
            }
        };

    const onFinish = (values) => {
        let data = { ...values };
        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            loadPinCodeDataList();

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

        tehsilCodeValue,
        cityCodeValue,
    };

    const dataMessage = (
        <>
            Please search with pincode OR country, state, tehsil, city <br /> to view data
        </>
    );
    const tableProps = {
        tableColumn: tableColumn(handleButtonClick, page?.current, page?.pageSize),
        tableData: searchData,
        setPage,
        noDataMessage: dataMessage,
    };

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);

        // !filterString?.stateCode && setFilteredStateData(undefined);
        !filterString?.districtCode && setFilteredDistrictData(undefined);
        !filterString?.cityCode && setFilteredCityData(undefined);
        !filterString?.tehsilCode && setFilteredTehsilData(undefined);

        filterString?.tehsilCode && setTehsilCodeValue();
        filterString?.cityCode && setCityCodeValue();

        advanceFilterForm.resetFields();
    };

    const handleResetFilter = () => {
        resetData();
        setFilterString();
        setTehsilCodeValue();
        setCityCodeValue();

        setShowDataLoading(false);
        setFilteredDistrictData(undefined);
        setFilteredCityData(undefined);
        setFilteredTehsilData(undefined);
        advanceFilterForm.resetFields();
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

        tehsilCodeValue,
        cityCodeValue,
    };

    const onSearchHandle = (value) => {
        const pattern = /^\d{6}(?:\s*,\s*\d{6})*$/;
        if (pattern.test(value)) {
            if (filterString?.stateCode) {
                value ? setFilterString({ ...filterString, advanceFilter: true, pincode: value }) : handleResetFilter();
            } else {
                value ? setFilterString({ advanceFilter: true, pincode: value }) : handleResetFilter();
            }
            listFilterForm.setFieldsValue({ pincode: undefined, code: undefined });
        }
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
        } else if (key === 'pincode') {
            const { [key]: names, ...rest } = filterString;
            advanceFilterForm.setFieldsValue({ keyword: undefined, pincode: undefined });

            if (!filterString?.countryCode && !filterString?.stateCode && !filterString?.districtCode && !filterString?.tehsilCode) {
                setFilterString();
            } else {
                setFilterString({ ...rest });
            }
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
        setFilterString,
        title,
        validator: searchValidatorPincode,
    };
    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.tableProduct}>
                        <ListDataTable isLoading={showDataLoading} scroll={1800} {...tableProps} handleAdd={handleAdd} addTitle={title} />
                    </div>
                </Col>
            </Row>

            <AdvancedSearch {...advanceFilterProps} />

            <AddEditForm {...formProps} />
        </>
    );
};

export const ListPinCodeMaster = connect(mapStateToProps, mapDispatchToProps)(ListPinCodeMasterBase);
