import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row, Input, Space, Form, Empty, ConfigProvider, Select } from 'antd';
import { IoBanOutline } from 'react-icons/io5';
import { PlusOutlined } from '@ant-design/icons';
import { tblPrepareColumns } from 'utils/tableCloumn';
import DataTable from 'utils/dataTable/DataTable';
import { AddEditForm } from './AddEditForm';
import { FiEdit } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

const { Search } = Input;
const { Option } = Select;

const initialTableData = [
    { customerId: 'SH1121', customerName: 'Deepak Palariya', customerType: 'C T 1', mobileNo: '9988122299', emailAddress: 'dp@gmail.com', membershipType: 'M T', registrationNumber: 'RG001', chassisNumber: '9912', vpin: '1212', type: 'individual' },
    { customerId: 'SH1122', customerName: 'Rohan S', customerType: 'C T 1', mobileNo: '8888122299', emailAddress: 'dp@gmail.com', membershipType: 'M T', registrationNumber: 'RG001', chassisNumber: '9912', vpin: '1212', type: 'individual' },
    { customerId: 'SH1123', customerName: 'Deepak 2', customerType: 'C T 1', mobileNo: '9909122299', emailAddress: 'dp@gmail.com', membershipType: 'M T', registrationNumber: 'RG001', chassisNumber: '9912', vpin: '1212', type: 'individual' },
    { customerId: 'SH1124', customerName: 'Rohan 2', customerType: 'C T 1', mobileNo: '9900122299', emailAddress: 'dp@gmail.com', membershipType: 'M T', registrationNumber: 'RG001', chassisNumber: '9912', vpin: '1212', type: 'individual' },
    { customerId: 'SH1125', customerName: 'Deepak 3', customerType: 'C T 1', mobileNo: '9988122299', emailAddress: 'dp@gmail.com', membershipType: 'M T', registrationNumber: 'RG001', chassisNumber: '9912', vpin: '1212', type: 'company' },
];

const dealersData = ['Dealer 1', 'Dealer 2', 'Dealer 3', 'Dealer 4', 'Dealer 5', 'Dealer 6 '];
const dealersDataList = [
    { dealerId: 'Customer ID', dealerNm: 'Customer ID', type: 'individual' },
    { dealerId: 'Customer Name', dealerNm: 'Customer Name', type: 'individual' },
    { dealerId: 'Mobile Number', dealerNm: 'Mobile Number', type: 'individual' },
    { dealerId: 'Registration Number', dealerNm: 'Registration Number', type: 'individual' },
    { dealerId: 'Chassis Number', dealerNm: 'Chassis Number', type: 'individual' },
    { dealerId: 'VIN', dealerNm: 'VIN', type: 'individual' },
    { dealerId: 'ABC', dealerNm: 'ABC', type: 'company' },
    { dealerId: 'Company-1', dealerNm: 'Company-1', type: 'company' },
];
let showDealersDataList = dealersDataList.filter((d) => d.type === 'individual');

const savePayload = {
    employeeCode: 'deepakpalariya',

    employeeName: 'deepak',

    employeeDesignation: 'Developer',

    createUser: 'N',

    roles: [
        {
            id: 'b9698119-cabf-4863-ac88-9b91561ba7bd',

            roleId: '1b01c102-867f-42ed-b3dd-d8527f9ddc0c',

            status: true,

            applications: [
                {
                    id: '',

                    appId: '92389586-eb20-45fe-82ad-2654e783c03d',

                    status: true,

                    actions: [
                        {
                            id: '',

                            actionId: '6373a978-3332-4152-8095-90d4dc33c866',

                            status: true,
                        },
                    ],
                },
            ],
        },
    ],

    branches: [
        {
            id: '2e42a441-c82d-41b4-8b3e-8509bf9affb1',

            branchCode: '8a4176b8-d5c9-4a68-a682-cd5bacb3be7b',

            status: true,

            defaultBranch: true,
        },
    ],

    products: [
        {
            id: '06545d1e-d61b-46f6-8a79-eb262342f38a',

            productCode: '644bb543-7727-4545-ae24-9bc03b8036b5',

            status: true,
        },
    ],
};

const CustomerMasterMain = ({ saveData, userId, productHierarchyData, attributeData, hierarchyAttributeFetchList, saveDealerDetails, UserManagementDealerData, fetchDealerDetails, isDataLoaded, fetchList, listShowLoading, qualificationData, showGlobalNotification, isLoading, isFormDataLoaded, onSaveShowLoading }) => {
    const [form] = Form.useForm();

    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [drawer, setDrawer] = useState(false);
    const [formData, setFormData] = useState({});
    const [isChecked, setIsChecked] = useState(formData?.status === 'Y' ? true : false);
    const [forceFormReset, setForceFormReset] = useState(false);
    const [searchData, setSearchdata] = useState();
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [filterString, setFilterString] = useState();
    const [footerEdit, setFooterEdit] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [saveAndSaveNew, setSaveAndSaveNew] = useState(false);
    const [saveBtn, setSaveBtn] = useState(false);
    const [saveclick, setsaveclick] = useState();
    const [saveandnewclick, setsaveandnewclick] = useState();
    const [error, setError] = useState(false);
    const [DealerSearchvalue, setDealerSearchvalue] = useState();
    const [DealerSelected, setDealerSelected] = useState();
    const [DealerData, setDealerData] = useState();
    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);
    const [showSaveBtn, setShowSaveBtn] = useState(true);
    const [AccessMacid, setAccessMacid] = useState([]);
    const [data, setData] = useState(initialTableData);
    const [finalFormdata, setfinalFormdata] = useState({
        Macid: [],
        AssignUserRole: [],
        BranchMapping: [],
        ProductMapping: [],
    });

    const [toggleButton, settoggleButton] = useState('Individual');
    const moduleTitle = 'Customer Details';

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const FetchError = (message) => {
        setError(true);
        setDealerData({});
    };

    useEffect(() => {
        form.resetFields();
        form.setFieldValue(formData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId });
            hierarchyAttributeFetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    useEffect(() => {
        setSearchdata(qualificationData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productHierarchyData, attributeData, qualificationData]);

    useEffect(() => {
        if (DealerSelected?.length > 0 && DealerSelected !== undefined) {
            setDealerData({});
            setError(false);
        }
        if (DealerSelected === undefined) {
            setDealerSearchvalue('');
            setDealerData({});
            setError(false);
        }
    }, [DealerSearchvalue, DealerSelected]);

    const tableDetails = [];

    tableDetails.push(
        tblPrepareColumns({
            title: 'Employee Code',
            dataIndex: 'employeeCode',
            width: '18%',
            sorter: false,
        })
    );
    tableDetails.push(
        tblPrepareColumns({
            title: 'Dealer Name',
            dataIndex: 'dealerName',
            width: '16%',
            sorter: false,
        })
    );
    tableDetails.push(
        tblPrepareColumns({
            title: 'User Name',
            dataIndex: 'userName',
            width: '16%',
            sorter: false,
        })
    );
    tableDetails.push(
        tblPrepareColumns({
            title: 'Designation',
            dataIndex: 'designation',
            width: '18%',
            sorter: false,
        })
    );
    tableDetails.push(
        tblPrepareColumns({
            title: 'Mobile Number',
            dataIndex: 'mobileNumber',
            width: '16%',
            sorter: false,
        })
    );
    tableDetails.push(
        tblPrepareColumns({
            title: 'Email ID',
            dataIndex: 'emailid',
            width: '16%',
            sorter: false,
        })
    );

    const tableDetailData = [
        {
            employeeCode: DealerData?.employeeCode,
            dealerName: DealerSelected,
            userName: DealerData?.employeeName,
            designation: DealerData?.employeeDesignation,
            mobileNumber: DealerData?.employeeMobileNumber,
            emailid: DealerData?.employeeEmail,
        },
    ];

    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Customer ID',
            dataIndex: 'customerId',
            width: '14%',
            sorter: false,
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Customer Name',
            dataIndex: 'customerName',
            width: '14%',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Customer Type',
            dataIndex: 'customerType',
            width: '14%',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Mobile No.',
            dataIndex: 'mobileNo',
            width: '14%',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Email Address',
            dataIndex: 'emailAddress',
            width: '14%',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Membership Type',
            dataIndex: 'membershipType',
            width: '20%',
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
                        <Button data-testid="edit" className={styles.tableIcons} aria-label="fa-edit" onClick={() => handleUpdate(record)}>
                            <FiEdit />
                        </Button>
                        <Button className={styles.tableIcons} aria-label="ai-view" onClick={() => handleView(record)}>
                            <FaRegEye />
                        </Button>
                    </Space>
                );
            },
        })
    );
    const tableProps = {
        isLoading: isLoading,
        tableData: data,
        tableColumn: tableColumn,
    };

    const onSuccess = (res) => {
        listShowLoading(false);
        form.resetFields();
        setSelectedRecord({});
        if (saveclick === true) {
            setDrawer(false);
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        } else {
            setDrawer(true);
            setIsFormVisible(false);

            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'topRight' });
        }
    };

    const onError = (message) => {
        setDealerData({});
        setError(true);
        onSaveShowLoading(false);
        showGlobalNotification({ notificationType: 'error', title: 'Error', message, placement: 'bottom-right' });
    };

    const onFinish = (values, e) => {
        const requestData = {
            data: [{}],
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveDealerDetails(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleAdd = () => {
        form.setFieldsValue({
            userRole: 'Mahindra',
        });

        setFormActionType('add');
        setIsViewModeVisible(false);

        setSaveBtn(true);
        setShowSaveBtn(true);
        setFooterEdit(false);
        setIsFormVisible(true);
        setFormBtnActive(true);

        setDrawer(true);
        setIsReadOnly(false);
        setsaveclick(false);
        setsaveandnewclick(true);
        setFormData();
    };

    const handleUpdate = (record) => {
        setFormActionType('update');
        setSaveAndSaveNew(false);
        setIsViewModeVisible(false);
        setIsFormVisible(true);

        setFooterEdit(false);
        setSaveBtn(true);
        setSelectedRecord(record);
        setIsFormVisible(true);
        setFormBtnActive(true);

        setFormData(record);

        setDrawer(true);
        setIsReadOnly(false);
    };

    const handleUpdate2 = () => {
        setFormActionType('update');
        setIsViewModeVisible(false);
        setIsFormVisible(true);

        setSaveAndSaveNew(false);
        setFooterEdit(false);
        setSaveBtn(true);

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
        setIsViewModeVisible(true);
        setIsFormVisible(true);

        setSelectedRecord(record);
        setSaveAndSaveNew(false);
        setFooterEdit(true);
        setSaveBtn(false);
        setIsFormVisible(true);
        setFormBtnActive(false);

        setDrawer(true);
        setIsReadOnly(true);
    };
    const hanndleEditData = (record) => {
        setIsViewModeVisible(false);
        setFormActionType('update');
        setFooterEdit(false);
        setIsReadOnly(false);
        setShowSaveBtn(true);
    };

    const onChange = (sorter, filters) => {
        form.resetFields();
    };

    const onSearchHandle = (value) => {
        console.log('This is the searched Value : ', value);
        setDealerSearchvalue(value);
        if (value === '') {
            return;
        }
        if (DealerSearchvalue?.length > 0 && DealerSelected?.length > 0 && DealerSelected !== undefined) {
            // /fetchDealerDetails({ setIsLoading: listShowLoading, userId, id: DealerSearchvalue, FetchError });
        }
        if (value === 'B6G431') {
            setError(true);
        } else if (value === 'B6G433') {
            setError(false);
        }
        setFilterString(value);
        if (DealerSelected === 'Customer Name') setData(initialTableData.filter((d) => d.customerName.includes(value)));
        if (DealerSelected === 'Mobile Number') setData(initialTableData.filter((d) => d.mobileNo.includes(value)));
    };

    const handleChange = (selectedvalue) => {
        setDealerSelected(selectedvalue);
    };
    const ChangeSearchHandler = (event) => {
        if (event.target.value === undefined) {
            setError(false);
        }
        setDealerSearchvalue(event.target.value);
    };

    const handleClickCustomerType = (custType) => {
        showDealersDataList = dealersDataList.filter((d) => d.type === custType);
        //setCustomerType(custType);
    };

    const formProps = {
        saveclick,
        DealerSearchvalue,
        setsaveclick,
        setsaveandnewclick,
        saveandnewclick,
        isVisible: isFormVisible,
        isViewModeVisible,
        setIsViewModeVisible,
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
        titleOverride: formActionType === 'add' ? 'Add New Customer' : (formActionType === 'view' ? 'View ' : 'Edit ').concat(moduleTitle),
        DealerData,
        productHierarchyData,
        tableDetailData,
        onCloseAction: () => setIsFormVisible(false),
        finalFormdata,
        setfinalFormdata,
        setShowSaveBtn,
        showSaveBtn,
        hanndleEditData,
        AccessMacid,
        setAccessMacid,
        toggleButton,
        settoggleButton,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            {/* <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                                <Button className={styles.marR5} type={toggleButton === 'Individual' ? 'primary' : 'link'} danger onClick={() => settoggleButton('Individual')}>
                                    Individual
                                </Button>
                                <Button type={toggleButton === 'Firm/Company' ? 'primary' : 'link'} danger onClick={() => settoggleButton('Firm/Company')}>
                                    Firm/Company
                                </Button>
                            </div> */}
                            <Col xs={24} sm={24} md={14} lg={14} xl={14} className={styles.searchAndLabelAlign}>
                                <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                                    <Button className={styles.marR5} type={toggleButton === 'Individual' ? 'primary' : 'link'} danger onClick={() => settoggleButton('Individual')}>
                                        Individual
                                    </Button>
                                    <Button type={toggleButton === 'Firm/Company' ? 'primary' : 'link'} danger onClick={() => settoggleButton('Firm/Company')}>
                                        Firm/Company
                                    </Button>
                                </div>
                                <div className={styles.selectSearchBg}>
                                    <Select className={styles.headerSelectField} onChange={handleChange} placeholder="Select Parameter" allowClear>
                                        {showDealersDataList?.map((item) => (
                                            <Option value={item.dealerId}>{item.dealerNm}</Option>
                                        ))}
                                    </Select>
                                    <Search placeholder="Search" value={DealerSearchvalue} onChange={ChangeSearchHandler} allowClear onSearch={onSearchHandle} className={styles.headerSearchField} />
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={10} lg={10} xl={10} className={styles.advanceFilterClear}>
                                <Button danger type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                                    Add
                                </Button>
                            </Col>
                        </Row>
                        {DealerData?.employeeCode ? (
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <div className={styles.dataDisplay}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                                        <div className={styles.contentHeading}>Employee Code</div>
                                                        <div className={`${styles.contentData} ${styles.txtEllipsis}`}>{DealerData?.employeeCode}</div>
                                                    </Col>

                                                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                                        <div className={styles.contentHeading}>Dealer Name</div>
                                                        <div className={`${styles.contentData} ${styles.txtEllipsis}`}>{DealerSelected}</div>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                                        <div className={styles.contentHeading}>User Name</div>
                                                        <div className={`${styles.contentData} ${styles.txtEllipsis}`}>{DealerData?.employeeName}</div>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                                        <div className={styles.contentHeading}>Designation</div>
                                                        <div className={`${styles.contentData} ${styles.txtEllipsis}`}>{DealerData?.employeeDesignation}</div>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={4} lg={3} xl={3}>
                                                        <div className={styles.contentHeading}>Mobile Number</div>
                                                        <div className={`${styles.contentData} ${styles.txtEllipsis}`}>{DealerData?.employeeMobileNumber}</div>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={4} lg={5} xl={5}>
                                                        <div className={styles.contentHeading}>Email ID</div>
                                                        <div className={`${styles.contentData} ${styles.txtEllipsis}`}>{DealerData?.employeeEmail}</div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                                <Button icon={<PlusOutlined />} className={styles.floatRight} type="primary" danger onClick={handleAdd}>
                                                    Manage Access
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        ) : error ? (
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <div className={styles.dataDisplay}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.errorDisplay}>
                                                <IoBanOutline />
                                                <span>User token number {DealerSearchvalue} does not exist. Try again with valid token number.</span>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        ) : (
                            ''
                        )}
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
                                description={<span> No record found.</span>}
                            ></Empty>
                        )}
                    >
                        <DataTable isLoading={isLoading} tableData={searchData} tableColumn={tableColumn} {...tableProps} onChange={onChange} />
                    </ConfigProvider>
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const CustomerMaster = connect(null, null)(CustomerMasterMain);
