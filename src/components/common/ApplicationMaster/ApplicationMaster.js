/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { menuDataActions } from 'store/actions/data/menu';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';
import { showGlobalNotification } from 'store/actions/notification';
import LeftPanel from '../LeftPanel';
import { AddEditForm } from './AddEditForm';
import { HierarchyFormButton } from '../Button';
import ViewApplicationDetailMain from './viewDeatils/ViewApplicationDetail';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { LANGUAGE_EN } from 'language/en';
import styles from 'assets/sass/app.module.scss';
import { ContentHeader } from 'utils/ContentHeader';
import { APPLICATION_ACTION_ID, ROOT_PARENT_APPLICATION, SPECIAL_MENU_ID } from 'constants/modules/applicationMaster';
import { APPLICATION_DEVICE_TYPE } from 'utils/applicationDeviceType';
import { translateContent } from 'utils/translateContent';
import { withSpinner } from 'components/withSpinner';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ApplicationMaster: { applicationCriticalityGroupData: criticalityGroupData, applicationDetailsData, dealerLocations, applicationData, configurableParamData, actions, isApplicationDeatilsLoading, isApplicatinoOnSaveLoading, isLoading, isActionsLoaded },
        },
    } = state;
    const moduleTitle = translateContent('applicationMaster.title.applicationDetails');

    let returnValue = {
        criticalityGroupData: criticalityGroupData?.sort((a, b) => b?.activeIndicator - a?.activeIndicator),
        applicationDetailsData,
        dealerLocations,
        userId,
        configurableParamData,
        actions,
        moduleTitle,
        isApplicationDeatilsLoading,
        isApplicatinoOnSaveLoading,
        isLoading,
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

export const ApplicationMasterMain = ({ userId, isLoading, applicationMasterDataShowLoading, fetchApplication, fetchApplicationCriticality, criticalityGroupData, fetchApplicationAction, saveApplicationDetails, menuData, fetchList, applicationDetailsData, configurableParamData, fetchCriticalitiData, actions, showGlobalNotification, isApplicationDeatilsLoading, isApplicatinoOnSaveLoading, onSaveShowLoading, applicationDetailListShowLoading }) => {
    const [form] = Form.useForm();
    const [applicationForm] = Form.useForm();
    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [isVisible, setisVisible] = useState(false);

    const [menuType, setMenuType] = useState(APPLICATION_DEVICE_TYPE.WEB.key);
    const [searchValue, setSearchValue] = useState('');
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [finalFormdata, setFinalFormdata] = useState(initialFormData);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [isFieldDisable, setIsFieldDisable] = useState(false);
    const [parentAppCode, setParentAppCode] = useState(ROOT_PARENT_APPLICATION);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    const moduleTitle = translateContent('applicationMaster.title.applicationMaster');
    const fieldNames = { title: 'menuTitle', key: 'menuId', children: 'subMenu' };

    useEffect(() => {
        if (userId) {
            fetchApplicationCriticality({ setIsLoading: applicationMasterDataShowLoading });
            fetchApplicationAction({ setIsLoading: applicationMasterDataShowLoading, userId, id: APPLICATION_ACTION_ID });
            fetchCriticalitiData({ setIsLoading: applicationMasterDataShowLoading });
            fetchList({ setIsLoading: applicationMasterDataShowLoading, userId, deviceType: menuType, screenId: SPECIAL_MENU_ID });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, menuType]);

    const handleAdd = () => {
        setisVisible(true);
        setIsReadOnly(false);
    };

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleTypeClick = (type) => {
        setSelectedTreeKey([]);

        setMenuType(type);
    };
    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const onSuccess = (res) => {
        form.resetFields();
        applicationForm.resetFields();
        setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
        if (res?.data) {
            const { accessibleLocation, applicationAction, documentType, ...rest } = res?.data[0];

            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchList({ setIsLoading: applicationMasterDataShowLoading, userId, deviceType: menuType, screenId: SPECIAL_MENU_ID });

            applicationCall(rest?.applicationId);
            setSelectedTreeKey([rest?.applicationId]);
            setisVisible(false);
        }
    };
    const onError = (message) => {
        showGlobalNotification({ message });
        onSaveShowLoading(false);
    };

    const onFinish = (values) => {
        const { applicationAction, documentType, accessibleLocation } = finalFormdata;

        if (applicationAction?.length < 1) {
            return showGlobalNotification({ message: LANGUAGE_EN.GENERAL.NO_DATA_VALIDATOIN.MESSAGE.replace('{NAME}', 'application action') });
        }
        if (values?.documentNumRequired && documentType?.length < 1) {
            return showGlobalNotification({ message: LANGUAGE_EN.GENERAL.NO_DATA_VALIDATOIN.MESSAGE.replace('{NAME}', 'document types') });
        }
        if (values?.accessableIndicator === 2 && accessibleLocation?.length < 1) {
            return showGlobalNotification({ message: LANGUAGE_EN.GENERAL.NO_DATA_VALIDATOIN.MESSAGE.replace('{NAME}', 'accessible location') });
        }

        const actionData = applicationAction?.map(({ id, actionMasterId, status, ...rest }) => ({ id: id || '', actionMasterId, status }));
        const reqData = [
            {
                nodeType: '',
                id: values?.id || '',
                ...values,
                irnIntegrationRequired: values?.irnIntegrationRequired || false,
                isFinanceRelated: values?.isFinanceRelated || false,
                digitalSignatureRequired: values?.digitalSignatureRequired || false,
                termAndConRequired: values?.termAndConRequired || false,
                status: values?.applicationStatus,
                parentApplicationId: parentAppCode,
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
            setFinalFormdata({ applicationDetails: rest, applicationAction: applicationAction?.map((el) => ({ ...el })), documentType, accessibleLocation });
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
    };

    const onClose = () => {
        setisVisible(false);
        const { applicationAction, documentType, accessibleLocation, ...rest } = applicationDetailsData[0];
        setFinalFormdata({ applicationDetails: rest, applicationAction, documentType, accessibleLocation });
        applicationForm.resetFields();
        forceUpdate();
        setIsBtnDisabled(false);
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
        parentAppCode,
        setParentAppCode,
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
        titleOverride: (finalFormdata?.applicationDetails?.id ? translateContent('global.buttons.edit') : translateContent('global.buttons.add')).concat(' ' + moduleTitle),
        setSelectedTreeKey,
        selectedTreeKey,
        isApplicatinoOnSaveLoading,
        onCloseAction: onClose,
        showGlobalNotification,
        applicationDetailsData,
        isBtnDisabled,
        setIsBtnDisabled,
    };

    const leftCol = menuData?.length > 0 ? 14 : 24;
    const rightCol = menuData?.length > 0 ? 10 : 24;
    const ContentHeaderProps = { isAdvanceFilter: false, isTogglePresent: true, isDefaultContentHeader: false, toggleFirst: 'Web', toggleSecond: 'Mobile', styles, onChange, onFinish, validateTriggervalue: ['onSearch'], menuType, title: '', handleTypeClick };
    return (
        <>
            <ContentHeader {...ContentHeaderProps} />
            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
                    {/* <Spin spinning={isLoading}> */}
                    {menuData?.length <= 0 ? (
                        <div className={styles.emptyContainer}>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    <span>
                                        {translateContent(global.generalMessage?.noRecordsFound)} <br /> {translateContent(global.generalMessage?.noRecordsFoundAddNew).replace('{NAME}', moduleTitle)}
                                        {}
                                    </span>
                                }
                            >
                                <Button icon={<PlusOutlined />} type="primary" onClick={() => handleAdd('add')}>
                                    {translateContent('global.buttons.add')}
                                </Button>
                            </Empty>
                        </div>
                    ) : (
                        <div className={` ${styles.leftPanelScroll}`}>
                            <LeftPanel {...myProps} />
                        </div>
                    )}
                    {/* </Spin> */}
                </Col>

                <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol}>
                    {/* <Spin spinning={isApplicationDeatilsLoading}> */}
                    {selectedTreeKey?.length && applicationDetailsData?.length ? (
                        <>
                            <ViewApplicationDetailMain isLoading={isApplicationDeatilsLoading} applicationDetailsData={applicationDetailsData} styles={styles} />
                            <div className={styles.viewContainerFooter}>
                                <HierarchyFormButton isLoading={isApplicationDeatilsLoading} buttonData={buttonData} handleButtonClick={handleButtonClick} />
                            </div>
                        </>
                    ) : (
                        <div className={styles.emptyContainer}>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={<span>{translateContent('applicationMaster.label.description')}</span>}
                            ></Empty>
                        </div>
                    )}
                    {/* </Spin> */}
                </Col>
            </Row>

            <AddEditForm {...formProp} />
        </>
    );
};

export const ApplicationMaster = connect(mapStateToProps, mapDispatchToProps)(withSpinner(ApplicationMasterMain));
