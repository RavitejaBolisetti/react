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
import style from './RoleManagement.module';
import { escapeRegExp } from 'utils/escapeRegExp';

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
    useEffect(() => {
        if (isDataLoaded && criticalityGroupData) {
            if (filterString) {
                const filterDataItem = criticalityGroupData?.filter((item) => filterFunction(filterString)(item?.criticalityGroupCode) || filterFunction(filterString)(item?.criticalityGroupName));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
            } else {
                setSearchdata(criticalityGroupData?.map((el, i) => ({ ...el, srl: i + 1 })));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, criticalityGroupData]);
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

                            {criticalityGroupData?.length ? (
                                <Col className={styles.addGroup} xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Button className={style.refreshBtn} onClick={handleReferesh} danger>
                                        <TfiReload />
                                    </Button>

                                    <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
                                        Add Group
                                    </Button>
                                </Col>
                            ) : (
                                ''
                            )}
                        </Row>
                    </div>
                </Col>
            </Row>
            <DrawerUtil />
        </>
    );
};

export const RoleManagement = connect(null, null)(RoleManagementMain);
