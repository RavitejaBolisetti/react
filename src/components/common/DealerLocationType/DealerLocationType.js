import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Space, Empty, ConfigProvider, Select } from 'antd';
// import { bindActionCreators } from 'redux';
// import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { STATE_DROPDOWN } from './InputType';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { DataTable } from 'utils/dataTable';
import { filterFunction } from 'utils/filterFunction';
//import { PARAM_MASTER } from 'constants/paramMaster';
// import { convertDate } from 'utils/formatDateTime';
// import { showGlobalNotification } from 'store/actions/notification';
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
            ConfigurableParameterEditing: { isLoaded: isDataLoaded = false, isLoading, data: configData = [], paramdata: typeData = [] },
        },
    } = state;

    const moduleTitle = 'Dealer Location Type Master';

    let returnValue = {
        userId,
        isDataLoaded,
        typeData,
        isLoading,
        moduleTitle,
        configData: configData?.filter((i) => i),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            // fetchList: configParamEditActions.fetchList,
            // saveData: configParamEditActions.saveData,
            // fetchDataList: configParamEditActions.fetchDataList,
            // listShowLoading: configParamEditActions.listShowLoading,
            // showGlobalNotification,
        },
        dispatch
    ),
});

export const DealerLocationTypeBase = ({ moduleTitle, fetchDataList, isLoading, saveData, fetchList, userId, typeData, configData, isDataLoaded, listShowLoading, isDataAttributeLoaded, showGlobalNotification, attributeData }) => {
    const [form] = Form.useForm();
    const defaultParametarType = STATE_DROPDOWN.KEY;
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

    const [parameterType, setParameterType] = useState(defaultParametarType);

    // const loadDependendData = () => {
    //    // fetchList({ setIsLoading: listShowLoading, userId, parameterType: PARAM_MASTER.CFG_PARAM_TYPE.id });
    //     // fetchList({ setIsLoading: listShowLoading, userId, parameterType: PARAM_MASTER.CFG_PARAM.id });
    //     // fetchList({ setIsLoading: listShowLoading, userId, parameterType: PARAM_MASTER.CTRL_GRP.id });
    // };

    // useEffect(() => {
    //     if (userId) {
    //         // const onSuccessAction = (res) => {
    //         //     refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    //         // };
    //         loadDependendData();

    //        // fetchDataList({ setIsLoading: listShowLoading, onSuccessAction, userId });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId, refershData]);

    useEffect(() => {
        if (isDataLoaded && configData && userId) {
            if (filterString) {
                const filterDataItem = configData?.filter((item) => filterFunction(filterString)(item?.controlId) || filterFunction(filterString)(item?.controlDescription));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
            } else {
                setSearchdata(configData?.map((el, i) => ({ ...el, srl: i + 1 })));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, configData, userId]);

    // useEffect( () =>{

    // },[stateCode] )

    const handleEditBtn = (record) => {
        console.log(record, 'RECORD');
        console.log(configData, 'configData');

        setShowSaveAndAddNewBtn(false);
        setIsViewModeVisible(false);
        setFormActionType('update');
        setFooterEdit(false);
        setIsReadOnly(false);
        //configData
        const data = tableData.find((i) => i.id === record.id);
        console.log('data', data);
        if (data) {
            data && setFormData(data);
            console.log('formData', formData);

            // setParameterType((data?.configurableParameterType).toString() || defaultParametarType);
            setIsFormVisible(true);
        }
    };

    const handleView = (record) => {
        setFormActionType('view');
        setIsViewModeVisible(true);

        setShowSaveAndAddNewBtn(false);
        setFooterEdit(true);
        //configData
        const data = tableData.find((i) => i.id === record.id);
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

    // const renderConfigurableParemetarValue = (record) => {
    //     let fieldType = '';
    //     switch (record?.configurableParameterType) {
    //         case CONFIGURABLE_PARAMETARS_INPUT_TYPE.TEXT.KEY:
    //             fieldType = record?.textValue;
    //             break;
    //         case CONFIGURABLE_PARAMETARS_INPUT_TYPE.NUMBER.KEY:
    //             fieldType = fieldType.concat(record?.fromNumber).concat(' - ').concat(record?.toNumber);
    //             break;
    //         case CONFIGURABLE_PARAMETARS_INPUT_TYPE.DATE_RANGE.KEY:
    //             fieldType = fieldType.concat(record?.fromDate).concat('  ').concat(record?.toDate);
    //             break;
    //         case CONFIGURABLE_PARAMETARS_INPUT_TYPE.BOOLEAN.KEY:
    //             fieldType = record?.booleanValue ? 'Yes' : 'No';
    //             break;
    //         default:
    //             fieldType = undefined;
    //             break;
    //     }
    //     return fieldType;
    // };

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl No.',
            dataIndex: 'id',
            sorter: false,
            width: '5%',
        }),

        tblPrepareColumns({
            title: 'Location Type Code',
            dataIndex: 'districtCode',
            // render: (text, record, value) => renderTableColumnName(record, 'controlId', PARAM_MASTER.CFG_PARAM.id),
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Location Type Description',
            dataIndex: 'districtName',
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
        setParameterType(defaultParametarType);
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
        console.log(values, 'dta');

        //const recordId = formData?.id || '';
        let data = { ...values };
        //id: recordId, isActive: true, fromDate: values?.fromDate?.format('YYYY-MM-DD'), toDate: values?.toDate?.format('YYYY-MM-DD')
        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            // fetchDataList({ setIsLoading: listShowLoading, userId });
            // loadDependendData();

            // if (showSaveAndAddNewBtn === true || recordId) {
            //     setIsFormVisible(false);
            //     showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            // } else {
            //     setIsFormVisible(true);
            //     showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            // }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: [data],
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        console.log(requestData, 'requestData');

        //saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const tableData = [
        // {
        //     id: '1',
        //     districtCode: 'DO0',
        //     districtName: 'Ranchi',
        //     gstCode: 'Test3',
        //     status: true,
        // },
    ];

    const tableProps = {
        tableColumn: tableColumn,
        tableData: tableData,
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
        parameterType,
        setParameterType,
        setClosePanels,
        hanndleEditData,
        setSaveAndAddNewBtnClicked,
        showSaveBtn,
        saveAndAddNewBtnClicked,
        stateCode,
        handleSelectState,
    };

    //console.log(stateCode,'valuevalue')

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
                                            CountryType List
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

                                {/* <Row gutter={20}>
                                    <div className={styles.searchBox} style={{ margin: '0 0 0 2rem' }}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.subheading}>
                                            State
                                            {/* <Search
                                                placeholder="Search"
                                                style={{
                                                    width: 300,
                                                }}
                                                allowClear
                                                className={styles.headerSelectField}
                                                onSearch={onSearchHandle}
                                                onChange={onChangeHandle}
                                            /> */}
                                {/* <Select
                                                placeholder="Select"
                                                style={{ margin: '0 0 0 0.5rem', width: '15rem' }}
                                                onChange={handleSelectState}
                                                //value={stateCode}
                                            > */}
                                {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                {/* {STATE_DROPDOWN?.map((item) => (
                                                    <Option value={item?.KEY}>{item?.TITLE}</Option>
                                                ))}
                                            </Select>
                                        </Col>
                                    </div>
                                </Row> */}
                            </Row>
                            {tableData?.length ? (
                                <Col className={styles.addGroup} xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />

                                    <Button icon={<PlusOutlined />} className={`${styles.actionbtn} ${styles.lastheaderbutton}`} type="primary" danger onClick={handleAdd}>
                                        Add Location
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
                                    !configData?.length ? (
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
                                {!configData?.length ? (
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
                                                Add Location
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

// export const DistrictGeo = connect(mapStateToProps, mapDispatchToProps)(DealerLocationTypeBase);

export const DealerLocationType = connect(mapStateToProps, mapDispatchToProps)(DealerLocationTypeBase);
