import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Space, Empty, ConfigProvider, Select, Checkbox, Collapse, Card } from 'antd';
import { bindActionCreators } from 'redux';
import { tblPrepareColumns } from 'utils/tableCloumn';

import { DataTable } from 'utils/dataTable';
import { filterFunction } from 'utils/filterFunction';
import { PARAM_MASTER } from 'constants/paramMaster';
import { convertDate } from 'utils/formatDateTime';
import { showGlobalNotification } from 'store/actions/notification';
import { PinCodeAddEditForm } from './PinCodeAddEditForm';
import { geoPincodeDataActions } from 'store/actions/data/pincodeGeo';

import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
import { FiEdit2 } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';

import styles from 'components/common/Common.module.css';
import { geoStateDataActions } from 'store/actions/data/geoState';
import { geoDistrictDataActions } from 'store/actions/data/geoDistrict';
import { geoCityDataActions } from 'store/actions/data/geoCity';
import { geoTehsilDataActions } from 'store/actions/data/geoTehsil';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { STATE_DROPDOWN } from '../Tehsil/InputType';
// import { data } from 'store/reducers/data';

const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const mapStateToProps = (state) => {
    console.log('state', state);
    const {
        auth: { userId },
        data: {
            GeoState: { isLoaded: isDataLoaded = false, isLoading: isStateLoading, data: geoStateData },
            GeoDistrict: { isLoaded: isDistrictLoaded = false, isLoading: isDistrictLoading, data: geoDistrictData },
            GeoTehsil: { isLoaded: isTehsilLoaded = false, isLoading: isTehsilLoading, data: geoTehsilData },
            GeoCity: { isLoaded: isCityLoaded = false, isLoading: isCityLoading, data: geoCityData },
            GeoPincode: { isLoaded: isPinDataLoaded = false, isLoading: isPinLoading, data: geoPindata },
        },
    } = state;

    const moduleTitle = 'Pincode Master List';

    let returnValue = {
        userId,
        isDataLoaded,
        isPinLoading,
        isDistrictLoaded,
        // isStateLoading,
        // isDistrictLoading,
        geoDistrictData,
        isTehsilLoaded,
        isTehsilLoading,
        geoTehsilData,
        isCityLoaded,
        isCityLoading,
        geoCityData,
        geoPindata,
        geoStateData,
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

            fetchList: geoPincodeDataActions.fetchList,
            listShowLoading: geoPincodeDataActions.listShowLoading,
            saveData: geoPincodeDataActions.saveData,
            showGlobalNotification,
        },
        dispatch
    ),
});
const PincodeGeoBase = ({
    isLoading,
    moduleTitle,
    tableData,
    isPinLoading,
    fetchDataList,
    fetchCityList,
    fetchTehsilList,
    listCityShowLoading,
    fetchList,
    listTehsilShowLoading,
    listPinShowLoading,
    listStateShowLoading,
    listStateShowoading,
    listDistrictShowLoading,
    fetchStateList,
    fetchDistrictList,
    isDistrictLoaded,
    isPinDataLoaded,
    isStateDataLoaded,
    isStateLoading,
    isDistrictLoading,
    geoDistrictData,
    isTehsilLoaded,
    isTehsilLoading,
    geoTehsilData,
    isCityLoaded,
    isCityLoading,
    geoCityData,
    geoPindata,
    geoStateData,
    data,
    saveData,
    userId,
    configData,
    isDataLoaded,
    listShowLoading,
    isDataAttributeLoaded,
    showGlobalNotification,
    attributeData,
}) => {
    const [form] = Form.useForm();
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);
    const [districtdata, setdistrictdata] = useState();
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
        if (!isDataLoaded && userId) {
            const onSuccessAction = (res) => {
                refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            };

            fetchStateList({ setIsLoading: listShowLoading, userId, onSuccessAction });
            const coddd = 'UEIW';
            const types = `?stateCode=${coddd}`;
            fetchDistrictList({ setIsLoading: listShowLoading, userId, onSuccessAction, mytype: types });
            fetchTehsilList({ setIsLoading: listShowLoading, userId, onSuccessAction });
            fetchCityList({ setIsLoading: listShowLoading, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData, isPinDataLoaded]);
    useEffect(() => {
        setSearchdata(geoPindata?.map((el, i) => ({ ...el, srl: i + 1 })));
    }, [geoPindata]);

    useEffect(() => {
        if (geoPindata && userId) {
            if (filterString) {
                const filterDataItem = geoPindata?.filter((item) => filterFunction(filterString)(item?.localityName) || filterFunction(filterString)(item?.pinCode));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
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
        const data = searchData.find((i) => i.code === record.code);
        console.log('data', data);
        if (data) {
            console.log('formData', formData);
            data && setFormData(data);
            setIsFormVisible(true);
        }
    };

    const handleView = (record) => {
        setFormActionType('view');
        setIsViewModeVisible(true);

        setShowSaveAndAddNewBtn(false);
        setFooterEdit(true);
        setAdvanceSearchVisible(false);

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
        setmyFilter({ ...myFilter, city: e });

        setShowTehsil(geoTehsilData?.filter((i) => i.districtCode === ditrict));
    };
    const handleTehsil = (values) => {
        setmyFilter({ ...myFilter, Tehsil: values });
    };
    const onSearchHandle = (value) => {
        const apiParams = `?stateCode=${myFilter?.state}&districtCode=${myFilter?.District}&tehsilCode=${myFilter?.Tehsil}`;
        console.log('apiParams', apiParams);
        fetchList({ setIsLoading: listShowLoading, userId, mytype: '?code='.concat(value) });

        // setFilterString({ ...filterString, keyword: value });
    };
    const handlefilteredSearch = (value) => {
        const apiParams = `?stateCode=${myFilter?.State}&districtCode=${myFilter?.District}&tehsilCode=${myFilter?.Tehsil}`;
        console.log('apiParams', apiParams);

        fetchList({ setIsLoading: listShowLoading, userId, mytype: apiParams });
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
            render: (record) => {
                return <Checkbox disabled defaultChecked className={styles.registered}></Checkbox>;
            },
        }),

        tblPrepareColumns({
            title: 'Approval Status',
            dataIndex: 'approvalStatus',
            render: (text, record) => <>{text === 1 ? <div className={styles.activeText}>Approved</div> : <div className={styles.inactiveText}>Not Approved</div>}</>,
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
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
        setPin(geoPindata);
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
        setAdvanceSearchVisible(false);
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
        const finalSubmitdata = { ...values };
        console.log(values, 'DATATATATATATATTA');
        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            // fetchDataList({ setIsLoading: listShowLoading, userId });

            if (saveAndAddNewBtnClicked === false) {
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
            data: finalSubmitdata,
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        console.log(requestData, 'REQDATA');

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
        titleOverride: (isViewModeVisible ? 'View ' : formData?.code ? 'Edit ' : 'Add ').concat('PIN Details'),
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
        setsavebtnclick,
    };

    const viewProps = {
        isVisible: isAdvanceSearchVisible,
        formData,
        styles,
    };
    const handleButtonClick = () => {
        setAdvanceSearchVisible(!isAdvanceSearchVisible);
    };
    console.log(handleButtonClick, 'clicked');
    return (
        <>
            <Form layout="vertical">
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
                                                onSearch={onSearchHandle}
                                            />{' '}
                                            <Button danger type="link" onClick={handleButtonClick}>
                                                Advanced Search
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>

                                {searchData?.length ? (
                                    <Col className={styles.addGroup} xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />

                                        <Button icon={<PlusOutlined />} className={`${styles.actionbtn} ${styles.lastheaderbutton}`} type="primary" danger onClick={handleAdd}>
                                            Add
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
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        {isAdvanceSearchVisible && (
                            <Card
                                style={{
                                    width: '100%',
                                    background: '#f4f4f4',
                                }}
                            >
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Row gutter={20}>
                                            {/* <Col xs={24} sm={24} md={8} lg={5} xl={5} className={styles.lineHeight33}>
                                    PIN Code List
                                </Col> */}
                                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <Form.Item label="Select State" initialValue={formData?.stateCode} rules={[validateRequiredInputField('State')]} name="stateCode">
                                                    <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect('state')} onChange={handleSelectState}>
                                                        {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                                        {geoStateData?.map((item) => (
                                                            <Option value={item?.code}>{item?.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <Form.Item label="District" initialValue={formData?.districtCode} name="districtCode" rules={[validateRequiredSelectField('District')]}>
                                                    <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect('District')} onChange={handleSelectDistrict}>
                                                        {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                                        {show?.map((item) => (
                                                            <Option value={item?.code}>{item?.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <Form.Item label="City" initialValue={formData?.cityCode} name="cityCode" rules={[validateRequiredSelectField('City')]}>
                                                    <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect('City')} onChange={handleselectcity}>
                                                        {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                                        {showCity?.map((item) => (
                                                            <Option value={item?.code}>{item?.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <Form.Item label="Tehsil" initialValue={formData?.tehsilCode} name="tehsilCode" rules={[validateRequiredSelectField('Tehsil')]}>
                                                    <Select disabled={isReadOnly} placeholder={preparePlaceholderSelect('Tehsil')} onChange={handleTehsil}>
                                                        {/* {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)} */}
                                                        {showTehsil?.map((item) => (
                                                            <Option value={item?.code}>{item?.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={24}>
                                        <Button danger type="link" onClick={handlefilteredSearch}>
                                            Search
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Form>

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
                            <DataTable isLoading={isLoading} {...tableProps} />
                        </div>
                    </ConfigProvider>
                </Col>
            </Row>

            <PinCodeAddEditForm {...formProps} />
        </>
    );
};

export const PincodeGeo = connect(mapStateToProps, mapDispatchToProps)(PincodeGeoBase);
