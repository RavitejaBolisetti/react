import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Space, Empty, ConfigProvider, Select } from 'antd';
// import { bindActionCreators } from 'redux';
// import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { STATE_DROPDOWN } from './InputType';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { DataTable } from 'utils/dataTable';
import { filterFunction } from 'utils/filterFunction';

import { geoStateDataActions } from 'store/actions/data/geoState';
import { geoDistrictDataActions } from 'store/actions/data/geoDistrict';
import { geoTehsilDataActions } from 'store/actions/data/geoTehsil';

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
            GeoState: { isLoaded: isStateDataLoaded = false, isLoading: isStateLoading, data: stateData },
            GeoDistrict: { isLoaded: isDistrictDataLoaded = false, isLoading: isDistrictLoading, data: districtData },
            GeoTehsil: { isLoaded: isDataLoaded = false, isLoading, data },
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
        // isDistrictLoaded,
        // isDistrictLoading,
        // districtData,
        //configData: configData?.filter((i) => i),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            showGlobalNotification,

            /** For State DropDown **/
            fetchStateList: geoStateDataActions.fetchList,
            listStateShowLoading: geoStateDataActions.listShowLoading,

            /** For District DropDown **/
            fetchDistrictList: geoDistrictDataActions.fetchList,
            listDistrictShowLoading: geoDistrictDataActions.listShowLoading,

            saveData: geoTehsilDataActions.saveData,
            fetchList: geoTehsilDataActions.fetchList,
            listShowLoading: geoTehsilDataActions.listShowLoading,
        },
        dispatch
    ),
});

export const TehsilGeoBase = ({ data, moduleTitle, fetchDataList, isLoading, saveData, fetchList, userId, typeData, configData, isDataLoaded, listShowLoading, showGlobalNotification, fetchStateList, fetchDistrictList, listStateShowLoading, listDistrictShowLoading, stateData, districtData }) => {
    const [form] = Form.useForm();
    const defaultParametarType = STATE_DROPDOWN.KEY;
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);

    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);

    const [showSaveBtn, setShowSaveBtn] = useState(true);
    const [showSaveAndAddNewBtn, setShowSaveAndAddNewBtn] = useState(false);
    const [saveAndAddNewBtnClicked, setSaveAndAddNewBtnClicked] = useState(false);

    const [filterDistrict, setFilterDistrict] = useState([]);

    const [footerEdit, setFooterEdit] = useState(false);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [closePanels, setClosePanels] = React.useState([]);

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
                const filterDataItem = data?.filter((item) => filterFunction(filterString)(item?.code) || filterFunction(filterString)(item?.name));
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
        setFormActionType('update');
        setFooterEdit(false);
        setIsReadOnly(false);
        console.log(searchData, 'searchTehsil');
        const data = searchData.find((i) => i.code === record.code);
        console.log('data', data);
        if (data) {
            data && setFormData(data);
            setIsFormVisible(true);
        }
    };

    const handleView = (record) => {
        setFormActionType('view');
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

    console.log(data, 'QWERTTYYUU');

    // const renderTableColumnName = (record, key, type) => {
    //     return typeData && typeData[type]?.find((item) => item?.key === record?.[key])?.value;
    // };

    // let newArray = obj.Students.filter(function (el)
    // {
    //   return el.Age >=15 &&
    //          el.RollNumber <= 200 &&
    //          el.Marks >= 80 ;
    // }
    // );

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl No.',
            dataIndex: 'id',
            sorter: false,
            width: '5%',
        }),

        tblPrepareColumns({
            title: 'Tehsil Code',
            dataIndex: 'code',
            // render: (text, record, value) => renderTableColumnName(record, 'controlId', PARAM_MASTER.CFG_PARAM.id),
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Tehsil Name',
            dataIndex: 'name',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Tehsil Category',
            dataIndex: 'tehsilCategory',
            //render: (text, record, value) => renderTableColumnName(record, 'configurableParameterType', PARAM_MASTER.CFG_PARAM_TYPE.id),
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'activeIndicator',
            render: (text, record) => <>{text === 1 ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>}</>,
            width: '15%',
        }),

        {
            title: 'Action',
            dataIndex: '',
            width: '8%',
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

    const onChange = (e) => {
        setFilterDistrict(districtData.filter((i) => i.stateCode === e));
    };

    const hanndleEditData = (record) => {
        setShowSaveAndAddNewBtn(false);
        setIsViewModeVisible(false);
        setFormActionType('update');
        setFooterEdit(false);
        setIsReadOnly(false);
        setShowSaveBtn(true);

    };

    const handleAdd = () => {
        setFormActionType('add');
        setShowSaveAndAddNewBtn(true);
        setIsViewModeVisible(false);
        setFooterEdit(false);
        setIsFormVisible(true);
        setIsReadOnly(false);
        setFormData([]);
    };

    const onSearchHandle = (value) => {
        setFilterString(value);
    };

    const handleSelectState = (value) => {
        let newArray = stateData.filter(function (el) {
            return el.code === value.code;
        });
        setStateFilter(newArray);
    };

    const handleSelectDistrict = (value) => {
        let newArray = stateData.filter(function (el) {
            return el.code === value.code;
        });
        setDistrictFilter(newArray);
    };

    const onChangeHandle = (e) => {
        setFilterString(e.target.value);
    };

    const onFinish = (values) => {

        const recordId = formData?.id || '';
        let data = { ...values };
        //id: recordId, isActive: true, fromDate: values?.fromDate?.format('YYYY-MM-DD'), toDate: values?.toDate?.format('YYYY-MM-DD')
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
            method: formActionType === 'update' ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        // console.log(requestData,'pranjal')

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => { });
    };

    const tableProps = {
        tableColumn: tableColumn,
        tableData: data,
        //searchData,
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
        onCloseAction: () => (setIsFormVisible(false), setFormBtnActive(false)),
        titleOverride: (isViewModeVisible ? 'View ' : formData?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
        onFinish,
        onFinishFailed,
        isFormBtnActive,
        setFormBtnActive,
        configData,
        setClosePanels,
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

    console.log(stateFilter, 'valuevalue');

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
                                    <Col xs={24} sm={12} md={7} lg={7} xl={7} >
                                        <Select
                                            placeholder="State"
                                            allowClear
                                            className={styles.headerSelectField}
                                            onChange={handleSelectState}
                                        >
                                            {stateData?.map((item) => (
                                                <Option value={item?.code}>{item?.name}</Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col xs={24} sm={12} md={7} lg={7} xl={7} >
                                        <Select
                                            placeholder="District"
                                            allowClear
                                            className={styles?.headerSelectField}
                                            onChange={handleSelectState}
                                        >
                                            {districtData?.map((item) => (
                                                <Option value={item?.code}>{item?.name}</Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col xs={24} sm={12} md={7} lg={7} xl={7}  >
                                        <Search
                                            placeholder="Search"
                                            allowClear
                                            className={styles.headerSearchField}
                                            onSearch={onSearchHandle}
                                            onChange={onChangeHandle}
                                        />
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

// export const DistrictGeo = connect(mapStateToProps, mapDispatchToProps)(DistrictGeoBase);

export const TehsilGeo = connect(mapStateToProps, mapDispatchToProps)(TehsilGeoBase);
