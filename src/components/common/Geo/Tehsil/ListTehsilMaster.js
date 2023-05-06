import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Space, Empty, ConfigProvider, Select } from 'antd';

import { tblPrepareColumns } from 'utils/tableCloumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { DataTable } from 'utils/dataTable';
import { filterFunction } from 'utils/filterFunction';

import { geoStateDataActions } from 'store/actions/data/geo/state';
import { geoDistrictDataActions } from 'store/actions/data/geo/district';
import { geoTehsilDataActions } from 'store/actions/data/geo/tehsil';

import { showGlobalNotification } from 'store/actions/notification';
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
                State: { isLoaded: isStateDataLoaded = false, isLoading: isStateLoading, data: stateData },
                District: { isLoaded: isDistrictDataLoaded = false, isLoading: isDistrictLoading, data: districtData },
                Tehsil: { isLoaded: isDataLoaded = false, isLoading, data },
            },
        },
    } = state;

    const moduleTitle = 'Tehsil Details';

    let returnValue = {
        userId,
        isDataLoaded,
        data,
        isLoading,
        moduleTitle,

        isStateDataLoaded,
        isStateLoading,
        stateData,

        isDistrictDataLoaded,
        isDistrictLoading,
        districtData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            showGlobalNotification,
            fetchStateList: geoStateDataActions.fetchList,
            listStateShowLoading: geoStateDataActions.listShowLoading,

            fetchDistrictList: geoDistrictDataActions.fetchList,
            listDistrictShowLoading: geoDistrictDataActions.listShowLoading,

            saveData: geoTehsilDataActions.saveData,
            fetchList: geoTehsilDataActions.fetchList,
            listShowLoading: geoTehsilDataActions.listShowLoading,
        },
        dispatch
    ),
});

export const ListTehsilBase = ({ data, moduleTitle, fetchDataList, isLoading, saveData, fetchList, userId, typeData, configData, isDataLoaded, listShowLoading, showGlobalNotification, fetchStateList, fetchDistrictList, listStateShowLoading, listDistrictShowLoading, stateData, districtData }) => {
    const [form] = Form.useForm();
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);

    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [filteredDistrictData, setFilteredDistrictData] = useState([]);

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

    const [stateFilter, setStateFilter] = useState('');
    const [districtFilter, setDistrictFilter] = useState('');

    useEffect(() => {
        if (userId) {
            const onSuccessAction = (res) => {
                refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            };

            fetchList({ setIsLoading: listShowLoading, onSuccessAction, userId });
            fetchStateList({ setIsLoading: listStateShowLoading, userId, onSuccessAction });
            fetchDistrictList({ setIsLoading: listDistrictShowLoading, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    useEffect(() => {
        if (isDataLoaded && data && userId) {
            if (filterString) {
                const keyword = filterString?.keyword;
                const state = filterString?.state;
                const district = filterString?.district;
                const tehsil = filterString?.tehsil;
                const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.code) || filterFunction(keyword)(item?.name) : true) && (state ? filterFunction(state)(item?.stateCode) : true) && (district ? filterFunction(district)(item?.districtCode) : true) && (tehsil ? filterFunction(tehsil)(item?.tehsilCode) : true));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
            } else {
                setSearchdata(data?.map((el, i) => ({ ...el, srl: i + 1 })));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, data, userId]);

    const handleEditBtn = (record) => {
        setShowSaveAndAddNewBtn(false);
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

        setShowSaveAndAddNewBtn(false);
        setFooterEdit(true);

        const data = searchData.find((i) => i.code === record.code);
        if (data) {
            data && setFormData(data);
            //setParameterType((data?.configurableParameterType).toString() || defaultParametarType);
            setIsFormVisible(true);
        }

        setIsReadOnly(true);
    };

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'srl',
            sorter: false,
            width: '5%',
        }),

        tblPrepareColumns({
            title: 'Tehsil Code',
            dataIndex: 'code',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Tehsil Name',
            dataIndex: 'name',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'District Name',
            dataIndex: 'districtName',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'State Name',
            dataIndex: 'stateName',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'activeIndicator',
            render: (_, record) => (record?.status ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>),
            width: '10%',
        }),

        {
            title: 'Action',
            dataIndex: '',
            width: '10%',
            render: (record) => [
                <Space wrap>
                    <Button data-testid="edit" className={styles.tableIcons} aria-label="fa-edit" onClick={() => handleEditBtn(record, 'edit')}>
                        <FiEdit2 />
                    </Button>
                    <Button className={styles.tableIcons} aria-label="ai-view" onClick={() => handleView(record)}>
                        <FaRegEye />
                    </Button>
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

    const handleFilterChange = (name) => (value) => {
        if (name === 'state') {
            setFilteredDistrictData(districtData?.filter((i) => i?.stateCode === value));
        }
        setFilterString({ ...filterString, [name]: value });
    };

    const onFinish = (values) => {
        const recordId = formData?.code || '';
        let data = { ...values };
        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchDataList({ setIsLoading: listShowLoading, userId });

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

    const tableProps = {
        tableColumn: tableColumn,
        tableData: searchData,
    };

    const formProps = {
        form,
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
            form.resetFields();
            setIsFormVisible(false);
            setFormBtnActive(false);
        },
        titleOverride: (isViewModeVisible ? 'View ' : formData?.code ? 'Edit ' : 'Add ').concat(moduleTitle),
        onFinish,
        onFinishFailed,
        isFormBtnActive,
        setFormBtnActive,
        configData,
        hanndleEditData,
        setSaveAndAddNewBtnClicked,
        showSaveBtn,
        saveAndAddNewBtnClicked,
        stateData,
        districtData,
        stateFilter,
        setStateFilter,
        districtFilter,
        setDistrictFilter,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={3} lg={3} xl={3} className={styles.lineHeight33}>
                                        Tehsil List
                                    </Col>
                                    <Col xs={24} sm={12} md={7} lg={7} xl={7}>
                                        <Select placeholder="State" allowClear className={styles.headerSelectField} onChange={handleFilterChange('state')}>
                                            {stateData?.map((item) => (
                                                <Option value={item?.code}>{item?.name}</Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col xs={24} sm={12} md={7} lg={7} xl={7}>
                                        <Select placeholder="District" allowClear className={styles?.headerSelectField} onChange={handleFilterChange('district')}>
                                            {filteredDistrictData?.map((item) => (
                                                <Option value={item?.code}>{item?.name}</Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col xs={24} sm={12} md={7} lg={7} xl={7}>
                                        <Search placeholder="Search" allowClear className={styles.headerSearchField} onSearch={onSearchHandle} onChange={onChangeHandle} />
                                    </Col>
                                </Row>
                            </Col>

                            {data?.length ? (
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.addGroup}>
                                    <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />

                                    <Button icon={<PlusOutlined />} className={`${styles.actionbtn} ${styles.lastheaderbutton}`} type="primary" danger onClick={handleAdd}>
                                        Add Tehsil
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
                                            No records found. Please add <span style={{ color: 'rgba(0,0,0,0.7)' }}>"New Tehsil Details"</span>
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
                                            <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
                                                Add Tehsil
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

const ListTehsilMaster = connect(mapStateToProps, mapDispatchToProps)(ListTehsilBase);

export default ListTehsilMaster;
