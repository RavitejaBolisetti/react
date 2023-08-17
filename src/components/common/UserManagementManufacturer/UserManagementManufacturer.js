/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Row, Input, Space, Form, Empty, ConfigProvider } from 'antd';
import { EditIcon, ViewEyeIcon } from 'Icons';
import { IoBanOutline } from 'react-icons/io5';
import { PlusOutlined } from '@ant-design/icons';

import { tblPrepareColumns } from 'utils/tableColumn';
import DataTable from 'utils/dataTable/DataTable';
import { showGlobalNotification } from 'store/actions/notification';
import { escapeRegExp } from 'utils/escapeRegExp';
import { userManagementManufacturerDataActions } from 'store/actions/data/UserManagementManufacturer';

import styles from 'components/common/Common.module.css';
import style from 'components/common/DrawerAndTable.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTING_USER_MANAGEMENT_DEALER } from 'constants/routing';
import { AddEditForm } from '../UserManagementManufacturer/AddEditForm';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            UserManagementManufacturer: { isLoaded: isDataLoaded = false, isLoading, isLoadingOnSave, isFormDataLoaded, data: UserManagementManufacturerData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'User Access';

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        moduleTitle,
        isLoading,
        UserManagementManufacturerData,
        isLoadingOnSave,
        isFormDataLoaded,
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

const savePayload = {
    employeeRoles: [
        {
            id: '0ed76cec-b617-4071-a029-84758cde8ad9',
            roleId: 'eefac2ca-eabb-4504-8379-6054c6b3a547',
            status: true,
            employeeApplications: [
                {
                    id: '1080faf2-9d21-4b41-9f8c-303dd71050f1',
                    appId: '98848bf5-9e73-4dc2-8b17-26c90d2e0b82',
                    status: true,
                    employeeActions: [
                        {
                            id: '77d46074-accc-4f50-a82d-73050d22078c',
                            actionName: 'e8e4493a-07fb-4fdc-9908-038ff8818173',
                            status: true,
                        },
                    ],
                },
            ],
        },
    ],
    manufacturerAdminHeirarchyAdminId: 'facf625b-908b-4f8c-8796-af07c8c9b74c',
};

export const UserManagementManufacturerMain = ({ moduleTitle, saveData, userId, saveDealerDetails, UserManagementDealerData, UserManagementManufacturerData, fetchManufacturerDetails, isDataLoaded, listShowLoading, qualificationData, showGlobalNotification, isLoading, isFormDataLoaded, isLoadingOnSave, onSaveShowLoading }) => {
    const [form] = Form.useForm();

    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
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

    const navigate = useNavigate();
    const [DealerSearchvalue, setDealerSearchvalue] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [DealerData, setDealerData] = useState(UserManagementManufacturerData);
    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);

    useEffect(() => {
        form.resetFields();
        form.setFieldValue(formData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    useEffect(() => {
        if (DealerSearchvalue?.length > 0) {
            fetchManufacturerDetails({ setIsLoading: listShowLoading, userId, id: DealerSearchvalue });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DealerSearchvalue]);

    useEffect(() => {
        setDealerData(UserManagementManufacturerData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [UserManagementManufacturerData]);

    useEffect(() => {
        setSearchdata(qualificationData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qualificationData]);

    useEffect(() => {
        if (isDataLoaded && qualificationData) {
            if (filterString) {
                const filterDataItem = qualificationData?.filter((item) => filterFunction(filterString)(item?.qualificationCode) || filterFunction(filterString)(item?.qualificationName));
                setSearchdata(filterDataItem);
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
            width: '10%',
            sorter: false,
        })
    );
    tableDetails.push(
        tblPrepareColumns({
            title: 'User Name',
            dataIndex: 'userName',
            width: '24%',
            sorter: false,
        })
    );
    tableDetails.push(
        tblPrepareColumns({
            title: 'Designation',
            dataIndex: 'designation',
            width: '16%',
            sorter: false,
        })
    );
    tableDetails.push(
        tblPrepareColumns({
            title: 'Mobile Number',
            dataIndex: 'mobileNumber',
            width: '18%',
            sorter: false,
        })
    );
    tableDetails.push(
        tblPrepareColumns({
            title: 'Email ID',
            dataIndex: 'emailID',
            width: '32%',
            sorter: false,
        })
    );

    const tableDetailData = [
        {
            userName: DealerData?.employeeName,
            designation: DealerData?.designation,
            mobileNumber: DealerData?.contactMobileNumber,
            emailID: DealerData?.contactEmail,
        },
    ];

    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Sr.No.',
            dataIndex: 'srNo',
            width: '10%',
            sorter: false,
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Token No.',
            dataIndex: 'tokenNo',
            width: '10%',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'User Name',
            dataIndex: 'userName',
            width: '24%',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Designation',
            dataIndex: 'designation',
            width: '14%',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'User Roles',
            dataIndex: 'userRoles',
            width: '16%',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Hierarchy Mapping',
            dataIndex: 'hierarchyMapping',
            width: '18%',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Products Mapping',
            dataIndex: 'productsMapping',
            width: '32%',
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
                            <Button type="link" ghost aria-label="fa-edit" onClick={() => handleUpdate(record)}>
                                <EditIcon />
                            </Button>
                        }
                        {
                            <Button type="link" ghost aria-label="ai-view" onClick={() => handleView(record)}>
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
        const onSuccess = (res) => {
            onSaveShowLoading(false);
            form.resetFields();
            setSelectedRecord({});
            if (saveclick === true) {
                setDrawer(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            } else {
                setDrawer(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            }
        };

        const onError = (message) => {
            onSaveShowLoading(false);
            showGlobalNotification({ notificationType: 'error', title: 'Error', message, placement: 'bottom-right' });
        };

        const requestData = {
            data: [savePayload],
            setIsLoading: onSaveShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleAdd = () => {
        setFormActionType('add');
        setSaveAndSaveNew(true);
        setSaveBtn(true);
        setFooterEdit(false);

        setIsFormVisible(true);
        setFormBtnActive(true);
        setIsViewModeVisible(false);

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
        setIsViewModeVisible(false);
        setIsFormVisible(true);

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
        setIsViewModeVisible(false);
        setIsFormVisible(true);

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
        setIsViewModeVisible(true);
        setIsFormVisible(true);

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

    const onChange = (sorter, filters) => {
        form.resetFields();
    };

    const onSearchHandle = (value) => {
        setDealerSearchvalue(value);
        if (value === 'B6G433') {
            setError(true);
        } else if (value === 'B6G433') {
            setError(false);
        }
        setFilterString(value);
    };

    const filterFunction = (filterString) => (title) => {
        return title && title.match(new RegExp(escapeRegExp(filterString), 'i'));
    };

    const formProps = {
        saveclick,
        setsaveclick,
        setsaveandnewclick,
        saveandnewclick,
        isViewModeVisible,
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
        setDrawer,
        isChecked,
        formData,
        setIsChecked,
        titleOverride: (isViewModeVisible ? 'View ' : formData?.id ? 'Edit ' : 'Manage ').concat(moduleTitle),
        DealerSearchvalue,

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
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                                <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                                    <Button className={styles.marR5} type="primary">
                                        Manufacturer
                                    </Button>
                                    <Button type="link" ghost onClick={() => navigate(ROUTING_USER_MANAGEMENT_DEALER)}>
                                        Dealer
                                    </Button>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.padT5}>
                                <Search placeholder="Search" value={DealerSearchvalue} allowClear onSearch={onSearchHandle} disabled={false} className={styles.headerSearchField} />
                            </Col>
                        </Row>
                        {Object.keys(DealerData).length > 0 ? (
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <div className={styles.dataDisplay}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                                        <div className={styles.contentHeading}>User Name</div>
                                                        <div className={`${styles.contentData} ${styles.textEllipsis}`}>{DealerData?.employeeName}</div>
                                                    </Col>

                                                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                                        <div className={styles.contentHeading}>Token No.</div>
                                                        <div className={`${styles.contentData} ${styles.textEllipsis}`}>{DealerSearchvalue}</div>
                                                    </Col>

                                                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                                        <div className={styles.contentHeading}>Designation</div>
                                                        <div className={`${styles.contentData} ${styles.textEllipsis}`}>{DealerData?.designation}</div>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={4} lg={3} xl={3}>
                                                        <div className={styles.contentHeading}>Mobile Number</div>
                                                        <div className={`${styles.contentData} ${styles.textEllipsis}`}>{DealerData?.contactMobileNumber}</div>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={4} lg={5} xl={5}>
                                                        <div className={styles.contentHeading}>Email ID</div>
                                                        <div className={`${styles.contentData} ${styles.textEllipsis}`}>{DealerData?.contactEmail}</div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                                <Button icon={<PlusOutlined />} className={styles.floatRight} type="primary" onClick={handleAdd}>
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
                        ) : (
                            ''
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
                                description={<span> No record found.</span>}
                            >
                                {/* {!qualificationData?.length ? (
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" onClick={handleAdd}>
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
                        <DataTable isLoading={isLoading} {...tableProps} onChange={onChange} />
                    </ConfigProvider>
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const UserManagementManufacturer = connect(mapStateToProps, mapDispatchToProps)(UserManagementManufacturerMain);
