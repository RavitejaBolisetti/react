import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Empty, ConfigProvider, Select, Card } from 'antd';
import { bindActionCreators } from 'redux';
import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { DataTable } from 'utils/dataTable';
import { filterFunction } from 'utils/filterFunction';
import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { AdvancedSearch } from './AdvancedSearch';

import { TfiReload } from 'react-icons/tfi';
import { BsFilterSquare } from 'react-icons/bs';

import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { geoCountryDataActions } from 'store/actions/data/geo/country';
import { geoStateDataActions } from 'store/actions/data/geo/state';
import { geoDistrictDataActions } from 'store/actions/data/geo/district';
import { geoTehsilDataActions } from 'store/actions/data/geo/tehsil';
import { geoCityDataActions } from 'store/actions/data/geo/city';
import { geoPincodeDataActions } from 'store/actions/data/geo/pincode';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

const { Search } = Input;
const { Option } = Select;

const mapStateToProps = (state) => {
    // console.log('state', state);
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
            showGlobalNotification,
        },
        dispatch
    ),
});
const ListPinCodeMasterBase = (props) => {
    const { data, saveData, fetchList, userId, isDataLoaded, listShowLoading, showGlobalNotification, moduleTitle } = props;
    const { isDataCountryLoaded, isCountryLoading, countryData, defaultCountry, fetchCountryList, listCountryShowLoading } = props;
    console.log('🚀 ~ file: ListPinCodeMaster.js:104 ~ ListPinCodeMasterBase ~ countryData:', countryData);
    const { isStateDataLoaded, isStateLoading, stateData, listStateShowLoading, fetchStateList } = props;
    const { isDistrictDataLoaded, isDistrictLoading, districtData, listDistrictShowLoading, fetchDistrictList } = props;
    const { isTehsilDataLoaded, isTehsilLoading, tehsilData, listTehsilShowLoading, fetchTehsilList } = props;
    const { isCityDataLoaded, isCityLoading, cityData, listCityShowLoading, fetchCityList } = props;
    const { isConfigDataLoaded, isConfigLoading, typeData, listConfigShowLoading, fetchConfigList } = props;

    const [form] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [filteredStateData, setFilteredStateData] = useState([]);
    const [filteredDistrictData, setFilteredDistrictData] = useState([]);
    const [filteredCityData, setFilteredCityData] = useState([]);
    const [filteredTehsilData, setFilteredTehsilData] = useState([]);

    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [page, setPage] = useState(1);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

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
            if (!isCityDataLoaded) {
                fetchCityList({ setIsLoading: listCityShowLoading, userId });
            }
            if (!isTehsilDataLoaded) {
                fetchTehsilList({ setIsLoading: listTehsilShowLoading, userId });
            }

            if (!isDataLoaded) {
                // fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
            }

            fetchConfigList({ setIsLoading: listShowLoading, userId, parameterType: 'PIN_CATG' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataCountryLoaded, isStateDataLoaded, isDistrictDataLoaded, isCityDataLoaded, isTehsilDataLoaded, isDataLoaded]);

    useEffect(() => {
        if (userId && refershData) {
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
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
        if (isDataLoaded && data && userId) {
            if (filterString) {
                const keyword = filterString?.keyword;
                const state = filterString?.state;
                const district = filterString?.district;
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

    const onSearchHandle = (value) => {
        fetchList({ setIsLoading: listShowLoading, userId, mytype: '?code='.concat(value) });
    };

    const onChangeHandle = (e) => {
        setFilterString({ ...filterString, pincode: e.target.value });
    };

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            const filterValue = type === 'text' ? value.target.value : value;

            if (name === 'country') {
                setFilteredStateData(stateData?.filter((i) => i?.countryCode === filterValue));
            }

            if (name === 'state') {
                setFilteredDistrictData(districtData?.filter((i) => i?.stateCode === filterValue));
            }

            if (name === 'district') {
                setFilteredCityData(cityData?.filter((i) => i?.districtCode === filterValue));
                setFilteredTehsilData(tehsilData?.filter((i) => i?.districtCode === filterValue));
            }

            setFilterString({ ...filterString, [name]: filterValue });
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
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        onCloseAction: onAdvanceSearchCloseAction,
        titleOverride: (
            <>
                <BsFilterSquare size={18} color={'#ff3e5b'} />
                {' Advance Filter'}
            </>
        ),
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
        filterString,
    };
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.subheading}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={4} lg={4} xl={4} className={styles.lineHeight33}>
                                        PIN Code
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                        <Search placeholder="Search" allowClear className={styles.headerSearchField} onSearch={onSearchHandle} onChange={onChangeHandle} />
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                        <Button type="link" className={styles.refreshBtn} onClick={() => setAdvanceSearchVisible(true)} danger>
                                            Advanced Filters
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>

                            <Col className={styles.addGroup} xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />
                                <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                    Add PIN Code
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ConfigProvider
                        renderEmpty={() =>
                            isDataLoaded && (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={
                                        !searchData?.length ? (
                                            <span>
                                                No records found. Please add new parameter <br />
                                                using below button
                                            </span>
                                        ) : (
                                            <span> No records found.</span>
                                        )
                                    }
                                >
                                    {!searchData?.length ? (
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                                    Add PIN Code
                                                </Button>
                                            </Col>
                                        </Row>
                                    ) : (
                                        ''
                                    )}
                                </Empty>
                            )
                        }
                    >
                        <div className={styles.tableProduct}>
                            <DataTable isLoading={false} {...tableProps} />
                        </div>
                    </ConfigProvider>
                </Col>
            </Row>

            <AddEditForm {...formProps} />
        </>
    );
};

export const ListPinCodeMaster = connect(mapStateToProps, mapDispatchToProps)(ListPinCodeMasterBase);
