import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Empty, notification, ConfigProvider, Col, Form, Row, Input, Space, Table, List, Drawer, Switch, Collapse, Checkbox, Card, Tree, Divider } from 'antd';

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
import treeData from './Treedata.json';
import styles from '../DrawerAndTable.module.css';
import style from './RoleManagement.module.css';
import { escapeRegExp } from 'utils/escapeRegExp';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { DataTable } from 'utils/dataTable';

const { Search } = Input;

const initialTableData = [{}];

const mapStateToProps = (state) => {
    console.log('state', state);
    const {
        auth: { userId },
        data: {
            RoleManagement: { isLoaded: isDataLoaded = false, data: RoleManagementData = [] },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        RoleManagementData,
        isDataAttributeLoaded,
        attributeData: attributeData?.filter((i) => i),
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

            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

export const RoleManagementMain = ({ onSaveShowLoading, userId, isDataLoaded, RoleManagementData, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading }) => {
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

    // useEffect(() => {
    //     if (!isDataLoaded && userId) {
    //         fetchList({ setIsLoading: listShowLoading, userId });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isDataLoaded, userId]);

    useEffect(() => {
        setSearchdata(RoleManagementData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [RoleManagementData]);

    // useEffect(() => {
    //     if (userId) {
    //         fetchList({ setIsLoading: listShowLoading, userId });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [refreshData, userId]);

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
        const data = { ...values, id: recordId };

        const onSuccess = (res) => {
            onSaveShowLoading(false);
            form.resetFields();
            setSelectedRecord({});
            setSuccessAlert(true);
            fetchList({ setIsLoading: listShowLoading, userId });
            setOpenDrawer(false);
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        };

        const onError = (message) => {
            onSaveShowLoading(false);
            showGlobalNotification({ notificationType: 'error', title: 'Error', message, placement: 'bottom-right' });
        };

        const requestData = {
            data: [data],
            setIsLoading: onSaveShowLoading,
            userId,
            onError,
            onSuccess,
        };

        // saveData(requestData);
    };

    const viewProps = {
        viewData,
        setClosePanels,
        styles,
        viewTitle: 'Role Management',
    };

    const handleUpdate = (record) => {
        setFormActionType('update');
        setOpenDrawer(true);
        setFooterEdit(false);

        form.setFieldsValue({
            roleId: record.roleId,
            roleName: record.roleName,
            roleDesceription: record.roleDesceription,
            activeIndicator: record.activeIndicator,
        });
    };
    const handleView = (record) => {
        setFormActionType('view');
        setOpenDrawer(true);
        setFooterEdit(true);
        setViewData(record);
        form.setFieldsValue({
            roleId: record.roleId,
            roleName: record.roleName,
            roleDesceription: record.roleDesceription,
            activeIndicator: record.activeIndicator,
        });
        setIsReadOnly(true);
    };
    const handleAdd = () => {
        setFormActionType('add');

        setOpenDrawer(true);
        setFooterEdit(false);
    };

    const handleUpdate2 = () => {
        setFormActionType('update');
        setOpenDrawer(true);
        setFooterEdit(false);
        form.setFieldsValue({
            roleId: selectedRecord.roleId,
            roleName: selectedRecord.roleName,
            roleDesceription: selectedRecord.roleDesceription,
            activeIndicator: selectedRecord.activeIndicator,
        });
    };

    const handleReferesh = () => {
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
            dataIndex: 'status',
            render: (text, record) => <>{text ? <div className={style.activeText}>Active</div> : <div className={style.InactiveText}>Inactive</div>}</>,
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

                            {RoleManagementData?.length ? (
                                <Col className={styles.addGroup} xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Button className={style.refreshBtn} onClick={handleReferesh} danger>
                                        <TfiReload />
                                    </Button>

                                    <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
                                        Add Role
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
                        <DataTable tableData={searchData} tableColumn={tableColumn} />
                    </ConfigProvider>
                </Col>
            </Row>
            <DrawerUtil setIsReadOnly={setIsReadOnly} handleUpdate2={handleUpdate2} formBtnDisable={formBtnDisable} setFormBtnDisable={setFormBtnDisable} onFinish={onFinish} footerEdit={footerEdit} formActionType={formActionType} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        </>
    );
};

export const RoleManagement = connect(mapStateToProps, mapDispatchToProps)(RoleManagementMain);
