import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row, Input, Space, Form, Empty, ConfigProvider, Select } from 'antd';
import { IoBanOutline } from 'react-icons/io5';
import { PlusOutlined } from '@ant-design/icons';

import { tblPrepareColumns } from 'utils/tableCloumn';
import DataTable from 'utils/dataTable/DataTable';
import { escapeRegExp } from 'utils/escapeRegExp';

import { AddEditForm } from './AddEditForm';
import { FiEdit } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';

import styles from 'components/common/Common.module.css';

const { Search } = Input;
const { Option } = Select;

const initialTableData = [{ srNo: '1', employeecode: 'SH1121', dealername: 'Dealer 1', username: 'DeepakPalariya', useroles: 'dummy', hierarchyMapping: 'dummy', productsMapping: 'dummy' }];
const dealersData = ['Dealer 1', 'Dealer 2', 'Dealer 3', 'Dealer 4', 'Dealer 5', 'Dealer 6 '];
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
    const [isLoadingOnSave, setisLoadingOnSave] = useState();
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [data, setData] = useState(initialTableData);
    const [drawer, setDrawer] = useState(false);
    const [formData, setFormData] = useState({});
    const [isChecked, setIsChecked] = useState(formData?.status === 'Y' ? true : false);
    const [forceFormReset, setForceFormReset] = useState(false);
    const [searchData, setSearchdata] = useState();
    const [refershData, setRefershData] = useState(false);
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
    const [DealerSearchvalue, setDealerSearchvalue] = useState();
    const [DealerSelected, setDealerSelected] = useState();
    const [disabled, setdisabled] = useState(true);
    const [DealerData, setDealerData] = useState();
    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);
    const [closePanels, setClosePanels] = React.useState([]);
    const [showSaveBtn, setShowSaveBtn] = useState(true);
    const [AccessMacid, setAccessMacid] = useState([]);
    const [finalFormdata, setfinalFormdata] = useState({
        Macid: [],
        AssignUserRole: [],
        BranchMapping: [],
        ProductMapping: [],
    });
    const [toggleButton, settoggleButton] = useState({ individual: true, company: false });
    const moduleTitle = 'Customer Details';

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
        // setdisabled(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    useEffect(() => {
        setSearchdata(qualificationData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productHierarchyData, attributeData, qualificationData]);

    useEffect(() => {
        if (DealerSelected?.length > 0 && DealerSelected != undefined) {
            setdisabled(false);
            setDealerData({});
            setError(false);
        }
        if (DealerSelected === undefined) {
            setDealerSearchvalue('');
            setDealerData({});
            setdisabled(true);
            setError(false);
        }
    }, [DealerSearchvalue, DealerSelected]);

    useEffect(() => {
        if (userId) {
            // fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refershData, userId]);

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
            title: 'Sr.No.',
            dataIndex: 'srl',
            width: '6%',
            sorter: false,
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Employee Code',
            dataIndex: 'employeecode',
            width: '14%',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Dealer Name',
            dataIndex: 'dealername',
            width: '14%',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'User Name',
            dataIndex: 'username',
            width: '14%',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'User Roles',
            dataIndex: 'useroles',
            width: '14%',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Branch Mapping',
            dataIndex: 'hierarchyMapping',
            width: '20%',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Products Mapping',
            dataIndex: 'productsMapping',
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
        tableData: initialTableData,
        tableColumn: tableColumn,
    };

    const onSuccess = (res) => {
        listShowLoading(false);
        form.resetFields();
        setSelectedRecord({});
        setSuccessAlert(true);
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
        console.log('The On Finish Function Called : ');
        const recordId = selectedRecord?.id || '';
        const data = { ...values, id: recordId, status: values?.status ? 1 : 0 };

        const requestData = {
            data: savePayload,
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
    const handleReferesh = (e) => {
        setRefershData(!refershData);
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
            fetchDealerDetails({ setIsLoading: listShowLoading, userId, id: DealerSearchvalue, FetchError });
        }
        if (value === 'B6G431') {
            setError(true);
            setValid(false);
        } else if (value === 'B6G433') {
            setError(false);
            setValid(true);
        }
        setFilterString(value);
    };

    const onChangeHandle = (e) => {
        setFilterString(e.target.value);
    };
    const handleChange = (selectedvalue) => {
        setdisabled(false);
        setDealerSelected(selectedvalue);
    };
    const ChangeSearchHandler = (event) => {
        if (event.target.value === undefined) {
            setError(false);
        }
        setDealerSearchvalue(event.target.value);
    };
    const filterFunction = (filterString) => (title) => {
        return title && title.match(new RegExp(escapeRegExp(filterString), 'i'));
    };

    const formProps = {
        setClosePanels,
        saveclick,
        DealerSearchvalue,
        setsaveclick,
        setsaveandnewclick,
        saveandnewclick,
        isVisible: isFormVisible,
        isViewModeVisible,
        setIsViewModeVisible,
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
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                                    <Button className={styles.marR5} type={toggleButton?.individual ? 'primary' : 'link'} danger onClick={() => settoggleButton({ ...toggleButton, individual: true, company: false })}>
                                        Individual
                                    </Button>
                                    <Button type={toggleButton?.company ? 'primary' : 'link'} danger onClick={() => settoggleButton({ ...toggleButton, company: true, individual: false })}>
                                        Firm/Company
                                    </Button>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                <div className={styles.selectSearchBg}>
                                    <Select className={styles.headerSelectField} onChange={handleChange} placeholder="Select Parameter" allowClear>
                                        {dealersData?.map((item) => (
                                            <Option value={item}>{item}</Option>
                                        ))}
                                    </Select>
                                    <Search placeholder="Search" value={DealerSearchvalue} onChange={ChangeSearchHandler} allowClear onSearch={onSearchHandle} className={styles.headerSearchField} />
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.advanceFilterClear}>
                                <Button danger type="link" onClick={handleAdd}>
                                    View Draft
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
