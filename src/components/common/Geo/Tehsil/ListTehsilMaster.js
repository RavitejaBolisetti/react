import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Space, Empty, ConfigProvider, Select } from 'antd';

import { tblPrepareColumns } from 'utils/tableCloumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { DataTable } from 'utils/dataTable';
import { filterFunction } from 'utils/filterFunction';
import { tableColumn } from './tableColumn';

import { geoCountryDataActions } from 'store/actions/data/geo/country';
import { geoStateDataActions } from 'store/actions/data/geo/state';
import { geoDistrictDataActions } from 'store/actions/data/geo/district';
import { geoTehsilDataActions } from 'store/actions/data/geo/tehsil';

import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { PlusOutlined } from '@ant-design/icons';
import { FilterIcon } from 'Icons';
import { TfiReload } from 'react-icons/tfi';
import { FiEdit } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';
import { bindActionCreators } from 'redux';
import styles from 'components/common/Common.module.css';
import { ListDataTable } from 'utils/ListDataTable';
import { RxCross2 } from 'react-icons/rx';
import { AdvancedSearch } from './AdvancedSearch';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { validateAtLeastThreeChar } from 'utils/validation';

const { Search } = Input;
const { Option } = Select;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Geo: {
                Country: { isLoaded: isDataCountryLoaded = false, isLoading: isCountryLoading = false, data: countryData = [] },
                State: { isLoaded: isStateDataLoaded = false, isLoading: isStateLoading = false, data: stateData = [] },
                District: { isLoaded: isDistrictDataLoaded = false, isLoading: isDistrictLoading = false, data: districtData = [] },
                Tehsil: { isLoaded: isDataLoaded = false, isLoading, data = [] },
            },
        },
    } = state;

    const moduleTitle = 'Tehsil Details';
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
        data,
        stateData,
        isDataLoaded,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCountryList: geoCountryDataActions.fetchList,
            listCountryShowLoading: geoCountryDataActions.listShowLoading,
            fetchStateList: geoStateDataActions.fetchList,
            listStateShowLoading: geoStateDataActions.listShowLoading,
            fetchDistrictList: geoDistrictDataActions.fetchList,
            listDistrictShowLoading: geoDistrictDataActions.listShowLoading,
            fetchList: geoTehsilDataActions.fetchList,
            saveData: geoTehsilDataActions.saveData,
            listShowLoading: geoTehsilDataActions.listShowLoading,
            resetData: geoTehsilDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const ListTehsilBase = (props) => {
    const { data, saveData, fetchList, userId, resetData, isDataLoaded, isLoading, listShowLoading, showGlobalNotification, moduleTitle } = props;
    const { isDataCountryLoaded, isCountryLoading, countryData, defaultCountry, fetchCountryList, listCountryShowLoading } = props;

    const { isStateDataLoaded, stateData, listStateShowLoading, fetchStateList } = props;
    const { isDistrictDataLoaded, districtData, listDistrictShowLoading, fetchDistrictList } = props;

    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [filteredStateData, setFilteredStateData] = useState([]);
    const [filteredDistrictData, setFilteredDistrictData] = useState([]);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [filterString, setFilterString] = useState();

    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [page, setPage] = useState(1);

    const [formData, setFormData] = useState([]);
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
        setAdvanceSearchVisible(false);
    };

    useEffect(() => {
        if (userId) {
            if (!isDataCountryLoaded) {
                fetchCountryList({ setIsLoading: listCountryShowLoading, userId });
            }
            if (!isStateDataLoaded) {
                fetchStateList({ setIsLoading: listStateShowLoading, userId });
            }
            if (!isDistrictDataLoaded) {
                fetchDistrictList({ setIsLoading: listDistrictShowLoading, userId });
            }
            if (!isDataLoaded) {
                fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataCountryLoaded, isStateDataLoaded, isDataLoaded]);

    useEffect(() => {
        if (userId && refershData && extraParams) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    useEffect(() => {
        setFilterString({ countryCode: defaultCountry });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultCountry]);
    useEffect(() => {
        if (isDataCountryLoaded && defaultCountry && isStateDataLoaded) {
            setFilteredStateData(stateData?.filter((i) => i?.countryCode === defaultCountry));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataCountryLoaded, isStateDataLoaded]);

    const extraParams = [
        {
            key: 'countryCode',
            title: 'Country',
            value: filterString?.countryCode,
            name: countryData?.find((i) => i?.countryCode === filterString?.countryCode)?.countryName,
            canRemove: true,
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
            key: 'keyword',
            title: 'tehsil',
            value: filterString?.keyword,
            name: filterString?.keyword,
            canRemove: true,
        },
    ];
    // useEffect(() => {
    //     if (userId && filterString) {
    //         fetchList({ setIsLoading: listShowLoading, userId, extraParams: extraParams, onSuccessAction });
    //     }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [filterString, userId]);

    useEffect(() => {
        if (isDataLoaded && data && userId) {
            if (filterString) {
                console.log('filterString', filterString);

                const keyword = filterString?.code ? filterString?.code : filterString?.keyword;
                const state = filterString?.stateCode;
                const district = filterString?.districtCode;

                console.log('keyword', keyword, 'state', state, 'district', district);

                const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.code) || filterFunction(keyword)(item?.name) : true) && (state ? filterFunction(state)(item?.stateCode) : true) && (district ? filterFunction(district)(item?.districtCode) : true));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
                setShowDataLoading(false);
            } else {
                setSearchdata(data?.map((el, i) => ({ ...el, srl: i + 1 })));
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
        setButtonData(buttonAction === VIEW_ACTION ? { ...defaultBtnVisiblity, closeBtn: true, editBtn: true } : buttonAction === EDIT_ACTION ? { ...defaultBtnVisiblity, saveBtn: true, cancelBtn: true } : { ...defaultBtnVisiblity, saveBtn: true, saveAndNewBtn: true, cancelBtn: true });

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            const filterValue = type === 'text' ? value.target.value : value;

            if (name === 'countryCode') {
                setFilteredStateData(stateData?.filter((i) => i?.countryCode === filterValue));
                advanceFilterForm.setFieldsValue({ stateCode: undefined });
                advanceFilterForm.setFieldsValue({ districtCode: undefined });
                advanceFilterForm.setFieldsValue({ tehsilCode: undefined });
            }

            if (name === 'stateCode') {
                setFilteredDistrictData(districtData?.filter((i) => i?.stateCode === filterValue));
                advanceFilterForm.setFieldsValue({ districtCode: undefined });
                advanceFilterForm.setFieldsValue({ tehsilCode: undefined });
            }

            // if (name === 'districtCode') {
            //     setFilteredCityData(cityData?.filter((i) => i?.districtCode === filterValue));
            //     setFilteredTehsilData(tehsilData?.filter((i) => i?.districtCode === filterValue));
            //     advanceFilterForm.setFieldsValue({ cityCode: undefined });
            //     advanceFilterForm.setFieldsValue({ tehsilCode: undefined });
            // }
        };
    // console.log(setFilteredDistrictData,'setFilteredDistrictData')

    const onFinish = (values) => {
        let data = { ...values };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });

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
        tableData: searchData,

        isDataCountryLoaded,
        isCountryLoading,
        countryData,
        defaultCountry,

        districtData,
        stateData,
        data,

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
        setFilterString();
        resetData();
        advanceFilterForm.resetFields();
        setShowDataLoading(false);
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
        filterString,
        setFilterString,
        advanceFilterForm,
        resetData,
        handleResetFilter,
        isAdvanceSearchVisible,
        setAdvanceSearchVisible,
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, advanceFilter: true, keyword: value });
            listFilterForm.setFieldsValue({ code: undefined });
        }
    };

    const removeFilter = (key) => {
        if (key === 'countryCode') {
            setFilterString(undefined);
        } else if (key === 'stateCode') {
            const { stateCode, districtCode, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'districtCode') {
            const { districtCode, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            advanceFilterForm.setFieldsValue({ keyword: undefined, code: undefined });

            if (!rest?.stateCode && !rest?.districtCode && !rest?.keyword) {
                setFilterString();
            } else {
                setFilterString({ ...rest });
            }
        }
    };

    const title = 'Tehsil';
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
        title,
    };
    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <AddEditForm {...formProps} />
        </>
    );
};

export const ListTehsilMaster = connect(mapStateToProps, mapDispatchToProps)(ListTehsilBase);
