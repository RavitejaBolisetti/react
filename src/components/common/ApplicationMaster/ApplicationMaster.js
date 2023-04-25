import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Empty, Input, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// import styles from 'components/common/Common.module.css';
// import style from 'components/common/DrawerAndTable.module.css';
// import styl from './ApplicationMaster.module.css';

import { menuDataActions } from 'store/actions/data/menu';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';
import { showGlobalNotification } from 'store/actions/notification';

import LeftPanel from '../LeftPanel';
import ViewApplicationDetail from './ViewApplicationDetails';
import { DrawerUtil } from './DrawerUtil';
import { HierarchyFormButton } from '../Button';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { EN } from 'language/en';
import ViewApplicationDetailMain from './ViewApplicationDetailMain';

import styles from 'components/common/Common.module.css';
import styl from './ApplicationMaster.module.css';

const { Search } = Input;

const mapStateToProps = (state) => {
    console.log('state', state);
    const {
        auth: { userId },
        data: {
            ApplicationMaster: { applicationCriticalityGroupData: criticalityGroupData, applicationDetailsData, dealerLocations, applicationData, configurableParamData, actions, isApplicationDeatilsLoading, isApplicatinoOnSaveLoading, isLoading, isActionsLoaded },
        },
    } = state;
    const moduleTitle = 'Application Details';

    let returnValue = {
        criticalityGroupData: criticalityGroupData?.filter((i) => i?.activeIndicator),
        // criticalityGroupData,
        applicationDetailsData,
        dealerLocations,
        userId,
        configurableParamData,
        actions,
        moduleTitle,
        isApplicationDeatilsLoading,
        isApplicatinoOnSaveLoading,
        isLoading,
        // menuData: applicationData?.filter((el) => el?.menuId !== 'FAV'),
        menuData: applicationData,
        isActionsLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchApplication: applicationMasterDataActions.fetchApplicationDetails,
            applicationDetailListShowLoading: applicationMasterDataActions.detailListShowLoading,

            fetchApplicationCriticality: applicationMasterDataActions.fetchApplicationCriticalityGroup,
            fetchApplicationAction: applicationMasterDataActions.fetchApplicationAction,
            fetchCriticalitiData: applicationMasterDataActions.fetchConfigurableParameterList,

            applicationMasterDataShowLoading: applicationMasterDataActions.listShowLoading,

            onSaveShowLoading: applicationMasterDataActions.onSaveShowLoading,
            saveApplicationDetails: applicationMasterDataActions.saveApplicationDetails,

            fetchList: applicationMasterDataActions.fetchMenuList,
            applicationListShowLoading: menuDataActions.applicationListShowLoading,

            showGlobalNotification,
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

export const ApplicationMasterMain = ({ userId, isLoading, applicationListShowLoading, applicationMasterDataShowLoading, fetchApplication, fetchApplicationCriticality, criticalityGroupData, fetchDealerLocations, fetchApplicationAction, saveApplicationDetails, menuData, fetchList, applicationDetailsData, configurableParamData, fetchCriticalitiData, actions, showGlobalNotification, isApplicationDeatilsLoading, isApplicatinoOnSaveLoading, onSaveShowLoading, applicationDetailListShowLoading }) => {
    const [form] = Form.useForm();
    const [applicationForm] = Form.useForm();
    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [isVisible, setisVisible] = useState(false);

    const [isActive, setIsActive] = useState(false);
    const [menuType, setMenuType] = useState('W');
    const [searchValue, setSearchValue] = useState('');
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [finalFormdata, setFinalFormdata] = useState(initialFormData);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [isFieldDisable, setIsFieldDisable] = useState(false);

    const moduleTitle = 'Application Master';
    const fieldNames = { title: 'menuTitle', key: 'menuId', children: 'subMenu' };

    useEffect(() => {
        if (!userId) return;
        if (!criticalityGroupData?.length) {
            fetchApplicationCriticality({ setIsLoading: applicationMasterDataShowLoading });
        }
        if (!actions?.length) {
            fetchApplicationAction({ setIsLoading: applicationMasterDataShowLoading, userId, id: 'Finac' });
        }
        if (!criticalityGroupData?.length) {
            fetchCriticalitiData({ setIsLoading: applicationMasterDataShowLoading });
        }
        fetchList({ setIsLoading: applicationMasterDataShowLoading, userId, deviceType: menuType, sid: 'APPMST' }); //fetch menu data
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, menuType]);

    useEffect(() => {
        setSearchValue(menuData);
    }, [menuData]);

    const handleAdd = (type) => {
        setisVisible(true);
        setFormActionType(type);
        setIsReadOnly(false);
    };

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleTypeClick = (type) => {
        setIsActive((current) => !current);
        setMenuType(type);
    };
    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const onSuccess = (res) => {
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
        if (res?.data) {
            const { accessibleLocation, applicationAction, documentType, ...rest } = res?.data[0];

            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            fetchList({ setIsLoading: applicationMasterDataShowLoading, userId, deviceType: menuType, sid: 'APPMST' });

            applicationCall(rest?.applicationId);
            setSelectedTreeKey([rest?.applicationId]);

            setFormActionType('view');
            setisVisible(false);
        }
    };
    const onError = (message) => {
        showGlobalNotification({ message });
        onSaveShowLoading(false);
    };

    const onFinish = (values) => {
        const { applicationDetails, applicationAction, documentType, accessibleLocation } = finalFormdata;

        // let message = '';
        if (applicationAction?.length < 1) {
            return showGlobalNotification({ message: 'Please add application action to proceed' });
        }
        if (values?.documentNumRequired && documentType?.length < 1) {
            return showGlobalNotification({ message: 'Please add document types  to proceed' });
        }
        if (values?.accessableIndicator === '2' && accessibleLocation?.length < 1) {
            return showGlobalNotification({ message: 'Please add accessible location  to proceed' });
        }

        const actionData = applicationAction?.map(({ id, actionMasterId, status, ...rest }) => ({ id: id || '', actionMasterId, status }));
        const reqData = [
            {
                nodeType: '',
                id: values.id || '',
                ...values,
                documentType: documentType?.map((el) => ({ ...el, id: el.id || '' })),
                accessibleLocation: accessibleLocation?.map(({ dealerMasterLocationId, id }) => ({ id: id || '', dealerMasterLocationId: dealerMasterLocationId })),
                deviceType: menuType,
                applicationAction: actionData,
                accessableIndicator: Number(values?.accessableIndicator),
            },
        ];
        saveApplicationDetails({ setIsLoading: onSaveShowLoading, data: reqData, onSuccess, onError });
    };

    const applicationCall = (key) => {
        fetchApplication({ setIsLoading: applicationDetailListShowLoading, id: key });
    };

    const handleTreeViewClick = (keys) => {
        form.resetFields();

        setSelectedTreeKey([]);
        if (keys && keys.length > 0) {
            setFormActionType('view');
            applicationCall(keys[0]);
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
            setSelectedTreeKey(keys);
        }
    };

    const handleButtonClick = (type) => {
        if (!applicationDetailsData?.length) return;
        const { applicationAction, documentType, accessibleLocation, ...rest } = applicationDetailsData[0];
        if (FROM_ACTION_TYPE.EDIT === type && applicationDetailsData?.length) {
            applicationForm.setFieldValue({ ...rest });
            setFinalFormdata({ applicationDetails: rest, applicationAction, documentType, accessibleLocation });
            setIsReadOnly(false);
            setIsFieldDisable(true);
        } else if (FROM_ACTION_TYPE.CHILD === type && applicationDetailsData?.length) {
            setFinalFormdata({ ...initialFormData, applicationDetails: { parentApplicationId: rest?.applicationId } });
            setIsReadOnly(true);
            setIsFieldDisable(false);
        } else if (FROM_ACTION_TYPE.SIBLING === type && applicationDetailsData?.length) {
            setFinalFormdata({ ...initialFormData, applicationDetails: { parentApplicationId: rest?.parentApplicationId } });
            setIsReadOnly(true);
            setIsFieldDisable(false);
        } else {
            setFinalFormdata({ ...initialFormData });
            setIsReadOnly(true);
            setIsFieldDisable(false);
        }
        forceUpdate();

        setisVisible(true);
        setFormActionType(type);
    };

    const onClose = () => {
        applicationForm.resetFields();
        setisVisible(false);
        // setFormBtnDisable(false);
        forceUpdate();
        // setIsBtnDisabled(false);
    };

    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        selectedTreeSelectKey,
        setSelectedTreeSelectKey,
        fieldNames,
        handleTreeViewClick,
        treeData: menuData,
        setSearchValue,
        searchValue,
    };
    const formProp = {
        isReadOnly,
        isVisible,
        isFieldDisable,
        applicationForm,
        finalFormdata,
        setFinalFormdata,
        setisVisible,
        onFinish,
        forceUpdate,
        criticalityGroupData,
        configurableParamData,
        actions,
        menuData,
        titleOverride: (finalFormdata?.applicationDetails?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
        setSelectedTreeKey,
        selectedTreeKey,
        isApplicatinoOnSaveLoading,
        onCloseAction: onClose,
    };

    const leftCol = menuData?.length > 0 ? 16 : 24;
    const rightCol = menuData?.length > 0 ? 8 : 24;
    const noDataTitle = EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);
    return (
        <>
            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
                    <Spin spinning={isLoading}>
                        <div className={styles.contentHeaderBackground}>
                            <Row gutter={20} className={styles.searchAndLabelAlign}>
                                <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                                    <Row gutter={20} style={{ border: '1px' }} align="middle">
                                        <Col xs={10} sm={10} md={10} lg={10} xl={8}>
                                            <div className={styles.changeThemeBorder}>
                                                <Button
                                                    type="secondary"
                                                    danger
                                                    onClick={() => handleTypeClick('W')}
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
                                                    onClick={() => handleTypeClick('M')}
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
                                            <Search style={{ width: '100%' }} placeholder="Search" allowClear onChange={onChange} className={styles.headerSearchField} />
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
                                        <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={() => handleAdd('add')}>
                                            Add
                                        </Button>
                                    </Empty>
                                </div>
                            ) : (
                                <div className={` ${styles.leftPanelScroll}`}>
                                    <LeftPanel {...myProps} />
                                </div>
                            )}
                        </div>
                    </Spin>
                </Col>

                <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol} className={`${styles.padRight0} ${styles.viewDetails}`}>
                    <Spin spinning={isApplicationDeatilsLoading}>
                        {selectedTreeKey?.length && applicationDetailsData?.length ? (
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                {/* <ViewApplicationDetail applicationDetailsData={applicationDetailsData} /> */}
                                <ViewApplicationDetailMain applicationDetailsData={applicationDetailsData} styles={styles} />
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
                    </Spin>
                </Col>
            </Row>

            <DrawerUtil {...formProp} />
        </>
    );
};

export const ApplicationMaster = connect(mapStateToProps, mapDispatchToProps)(ApplicationMasterMain);