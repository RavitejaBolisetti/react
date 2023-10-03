/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Empty, Spin } from 'antd';

import { GstAuthFormButton } from '../GSTAuthenticationFormButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { vehicleDetailDataActions } from 'store/actions/data/vehicleReceipt/vehicleDetails';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';
import LeftPanel from 'components/common/LeftPanel';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';
import { menuDataActions } from 'store/actions/data/menu';
// import ViewApplicationDetailMain from 'components/common/ApplicationMaster/viewDeatils/ViewApplicationDetail';
import ViewDetailMain from './ViewDetail';

import { gstIrnTransactionAction } from 'store/actions/data/financialAccounting/gstIrnTransactionAction';

import styles from 'assets/sass/app.module.scss';


const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ApplicationMaster: { applicationCriticalityGroupData: criticalityGroupData, applicationDetailsData, applicationData, isApplicationDeatilsLoading, isLoading },
            // ApplicationMaster: { applicationCriticalityGroupData: criticalityGroupData, applicationDetailsData, dealerLocations, applicationData, configurableParamData, actions, isApplicationDeatilsLoading, isApplicatinoOnSaveLoading, isLoading, isActionsLoaded },
            FinancialAccounting: {
                GstIrnTransactionDetails: { data: gstIrnTreeData = [] },
            },
 
        },
    } = state;

    const moduleTitle = 'GST IRN Details';

    let returnValue = {
        userId,
        // isDataLoaded,
        vehicleStatusType: typeData[PARAM_MASTER.VEHCL_STATS.id],
        physicalStatusType: typeData[PARAM_MASTER.PHYSICAL_STATUS.id],
        shortageType: typeData[PARAM_MASTER.YES_NO_FLG.id],
        // vehicleDetailData: vehicleDetailData?.vehicleDetails,
        isLoading,
        moduleTitle,
        menuData: applicationData,
        applicationDetailsData,
        isApplicationDeatilsLoading,
        gstIrnTreeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
          
            fetchApplication: applicationMasterDataActions.fetchApplicationDetails,
            applicationDetailListShowLoading: applicationMasterDataActions.detailListShowLoading,
            // fetchApplicationCriticality: applicationMasterDataActions.fetchApplicationCriticalityGroup,
            // fetchApplicationAction: applicationMasterDataActions.fetchApplicationAction,
            // fetchCriticalitiData: applicationMasterDataActions.fetchConfigurableParameterList,
            applicationMasterDataShowLoading: applicationMasterDataActions.listShowLoading,
            onSaveShowLoading: applicationMasterDataActions.onSaveShowLoading,
            saveApplicationDetails: applicationMasterDataActions.saveApplicationDetails,
            fetchList: applicationMasterDataActions.fetchMenuList,

            applicationListShowLoading: menuDataActions.applicationListShowLoading,

            fetchListGstIrnTree: gstIrnTransactionAction.fetchList,
            listShowLoadingTree: gstIrnTransactionAction.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const IrnTransactionListMasterBase = (props) => {
    const { typeData, vehicleStatusType, physicalStatusType, shortageType, vehicleDetailData } = props;
    const { userId, showGlobalNotification, section, fetchList, listShowLoading, isDataLoaded, isLoading } = props;
    const { form, selectedId, finalData, setFinalData, onFinish, onFinishFailed, menuData, applicationMasterDataShowLoading } = props;
    const { applicationDetailsData, isApplicationDeatilsLoading, fetchApplication, applicationDetailListShowLoading, fetchListGstIrnTree, listShowLoadingTree } = props;
    const { gstIrnTreeData } = props;
    const [vehicleDetailForm] = Form.useForm();
    console.log('gstIrnTreeData', gstIrnTreeData);
    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);
    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const fieldNames = { title: 'menuTitle', key: 'menuId', children: 'subMenu' };
    const [searchValue, setSearchValue] = useState('');
    const [menuType, setMenuType] = useState('W');

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (userId && selectedId) {
            setButtonData({ ...buttonData, formBtnActive: false });
            const extraParams = [
                {
                    key: 'supplierInvoiceNumber',
                    title: 'supplierInvoiceNumber',
                    value: selectedId,
                    name: 'Supplier Invoice Number',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedId]);

    useEffect(() => {
        if (userId) {
            // fetchApplicationCriticality({ setIsLoading: applicationMasterDataShowLoading });
            // fetchApplicationAction({ setIsLoading: applicationMasterDataShowLoading, userId, id: 'Finac' });
            // fetchCriticalitiData({ setIsLoading: applicationMasterDataShowLoading });

            fetchList({ setIsLoading: applicationMasterDataShowLoading, userId, deviceType: menuType, sid: 'APPMST' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, menuType]);

    useEffect(() => {
        if (userId) {
            const extraParams = [
                {
                    key: 'sid',
                    title: 'sid',
                    value: 'APPMST',
                    name: 'SID',
                },
                {
                    key: 'irn',
                    title: 'irn',
                    value: 'Y',
                    name: 'IRN',
                },
            ];
            fetchListGstIrnTree({ setIsLoading: listShowLoadingTree, userId, extraParams });
        }
    }, [userId]);

    const formProps = {
        ...props,
        form,
        onFinish,
        onFinishFailed,
        typeData,
        vehicleStatusType,
        physicalStatusType,
        shortageType,
        userId,
        isDataLoaded,
        formData: vehicleDetailData,
        isLoading,
        vehicleDetailForm,
        finalData,
        setFinalData,
        setButtonData,
        buttonData,
    };

    const viewProps = {
        typeData,
        vehicleStatusType,
        physicalStatusType,
        shortageType,
        formData: vehicleDetailData,
        styles,
        isLoading,
    };

    const onChange = (e) => {
        setSearchValue(e.target.value);
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
    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        selectedTreeSelectKey,
        setSelectedTreeSelectKey,
        fieldNames,
        handleTreeViewClick,
        treeData: gstIrnTreeData, //menuData,
        setSearchValue,
        searchValue,
    };

    // const leftCol = menuData?.length > 0 ? 14 : 24;
    // const rightCol = menuData?.length > 0 ? 10 : 24;
    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBodyRight}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Row>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <h2>{section?.title}</h2>
                            </Col>
                        </Row>
                        {/* {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />} */}
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div className={` ${styles.leftPanelScroll}`} style={{ marginRight: '50px' }}>
                            <LeftPanel {...myProps} />
                        </div>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Spin spinning={isApplicationDeatilsLoading}>
                            {selectedTreeKey?.length && applicationDetailsData?.length ? (
                                <>
                                    <ViewDetailMain applicationDetailsData={applicationDetailsData} styles={styles} />
                                    
                                    {/* <ViewApplicationDetailMain applicationDetailsData={applicationDetailsData} styles={styles} /> */}

                                    {/* <div className={styles.viewContainerFooter}>
                                    <HierarchyFormButton buttonData={buttonData} handleButtonClick={handleButtonClick} />
                                </div> */}
                                </>
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
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <GstAuthFormButton {...props} />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const IrnTransactionListMaster = connect(mapStateToProps, mapDispatchToProps)(IrnTransactionListMasterBase);
