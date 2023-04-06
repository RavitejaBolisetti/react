import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Empty, Input, ConfigProvider, Tree } from 'antd';
import { FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft, FaRegTimesCircle } from 'react-icons/fa';
import { PlusOutlined } from '@ant-design/icons';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import styles from 'pages/common/Common.module.css';
import style from 'components/common/DrawerAndTable.module.css';
import styled from '../Common.module.css';

import { menuDataActions } from 'store/actions/data/menu';

// import { ParentHierarchy } from '../parentHierarchy/ParentHierarchy';
import DrawerUtil from './DrawerUtil';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';

const { Search } = Input;
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

const treedata = [
    {
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

export const ApplicationMasterMain = ({ userId, isDataLoaded, listShowLoading, isDataAttributeLoaded, attributeData, applicationMasterDataShowLoading, fetchApplication, fetchApplicationCriticality, criticalityGroupData, fetchDealerLocations, fetchApplicationAction, saveApplicationDetails, menuData, fetchList, applicationDetailsData, dealerLocations }) => {
    const [applicationform] = Form.useForm();
    const [applicationActionsform] = Form.useForm();
    const [documentTypesform] = Form.useForm();
    const [accessibleDealerLocationsform] = Form.useForm();

    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState({});

    const [isFormVisible, setFormVisible] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const [forceFormReset, setForceFormReset] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const [openAccordian, setOpenAccordian] = useState('');
    const [drawer, setDrawer] = useState(false);

    useEffect(() => {
        if (!criticalityGroupData?.length) {
            fetchApplicationCriticality({ setIsLoading: applicationMasterDataShowLoading });
        }
        if (formActionType === 'rootChild') {
            fetchDealerLocations({ setIsLoading: applicationMasterDataShowLoading, applicationId: 'Web' });
        }

        // fetchList({ setIsLoading: applicationMasterDataShowLoading, userId });//fetch menu data
        // hierarchyAttributeFetchList({ setIsLoading: applicationMasterDataShowLoading, userId, type: 'Geographical' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType]);


    const handleAdd = () => {
        setDrawer(true);
    };
    const fieldNames = { title: 'geoCode', key: 'id', children: 'subGeo' };

    // const fieldNames = { title: 'menuTitle', key: 'menuId', children: 'subMenu' };

    return (
        <>
            <Row span={24} gutter={20}>
                {/* <Col xs={24} sm={24} md={24} lg={24} xl={24}> */}
                <Col Col xs={16} sm={16} md={16} lg={16} xl={16}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                <Row gutter={20}>
                                    <div className={style.searchAndLabelAlign}>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} className={style.subheading}>
                                            Application List
                                        </Col>
                                        <Col xs={10} sm={10} md={10} lg={16} xl={16}>
                                            <Search
                                                placeholder="Search"
                                                style={{
                                                    width: 300,
                                                }}
                                                allowClear
                                                // onSearch={onSearchHandle}
                                                // onChange={onChangeHandle}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    {/* </Col> */}

                    <div className={styled.content}>
                        {/* <Row gutter={20}> */}
                        {treedata ? (
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={
                                        <>
                                            <span>
                                                No records found. <br /> Please "Add Application" using below button
                                            </span>
                                        </>
                                    }
                                >
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
                                                Add Application
                                            </Button>
                                        </Col>
                                    </Row>
                                </Empty>
                            </Col>
                        ) : (
                            <>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
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
                            </>
                        )}
                        {/* </Row> */}
                    </div>
                </Col>

                {true && (
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <div className={styles.contentHeaderBackground}>
                            <Row gutter={20}>
                                <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                    <p style={{ fontSize: '16px', padding: '6px' }}> Application Details</p>
                                </Col>
                            </Row>
                        </div>
                        <div className={styled.content}>
                            <Row>werty</Row>
                        </div>
                    </Col>
                )}
            </Row>

            <DrawerUtil open={drawer} setDrawer={setDrawer} />
        </>
    );
};

export const ApplicationMaster = connect(mapStateToProps, mapDispatchToProps)(ApplicationMasterMain);
