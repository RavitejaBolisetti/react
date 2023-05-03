import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Space, Empty, ConfigProvider, Select } from 'antd';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { DataTable } from 'utils/dataTable';
import { filterFunction } from 'utils/filterFunction';
import { showGlobalNotification } from 'store/actions/notification';
import { geoStateDataActions } from 'store/actions/data/geoState';
import { geoDistrictDataActions } from 'store/actions/data/geoDistrict';
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
            GeoDistrict: { isLoaded: isDataLoaded = false, isLoading, data },
        },
    } = state;

    console.log(state, '');

    const moduleTitle = 'District Details';

    let returnValue = {
        userId,
        isDataLoaded,
        data,
        isLoading,
        moduleTitle,

        isStateDataLoaded,
        isStateLoading,
        stateData,
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
            fetchStateList: geoStateDataActions.fetchList,
            listStateShowLoading: geoStateDataActions.listShowLoading,

            showGlobalNotification,
            saveData: geoDistrictDataActions.saveData,
            fetchList: geoDistrictDataActions.fetchList,
            listShowLoading: geoDistrictDataActions.listShowLoading,
        },
        dispatch
    ),
});

export const DistrictGeoBase = ({ fetchStateList, listStateShowLoading, data, moduleTitle, fetchDataList, isLoading, saveData, fetchList, userId, typeData, configData, isDataLoaded, listShowLoading, isDataAttributeLoaded, showGlobalNotification, attributeData, isStateDataLoaded, isStateLoading, stateData }) => {
    //console.log(data,"DISTRICTDATA");
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
    const [closePanels, setClosePanels] = React.useState([]);

    const [stateCode, isStateCode] = useState('qw');

    useEffect(() => {
        if (userId) {
            const onSuccessAction = (res) => {
                refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            };
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
            fetchStateList({ setIsLoading: listStateShowLoading, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    useEffect(() => {
        if (isDataLoaded && data && userId) {
            if (filterString) {
                const filterDataItem = data?.filter((item) => filterFunction(filterString)(item?.stateCode) || filterFunction(filterString)(item?.districtName));
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
        //console.log(searchData,'searchGeo')
        const data = searchData.find((i) => i.districtCode === record.districtCode);
        // console.log('data', data);
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
        const data = searchData.find((i) => i.districtCode === record.districtCode);
        if (data) {
            data && setFormData(data);
            //setParameterType((data?.configurableParameterType).toString() || defaultParametarType);
            setIsFormVisible(true);
        }

        setIsReadOnly(true);
    };

    // const renderTableColumnName = (record, key, type) => {
    //     return typeData && typeData[type]?.find((item) => item?.key === record?.[key])?.value;
    // };

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl No.',
            dataIndex: 'srl',
            sorter: false,
            width: '5%',
        }),

        tblPrepareColumns({
            title: 'District Code',
            dataIndex: 'districtCode',
            // render: (text, record, value) => renderTableColumnName(record, 'controlId', PARAM_MASTER.CFG_PARAM.id),
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'District Name',
            dataIndex: 'districtName',
            width: '20%',
        }),

        // tblPrepareColumns({
        //     title: 'GST District Code',
        //     dataIndex: 'configurableParameterType',
        //     render: (text, record, value) => renderTableColumnName(record, 'configurableParameterType', PARAM_MASTER.CFG_PARAM_TYPE.id),
        //     width: '20%',
        // }),

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
        console.log(value, 'valuevaluevalue');
        isStateCode(value);
    };

    const onChangeHandle = (e) => {
        setFilterString(e.target.value);
    };

    const onFinish = (values) => {
        //console.log(values, 'dta');

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
        tableData: data,
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
        stateCode,
        handleSelectState,
        stateData,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Row xs={24} sm={24} md={24} lg={60} xl={60}>
                                <Row gutter={20}>
                                    <div className={styles.searchBox}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.subheading}>
                                            District List
                                            <Search
                                                placeholder="Search"
                                                style={{
                                                    width: 300,
                                                }}
                                                allowClear
                                                className={styles.headerSelectField}
                                                onSearch={onSearchHandle}
                                                onChange={onChangeHandle}
                                            />
                                        </Col>
                                        {/* <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                            
                                        </Col> */}
                                    </div>
                                </Row>

                                <Row gutter={20}>
                                    <div className={styles.searchBox} style={{ margin: '0 0 0 2rem' }}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.subheading}>
                                            State
                                            <Select
                                                placeholder="Select"
                                                style={{ margin: '0 0 0 0.5rem', width: '15rem' }}
                                                onChange={handleSelectState}
                                                //value={stateCode}
                                            >
                                                {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                                {stateData?.map((item) => (
                                                    <Option value={item?.code}>{item?.name}</Option>
                                                ))}
                                            </Select>
                                        </Col>
                                    </div>
                                </Row>
                            </Row>
                            {data?.length ? (
                                <Col className={styles.addGroup} xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />

                                    <Button icon={<PlusOutlined />} className={`${styles.actionbtn} ${styles.lastheaderbutton}`} type="primary" danger onClick={handleAdd}>
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

export const DistrictGeo = connect(mapStateToProps, mapDispatchToProps)(DistrictGeoBase);
