import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Empty, notification, ConfigProvider, Col, Form, Row, Input, Space, Tablet, Tree, List, Drawer, Switch, Collapse, Checkbox, Card, Divider } from 'antd';

import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft, FaRegTimesCircle } from 'react-icons/fa';
import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
import { showGlobalNotification } from 'store/actions/notification';
import { EditIcon, ViewEyeIcon } from 'Icons';
import { addToolTip } from 'utils/customMenuLink';
import { geoDataActions } from 'store/actions/data/geo';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import DrawerUtil, { AddEditForm } from './AddEditForm';
import { rolemanagementDataActions } from 'store/actions/data/roleManagement';
import { menuDataActions } from 'store/actions/data/menu';

import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { validateEmailField } from 'utils/validation';
import viewStyle from 'components/common/Common.module.css';
import styles from 'components/common/Common.module.css';
import { escapeRegExp } from 'utils/escapeRegExp';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { DataTable } from 'utils/dataTable';
import { ViewRoleManagement } from './ViewRoleManagement';

const { Search } = Input;

const initialTableData = [{ roleId: 'PM001' }, { roleName: 'PM002', activeIndicator: 1 }];

const mapStateToProps = (state) => {
    console.log('state', state);
    const {
        auth: { userId },
        data: {
            RoleManagement: { MenuTreeData = [], RoleData = [], isLoaded: isDataLoaded = false, isLoadingOnSave, data: RoleManagementData = [], isLoading, isFormDataLoaded },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
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
    const [openDrawer, setOpenDrawer] = useState(false);
    const [formActionType, setFormActionType] = useState('');
    const [footerEdit, setFooterEdit] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [closePanels, setClosePanels] = React.useState([]);
    const [viewData, setViewData] = useState({});
    const [successAlert, setSuccessAlert] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [showSaveAndAddNewBtn, setShowSaveAndAddNewBtn] = useState(false);
    const [showSaveBtn, setShowSaveBtn] = useState(true);
    const [MenuAlteredData, setMenuAlteredData] = useState();
    const [RowData, setRowData] = useState();
    const [saveClick, setSaveClick] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);
    const [formData, setFormData] = useState([]);
    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [saveAndAddNewBtnClicked, setSaveAndAddNewBtnClicked] = useState(false);

    // useEffect(() => {
    //     FilterMenudata(MenuTreeData);
    // }, [MenuTreeData]);

    useEffect(() => {
        fetchRole({ setIsLoading: listShowLoading, userId, id: RowData?.id });

        console.log('This is the Specfic Role Data : ', RowData);
    }, [RowData]);
    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId });
            fetchMenuList({ setIsLoading: listShowLoading, userId });

            console.log('This is the Menus Data : ', MenuTreeData);
        }
    }, [isDataLoaded, userId]);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    useEffect(() => {
        setSearchdata(RoleManagementData);
        console.log('RoleManagementData  : ', RoleManagementData);
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
        console.log('values', values);
        const recordId = selectedRecord?.id || '';
        const data = {
            ...values,
            id: RowData?.id,
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
            setSuccessAlert(true);
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

    const viewProps = {
        isVisible: isViewModeVisible,
        titleOverride: 'View '.concat(moduleTitle),
        onCloseAction: () => setIsViewModeVisible(false),
        viewData,
        setClosePanels,
        viewStyle,
        viewTitle: 'Role Management',
    };

    const handleAdd = () => {
        form.resetFields()
        setFormData([]);
        setFormActionType('add');
        setShowSaveAndAddNewBtn(true);
        console.log("formData",formData)
        setFooterEdit(false);
        setShowSaveBtn(true);

        setIsFormVisible(true);
        setIsReadOnly(false);
    };

    // const handleUpdate = (record) => {
    //     setFormActionType('update');
    //     setOpenDrawer(true);
    //     setFooterEdit(false);
    //     setShowSaveAndAddNewBtn(false);
    //     setSaveBtn(true);
    //     setRowData(record);

    //     form.setFieldsValue({
    //         roleId: record.roleId,
    //         roleName: record.roleName,
    //         roleDesceription: record.roleDesceription,
    //         activeIndicator: record.activeIndicator,
    //     });
    // };

    const handleEditBtn = (record) => {
        setShowSaveAndAddNewBtn(false);
        setFormActionType('update');
        setFooterEdit(false);
        setIsReadOnly(false);
        setShowSaveBtn(true);
        setFormData(record);
        console.log(record, 'formData', formData);
        setIsFormVisible(true);
    };
    const handleView = (record) => {
        // setFormActionType('view');
        setShowSaveAndAddNewBtn(false);
        setShowSaveBtn(false);
        setFooterEdit(true);
        setViewData(record);
        // setIsFormVisible(true);
        setIsViewModeVisible(true);

        // setIsReadOnly(true);
    };

    const handleEditData = (record) => {
        setShowSaveAndAddNewBtn(false);
        setFooterEdit(false);
        setShowSaveBtn(true);

        setIsReadOnly(false);
    };

    // const handleUpdate2 = () => {
    //     setFormActionType('update');
    //     setIsReadOnly(false);
    //     setShowSaveAndAddNewBtn(false);
    //     setSaveBtn(true);

    //     setOpenDrawer(true);
    //     setFooterEdit(false);
    //     form.setFieldsValue({
    //         roleId: selectedRecord.roleId,
    //         roleName: selectedRecord.roleName,
    //         roleDesceription: selectedRecord.roleDesceription,
    //         activeIndicator: selectedRecord.activeIndicator,
    //     });
    // };

    // const handleView = (record) => {
    //     setFormActionType('view');
    //     setShowSaveAndAddNewBtn(false);

    //     setOpenDrawer(true);
    //     setSaveBtn(false);

    //     setFooterEdit(true);
    //     setViewData(record);
    //     form.setFieldsValue({
    //         roleId: record.roleId,
    //         roleName: record.roleName,
    //         roleDesceription: record.roleDesceription,
    //         activeIndicator: record.activeIndicator,
    //     });
    //     console.log(form.getFieldValue('roleId'));
    //     setIsReadOnly(true);
    // };

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

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'srl',
            sorter: false,
            render: (_t, _r, i) => i + 1,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Role ID',
            dataIndex: 'roleId',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Role Name',
            dataIndex: 'roleName',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Role Description',
            dataIndex: 'roleDesceription',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'activeIndicator',
            render: (text, record) => <>{text === 1 ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>}</>,
        })
    );

    tableColumn.push(
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
        })
    );
    function Subpanel(arr) {
        arr.map((ele) => {
            if (ele.subMenu?.length) {
                ele['children'] = ele?.subMenu;
                ele['label'] = ele?.menuTitle;
                ele['value'] = ele?.menuId;
                ele.subMenu.forEach((child) => {
                    if (Array.isArray(child)) {
                        Subpanel(child);
                    }
                    {
                        Subpanel([child]);
                    }
                });
            } else {
                ele['label'] = ele?.menuTitle;
                ele['value'] = ele?.menuId;
                ele['children'] = [
                    { value: 'Upload' + ele?.menuId, label: 'Upload' },
                    { value: 'Delete' + ele?.menuId, label: 'Delete' },
                    { value: 'Read' + ele?.menuId, label: 'Read' },
                    { value: 'Create' + ele?.menuId, label: 'Create' },
                    { value: 'Update' + ele?.menuId, label: 'Update' },
                    { value: 'View' + ele?.menuId, label: 'View' },
                ];
                return;
            }
        });
        // arr?.map((row) => {
        //     console.log('I am recursing the Row : : ', row);
        //     if (row?.subMenu && row?.subMenu?.length) {
        //         row?.subMenu?.forEach((ele) => {
        //             Subpanel(ele);
        //         });
        //     } else {
        //         return;
        //     }
        // });
    }

    // const FilterMenudata = (MenuTreeData) => {
    //     Subpanel(MenuTreeData);
    //     setMenuAlteredData(MenuTreeData);
    //     console.log('This is the Manipulated Data : ', MenuTreeData);
    // };

    function TreeNodeWithCheckbx({ title, key }) {
        console.log('khauoukjbk', title);
        const [checked, setChecked] = useState(false);
        const handleCheckBoChecj = () => {
            console.log('hello');
        };
        return (
            <Tree.TreeNode title={title} key={key}>
                <Checkbox checked={checked} onChange={handleCheckBoChecj} />
            </Tree.TreeNode>
        );
    }

    const renderTreeNodes = (data) => {
        console.log('data5', data);
        return data?.children?.map((node) => {
            if (node.leafNode !== null) {
                console.log('hcgcgc', node);
                console.log('befir Checkbox', node.leafNode?.title);
                return <TreeNodeWithCheckbx key={node.key} title={node.title} />;
            } else {
                console.log('hello1', node.title);

                return (
                    <Tree.TreeNode key={node.key} title={node.title}>
                        {console.log('node', node, 'node.title', node.title, 'hshj', node.children)}
                        {renderTreeNodes(node.children)}
                    </Tree.TreeNode>
                );
            }
        });
    };

    // const TreeNode = ({ node })=>  {
    //     const { children, label } = node;

    //     const [showChildren, setShowChildren] = useState(false);

    //     const handleClick = () => {
    //       setShowChildren(!showChildren);
    //     };
    //     return (
    //       <>
    //         <div onClick={handleClick} style={{ marginBottom: "10px" }}>
    //           <span>{label}</span>
    //         </div>
    //         <ul style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}>
    //           {showChildren && <Tree treeData={children} />}
    //         </ul>
    //       </>
    //     );
    //   }
    // const Tree = ({ treeData }) => {
    //     return (
    //       <ul>
    //         {treeData?.map((node) => (
    //           <TreeNode node={node} key={node.key} />

    //         ))}
    //       </ul>
    //     );
    //   }

    const viewRoleProps = {};

    const formProps = {
        RowData,
        RoleData,
        MenuAlteredData,
        setSaveClick,
        form,

        setFormBtnDisable,
        formBtnDisable,
        isLoadingOnSave,
        showSaveBtn,
        showSaveAndAddNewBtn,
        isVisible: isFormVisible,
        titleOverride: (formData?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
        onCloseAction: () => {
            form.resetFields();
            setIsFormVisible(false);
            setFormData([]);
        },
        isReadOnly,
        formData,
        setIsReadOnly,
        handleEditData,
        isFormBtnActive,
        setFormBtnActive,
        setSaveAndAddNewBtnClicked,
        onFinish,
        footerEdit,
        formActionType,
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
                                    <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleRefresh} danger />

                                    <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
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
                                            <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
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
            <ViewRoleManagement {...viewProps} />
        </>
    );
};

export const RoleManagement = connect(mapStateToProps, mapDispatchToProps)(RoleManagementMain);
