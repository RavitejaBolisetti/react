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
import { showGlobalNotification } from 'store/actions/notification';


const { Search } = Input;

const mapStateToProps = (state) => {
    console.log('state===>', state);
    const {
        auth: { userId },
        data: {
            ApplicationMaster: { applicationCriticalityGroupData: criticalityGroupData, applicationDetailsData, dealerLocations, applicationData, configurableParamData, actions },
        },
    } = state;

    let returnValue = {
        criticalityGroupData,
        applicationDetailsData,
        dealerLocations,
        userId,
        configurableParamData,
        actions,
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

            fetchCriticalitiData: applicationMasterDataActions.fetchConfigurableParameterList,

            saveApplicationDetails: applicationMasterDataActions.saveApplicationDetails,

            fetchList: applicationMasterDataActions.fetchMenuList,
            listShowLoading: menuDataActions.listShowLoading,

            showGlobalNotification
        },
        dispatch
    ),
});

const initialFormData = {
    applicationDetails: {},
    applicationAction: [],
    documentType: [],
    accessibleLocation: [],
};

export const ApplicationMasterMain = ({ userId, isDataLoaded, listShowLoading, isDataAttributeLoaded, attributeData, applicationMasterDataShowLoading, fetchApplication, fetchApplicationCriticality, criticalityGroupData, fetchDealerLocations, fetchApplicationAction, saveApplicationDetails, menuData, fetchList, applicationDetailsData, configurableParamData, fetchCriticalitiData, actions, showGlobalNotification }) => {
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
    const [selectedTreeData, setSelectedTreeData] = useState([]);
    const [isChildAllowed, setIsChildAllowed] = useState(true);
    const [finalFormdata, setFinalFormdata] = useState(initialFormData);

    const moduleTitle = 'Application Master';
    const viewTitle = 'Application Details';
    const fieldNames = { title: 'menuTitle', key: 'menuId', children: 'subMenu' };

    console.log('dealerLocations', 'configurableParamData',configurableParamData, 'actions',actions)

    useEffect(() => {
        if (!userId) return;
        if (!criticalityGroupData?.length) {
            fetchApplicationCriticality({ setIsLoading: applicationMasterDataShowLoading });
        }
        // if (!dealerLocations?.length) {
        //     fetchDealerLocations({ setIsLoading: applicationMasterDataShowLoading });
        // }
        if(!actions?.length){
            fetchApplicationAction({ setIsLoading: applicationMasterDataShowLoading, userId, id: 'Finac' });
        }
        if(!criticalityGroupData?.length){
            fetchCriticalitiData({ setIsLoading: applicationMasterDataShowLoading });
        }
        fetchList({ setIsLoading: applicationMasterDataShowLoading, userId, type: menuType }); //fetch menu data
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, menuType]);

    useEffect(() => {
        // on serching menu/application in left panel/tree
        setSearchValue(menuData);
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
        const {  applicationDetails, applicationAction,documentType, accessibleLocation} = finalFormdata;
        const reqData = [{
            applicationAction,documentType, accessibleLocation,
            ...values
        }];
        console.log('onSubmit===>', reqData)
        // return;
        saveApplicationDetails({ setIsLoading: applicationMasterDataShowLoading, data:reqData })
        // setFinalFormdata({ ...finalFormdata, ApplicationDetails: values });
    };

    const onSuccess = (res) => {
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });

        if (res?.data) {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
            res?.data && setSelectedTreeData(res?.data);
            setSelectedTreeKey([res?.data?.id]);
            setFormActionType('view');
            // setFormBtnActive(false);
            // setIsFormVisible(false);
        }
    };
    const onError = (message) => {
        showGlobalNotification({ message });
    };

    const applicationCall = (key) => {
        fetchApplication({ setIsLoading: applicationMasterDataShowLoading, id: key });
    };

    const handleTreeViewClick = (keys) => {
        form.resetFields();

        setFormData([]);
        // setSelectedTreeData([]);
        setSelectedTreeKey([]);
        if (keys && keys.length > 0) {
            setFormActionType('view');
            applicationCall(keys[0]);
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
            setSelectedTreeKey(keys);
        } else {
            setIsChildAllowed(true);
        }
    };

    //view card footer button
    const handleButtonClick = (type) => {
        if (!applicationDetailsData?.length) return;

        const { applicationAction, documentType, accessibleLocation, ...rest } = applicationDetailsData[0];

        if (FROM_ACTION_TYPE.EDIT === type && applicationDetailsData?.length) {
            applicationForm.setFieldValue({ ...rest });
            setFinalFormdata({ applicationDetails: rest, applicationAction, documentType, accessibleLocation });
            forceUpdate();
        } else if (FROM_ACTION_TYPE.CHILD === type && applicationDetailsData?.length) {
            // parent data only  parentApplicationId
            setFinalFormdata({...initialFormData, applicationDetails: {parentApplicationId: rest?.applicationId} });
        } else if (FROM_ACTION_TYPE.SIBLING === type && applicationDetailsData?.length) {
            setFinalFormdata({...initialFormData, applicationDetails: {parentApplicationId: rest?.parentApplicationId} });
        }else {
            setFinalFormdata(initialFormData)
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
                                            allowClear
                                            // onChange={onChange}
                                            className={styl.anticon}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div className={styl.contentLeftPanel}>
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
                            <div className={` ${styl.leftPanelScroll}`}>
                                <LeftPanel {...myProps} />
                            </div>
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

            <DrawerUtil open={drawer} applicationForm={applicationForm} finalFormdata={finalFormdata} setFinalFormdata={setFinalFormdata} setDrawer={setDrawer} onFinish={onFinish} forceUpdate={forceUpdate} criticalityGroupData={criticalityGroupData} configurableParamData={configurableParamData} actions={actions} menuData={menuData} setSelectedTreeKey={setSelectedTreeKey} selectedTreeKey={selectedTreeKey}/>
        </>
    );
};

export const ApplicationMaster = connect(mapStateToProps, mapDispatchToProps)(ApplicationMasterMain);
