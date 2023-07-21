/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Empty, ConfigProvider, Col, Form, Row, Input, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
import { showGlobalNotification } from 'store/actions/notification';
import { EditIcon, ViewEyeIcon } from 'Icons';
import { AddEditForm } from './AddEditForm';
import { rolemanagementDataActions } from 'store/actions/data/roleManagement';
import styles from 'components/common/Common.module.css';
import { escapeRegExp } from 'utils/escapeRegExp';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { DataTable } from 'utils/dataTable';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            RoleManagement: { MenuTreeData = [], RoleData = [], isLoaded: isDataLoaded = false, isLoadingOnSave, data: RoleManagementData = [], isLoading, isFormDataLoaded },
            HierarchyAttributeMaster: { data: attributeData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'Role Management';

    let returnValue = {
        collapsed,
        userId,
        isLoading,
        isDataLoaded,
        RoleManagementData,
        isLoadingOnSave,
        moduleTitle,
        MenuTreeData,
        RoleData,
        attributeData: attributeData?.filter((i) => i),
        isFormDataLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: rolemanagementDataActions.fetchList,
            fetchMenuList: rolemanagementDataActions.fetchMenuList,
            fetchRole: rolemanagementDataActions.fetchRole,
            saveData: rolemanagementDataActions.saveData,
            listShowLoading: rolemanagementDataActions.listShowLoading,
            onSaveShowLoading: rolemanagementDataActions.onSaveShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const RoleManagementMain = ({ moduleTitle, isLoading, showGlobalNotification, MenuTreeData, RoleData, fetchRole, fetchMenuList, isLoadingOnSave, onSaveShowLoading, userId, isDataLoaded, RoleManagementData, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading }) => {
    const [form] = Form.useForm();

    const [filterString, setFilterString] = useState();
    const [searchData, setSearchdata] = useState(RoleManagementData);
    const [refreshData, setRefreshData] = useState(false);
    const [footerEdit, setFooterEdit] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [showSaveAndAddNewBtn, setShowSaveAndAddNewBtn] = useState(false);
    const [showSaveBtn, setShowSaveBtn] = useState(true);
    // const [RowData, setRowData] = useState();
    // const [saveClick, setSaveClick] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);
    const [formData, setFormData] = useState([]);
    const [isFormBtnActive, setFormBtnActive] = useState(false);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId });
            fetchMenuList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    useEffect(() => {
        setSearchdata(RoleManagementData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [RoleManagementData]);

    useEffect(() => {
        if (userId) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshData, userId]);

    useEffect(() => {
        if (isDataLoaded && RoleManagementData) {
            if (filterString) {
                const filterDataItem = RoleManagementData?.filter((item) => filterFunction(filterString)(item?.roleId) || filterFunction(filterString)(item?.roleName) || filterFunction(filterString)(item?.roleDesceription));
                setSearchdata(filterDataItem);
            } else {
                setSearchdata(RoleManagementData);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, RoleManagementData]);

    const onFinish = (values) => {
        const recordId = selectedRecord?.id || '';
        const data = {
            ...values,
            id: '1',
            webRoleApplicationMapping: [
                {
                    id: '',
                    activeIndicator: true,
                    applicationId: '4af77de8-363e-480e-bdac-e6c836c8467c',
                    subApplication: [
                        {
                            id: '',

                            activeIndicator: true,

                            applicationId: '8f4d4288-6862-48eb-ab5e-c089972cf0e8',
                            subApplication: [],

                            roleActionMapping: [
                                {
                                    id: '',

                                    actionId: 'e8e4493a-07fb-4fdc-9908-038ff8818173',

                                    activeIndicator: true,
                                },
                            ],
                        },
                    ],
                    roleActionMapping: [
                        {
                            id: '',

                            actionId: 'e8e4493a-07fb-4fdc-9908-038ff8818173',

                            activeIndicator: true,
                        },
                    ],
                },
            ],
            mobileRoleApplicationMapping: [
                {
                    id: '',

                    activeIndicator: true,

                    applicationId: 'a0fc205b-6fcf-4dd3-86dc-f382ac924335',

                    subApplication: [],

                    roleActionMapping: [
                        {
                            id: '',

                            actionId: 'e8e4493a-07fb-4fdc-9908-038ff8818173',

                            activeIndicator: true,
                        },
                    ],
                },
            ],
        };

        const onSuccess = (res) => {
            form.resetFields();
            setSelectedRecord({});
            fetchList({ setIsLoading: listShowLoading, userId });
            if (showSaveAndAddNewBtn === true || recordId) {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            } else {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            }
        };

        const onError = (message) => {
            onSaveShowLoading(false);
            showGlobalNotification({ notificationType: 'error', title: 'Error', message, placement: 'bottomRight' });
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

    const handleEditData = (record) => {
        setIsViewModeVisible(false);
        setShowSaveAndAddNewBtn(false);
        setFooterEdit(false);
        setShowSaveBtn(true);

        setIsReadOnly(false);
    };

    const handleAdd = () => {
        form.resetFields();
        setIsViewModeVisible(false);
        setFormData([]);
        setShowSaveAndAddNewBtn(true);
        setFooterEdit(false);
        setShowSaveBtn(true);
        setIsFormVisible(true);
        setIsReadOnly(false);
    };

    const handleEditBtn = (record) => {
        setShowSaveAndAddNewBtn(false);
        setFooterEdit(false);
        setIsReadOnly(false);
        setShowSaveBtn(true);
        setFormData(record);
        setIsViewModeVisible(false);
        setIsFormVisible(true);
    };
    const handleView = (record) => {
        setShowSaveAndAddNewBtn(false);
        setShowSaveBtn(false);
        setFooterEdit(true);
        setFormData(record);
        setIsFormVisible(true);
        setIsViewModeVisible(true);
    };

    const handleRefresh = () => {
        setRefreshData(!refreshData);
    };

    const filterFunction = (filterString) => (title) => {
        return title && title.match(new RegExp(escapeRegExp(filterString), 'i'));
    };

    const onSearchHandle = (value) => {
        setFilterString(value);
    };

    const onChangeHandle = (e) => {
        setFilterString(e.target.value);
    };

    const tableColumn = [
        tblPrepareColumns({
            title: 'Role ID',
            dataIndex: 'roleId',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'Role Name',
            dataIndex: 'roleName',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'Role Description',
            dataIndex: 'roleDesceription',
            ellipsis: true,
            width: 100,
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'activeIndicator',
            render: (text, record) => <>{text === 1 ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>}</>,
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Actions',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space>
                        {<Button icon={<EditIcon />} className={styles.tableIcons} danger ghost aria-label="fa-edit" onClick={() => handleEditBtn(record)} />}
                        {<Button icon={<ViewEyeIcon />} className={styles.tableIcons} danger ghost aria-label="ai-view" onClick={() => handleView(record)} />}
                    </Space>
                );
            },
            width: '10%',
        }),
    ];

    const drawerTitle = useMemo(() => {
        if (isViewModeVisible) {
            return 'View ';
        } else if (formData?.id) {
            return 'Edit ';
        } else {
            return 'Add ';
        }
    }, [isViewModeVisible, formData]);

    const formProps = {
        moduleTitle,
        setIsViewModeVisible,
        isViewModeVisible,
        //RowData,
        RoleData,
        //setSaveClick,
        form,
        setFormBtnDisable,
        formBtnDisable,
        isLoadingOnSave,
        showSaveBtn,
        showSaveAndAddNewBtn,
        isVisible: isFormVisible,
        titleOverride: drawerTitle.concat(moduleTitle),
        onCloseAction: () => {
            form.resetFields();
            setIsFormVisible(false);
            setFormData([]);
            setFormBtnActive(false);
        },
        isReadOnly,
        formData,
        setIsReadOnly,
        handleEditData,
        isFormBtnActive,
        setFormBtnActive,
        onFinish,
        footerEdit,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={5} xl={5} className={styles.lineHeight33}>
                                        Role List
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={19} xl={19}>
                                        <Search placeholder="Search" allowClear onSearch={onSearchHandle} onChange={onChangeHandle} className={styles.headerSearchField} />
                                    </Col>
                                </Row>
                            </Col>
                            {/*code to be changed once API is integrated */}
                            {true ? (
                                <Col className={styles.addGroup} xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleRefresh} danger aria-label="fa-ref" />

                                    <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" onClick={handleAdd}>
                                        Add New Role
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
                                    !RoleManagementData?.length ? (
                                        <span>
                                            No records found. Please add new Role <br />
                                            using below button
                                        </span>
                                    ) : (
                                        <span> No records found.</span>
                                    )
                                }
                            >
                                {!RoleManagementData?.length ? (
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" onClick={handleAdd}>
                                                Add Role
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
                            <DataTable isLoading={isLoading} tableData={searchData} tableColumn={tableColumn} />
                        </div>
                    </ConfigProvider>
                </Col>
            </Row>

            <AddEditForm {...formProps} />
        </>
    );
};

export const RoleManagement = connect(mapStateToProps, mapDispatchToProps)(RoleManagementMain);
