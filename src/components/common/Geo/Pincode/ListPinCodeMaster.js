import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Space, Empty, ConfigProvider, Select, Checkbox, Collapse, Card } from 'antd';
import { bindActionCreators } from 'redux';
import { tblPrepareColumns } from 'utils/tableCloumn';

import { DataTable } from 'utils/dataTable';
import { filterFunction } from 'utils/filterFunction';
import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';

import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
import { FiEdit } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';

import styles from 'components/common/Common.module.css';
import { geoStateDataActions } from 'store/actions/data/geo/state';
import { geoDistrictDataActions } from 'store/actions/data/geo/district';
import { geoCityDataActions } from 'store/actions/data/geo/city';
import { geoTehsilDataActions } from 'store/actions/data/geo/tehsil';
import { geoPincodeDataActions } from 'store/actions/data/geo/pincode';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

const { Search } = Input;
const { Option } = Select;

const mapStateToProps = (state) => {
    // console.log('state', state);
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isConfigDataLoaded = false, isLoading: isConfigLoading, paramdata: typeData = [] },
            Geo: {
                State: { isLoaded: isDataLoaded = false, isLoading: isStateLoading, data: geoStateData },
                District: { isLoaded: isDistrictLoaded = false, isLoading: isDistrictLoading, data: geoDistrictData },
                Tehsil: { isLoaded: isTehsilLoaded = false, isLoading: isTehsilLoading, data: geoTehsilData },
                City: { isLoaded: isCityLoaded = false, isLoading: isCityLoading, data: geoCityData },
                Pincode: { isLoaded: isPinDataLoaded = false, isLoading: isPinLoading, data: geoPindata },
                
            },
        },
    } = state;

   
    const moduleTitle = 'Pincode Master List';

    let returnValue = {
        userId,
        isDataLoaded,
        isPinLoading,
        isDistrictLoading,
        isStateLoading,
        isDistrictLoaded,
        geoDistrictData,
        isTehsilLoaded,
        isTehsilLoading,
        geoTehsilData,
        isCityLoaded,
        isCityLoading,
        geoCityData,
        geoPindata,
        geoStateData,
        isConfigDataLoaded,
        isConfigLoading,
        typeData,
        isPinDataLoaded,
        //isStateDataLoaded,
        moduleTitle,

        // geoPinData: geoPinData?.filter((i) => i),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchStateList: geoStateDataActions.fetchList,
            listStateShowoading: geoStateDataActions.listShowLoading,

            fetchDistrictList: geoDistrictDataActions.fetchList,
            listDistrictShowLoading: geoDistrictDataActions.listShowLoading,

            fetchTehsilList: geoTehsilDataActions.fetchList,
            listTehsilShowLoading: geoTehsilDataActions.listShowLoading,

            fetchCityList: geoCityDataActions.fetchList,
            listCityShowLoading: geoCityDataActions.listShowLoading,

            fetchConfigList: configParamEditActions.fetchList,
            listConfigShowLoading: configParamEditActions.listShowLoading,

            fetchList: geoPincodeDataActions.fetchList,
            listShowLoading: geoPincodeDataActions.listShowLoading,
            saveData: geoPincodeDataActions.saveData,
            showGlobalNotification,
        },
        dispatch
    ),
});
const ListPinCodeMasterBase = ({
    isLoading,
    moduleTitle,
    tableData,
    isPinLoading,
    fetchDataList,
    fetchCityList,
    fetchTehsilList,
    fetchConfigList,
    listCityShowLoading,
    fetchList,
    listTehsilShowLoading,
    listPinShowLoading,
    listStateShowLoading,
    listStateShowoading,
    listDistrictShowLoading,
    listConfigShowLoading,
    isConfigLoading,
    fetchStateList,
    fetchDistrictList,
    isDistrictLoaded,
    isPinDataLoaded,
    isStateDataLoaded,
    isDistrictLoading,
    isConfigDataLoaded,
    geoDistrictData,
    isTehsilLoaded,
    isTehsilLoading,
    isStateLoading,
    geoTehsilData,
    isCityLoaded,
    isCityLoading,
    geoCityData,
    geoPindata,
    geoStateData,
    data,
    saveData,
    typeData,
    userId,
    configData,
    isDataLoaded,
    listShowLoading,
    isDataAttributeLoaded,
    showGlobalNotification,
    attributeData,
}) => {
    const [form] = Form.useForm();
    const [actionform] = Form.useForm();
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);
    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [pin, setPin] = useState([]);

    const [showSaveBtn, setShowSaveBtn] = useState(true);
    const [showSaveAndAddNewBtn, setShowSaveAndAddNewBtn] = useState(false);
    const [saveAndAddNewBtnClicked, setSaveAndAddNewBtnClicked] = useState(false);
    const [savebtnclick, setsavebtnclick] = useState(false);

    const [footerEdit, setFooterEdit] = useState(false);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [advanceSearch, setAdvanceSearch] = useState([]);
    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [closePanels, setClosePanels] = React.useState([]);
    const [rowdata, setrowdata] = useState();
    const [showTehsil, setShowTehsil] = useState([]);
    const [show, setShow] = useState([]);
    const [showCity, setShowCity] = useState([]);
    const [ditrict, setDistrict] = useState();
    const [myFilter, setmyFilter] = useState({});

    useEffect(() => {
        console.log('refersh data', refershData);
        if (!isDataLoaded && userId) {
            const onSuccessAction = (res) => {
                refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            };

            fetchStateList({ setIsLoading: listShowLoading, userId, onSuccessAction });

            fetchDistrictList({ setIsLoading: listShowLoading, userId, onSuccessAction });
            fetchTehsilList({ setIsLoading: listShowLoading, userId, onSuccessAction });
            fetchCityList({ setIsLoading: listShowLoading, userId, onSuccessAction });
            fetchConfigList({ setIsLoading: listShowLoading, userId, parameterType: 'PIN_CATG' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData, isPinDataLoaded]);
    useEffect(() => {
        if (geoPindata) {
            setSearchdata(geoPindata?.map((el, i) => ({ ...el, srl: i + 1 })));
        }
    }, [geoPindata, isAdvanceSearchVisible]);
    useEffect(() => {
        if (geoPindata?.length > 0) {
            const apiParams = `?stateCode=${myFilter?.State}&districtCode=${myFilter?.District}&tehsilCode=${myFilter?.Tehsil}`;

            fetchList({ setIsLoading: listShowLoading, userId, mytype: apiParams });
            setSearchdata(geoPindata?.map((el, i) => ({ ...el, srl: i + 1 })));
        }
    }, [refershData]);

    useEffect(() => {
        if (geoPindata && userId) {
            if (filterString) {
                const filterDataItem = geoPindata?.filter((item) => filterFunction(filterString)(item?.localityName) || filterFunction(filterString)(item?.pinCode));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
            } else {
                setSearchdata(geoPindata?.map((el, i) => ({ ...el, srl: i + 1 })));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, userId, geoPindata]);

    const handleEditBtn = (record) => {
        setShowSaveAndAddNewBtn(false);
        setIsViewModeVisible(false);
        setFormActionType('update');
        setFooterEdit(false);
        setIsReadOnly(false);

        setFormData(record);
        setIsFormVisible(true);
    };

    const handleView = (record) => {
        setFormActionType('view');
        setIsViewModeVisible(true);

        setShowSaveAndAddNewBtn(false);
        setFooterEdit(true);

        // const data = tableData.find((i) => i.code === record.code);
        // if (data) {
        //     data && setFormData(data);
        //     setIsFormVisible(true);
        // }

        setFormData(record);

        setIsFormVisible(true);

        setIsReadOnly(true);
    };
    const handleSelectState = (e) => {
        console.log('This is the state', e);
        setmyFilter({ ...myFilter, State: e });
        setShow(geoDistrictData.filter((i) => i.stateCode === e));
    };
    const handleSelectDistrict = (e) => {
        setmyFilter({ ...myFilter, District: e });

        setDistrict(e);

        setShowCity(geoCityData.filter((i) => i.districtCode === e));
    };
    const handleselectcity = (e) => {
        setmyFilter({ ...myFilter, City: e });

        setShowTehsil(geoTehsilData?.filter((i) => i.districtCode === ditrict));
    };
    const handleTehsil = (values) => {
        setmyFilter({ ...myFilter, Tehsil: values });
    };
    const onChangeSearch = (event) => {
        console.log('apiParams', event?.target?.value);

        setFilterString(event?.target?.value);
    };
    const onSearchHandle = (value) => {
        fetchList({ setIsLoading: listShowLoading, userId, mytype: '?code='.concat(value) });
    };
    const handlefilteredSearch = (value) => {
        const apiParams = `?stateCode=${myFilter?.State}&districtCode=${myFilter?.District}&tehsilCode=${myFilter?.Tehsil}`;
        console.log('apiParams', apiParams);
        form.validateFields()
            .then(() => {
                fetchList({ setIsLoading: listShowLoading, userId, mytype: apiParams });
            })
            .catch((error) => {});
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
            title: 'PIN Category',
            dataIndex: 'pinCategory',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'PIN Code',
            dataIndex: 'pinCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Locality',
            dataIndex: 'localityName',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Within 50Km from the GPO',
            dataIndex: 'withIn50KmFromGpo',
            width: '20%',
            render: (text, record) => {
                return <Checkbox disabled defaultChecked={text ? true : false} className={styles.registered}></Checkbox>;
            },
        }),

        tblPrepareColumns({
            title: 'Approval Status',
            dataIndex: 'approvalStatus',
            render: (text, record) => <>{text ? <div className={styles.activeText}>Approved</div> : <div className={styles.inactiveText}>Not Approved</div>}</>,
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => <>{text ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>}</>,
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
                            <FiEdit />
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
        setPin(geoPindata);
    };

    const hanndleEditData = (record) => {
        actionform.resetFields();

        setShowSaveAndAddNewBtn(false);
        setIsViewModeVisible(false);
        setFormActionType('update');
        setFooterEdit(false);
        setIsReadOnly(false);
        setShowSaveBtn(true);
    };

    const handleAdd = () => {
        actionform.resetFields();
        setFormActionType('add');
        setShowSaveAndAddNewBtn(true);
        setIsViewModeVisible(false);

        setFooterEdit(false);
        setIsFormVisible(true);
        setIsReadOnly(false);
        setFormData([]);
    };

    const onChangeHandle = (e) => {
        setFilterString(e.target.value);
    };
    const requestaData = {
        pinCode: '764748',
        localityCode: 'F1795',
        tehsilCode: 'T11841',
        districtCode: 'D00565',
        stateCode: '23',
        countryCode: 'IN',
        status: true,
        approvalStatus: true,
        localityName: 'TEST',
        pinDescription: 'TESTING',
        withIn50KmFromGpo: true,
        jdpUniverse: true,
    };
    const onFinish = (values) => {
        const recordId = formData?.data || '';
        // let data = { ...values, data: recordId };
        const finalSubmitdata = { ...values, countryCode: 'IND', pinCategory: 'URBAN' };
        console.log('finalSubmitdata', finalSubmitdata);
        const onSuccess = (res) => {
            actionform.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            // fetchDataList({ setIsLoading: listShowLoading, userId });

            if (saveAndAddNewBtnClicked === false) {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            } else {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            }
            handleReferesh();
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: finalSubmitdata,
            setIsLoading: listShowLoading,
            method: formActionType === 'update' ? 'put' : 'post',
            userId,
            onError,
            onSuccess,
        };

        console.log(requestData, 'REQDATA');

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        actionform.validateFields().then((values) => {});
    };
    const tableProps = {
        tableColumn: tableColumn,
        tableData: searchData,
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
        isVisible: isFormVisible,
        onCloseAction: () => (setIsFormVisible(false), setFormBtnActive(false)),
        titleOverride: (isViewModeVisible ? 'View ' : formData?.stateCode ? 'Edit ' : 'Add ').concat('PIN Details'),
        onFinish,
        onFinishFailed,
        isFormBtnActive,
        setFormBtnActive,
        tableData: geoPindata,
        setClosePanels,
        hanndleEditData,
        setSaveAndAddNewBtnClicked,
        showSaveBtn,
        saveAndAddNewBtnClicked,
        geoStateData,
        geoDistrictData,
        geoTehsilData,
        geoCityData,
        geoPindata,
        setrowdata,
        rowdata,
        typeData,
        setsavebtnclick,
        ditrict,
        setDistrict,
        actionform,
        showSaveAndAddNewBtn,
    };

    const viewProps = {
        isVisible: isAdvanceSearchVisible,
        formData,
        styles,
    };
    const handleButtonClick = () => {
        setAdvanceSearchVisible(!isAdvanceSearchVisible);
    };
    return (
        <>
            <Form layout="vertical" form={form} id="searchFields">
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Card className={styles.CardFormitemMargin}>
                            <Row gutter={20}>
                                <Col xs={20} sm={20} md={18} lg={18} xl={18}>
                                    <Row gutter={20}>
                                        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                            <Form.Item label="Country" initialValue={'India'} rules={[validateRequiredInputField('Country')]} name="countryCode">
                                                <Select disabled={true} allowClear placeholder={preparePlaceholderSelect('Country')}>
                                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}

                                                    <Option value={'IND'}>{'India'}</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={4} sm={4} md={5} lg={5} xl={5}>
                                            <Form.Item label="State" initialValue={myFilter?.State} rules={[validateRequiredInputField('State')]} name="stateCode">
                                                <Select
                                                    showSearch
                                                    filterOption={(input, option) => {
                                                        return option?.children?.toLowerCase()?.includes(input?.toLowerCase());
                                                    }}
                                                    allowClear
                                                    placeholder={preparePlaceholderSelect('state')}
                                                    onChange={handleSelectState}
                                                >
                                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                                    {geoStateData?.map((item) => (
                                                        <Option value={item?.code}>{item?.name}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={4} sm={4} md={5} lg={5} xl={5}>
                                            <Form.Item label="District" initialValue={myFilter?.District} name="districtCode" rules={[validateRequiredSelectField('District')]}>
                                                <Select
                                                    showSearch
                                                    filterOption={(input, option) => {
                                                        return option?.children?.toLowerCase()?.includes(input?.toLowerCase());
                                                    }}
                                                    allowClear
                                                    placeholder={preparePlaceholderSelect('District')}
                                                    onChange={handleSelectDistrict}
                                                >
                                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                                    {show?.map((item) => (
                                                        <Option value={item?.code}>{item?.name}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={4} sm={4} md={5} lg={5} xl={5}>
                                            <Form.Item label="City" initialValue={myFilter?.City} name="cityCode" rules={[validateRequiredSelectField('City')]}>
                                                <Select
                                                    showSearch
                                                    filterOption={(input, option) => {
                                                        return option?.children?.toLowerCase()?.includes(input?.toLowerCase());
                                                    }}
                                                    allowClear
                                                    placeholder={preparePlaceholderSelect('City')}
                                                    onChange={handleselectcity}
                                                >
                                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                                    {showCity?.map((item) => (
                                                        <Option value={item?.code}>{item?.name}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        <Col xs={4} sm={4} md={5} lg={5} xl={5}>
                                            <Form.Item label="Tehsil" allowClear initialValue={myFilter?.Tehsil} name="tehsilCode" rules={[validateRequiredSelectField('Tehsil')]}>
                                                <Select
                                                    showSearch
                                                    filterOption={(input, option) => {
                                                        return option?.children?.toLowerCase()?.includes(input?.toLowerCase());
                                                    }}
                                                    allowClear
                                                    placeholder={preparePlaceholderSelect('Tehsil')}
                                                    onChange={handleTehsil}
                                                >
                                                    {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                                    {showTehsil?.map((item) => (
                                                        <Option value={item?.code}>{item?.name}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={4} sm={4} md={6} lg={6} xl={6}>
                                    <Row gutter={20}>
                                        <Col xs={12} sm={12} md={8} lg={8} xl={8} offset={8} className={styles.alignSearchButton}>
                                            <Button form="searchFields" style={{ marginRight: '20px' }} type="primary" onClick={handlefilteredSearch} icon={<SearchOutlined />}>
                                                Search
                                            </Button>
                                        </Col>
                                        <Col xs={12} sm={12} md={8} lg={8} xl={8} className={styles.alignSearchButton}>
                                            <Button icon={<PlusOutlined />} className={`${styles.actionbtn} ${styles.lastheaderbutton}`} type="primary" danger onClick={handleAdd}>
                                                Add
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Form>
            {geoPindata?.length > 0 && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className={styles.contentHeaderBackground}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={5} xl={5} className={styles.lineHeight33}>
                                            PIN Code List
                                        </Col>
                                        <Col xs={24} sm={24} md={16} lg={19} xl={19}>
                                            <Search
                                                placeholder="Search"
                                                style={{
                                                    width: 300,
                                                }}
                                                onChange={onChangeSearch}
                                            />{' '}
                                        </Col>
                                    </Row>
                                </Col>

                                {searchData?.length ? (
                                    <Col className={styles.addGroup} xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />
                                    </Col>
                                ) : (
                                    ''
                                )}
                            </Row>
                        </div>
                    </Col>
                </Row>
            )}

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
                                    !searchData?.length ? (
                                        <span>
                                            No records found. Please add new Pincode here <br />
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
                                            <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
                                                Add Pincode
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
                            <DataTable isLoading={!isCityLoaded} {...tableProps} />
                        </div>
                    </ConfigProvider>
                </Col>
            </Row>

            <AddEditForm {...formProps} />
        </>
    );
};

export const ListPinCodeMaster = connect(mapStateToProps, mapDispatchToProps)(ListPinCodeMasterBase);
