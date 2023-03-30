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
import styles from 'pages/common/Common.module.css';
import style from './RoleManagement.module.css';
import { escapeRegExp } from 'utils/escapeRegExp';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { DataTable } from 'utils/dataTable';

const { Search } = Input;

const mapStateToProps = (state) => {
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

            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

export const RoleManagementMain = ({ userId, isDataLoaded, RoleManagementData, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading }) => {
    const [filterString, setFilterString] = useState();
    const [searchData, setSearchdata] = useState(RoleManagementData);
    const [RefershData, setRefershData] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleUpdate = () => {};
    const handleView = () => {};
    const handleAdd = () => {
        setOpenDrawer(true);
    };
    useEffect(() => {
        if (isDataLoaded && RoleManagementData) {
            if (filterString) {
                const filterDataItem = RoleManagementData?.filter((item) => filterFunction(filterString)(item?.criticalityGroupCode) || filterFunction(filterString)(item?.criticalityGroupName));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
            } else {
                setSearchdata(RoleManagementData?.map((el, i) => ({ ...el, srl: i + 1 })));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, RoleManagementData]);

    const handleReferesh = () => {
        setRefershData(!RefershData);
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

    const onClose = () => {
        setOpenDrawer(false);
    };

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'srl',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Role ID',
            dataIndex: 'roleid',
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
            dataIndex: 'roleDescription',
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

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                <Row gutter={20}>
                                    <div className={style.searchAndLabelAlign}>
                                        <Col xs={10} sm={10} md={10} lg={10} xl={10} className={style.subheading}>
                                            Criticality Group List
                                        </Col>
                                        <Col xs={14} sm={14} md={14} lg={14} xl={14}>
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
                                                Add Group
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
            <DrawerUtil onClose={onClose} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        </>
    );
};

export const RoleManagement = connect(mapStateToProps, mapDispatchToProps)(RoleManagementMain);
