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
import DrawerUtil from './DrawerUtil';
import { rolemanagementDataActions } from 'store/actions/data/roleManagement';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { validateEmailField } from 'utils/validation';
import viewStyle from 'components/common/Common.module.css';
import styles from '../DrawerAndTable.module.css';
import style from './RoleManagement.module.css';
import { escapeRegExp } from 'utils/escapeRegExp';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { DataTable } from 'utils/dataTable';

const { Search } = Input;

const initialTableData = [{ roleId: 'PM001' }, { roleName: 'PM002', activeIndicator: 1 }];

const mapStateToProps = (state) => {
    console.log('state', state);
    const {
        auth: { userId },
        data: {
            RoleManagement: { isLoaded: isDataLoaded = false, isLoadingOnSave, data: RoleManagementData = [], isLoading, isFormDataLoaded },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        isLoading,
        isDataLoaded,
        RoleManagementData,
        isLoadingOnSave,
        isFormDataLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: rolemanagementDataActions.fetchList,
            saveData: rolemanagementDataActions.saveData,
            listShowLoading: rolemanagementDataActions.listShowLoading,
            onSaveShowLoading: rolemanagementDataActions.onSaveShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const RoleManagementMain = ({ isLoading,showGlobalNotification, isLoadingOnSave, onSaveShowLoading, userId, isDataLoaded, RoleManagementData, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading }) => {
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
    const [saveAndSaveNew, setSaveAndSaveNew] = useState(false);
    const [saveBtn, setSaveBtn] = useState(false);
    const [saveClick, setSaveClick] = useState();

    const treeData = [
        {
            key: '1',
            title: 'Node 1',
            children: [
                {
                    key: '1-1',
                    title: 'Node 1-1',
                    leafNode: [
                        { title: 'opt 1', key: 'option1' },
                        { title: 'opt 2', key: 'option2' },
                    ],
                },
            ],
        },
    ];

    const treeData77 = [
        {
            key: '0',
            label: 'Documents',
            children: [
                {
                    key: '0-0',
                    label: 'Document 1-1',
                    children: [
                        {
                            key: '0-1-1',
                            label: 'Document-0-1.doc',
                        },
                        {
                            key: '0-1-2',
                            label: 'Document-0-2.doc',
                        },
                    ],
                },
            ],
        },
        {
            key: '1',
            label: 'Desktop',
            children: [
                {
                    key: '1-0',
                    label: 'document1.doc',
                },
                {
                    key: '0-0',
                    label: 'documennt-2.doc',
                },
            ],
        },
        {
            key: '2',
            label: 'Downloads',
            children: [],
        },
    ];

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
                const filterDataItem = RoleManagementData?.filter((item) => filterFunction(filterString)(item?.roleManagementId) || filterFunction(filterString)(item?.roleManagementName));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
            } else {
                setSearchdata(RoleManagementData?.map((el, i) => ({ ...el, srl: i + 1 })));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, RoleManagementData]);

    const onFinish = (values) => {
        const recordId = selectedRecord?.id || '';
        const data = {
            ...values,
            id: '',
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
            onSaveShowLoading(false);
            form.resetFields();
            setSelectedRecord({});
            setSuccessAlert(true);
            fetchList({ setIsLoading: listShowLoading, userId });
            if (saveClick === true) {
                setOpenDrawer(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            } else {
                setOpenDrawer(true);
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
        viewData,
        setClosePanels,
        viewStyle,
        viewTitle: 'Role Management',
    };

    const handleAdd = () => {
        setFormActionType('add');
        setSaveAndSaveNew(true);
        setSaveBtn(true);

        setOpenDrawer(true);
        setSaveClick(false)
        setFooterEdit(false);
    };

    const handleUpdate = (record) => {
        setFormActionType('update');
        setOpenDrawer(true);
        setFooterEdit(false);
        setSaveAndSaveNew(false);
        setSaveBtn(true);

        form.setFieldsValue({
            roleId: record.roleId,
            roleName: record.roleName,
            roleDesceription: record.roleDesceription,
            activeIndicator: record.activeIndicator,
        });
    };

    const handleUpdate2 = () => {
        setFormActionType('update');
        setIsReadOnly(false);
        setSaveAndSaveNew(false);
        setSaveBtn(true);

        setOpenDrawer(true);
        setFooterEdit(false);
        form.setFieldsValue({
            roleId: selectedRecord.roleId,
            roleName: selectedRecord.roleName,
            roleDesceription: selectedRecord.roleDesceription,
            activeIndicator: selectedRecord.activeIndicator,
        });
    };

    const handleView = (record) => {
        setFormActionType('view');
        setSaveAndSaveNew(false);

        setOpenDrawer(true);
        setSaveBtn(false);

        setFooterEdit(true);
        setViewData(record);
        form.setFieldsValue({
            roleId: record.roleId,
            roleName: record.roleName,
            roleDesceription: record.roleDesceription,
            activeIndicator: record.activeIndicator,
        });
        console.log(form.getFieldValue('roleId'));
        setIsReadOnly(true);
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
            render: (text, record) => <>{text === 1 ? <div className={style.activeText}>Active</div> : <div className={style.InactiveText}>Inactive</div>}</>,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Actions',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space>
                        {<Button icon={<EditIcon />} className={style.tableIcons} danger ghost aria-label="fa-edit" onClick={() => handleUpdate(record)} />}
                        {<Button icon={<ViewEyeIcon />} className={style.tableIcons} danger ghost aria-label="ai-view" onClick={() => handleView(record)} />}
                    </Space>
                );
            },
        })
    );

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

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                <Row gutter={20}>
                                    <div className={style.searchAndLabelAlign}>
                                        <Col xs={6} sm={6} md={6} lg={6} xl={6} className={style.subheading}>
                                            Role List
                                        </Col>
                                        <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                                            <Search
                                                placeholder="Search"
                                                style={{
                                                    width: 300,
                                                }}
                                                allowClear
                                                onSearch={onSearchHandle}
                                                onChange={onChangeHandle}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Col>
                            {/*code to be changed once API is integrated */}
                            {true ? (
                                <Col className={styles.addGroup} xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Button icon={<TfiReload />} className={style.refreshBtn} onClick={handleRefresh} danger />

                                    <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
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
                                            <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
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
                        <DataTable isLoading={isLoading} tableData={searchData} tableColumn={tableColumn} />
                    </ConfigProvider>
                </Col>
            </Row>
            {console.log('treeData jsx', treeData)}
            <Tree>{renderTreeNodes(treeData)}</Tree>
            {/* <Tree treeData={treeData} /> */}
            <DrawerUtil setSaveClick={setSaveClick} form={form} viewData={viewData} viewProps={viewProps} setFormBtnDisable={setFormBtnDisable} formBtnDisable={formBtnDisable} isLoadingOnSave={isLoadingOnSave} saveBtn={saveBtn} saveAndSaveNew={saveAndSaveNew} isReadOnly={isReadOnly} setIsReadOnly={setIsReadOnly} handleUpdate2={handleUpdate2} onFinish={onFinish} footerEdit={footerEdit} formActionType={formActionType} open={openDrawer} setOpenDrawer={setOpenDrawer} />
        </>
    );
};

export const RoleManagement = connect(mapStateToProps, mapDispatchToProps)(RoleManagementMain);
