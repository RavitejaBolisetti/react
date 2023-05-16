import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Empty, ConfigProvider, Select } from 'antd';
import { bindActionCreators } from 'redux';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { geoCountryDataActions } from 'store/actions/data/geo/country';
import { tableColumn } from './tableColumn';

import { ListDataTable } from 'utils/ListDataTable';
import { filterFunction } from 'utils/filterFunction';
import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { geoStateDataActions } from 'store/actions/data/geo/state';
import { geoCityDataActions } from 'store/actions/data/geo/city';
import { AdvancedSearch } from './AdvancedSearch';
import { FilterIcon } from 'Icons';

import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
import { RxCross2 } from 'react-icons/rx';

import styles from 'components/common/Common.module.css';
import { geoDistrictDataActions } from 'store/actions/data/geo/district';

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
                City: { isLoaded: isDataLoaded = false, isLoading, data = [] },
            },
        },
    } = state;

    const moduleTitle = 'City Master List';
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
        isStateLoading,
        stateData,
        isDistrictDataLoaded,
        isDistrictLoading,
        districtData,
        isDataLoaded,
        isLoading,
        data,
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
            fetchList: geoCityDataActions.fetchList,
            saveData: geoCityDataActions.saveData,
            listShowLoading: geoCityDataActions.listShowLoading,
            resetData: geoCityDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});
export const ListCityMasterBase = (props) => {
    const { data, saveData, fetchList, userId, resetData, isLoading, isDataLoaded, listShowLoading, showGlobalNotification, moduleTitle } = props;
    const { isDataCountryLoaded, isCountryLoading, countryData, defaultCountry, fetchCountryList, listCountryShowLoading } = props;

    const { isStateDataLoaded, stateData, listStateShowLoading, fetchStateList } = props;
    const { isDistrictDataLoaded, districtData, listDistrictShowLoading, fetchDistrictList } = props;
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

    const [form] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [filteredStateData, setFilteredStateData] = useState([]);
    const [filteredDistrictData, setFilteredDistrictData] = useState([]);

    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [page, setPage] = useState(1);

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
        if (userId && refershData) {
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
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
        if (isDataLoaded && data && userId) {
            if (filterString) {
                console.log('filterString', filterString);
                const keyword = filterString?.code ? filterString?.code : filterString?.keyword;
                const state = filterString?.stateCode;
                const district = filterString?.districtCode;
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
    const extraParams = [
        {
            key: 'countryCode',
            title: 'Country',
            value: filterString?.countryCode,
            canRemove: false,
            name: countryData?.find((i) => i?.countryCode === filterString?.countryCode)?.countryName,
        },
        {
            key: 'stateCode',
            title: 'State',
            value: filterString?.stateCode,
            canRemove: true,

            name: filteredStateData?.find((i) => i?.code === filterString?.stateCode)?.name,
        },
        {
            key: 'districtCode',
            title: 'District',
            canRemove: true,

            value: filterString?.districtCode,
            name: filteredDistrictData?.find((i) => i?.code === filterString?.districtCode)?.name,
        },

        {
            key: 'keyword',
            title: 'keyword',
            canRemove: true,
            value: filterString?.keyword,
            name: filterString?.keyword,
        },
    ];

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
    const removeFilter = (key) => {
        const { [key]: names, ...rest } = filterString;
        setFilterString({ ...rest });
    };

    const onSearchHandle = (value) => {
        value ? setFilterString({ ...filterString, advanceFilter: true, keyword: value }) : handleResetFilter();
    };

    const onChangeHandle = (e) => {
        setFilterString({ ...filterString, keyword: e.target.value });
    };

    // const handleFilterChange = (name) => (value) => {
    //     if (name === 'state') {
    //         setFilteredDistrictData(districtData?.filter((i) => i?.stateCode === value));
    //         advanceFilterForm.setFieldsValue({ districtCode: undefined });
    //         advanceFilterForm.setFieldsValue({ cityCode: undefined });
    //         advanceFilterForm.setFieldsValue({ tehsilCode: undefined });
    //     }
    //     setFilterString({ ...filterString, [name]: value });
    // };
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
        };

    const onFinish = (values) => {
        let data = { ...values };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });

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
    const handleadd = () => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD });

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
        data,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
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
        filterString,
        setFilterString,
        advanceFilterForm,
        resetData,
        handleResetFilter,
        isAdvanceSearchVisible,
        setAdvanceSearchVisible,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick, page?.current, page?.pageSize),
        tableData: searchData,
        setPage,
    };
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.subheading}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={4} lg={4} xl={4} className={styles.lineHeight33}>
                                        City List
                                    </Col>

                                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                        <Form colon={false} form={advanceFilterForm} className={styles.masterListSearchForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                            <Form.Item label="" initialValue={filterString?.code} name="keyword">
                                                <Search placeholder="Search" maxLength={50} allowClear className={styles.headerSearchField} onSearch={onSearchHandle} />
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                        <Button icon={<FilterIcon />} type="link" className={styles.filterBtn} onClick={() => setAdvanceSearchVisible(true)} danger>
                                            Advanced Filters
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>

                            {data?.length ? (
                                <Col className={styles.addGroup} xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />

                                    <Button icon={<PlusOutlined />} className={`${styles.actionbtn} ${styles.lastheaderbutton}`} type="primary" danger onClick={handleadd}>
                                        Add City
                                    </Button>
                                </Col>
                            ) : (
                                ''
                            )}
                        </Row>
                        {filterString?.advanceFilter && (
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.advanceFilterTop}>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                                            <div className={styles.advanceFilterTitle}>Applied Advance Filters : </div>
                                        </Col>
                                        <Col xs={24} sm={22} md={22} lg={18} xl={18} className={styles.advanceFilterContainer}>
                                            {extraParams?.map((filter) => {
                                                return (
                                                    filter?.value && (
                                                        <div className={styles.advanceFilterItem}>
                                                            {filter?.name}
                                                            {filter?.canRemove ? (
                                                                <span>
                                                                    <RxCross2 onClick={() => removeFilter(filter?.key)} />
                                                                </span>
                                                            ) : (
                                                                ''
                                                            )}
                                                        </div>
                                                    )
                                                );
                                            })}
                                        </Col>
                                        <Col xs={24} sm={2} md={2} lg={2} xl={2} className={styles.advanceFilterClear}>
                                            <Button className={styles.clearBtn} onClick={handleResetFilter} danger>
                                                Clear
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        )}
                    </div>
                </Col>
            </Row>

            <div className={styles.tableProduct}>
                <ListDataTable scroll={2400} isLoading={false} {...tableProps} />
            </div>

            <AdvancedSearch {...advanceFilterProps} />

            <AddEditForm {...formProps} />
        </>
    );
};

export const ListCityMaster = connect(mapStateToProps, mapDispatchToProps)(ListCityMasterBase);
