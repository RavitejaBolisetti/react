import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Row, Input, Space, Form, Empty, ConfigProvider } from 'antd';
import { EditIcon, ViewEyeIcon } from 'Icons';
import { TfiReload } from 'react-icons/tfi';
import { IoBanOutline } from 'react-icons/io5';
import { notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { tblPrepareColumns } from 'utils/tableCloumn';
import DataTable from 'utils/dataTable/DataTable';
import { showGlobalNotification } from 'store/actions/notification';
import { escapeRegExp } from 'utils/escapeRegExp';
// import { qualificationDataActions } from 'store/actions/data/qualificationMaster';
import { userManagementManufacturerDataActions } from 'store/actions/data/UserManagementManagement';
import DrawerUtil from './DrawerUtil';

import styles from 'components/common/Common.module.css';
import style from 'components/common/DrawerAndTable.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTING_USER_MANAGEMENT_DEALER, ROUTING_USER_MANAGEMENT_MANUFACTURER } from 'constants/routing';
import {AddEditForm} from '../UserManagementManufacturer/AddEditForm' 



const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            UserManagementManufacturer: { isLoaded: isDataLoaded = false, isLoading, isLoadingOnSave, isFormDataLoaded, data: UserManagementManufacturerData = [] },
            // QualificationMaster: { isLoaded: isDataLoaded = false, qualificationData = [], isLoading, isLoadingOnSave, isFormDataLoaded, },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        isLoading,
        UserManagementManufacturerData,
        isLoadingOnSave,
        isFormDataLoaded
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            listShowLoading: userManagementManufacturerDataActions.listShowLoading,
            fetchDealerDetails: userManagementManufacturerDataActions.fetchDealerDetails,
            fetchManufacturerDetails: userManagementManufacturerDataActions.fetchManufacturerDetails,
            saveDealerDetails: userManagementManufacturerDataActions.saveDealerDetails,
            saveManufacturerDetails: userManagementManufacturerDataActions.saveManufacturerDetails,
            showGlobalNotification,
        },
        dispatch
    ),
});

const initialTableData = [];

export const UserManagementManufacturerMain = ({ saveData, userId, saveDealerDetails, UserManagementDealerData, UserManagementManufacturerData, fetchManufacturerDetails, isDataLoaded, listShowLoading, qualificationData, showGlobalNotification, isLoading, isFormDataLoaded, isLoadingOnSave, onSaveShowLoading }) => {
    const [form] = Form.useForm();

    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [data, setData] = useState(initialTableData);
    const [drawer, setDrawer] = useState(false);
    const [formData, setFormData] = useState({});
    const [isChecked, setIsChecked] = useState(formData?.status === 'Y' ? true : false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [forceFormReset, setForceFormReset] = useState(false);
    const [searchData, setSearchdata] = useState();
    const [refershData, setRefershData] = useState(false);
    const [alertNotification, contextAlertNotification] = notification.useNotification();
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [filterString, setFilterString] = useState();
    const [footerEdit, setFooterEdit] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [saveAndSaveNew, setSaveAndSaveNew] = useState(false);
    const [saveBtn, setSaveBtn] = useState(false);
    const [saveclick, setsaveclick] = useState();
    const [saveandnewclick, setsaveandnewclick] = useState();
    const [successAlert, setSuccessAlert] = useState(false);
    const [error, setError] = useState(false);
    const [valid, setValid] = useState(false);

    const navigate = useNavigate();
    const [DealerSearchvalue, setDealerSearchvalue] = useState();
    const [DealerSelected, setDealerSelected] = useState();
    const [disabled, setdisabled] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [DealerData, setDealerData] = useState(UserManagementManufacturerData);
    const [isFormBtnActive, setFormBtnActive] = useState(false);




    useEffect(() => {
        form.resetFields();
        form.setFieldValue(formData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    useEffect(() => {
        console.log('This is the Manufacturer Data :: ', DealerData);
    }, [DealerData]);


    useEffect(() => {
        console.log(DealerSelected);
        if (DealerSearchvalue?.length > 0) {
            fetchManufacturerDetails({ setIsLoading: listShowLoading, userId, id: DealerSearchvalue });
        }
        if (DealerSelected?.length < 0 || DealerSelected === undefined) {
            setdisabled(true);
            setDealerData();
        }
    }, [DealerSearchvalue, DealerSelected]);
    
    useEffect(() => {
        //console.log('UserManagementManufacturerData : ', UserManagementManufacturerData);
        setDealerData(UserManagementManufacturerData);
    }, [UserManagementManufacturerData]);


    useEffect(() => {
        if (!isDataLoaded && userId) {
            // fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    useEffect(() => {
        setSearchdata(qualificationData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qualificationData]);



    useEffect(() => {
        if (userId) {
            // fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refershData, userId]);

    useEffect(() => {
        if (isDataLoaded && qualificationData) {
            if (filterString) {
                const filterDataItem = qualificationData?.filter((item) => filterFunction(filterString)(item?.qualificationCode) || filterFunction(filterString)(item?.qualificationName));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
            } else {
                setSearchdata(qualificationData?.map((el, i) => ({ ...el, srl: i + 1 })));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, qualificationData]);

    const tableDetails = [];
    tableDetails.push(
        tblPrepareColumns({
            title: 'Token No.',
            dataIndex: 'tokenNo',
            width: '12%',
            sorter: false
        })
    );
    tableDetails.push(
        tblPrepareColumns({
            title: 'User Name',
            dataIndex: 'userName',
            width: '18%',
            sorter: false
        })
    );
    tableDetails.push(
        tblPrepareColumns({
            title: 'Designation',
            dataIndex: 'designation',
            width: '22%',
            sorter: false
        })
    );
    tableDetails.push(
        tblPrepareColumns({
            title: 'Mobile Number',
            dataIndex: 'mobileNumber',
            width: '16%',
            sorter: false
        })
    );
    tableDetails.push(
        tblPrepareColumns({
            title: 'Email ID',
            dataIndex: 'emailID',
            width: '32%',
            sorter: false
        })
    );

    const tableDetailData = [{
        tokenNo: "B6G433",
        userName: "John Doe",
        designation: "Chief Sales Officer",
        mobileNumber: "9664321226",
        emailID: "john.doe@mahindra.com",
    },]

    const tableDetailProps = {
        tableColumn: tableDetails,
        tableData: tableDetailData,
    };

    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Sr.No.',
            dataIndex: 'srNo',
            width: '6%',
            sorter: false
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Token No.',
            dataIndex: 'tokenNo',
            width: '14%'
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'User Name',
            dataIndex: 'userName',
            width: '14%'
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Designation',
            dataIndex: 'designation',
            width: '14%'
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'User Roles',
            dataIndex: 'userRoles',
            width: '14%'
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Hierarchy Mapping',
            dataIndex: 'hierarchyMapping',
            width: '20%'
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Products Mapping',
            dataIndex: 'productsMapping',
            width: '20%'
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Action',
            width: '12%',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space>
                        {
                            <Button className={style.tableIcons} danger ghost aria-label="fa-edit" onClick={() => handleUpdate(record)}>
                                <EditIcon />
                            </Button>
                        }
                        {
                            <Button className={style.tableIcons} danger ghost aria-label="ai-view" onClick={() => handleView(record)}>
                                <ViewEyeIcon />
                            </Button>
                        }
                    </Space>
                );
            },
        })
    );
    const tableProps = {
        isLoading: isLoading,
        tableData: searchData,
        tableColumn: tableColumn,
    };

    const onFinish = (values, e) => {
        const recordId = selectedRecord?.id || '';
        const data = { ...values, id: recordId, status: values?.status ? 1 : 0 };

        const onSuccess = (res) => {
            onSaveShowLoading(false)
            form.resetFields();
            setSelectedRecord({});
            setSuccessAlert(true);
            // fetchList({ setIsLoading: listShowLoading, userId });
            if (saveclick === true) {
                setDrawer(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            } else {
                setDrawer(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            }
        };


        const onError = (message) => {
            onSaveShowLoading(false)
            showGlobalNotification({ notificationType: 'error', title: 'Error', message, placement: 'bottom-right' });
        };

        const requestData = {
            data: [data],
            setIsLoading: onSaveShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => { });
    };

    const handleAdd = () => {
        setFormActionType('add');
        setSaveAndSaveNew(true);
        setSaveBtn(true);
        setFooterEdit(false);

        setIsFormVisible(true);
        setFormBtnActive(true);

        setDrawer(true);
        setIsReadOnly(false);
        setsaveclick(false);
        setsaveandnewclick(true);
    };

    const handleUpdate = (record) => {
        setFormActionType('update');
        setSaveAndSaveNew(false);
        setFooterEdit(false);
        setSaveBtn(true);
        setSelectedRecord(record);

        setIsFormVisible(true);
        setFormBtnActive(true);

        setFormData(record);

        form.setFieldsValue({
            qualificationCode: record.qualificationCode,
            qualificationName: record.qualificationName,
            status: record.status,
        });

        setDrawer(true);
        setIsReadOnly(false);
    };

    const handleUpdate2 = () => {
        setFormActionType('update');

        setSaveAndSaveNew(false);
        setFooterEdit(false);
        setSaveBtn(true);

        setIsFormVisible(true);
        setFormBtnActive(true);

        form.setFieldsValue({
            qualificationCode: selectedRecord.qualificationCode,
            qualificationName: selectedRecord.qualificationName,
            status: selectedRecord.status,
        });
        setsaveclick(true);
        setIsReadOnly(false);
    };

    const handleView = (record) => {
        setFormActionType('view');

        setSelectedRecord(record);
        setSaveAndSaveNew(false);
        setFooterEdit(true);
        setSaveBtn(false);

        setIsFormVisible(true);
        setFormBtnActive(true);

        form.setFieldsValue({
            qualificationCode: record.qualificationCode,
            qualificationName: record.qualificationName,
            status: record.status,
        });
        setDrawer(true);
        setIsReadOnly(true);
    };

    const handleReferesh = (e) => {
        setRefershData(!refershData);
    };

    const onChange = (sorter, filters) => {
        form.resetFields();
    };

    const onSearchHandle = (value) => {
        if (value === 'B6G431') {
            setError(true);
            setValid(false);
        }
        else if (value === 'B6G433') {
            setError(false);
            setValid(true);
        }
        setFilterString(value);
    };

    const onChangeHandle = (e) => {
        setFilterString(e.target.value);
    };

    const filterFunction = (filterString) => (title) => {
        return title && title.match(new RegExp(escapeRegExp(filterString), 'i'));
    };

    const formProps = {
        saveclick,
        setsaveclick,
        setsaveandnewclick,
        saveandnewclick,
        isVisible: isFormVisible,
        isLoadingOnSave,
        formBtnDisable,
        isFormBtnActive,
        setFormBtnActive,
        saveAndSaveNew,
        saveBtn,
        setFormBtnDisable,
        onFinishFailed,
        onFinish,
        form,
        handleAdd,
        drawer,
        data,
        setDrawer,
        isChecked,
        formData,
        setIsChecked,
        formActionType,
        isReadOnly,
        setFormData,
        setForceFormReset,
        footerEdit,
        handleUpdate2,
        DealerData,
        tableDetailData,
        style,
        onCloseAction: () => setIsFormVisible(false),
    };

    return (
        <>
            {contextAlertNotification}
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Row gutter={20}>
                                    <div className={style.searchAndLabelAlign}>
                                        <Col xs={9} sm={9} md={9} lg={9} xl={9} className={style.subheading}>
                                            <div className={style.userManagement}>
                                                <Button className={style.actionbtn} type="primary" danger onClick={() => navigate(ROUTING_USER_MANAGEMENT_MANUFACTURER)}>
                                                    Manufacturer
                                                </Button>
                                                <Button className={style.dealerBtn} type="primary" danger onClick={() => navigate(ROUTING_USER_MANAGEMENT_DEALER)}>
                                                    Dealer
                                                </Button>
                                            </div>
                                        </Col>
                                        <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                            <Search
                                                placeholder="Search"
                                                style={{
                                                    width: 300,
                                                }}
                                                allowClear
                                                onSearch={onSearchHandle}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Col>
                            {qualificationData?.length ? (
                                <Col className={styles.addGroup} xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Button icon={<TfiReload />} className={style.refreshBtn} onClick={handleReferesh} danger></Button>

                                    <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
                                        Add Qualification
                                    </Button>
                                </Col>
                            ) : (
                                ''
                            )}
                        </Row>
                        {error && (
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <div className={style.errorDisplay}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={style.subheading}>
                                                <IoBanOutline />
                                                <span>User token number "B6G431" does not exist. Try again with valid token number.</span>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        )}
                        {valid && (
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <div className={style.successDisplay}>
                                        <Row gutter={20}>
                                            <Col xs={20} sm={20} md={20} lg={20} xl={20} className={style.subheading}>
                                                <DataTable tableColumn={tableDetails} {...tableDetailProps} />
                                            </Col>
                                            <Col xs={4} sm={4} md={4} lg={4} xl={4} className={style.subheading}>
                                                <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
                                                    Manage Access
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        )}
                    </div>
                </Col>
            </Row>
            {/* <DrawerUtil
                saveclick={saveclick}
                setsaveclick={setsaveclick}
                setsaveandnewclick={setsaveandnewclick}
                saveandnewclick={saveandnewclick}
                formBtnDisable={formBtnDisable}
                saveAndSaveNew={saveAndSaveNew}
                saveBtn={saveBtn}
                setFormBtnDisable={setFormBtnDisable}
                onFinishFailed={onFinishFailed}
                onFinish={onFinish}
                form={form}
                handleAdd={handleAdd}
                open={drawer}
                data={data}
                setDrawer={setDrawer}
                isChecked={isChecked}
                formData={formData}
                setIsChecked={setIsChecked}
                formActionType={formActionType}
                isReadOnly={isReadOnly}
                setFormData={setFormData}
                setForceFormReset={setForceFormReset}
                footerEdit={footerEdit}
                handleUpdate2={handleUpdate2}
                isLoadingOnSave={isLoadingOnSave}
            /> */}
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ConfigProvider
                        className={style.userManagementTable}
                        renderEmpty={() => (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    <span> No record found.</span>
                                }
                            >
                                {/* {!qualificationData?.length ? (
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
                                                Add Qualification
                                            </Button>
                                        </Col>
                                    </Row>
                                ) : (
                                    ''
                                )} */}
                            </Empty>
                        )}
                    >
                        <DataTable isLoading={isLoading} tableData={searchData} tableColumn={tableColumn} {...tableProps} onChange={onChange} />
                    </ConfigProvider>
                </Col>
            </Row>
            <AddEditForm {...formProps}/>                                
        </>
    );
};

export const UserManagementManufacturer = connect(mapStateToProps, mapDispatchToProps)(UserManagementManufacturerMain);
