import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Empty, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import LeftPanel from '../LeftPanel';

import styles from 'components/common/Common.module.css';
import style from 'components/common/DrawerAndTable.module.css';
import styl from './ApplicationMaster.module.css';

import { menuDataActions } from 'store/actions/data/menu';

import DrawerUtil from './DrawerUtil';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { EN } from 'language/en';
import { HierarchyFormButton } from '../Button';
import ViewApplicationDetail from './ViewApplicationDetails';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
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
        },
        dispatch
    ),
});

export const ApplicationMasterMain = ({ userId, isDataLoaded, listShowLoading, isDataAttributeLoaded, attributeData, applicationMasterDataShowLoading, fetchApplication, fetchApplicationCriticality, criticalityGroupData, fetchDealerLocations, fetchApplicationAction, saveApplicationDetails, menuData, fetchList, applicationDetailsData, dealerLocations }) => {
    const [form] = Form.useForm();
    const [applicationForm] = Form.useForm();

    const [formData, setFormData] = useState([]);
    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [drawer, setDrawer] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [menuType, setMenuType] = useState('w');
    const [searchValue, setSearchValue] = useState('');
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [closePanels, setClosePanels] = useState([]);
    const [selectedTreeData, setSelectedTreeData] = useState([]);
    const [isChildAllowed, setIsChildAllowed] = useState(true);
    const [finalFormdata, setFinalFormdata] = useState({
        applicationDetails: [],
        applicationAction: [],
        documentType: [],
        accessibleLocation: [],
    });

    console.log('applicationDetailsData', applicationDetailsData);

    const moduleTitle = 'Application Master';
    const viewTitle = 'Application Details';
    const fieldNames = { title: 'menuTitle', key: 'menuId', children: 'subMenu' };

    useEffect(() => {
        if (!userId) return;
        if (!criticalityGroupData?.length) {
            fetchApplicationCriticality({ setIsLoading: applicationMasterDataShowLoading });
        }
        if (!dealerLocations?.length) {
            fetchDealerLocations({ setIsLoading: applicationMasterDataShowLoading });
        }

        fetchList({ setIsLoading: applicationMasterDataShowLoading, userId, type: menuType }); //fetch menu data
        fetchApplicationAction({setIsLoading: applicationMasterDataShowLoading, userId, id: 'Finac'})

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, formActionType, menuType]);

    useEffect(() => {
        setSearchValue(menuData);
        // console.log('menuData', menuData);
    }, [menuData]);

    const handleAdd = () => {
        setDrawer(true);
    };

    const handleTypeClick = (type) => {
        setIsActive((current) => !current);
        setMenuType(type);
    };
    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const onFinish = (values) => {
        console.log(values);
        setFinalFormdata({ ...finalFormdata, ApplicationDetails: values });
    };

    const applicationCall = (key) => {
        // console.log('key', key);
        fetchApplication({ setIsLoading: applicationMasterDataShowLoading, id: '8c9c2231-166f-43aa-8633-3c3c795047fc' });

    };
    // const flatternData = generateList(menuData);
    // console.log('menuData flatternData', flatternData);

    const handleTreeViewClick = (keys) => {
        // console.log('keys===>', keys);
        form.resetFields();

        setFormData([]);
        // setSelectedTreeData([]);
        setSelectedTreeKey([]);
        if (keys && keys.length > 0) {
            setFormActionType('view');
            applicationCall(keys[0]);
            // const formData = flatternData.find((i) => keys[0] === i.data.applicationId);
            // console.log('formData', formData);
            // setSelectedTreeData(formData);
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
            setSelectedTreeKey(keys);
        } else {
            setIsChildAllowed(true);
        }
    };

    //view card footer button
    const handleButtonClick = (type) => {
        if (FROM_ACTION_TYPE.EDIT === type && applicationDetailsData?.length) {
            const { applicationAction, documentType, accessibleLocation, ...rest } = applicationDetailsData[0];
            applicationForm.setFieldValue({...rest});
            setFinalFormdata({ applicationDetails: rest, applicationAction, documentType, accessibleLocation });
            forceUpdate();
        } else {
            // parent data only
            setFinalFormdata();
        }
        // setFormData([]);
        setDrawer(true);
        setFormActionType(type);
    };

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
    const viewProps = {
        buttonData,
        attributeData,
        selectedTreeData,
        handleButtonClick,
        setClosePanels,
        styles,
        viewTitle,
    };

    const leftCol = menuData?.length > 0 ? 16 : 24;
    const rightCol = menuData?.length > 0 ? 8 : 24;

    const noDataTitle = EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);

    return (
        <>
            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20} className={styles.searchAndLabelAlign}>
                            <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                                <Row gutter={20} style={{ border: '1px' }} align="middle">
                                    <Col xs={10} sm={10} md={10} lg={10} xl={8}>
                                        <div className={styl.changeThemeBorder}>
                                            <Button
                                                type="secondary"
                                                danger
                                                onClick={() => handleTypeClick('w')}
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
                                                onClick={() => handleTypeClick('m')}
                                                style={{
                                                    backgroundColor: isActive ? '#ff3e5b' : '',
                                                    color: isActive ? 'white' : '',
                                                }}
                                            >
                                                Mobile
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                        <Search
                                            placeholder="Search"
                                            style={{
                                                width: '100%',
                                            }}
                                            allowClear
                                            // onChange={onChange}
                                            className={styles.searchField}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div className={styles.content}>
                        {menuData?.length <= 0 ? (
                            <div className={styles.emptyContainer}>
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={
                                        <span>
                                            {noDataTitle} <br /> {noDataMessage}
                                        </span>
                                    }
                                >
                                    <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
                                        Add
                                    </Button>
                                </Empty>
                            </div>
                        ) : (
                            <LeftPanel {...myProps} />
                        )}
                    </div>
                </Col>

                <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol} className={styles.padRight0}>
                    {selectedTreeKey?.length && applicationDetailsData?.length ? (
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <ViewApplicationDetail applicationDetailsData={applicationDetailsData} />

                            <div className={styles.hyrbuttonContainer}>
                                <HierarchyFormButton buttonData={buttonData} handleButtonClick={handleButtonClick} />
                            </div>
                        </Col>
                    ) : (
                        <div className={styles.emptyContainer}>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    <span>
                                        Please select product from left <br />
                                        side hierarchy to view “Application Details”
                                    </span>
                                }
                            ></Empty>
                        </div>
                    )}
                </Col>
            </Row>

            <DrawerUtil open={drawer} applicationForm={applicationForm} finalFormdata={finalFormdata} setFinalFormdata={setFinalFormdata} setDrawer={setDrawer} onFinish={onFinish} forceUpdate={forceUpdate} criticalityGroupData={criticalityGroupData}/>
        </>
    );
};

export const ApplicationMaster = connect(mapStateToProps, mapDispatchToProps)(ApplicationMasterMain);
