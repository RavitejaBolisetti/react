import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Card, Collapse, Form, Row, Empty, Input, Tree, Space, Switch } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';

import CardView from './CardView';
import styles from 'pages/common/Common.module.css';
import style from 'components/common/DrawerAndTable.module.css';
import styled from '../Common.module.css';
import styl from './ApplicationMaster.module.css';

import { menuDataActions } from 'store/actions/data/menu';

// import { ParentHierarchy } from '../parentHierarchy/ParentHierarchy';
import DrawerUtil from './DrawerUtil';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';

const { Search } = Input;
const { Text } = Typography;
const { Panel } = Collapse;
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

    const [isTreeViewVisible, setTreeViewVisible] = useState(true);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');


    const [isFormVisible, setFormVisible] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const [forceFormReset, setForceFormReset] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const [openAccordian, setOpenAccordian] = useState('');
    const disabledProps = { disabled: isReadOnly };
    const [drawer, setDrawer] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const [viewDetail, setViewDetail] = useState(false);

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


    const handleClick = () => {
        setIsActive(current => !current);
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
                                        {/* <Col xs={8} sm={8} md={8} lg={8} xl={8} className={style.subheading}>
                                            Application List
                                        </Col> */}
                                        <Row gutter={20} style={{ border: "1px" }}>

                                            <Space>
                                                <div className={styl.changeThemeBorder} >

                                                    <Button type="secondary" danger onClick={handleClick} 
                                                    style={{
                                                        backgroundColor: isActive ? '' : '#ff3e5b',
                                                        color: isActive ? '' : 'white',
                                                    }}
                                                    >
                                                        Web
                                                    </Button>

                                                    <Button type="secondary" danger onClick={handleClick} 
                                                    style={{
                                                        backgroundColor: isActive ? '#ff3e5b' : '',
                                                        color: isActive ? 'white' : '',
                                                    }}
                                                    >
                                                        Mobile
                                                    </Button>

                                                </div>
                                            </Space>

                                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>

                                                <Search
                                                    placeholder="Search"
                                                    style={{
                                                        width: 300,
                                                        borderColor: "red",
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
                                                No records found. <br /> Please
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
                    <>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}  >
                            {/* <div className={styles.contentHeaderBackground}>
                                <Row gutter={20}>
                                    <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                        <p style={{ fontSize: '16px', padding: '6px' }}> Application Details</p>
                                    </Col>
                                </Row>
                            </div> */}
                            <Card
                                title="Application Details"
                                className={styles.contentHeaderBackground}
                                // bordered={false}
                                style={{
                                    width: "100%",
                                    height: '55px'
                                }}
                                actions={[
                                    <>
                                        <Button danger className={style.cancelBtn} onClick={handleAdd}>
                                            Edit
                                        </Button>
                                        <Space >
                                            <Button key="addChild" htmlType="submit" type="primary">
                                                Add Child
                                            </Button>
                                            <Button key="addSibling" htmlType="submit" type="primary">
                                                Add Sibling
                                            </Button>
                                        </Space>
                                    </>

                                ]}
                            >

                                <div className={styled.content} >

                                    <Space
                                        direction="vertical"
                                        style={{
                                            display: 'flex',
                                        }}
                                    >
                                        <Row gutter={20}>
                                            <Col xs={14} sm={14} md={14} lg={14} xl={14} xxl={14}>
                                                <Text strong> Application ID</Text>
                                                <Text type="secondary"> AP0001</Text>
                                            </Col>
                                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                                <Text strong> Application Name</Text>
                                                <br></br>
                                                <Text type="secondary">Employee Empowerment</Text>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col  xs={14} sm={14} md={14} lg={14} xl={14} xxl={14}>
                                                <Text strong> Application Title</Text>
                                                <br></br>
                                                <Text type="secondary">Employee Title</Text>
                                            </Col>
                                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                                <Text strong>Application Type</Text>

                                                <Text type="secondary"> Transaction</Text>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={14} sm={14} md={14} lg={14} xl={14} xxl={14}>
                                                <Text strong>Parent Application</Text>
                                                <br></br>
                                                <Text type="secondary">Geo Product</Text>
                                            </Col>
                                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                                <Text type="secondary">Status: </Text>
                                                <Text type="success">Active</Text>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={14} sm={14} md={14} lg={14} xl={14} xxl={14}>
                                                <Text strong>Accessible Location</Text>
                                                <br></br>
                                                <Text type="secondary">Restricted Access</Text>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                                                <Text strong>Application Criticality Group</Text>
                                                <br></br>
                                                <Text type="secondary">Application Criticality</Text>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                                                <Text strong>Document not to be generated</Text>
                                                <br></br>
                                                <Text type="success">Active</Text>
                                            </Col>
                                        </Row>

                                        <Collapse expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />}  >
                                            <Panel header="Application Actions" key="2">

                                                <CardView />
                                            </Panel>
                                        </Collapse>
                                        <Collapse expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />}  >
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
            </Row >

            <DrawerUtil open={drawer} setDrawer={setDrawer} />
        </>
    );
};

export const ApplicationMaster = connect(mapStateToProps, mapDispatchToProps)(ApplicationMasterMain);
