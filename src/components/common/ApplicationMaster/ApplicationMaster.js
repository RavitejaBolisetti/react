import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Card, Collapse, Form, Row, Empty, Input, Tree, Space, Switch } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import LeftPanel from '../LeftPanel';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';

import CardView from './CardView';

import styles from 'pages/common/Common.module.css';
import style from 'components/common/DrawerAndTable.module.css';
import styled from '../Common.module.css';
import ApplicationStyle from './ApplicationMaster.module.css';

import { menuDataActions } from 'store/actions/data/menu';

// import { ParentHierarchy } from '../parentHierarchy/ParentHierarchy';
import DrawerUtil from './DrawerUtil';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';
import ViewApplicationDetails from './ViewApplicationDetails';

const { Search } = Input;
const { Text } = Typography;
const { Panel } = Collapse;
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Menu: { isLoaded: isDataLoaded = false, filter, data: menuData = [], favouriteMenu = [] },
            ApplicationMaster: { applicationCriticalityGroupData: criticalityGroupData, applicationDetailsData, dealerLocations, applicationData },
        },
    } = state;

    let returnValue = {
        criticalityGroupData,
        applicationDetailsData,
        dealerLocations,
        userId,
        menuData: applicationData?.filter((el) => el?.menuId !== 'FAV'),
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

            fetchList: applicationMasterDataActions.fetchMenuList,
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
    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [isFormVisible, setFormVisible] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const [forceFormReset, setForceFormReset] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [TheFinalMenudata, setTheFinalMenudata] = useState(menuData);
    const [openAccordian, setOpenAccordian] = useState('');
    const disabledProps = { disabled: isReadOnly };
    const [drawer, setDrawer] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [menuType, setMenuType] = useState('W');
    const [searchValue, setSearchValue] = useState('');
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);


    const [FinalFormdata, setFinalFormdata] = useState({
        ApplicationDetails: [],
        ApplicationActions: [],
        DocumentType: [],
        AccessibleDealerLocation: [],
    });

    const [viewDetail, setViewDetail] = useState(false);

    useEffect(() => {
        if (!criticalityGroupData?.length) {
            fetchApplicationCriticality({ setIsLoading: applicationMasterDataShowLoading });
        }
        if (formActionType === 'rootChild') {
            fetchDealerLocations({ setIsLoading: applicationMasterDataShowLoading, applicationId: 'Web' });
        }

        fetchList({ setIsLoading: applicationMasterDataShowLoading, userId, type:menuType }); //fetch menu data
        // hierarchyAttributeFetchList({ setIsLoading: applicationMasterDataShowLoading, userId, type: 'Geographical' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType]);

    useEffect(() => {
        console.log('This is Finish Data', FinalFormdata);
    }, [FinalFormdata]);

    useEffect(() => {
        setSearchValue(menuData);
        console.log('menuData', menuData)
    }, [menuData]);

    const handleAdd = () => {
        setDrawer(true);
    };

    const onEditApplication = () => {
        setDrawer(true);
    };
    const onAddChild = () => {
        setDrawer(true);
    };
    const onAddClick = () => {
        setDrawer(true);
    };

    const handleClick = () => {
        setIsActive((current) => !current);
    };
    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const handleTreeViewClick = () => {
        return;
    };
    const onFinish = (values) => {
        console.log(values);
        setFinalFormdata({ ...FinalFormdata, ApplicationDetails: values });
    };

    const fieldNames = { title: 'menuTitle', key: 'menuId', children: 'subMenu' };
    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        selectedTreeSelectKey,
        fieldNames,
        handleTreeViewClick,
        treeData: menuData,
        setSearchValue,
        searchValue,
    };

    return (
        <>
            <Row span={24} gutter={20}>
                <Col Col xs={16} sm={16} md={16} lg={16} xl={16}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Row gutter={20}>
                                    <div className={style.searchAndLabelAlign}>
                                        <Row gutter={20} style={{ border: '1px' }}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                <Space>
                                                    <div className={ApplicationStyle.changeThemeBorder}>
                                                        <Button
                                                            type="secondary"
                                                            danger
                                                            onClick={handleClick}
                                                            style={{
                                                                backgroundColor: isActive ? '' : '#ff3e5b',
                                                                color: isActive ? '' : 'white',
                                                            }}
                                                        >
                                                            Web
                                                        </Button>

                                                        <Button
                                                            type="secondary"
                                                            danger
                                                            onClick={handleClick}
                                                            style={{
                                                                backgroundColor: isActive ? '#ff3e5b' : '',
                                                                color: isActive ? 'white' : '',
                                                            }}
                                                        >
                                                            Mobile
                                                        </Button>
                                                    </div>
                                                </Space>
                                            </Col>

                                            <Col xs={16} sm={16} md={16} lg={16} xl={12}>
                                                <Search
                                                    placeholder="Search"
                                                    style={{
                                                        width: '100%',
                                                        borderColor: 'red',
                                                    }}
                                                    allowClear
                                                    // onSearch={onSearchHandle}
                                                    // onChange={onChangeHandle}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    {/* </Col> */}

                    <div className={styled.content}>
                        {!treedata ? (
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={
                                        <>
                                            <span>
                                                No records found. <br /> Please
                                                <Text strong>"Add Application"</Text>
                                                using below button
                                                <Text strong>"Add Application"</Text>
                                                using below button
                                            </span>
                                        </>
                                    }
                                >
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
                                                Add
                                            </Button>
                                        </Col>
                                    </Row>
                                </Empty>
                            </Col>
                        ) : (
                            <>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    {/* <Tree
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
                                    /> */}
                                    <LeftPanel {...myProps} />
                                </Col>
                            </>
                        )}
                        {/* </Row> */}
                    </div>
                </Col>

                {true && (
                    <>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Card
                                title="Application Details"
                                // bordered={false}
                                className={ApplicationStyle.viewCardSize}
                                actions={[
                                    <>
                                        <Button onClick={onEditApplication} className={style.cancelBtn} type="primary">
                                            Edit
                                        </Button>
                                        <Space>
                                            <Button onClick={onAddChild} key="addChild" type="primary">
                                                Add Child
                                            </Button>
                                            <Button onClick={onAddClick} key="addSibling" type="primary">
                                                Add Sibling
                                            </Button>
                                        </Space>
                                    </>,
                                ]}
                            >
                                <div className={ApplicationStyle.cardBody}>
                                    <Space direction="vertical">
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                                                <p> Application ID </p>
                                                <span> AP0001</span>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                                                <p>Application Name</p>
                                                <span>Employee Empowerment</span>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                                                <p> Application Title</p>

                                                <span>Employee Title</span>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                                                <p>Application Type</p>

                                                <span> Transaction</span>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <p>Parent Application ID</p>
                                                <span>Geo Product</span>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                                                <p>Accessible Location</p>
                                                <span>Restricted Access</span>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                                                <p>Status </p>
                                                <span className={ApplicationStyle.activeText}>Active</span>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <p>Application Criticality Group</p>
                                                <span>Application Criticality</span>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <p>Document no. to be generated</p>
                                                <span className={ApplicationStyle.activeText}>Active</span>
                                            </Col>
                                        </Row>

                                        <Collapse expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}>
                                            <Panel header="Application Actions" key="2">
                                                <CardView />
                                            </Panel>
                                        </Collapse>
                                        <Collapse expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}>
                                            <Panel header="Document Types" key="3">
                                                <CardView />
                                            </Panel>
                                        </Collapse>
                                    </Space>
                                </div>
                            </Card>
                        </Col>
                    </>
                )}
            </Row>

            <DrawerUtil open={drawer} FinalFormdata={FinalFormdata} setFinalFormdata={setFinalFormdata} setDrawer={setDrawer} onFinish={onFinish} forceUpdate={forceUpdate} />
        </>
    );
};

export const ApplicationMaster = connect(mapStateToProps, mapDispatchToProps)(ApplicationMasterMain);
