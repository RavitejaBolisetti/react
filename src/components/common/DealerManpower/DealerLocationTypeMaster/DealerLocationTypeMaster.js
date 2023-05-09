import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Space, Empty, ConfigProvider, Select } from 'antd';
import { bindActionCreators } from 'redux';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { DataTable } from 'utils/dataTable';
import { filterFunction } from 'utils/filterFunction';
import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
// import { geoStateDataActions } from 'store/actions/data/geo/state';
// import { geoCityDataActions } from 'store/actions/data/geo/city';
import { dealerLocationDataActions } from 'store/actions/data/dealerManpower/dealerLocationTypeMaster';

import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
import { FiEdit2 } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';

import styles from 'components/common/Common.module.css';
// import { geoDistrictDataActions } from 'store/actions/data/geo/district';

const { Search } = Input;
const { Option } = Select;

const mapStateToProps = (state) => {
    console.log('state', state);
    const {
        auth: { userId },
        data: {
            DealerLocationType: {
                isLoaded: isDataLoaded = false,
                data: dealerLocationData = [],
                isLoading,
                isLoadingOnSave,
                isFormDataLoaded,
                // State: { isLoaded: isDataLoaded = false, isLoading, data: stateData },
                // City: { isLoaded: isCityDataLoaded = false, isCityLoading, data: cityData },
                // District: { isLoaded: isDistrictDataLoaded = false, data: districtData },
            },
        },
    } = state;

    const moduleTitle = 'Delaer Location Type List';
    let returnValue = {
        userId,
        isDataLoaded,
        isLoading,
        dealerLocationData,
        isLoadingOnSave,
        isFormDataLoaded,
        moduleTitle,
        // isDataLoaded,
        // cityData,
        // stateData,
        // isCityDataLoaded,
        // districtData,
        // isDistrictDataLoaded,
        // isCityLoading,
        // isLoading,
        // moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: dealerLocationDataActions.fetchList,
            listShowLoading: dealerLocationDataActions.listShowLoading,
            // listCityShowLoading: dealerLocationDataActions.listShowLoading,
            saveData: dealerLocationDataActions.saveData,
            // fetchCityList: dealerLocationDataActions.fetchList,
            // fetchDistrictList: dealerLocationDataActions.fetchList,
            // listDistrictShowLoading: dealerLocationDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});
const DealerLocationTypeBase = ({ moduleTitle, listCityShowLoading, isLoadingOnSave, listDistrictShowLoading, districtData, dealerLocationData, fetchDistrictList, stateData, cityData, data, fetchCityList, isLoading, saveData, fetchList, userId, typeData, configData, isDataLoaded, listShowLoading, isDataAttributeLoaded, showGlobalNotification, attributeData }) => {
    const [form] = Form.useForm();
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);

    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [show, setShow] = useState([]);
    const [city, setCity] = useState(cityData);
    const [showSaveBtn, setShowSaveBtn] = useState(true);
    const [showSaveAndAddNewBtn, setShowSaveAndAddNewBtn] = useState(false);
    const [saveAndAddNewBtnClicked, setSaveAndAddNewBtnClicked] = useState(false);
    const [filteredDistrictData, setFilteredDistrictData] = useState([]);
    const [successAlert, setSuccessAlert] = useState(false);
    const [saveclick, setsaveclick] = useState();

    const [footerEdit, setFooterEdit] = useState(false);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormBtnActive, setFormBtnActive] = useState(false);

    useEffect(() => {
        if (userId) {
            const onSuccessAction = (res) => {
                refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            };

            // fetchCityList({ setIsLoading: listCityShowLoading, onSuccessAction, userId });
            fetchList({ setIsLoading: listShowLoading, onSuccessAction, userId });
            // fetchDistrictList({ setIsLoading: listDistrictShowLoading, onSuccessAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    // useEffect(() => {
    //     if (isDataLoaded && cityData && userId) {
    //         if (filterString) {
    //             const keyword = filterString?.keyword;
    //             const state = filterString?.state;
    //             const district = filterString?.district;
    //             const filterDataItem = cityData?.filter((item) => (keyword ? filterFunction(keyword)(item?.code) || filterFunction(keyword)(item?.name) : true) && (state ? filterFunction(state)(item?.stateCode) : true) && (district ? filterFunction(district)(item?.districtCode) : true));
    //             setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
    //         } else {
    //             setSearchdata(cityData?.map((el, i) => ({ ...el, srl: i + 1 })));
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [filterString, isDataLoaded, cityData, userId]);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    useEffect(() => {
        if (isDataLoaded && dealerLocationData) {
            if (filterString) {
                const filterDataItem = dealerLocationData?.filter((item) => filterFunction(filterString)(item?.locationCode) || filterFunction(filterString)(item?.locationDescription));
                setSearchdata(filterDataItem);
            } else {
                setSearchdata(dealerLocationData);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, dealerLocationData]);

    const handleEditBtn = (record) => {
        form.setFieldsValue(record);
        setFormData(record);
        setShowSaveAndAddNewBtn(false);
        setsaveclick(false);
        setIsViewModeVisible(false);
        setFormActionType(FROM_ACTION_TYPE?.EDIT);
        setFooterEdit(false);
        setIsReadOnly(false);
        const data = searchData.find((i) => i.code === record.code);
        if (data) {
            data && setFormData(data);
            setIsFormVisible(true);
        }
    };

    const handleView = (record) => {
        setFormActionType(FROM_ACTION_TYPE?.VIEW);
        setIsViewModeVisible(true);
        setsaveclick(false);

        setShowSaveAndAddNewBtn(false);
        setFooterEdit(true);
        const data = searchData.find((i) => i.code === record.code);
        if (data) {
            data && setFormData(data);
            setIsFormVisible(true);
        }

        setIsReadOnly(true);
    };

    // const onChange2 = (e) => {
    //     setCity(cityData.filter((i) => i.districtCode === e));
    //     setShow([]);
    // };

    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl.',
            // dataIndex: 'srl',
            render: (_t, _r, i) => i + 1,
            sorter: false,
            width: '5%',
        }),

        tblPrepareColumns({
            title: 'Location Type Code',
            dataIndex: 'locationCode',

            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Location Type Description',
            dataIndex: 'locationDescription',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (_, record) => (record?.status ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>),
            width: '10%',
        }),

        {
            title: 'Action',
            dataIndex: '',
            width: '10%',
            render: (record) => [
                <Space wrap>
                    {
                        <Button data-testid="edit" className={styles.tableIcons} aria-label="fa-edit" onClick={() => handleEditBtn(record, 'edit')}>
                            <FiEdit2 />
                        </Button>
                    }
                    {
                        <Button className={styles.tableIcons} aria-label="ai-view" onClick={() => handleView(record)}>
                            <FaRegEye />
                        </Button>
                    }
                </Space>,
            ],
        }
    );

    const handleReferesh = () => {
        setRefershData(!refershData);
    };

    const hanndleEditData = (record) => {
        form.resetFields();
        setFormData([]);
        setShowSaveAndAddNewBtn(false);
        setIsViewModeVisible(false);
        setFormActionType(FROM_ACTION_TYPE?.EDIT);
        setFooterEdit(false);
        setIsReadOnly(false);
        setShowSaveBtn(true);
    };

    const handleAdd = () => {
        form.resetFields();
        setFormData([]);
        setFormActionType(FROM_ACTION_TYPE?.ADD);
        setShowSaveAndAddNewBtn(true);
        setIsViewModeVisible(false);
        setFooterEdit(false);
        setIsFormVisible(true);
        setIsReadOnly(false);
    };

    const onSearchHandle = (value) => {
        setFilterString({ ...filterString, keyword: value });
    };

    const onChangeHandle = (e) => {
        setFilterString({ ...filterString, keyword: e.target.value });
    };

    // const handleFilterChange = (name) => (value) => {
    //     if (name === 'state') {
    //         setFilteredDistrictData(districtData?.filter((i) => i?.stateCode === value));
    //     }
    //     setFilterString({ ...filterString, [name]: value });
    // };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        let data = { ...values, id: recordId };
        const onSuccess = (res) => {
            form.resetFields();
            // showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            // fetchList({ setIsLoading: listShowLoading, userId });

            // if (showSaveAndAddNewBtn === true || recordId) {
            //     setIsFormVisible(false);
            //     showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            // } else {
            //     setIsFormVisible(true);
            //     showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            // }
            // onSaveShowLoading(false);
            setFormData({});
            setSuccessAlert(true);
            if (saveclick === true) {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            } else {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            }
        };

        setTimeout(() => {
            fetchList({ setIsLoading: listShowLoading, userId });
        }, 2000);

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: formActionType === FROM_ACTION_TYPE?.EDIT ? 'put' : 'post',
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

    // const onChange = (e) => {
    //     setShow(districtData.filter((i) => i.stateCode === e));
    // };

    const onChange = (sorter, filters) => {
        form.resetFields();
    };

    const tableProps = {
        tableColumn: tableColumn,
        tableData: searchData,
        isLoading: isLoading,
    };

    const formProps = {
        saveclick,
        setsaveclick,
        isLoadingOnSave,
        form,
        formActionType,
        stateData,
        show,
        setShow,
        setFormActionType,
        setIsViewModeVisible,
        isViewModeVisible,
        isReadOnly,
        formData,
        footerEdit,
        districtData,
        setFooterEdit,
        handleAdd,
        typeData,
        cityData,
        isVisible: isFormVisible,
        onCloseAction: () => (form.resetFields(), setIsFormVisible(false), setFormBtnActive(false)),
        titleOverride: (isViewModeVisible ? 'View ' : formData?.code ? 'Edit ' : 'Add ').concat('Location Type Master'),
        onFinish,
        onFinishFailed,
        isFormBtnActive,
        setFormBtnActive,
        tableData: dealerLocationData,
        hanndleEditData,
        setSaveAndAddNewBtnClicked,
        showSaveBtn,
        saveAndAddNewBtnClicked,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={6} lg={6} xl={6} className={styles.lineHeight33}>
                                        Dealer Location Type
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Search placeholder="Search" allowClear className={styles.headerSearchField} onSearch={onSearchHandle} onChange={onChangeHandle} />
                                    </Col>
                                </Row>
                            </Col>

                            {dealerLocationData?.length ? (
                                <Col className={styles.addGroup} xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />

                                    <Button icon={<PlusOutlined />} className={`${styles.actionbtn} ${styles.lastheaderbutton}`} type="primary" danger onClick={handleAdd}>
                                        Add Dealer Location
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
                                    !dealerLocationData?.length ? (
                                        <span>
                                            No records found. Please add new parameter <br />
                                            using below button
                                        </span>
                                    ) : (
                                        <span> No records found.</span>
                                    )
                                }
                            >
                                {!dealerLocationData?.length ? (
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
                                                Add Dealer Location
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
                            <DataTable isLoading={isLoading} {...tableProps} onChange={onChange} tableData={searchData} tableColumn={tableColumn} />
                        </div>
                    </ConfigProvider>
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const DealerLocationType = connect(mapStateToProps, mapDispatchToProps)(DealerLocationTypeBase);
