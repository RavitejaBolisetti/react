import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Space, Empty, ConfigProvider, Select } from 'antd';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { tableColumn } from './tableColumn';

import { DataTable } from 'utils/dataTable';
import { filterFunction } from 'utils/filterFunction';
import { showGlobalNotification } from 'store/actions/notification';
import { geoStateDataActions } from 'store/actions/data/geo/state';
import { geoDistrictDataActions } from 'store/actions/data/geo/district';
import { geoCountryDataActions } from 'store/actions/data/geo/country';

import { AddEditForm } from './AddEditForm';
import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
import { FiEdit2 } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';
import { bindActionCreators } from 'redux';
import styles from 'components/common/Common.module.css';

const { Search } = Input;
const { Option } = Select;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Geo: {
                Country: { isLoaded: isDataCountryLoaded = false, isLoading: isCountryLoading = false, data: countryData },
                State: { isLoaded: isStateDataLoaded = false, isLoading: isStateLoading, data: stateData },
                District: { isLoaded: isDataLoaded = false, isLoading, data },
            },
        },
    } = state;

    const moduleTitle = 'District Details';
    const finalCountryData = countryData?.map((item, index) => {
        return { ...item, default: index <= 0 || false };
    });
    const defaultCountry = finalCountryData && finalCountryData?.find((i) => i.default)?.countryCode;

    let returnValue = {
        userId,
        isDataLoaded,
        data,
        isLoading,
        moduleTitle,
        isCountryLoading,
        countryData: finalCountryData,
        isDataCountryLoaded,
        defaultCountry,
        isStateDataLoaded,
        isStateLoading,
        stateData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchStateList: geoStateDataActions.fetchList,
            listStateShowLoading: geoStateDataActions.listShowLoading,
            countryShowLoading: geoCountryDataActions.listShowLoading,
            fetchCountryList: geoCountryDataActions.fetchList,
            showGlobalNotification,
            saveData: geoDistrictDataActions.saveData,
            fetchList: geoDistrictDataActions.fetchList,
            listShowLoading: geoDistrictDataActions.listShowLoading,
        },
        dispatch
    ),
});

export const ListDistrictBase = (props) => {
    const { fetchStateList, listStateShowLoading, data, moduleTitle, isLoading, saveData, fetchList, userId, typeData, configData, isDataLoaded, listShowLoading, showGlobalNotification, stateData, isDataCountryLoaded, countryShowLoading, countryData, fetchCountryList, defaultCountry } = props;
    const [form] = Form.useForm();
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);

    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);

    const [showSaveBtn, setShowSaveBtn] = useState(true);
    const [showSaveAndAddNewBtn, setShowSaveAndAddNewBtn] = useState(false);
    const [saveAndAddNewBtnClicked, setSaveAndAddNewBtnClicked] = useState(false);

    const [footerEdit, setFooterEdit] = useState(false);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormBtnActive, setFormBtnActive] = useState(false);

    const [stateCode, isStateCode] = useState();

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    useEffect(() => {
        if (userId) {
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
            fetchStateList({ setIsLoading: listStateShowLoading, userId, onSuccessAction });
            if (!isDataCountryLoaded) {
                fetchCountryList({ setIsLoading: countryShowLoading, userId, onSuccessAction });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataCountryLoaded, refershData]);

    useEffect(() => {
        setFilterString({ countryCode: defaultCountry });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultCountry]);

    useEffect(() => {
        if (isDataLoaded && data && userId) {
            if (filterString) {
                const keyword = filterString?.keyword;
                const state = filterString?.state;
                const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.code) || filterFunction(keyword)(item?.name) : true) && (state ? filterFunction(state)(item?.stateCode) : true));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
            } else {
                setSearchdata(data?.map((el, i) => ({ ...el, srl: i + 1 })));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, data, userId]);

    const handleFormAction = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);
        setFormActionType(buttonAction);
        record && setFormData(record);
        setIsFormVisible(true);
    };

   

    const handleReferesh = () => {
        setRefershData(!refershData);
    };

   

    const onSearchHandle = (value) => {
        setFilterString({ ...filterString, keyword: value });
    };

    const handleSelectState = (value) => {
        isStateCode(value);
    };

    const onChangeHandle = (e) => {
        setFilterString({ ...filterString, keyword: e.target.value });
    };

    const handleStateChange = (value) => {
        setFilterString({ ...filterString, state: value });
    };

    const onFinish = (values) => {
        const recordId = formData?.code || '';
        let data = { ...values };
        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
            fetchStateList({ setIsLoading: listStateShowLoading, userId, onSuccessAction });

            if (showSaveAndAddNewBtn === true || recordId) {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            } else {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            setIsLoading: listShowLoading,
            method: formActionType === FROM_ACTION_TYPE?.EDIT ? 'put' : 'post',
            userId,
            onError,
            onSuccess,
        };
        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const tableProps = {
        tableColumn: tableColumn(handleFormAction),
        tableData: searchData,
        // tableData: filterData.length === 0 ? data : filterData,
    };

    const formProps = {
        formActionType,
        setFormActionType,
        setIsViewModeVisible,
        isViewModeVisible,
        isReadOnly,
        formData,
        footerEdit,
        setFooterEdit,
        typeData,
        isVisible: isFormVisible,
        onCloseAction: () => {
            setIsFormVisible(false);
            setFormBtnActive(false);
        },
        titleOverride: (isViewModeVisible ? 'View ' : formData?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
        onFinish,
        onFinishFailed,
        isFormBtnActive,
        setFormBtnActive,
        configData,
        setSaveAndAddNewBtnClicked,
        showSaveBtn,
        saveAndAddNewBtnClicked,
        stateCode,
        handleSelectState,
        stateData,
        defaultCountry,
        isDataCountryLoaded,
        countryData,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        handleFormAction,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.subheading}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={4} lg={4} xl={4} className={styles.lineHeight33}>
                                        District List
                                    </Col>
                                    <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                                        <Select disabled={!!defaultCountry} defaultValue={defaultCountry} className={styles.headerSelectField} showSearch loading={!isDataCountryLoaded} placeholder="Select" allowClear>
                                            {countryData?.map((item) => (
                                                <Option value={item?.countryCode}>{item?.countryName}</Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                                        <Select placeholder="State" onChange={handleStateChange} allowClear className={styles.headerSelectField}>
                                            {stateData?.map((item) => (
                                                <Option value={item?.code}>{item?.name}</Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                                        <Search placeholder="Search" allowClear className={styles.headerSearchField} onSearch={onSearchHandle} onChange={onChangeHandle} />{' '}
                                    </Col>
                                </Row>
                            </Col>
                            {data?.length ? (
                                <Col className={styles.addGroup} xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />

                                    <Button icon={<PlusOutlined />} className={`${styles.actionbtn} ${styles.lastheaderbutton}`} type="primary" danger onClick={() => handleFormAction({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                        Add District
                                    </Button>
                                </Col>
                            ) : (
                                ''
                            )}
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ConfigProvider
                        renderEmpty={() => (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    !data?.length ? (
                                        <span>
                                            No records found. Please add <span style={{ color: 'rgba(0,0,0,0.7)' }}>"New District Details"</span>
                                            <br />
                                            using below button
                                        </span>
                                    ) : (
                                        <span> No records found.</span>
                                    )
                                }
                            >
                                {!data?.length ? (
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={() => handleFormAction({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                                Add Group
                                            </Button>
                                        </Col>
                                    </Row>
                                ) : (
                                    ''
                                )}
                            </Empty>
                        )}
                    >
                        <div className={styles.tableProduct}>
                            <DataTable isLoading={isLoading} {...tableProps} />
                        </div>
                    </ConfigProvider>
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const ListDistrictMaster = connect(mapStateToProps, mapDispatchToProps)(ListDistrictBase);

