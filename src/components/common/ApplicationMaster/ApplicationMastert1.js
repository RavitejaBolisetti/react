import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Empty, Input, Tree } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft, FaRegTimesCircle } from 'react-icons/fa';

import style from '../Common.module.css';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { menuDataActions } from 'store/actions/data/menu';
import { PlusOutlined } from '@ant-design/icons';
// import { ParentHierarchy } from '../parentHierarchy/ParentHierarchy';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import AddEditForm from './AddEditForm';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';
import LeftPanel from '../LeftPanel';
import { escapeRegExp } from 'utils/escapeRegExp';

const { Search } = Input;

const treedata =    [ {
    id: '067c09fd-c6d2-4962-8743-76b553d71d5e',
    geoCode: 'GJ',
    geoName: 'Appl 1',
    attributeKey: '0eb57e6b-af05-4689-8e61-c9db39b6e85d',
    geoParentCode: 'APE',
    isActive: 'N',
    subGeo: [
        {
            id: '861c41f4-d831-4dff-b6a4-04678b4f7d17',
            geoCode: 'SUR',
            geoName: 'MEE',
            attributeKey: '0eb57e6b-af05-4689-8e61-c9db39b6e85d',
            geoParentCode: '067c09fd-c6d2-4962-8743-76b553d71d5e',
            isActive: 'N',
            subGeo: [
                {
                    id: 'bc386fc4-a79b-4b68-b05c-5f769d431a2e',
                    geoCode: '677677',
                    geoName: '677677',
                    attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                    geoParentCode: '861c41f4-d831-4dff-b6a4-04678b4f7d17',
                    isActive: 'N',
                    subGeo: [],
                },
            ],
        },
    ],
},
];

const fieldNames = { title: 'geoCode', key: 'id', children: 'subGeo' };


const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Menu: { isLoaded: isDataLoaded = false, filter, data: menuData = [], favouriteMenu = [] },
            ApplicationMaster: { applicationCriticalityGroupData: criticalityGroupData, applicationDetailsData, dealerLocations },
        },
    } = state;

    let returnValue = {
        criticalityGroupData,
        applicationDetailsData,
        dealerLocations,
        userId,
        menuData: menuData?.filter((el) => el?.menuId !== 'FAV'),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchApplication: applicationMasterDataActions.fetchApplicationDetails,
            fetchApplicationCriticality: applicationMasterDataActions.fetchApplicationCriticalityGroup,
            fetchDealerLocations: applicationMasterDataActions.fetchDealerLocations,
            fetchApplicationAction: applicationMasterDataActions.fetchApplicationAction,
            applicationMasterDataShowLoading: applicationMasterDataActions.listShowLoading,

            saveApplicationDetails: applicationMasterDataActions.saveApplicationDetails,

            fetchList: menuDataActions.fetchList,
            listShowLoading: menuDataActions.listShowLoading,

            // fetchList: geoDataActions.fetchList,
            // saveData: geoDataActions.saveData,
            // listShowLoading: geoDataActions.listShowLoading,

            // hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            // hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            // hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

export const ApplicationMasterMain = ({ userId, isDataLoaded, listShowLoading, isDataAttributeLoaded, attributeData, applicationMasterDataShowLoading, fetchApplication, fetchApplicationCriticality, criticalityGroupData, fetchDealerLocations, fetchApplicationAction, saveApplicationDetails, menuData, fetchList, applicationDetailsData, dealerLocations }) => {
   
    const filterFunction = (filterString) => (title) => {
        return title && title.match(new RegExp(escapeRegExp(filterString), 'i'));
    };

    const onSearchHandle = (value) => {
        // setFilterString(value);
    };

    const onChangeHandle = (e) => {
        // setFilterString(e.target.value);
    };

    const handleAdd = () => {};

    return (
        <Fragment>
            <Row wrap={false} className={style.content}>
                <Col flex="auto">
                    <Row className={style.contentHeader}>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4}  >
                            Hierarchy
                        </Col>
                        <Col xs={10} sm={10} md={10} lg={8} xl={8} >
                            <Search
                                placeholder="Search"
                                // style={{
                                //     width: '100%',
                                // }}
                                allowClear
                                onSearch={onSearchHandle}
                                onChange={onChangeHandle}
                            />
                        </Col>
                        {/* {criticalityGroupData?.length ? ( */}
                        <Col className={style.addGroup} xs={10} sm={10} md={10} lg={12} xl={12}>
                            <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
                                Add Application
                            </Button>
                        </Col>
                        {/* ) : (
                                ''
                            )} */}
                    </Row>
                    <Row span={24} >
                        <Col>
                            <Tree
                             checkable
                            //  onExpand={onExpand} 
                            //  expandedKeys={expandedKeys} 
                            //  autoExpandParent={autoExpandParent} 
                            //  onCheck={onCheck} 
                            //  checkedKeys={checkedKeys} 
                            //  onSelect={onSelect} 
                            //  selectedKeys={selectedKeys} 
                             treeData={treedata} 
                             fieldNames={fieldNames}
                            />
                        </Col>
                    </Row>
                </Col>

                {/* <Col xs={22} sm={8} md={8} lg={8} xl={8}>
                    <Row className={style.contentHeaderBackground}>
                        <Col>
                            <p>DETAIL SECTION</p>
                        </Col>
                    </Row>
                    <Row style={{ border: '1px solid grey' }}></Row>
                </Col> */}
            </Row>
        </Fragment>
    );
};

export const ApplicationMaster = connect(mapStateToProps, mapDispatchToProps)(ApplicationMasterMain);
