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
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';
import LeftPanel from 'components/common/LeftPanel';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';
import { menuDataActions } from 'store/actions/data/menu';
import ViewDetailMain from './ViewDetail';

import { gstIrnTransactionAction } from 'store/actions/data/financialAccounting/gstIrnTransactionAction';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ApplicationMaster: { applicationDetailsData, applicationData, isApplicationDeatilsLoading, isLoading },
            FinancialAccounting: {
                GstIrnTransactionDetails: { data: gstIrnTreeData = [] },
            },
        },
    } = state;

    const moduleTitle = translateContent('gstIRNAuthentication.irnTransactionListMaster.headng.moduleTitle');

    let returnValue = {
        userId,

        vehicleStatusType: typeData[PARAM_MASTER.VEHCL_STATS.id],

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
    const { userId, showGlobalNotification, section, fetchList, listShowLoading } = props;
    const { form, selectedId, onFinish, applicationMasterDataShowLoading } = props;
    const { applicationDetailsData, isApplicationDeatilsLoading, fetchApplication, applicationDetailListShowLoading, fetchListGstIrnTree, listShowLoadingTree } = props;
    const { gstIrnTreeData } = props;

    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    // const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);
    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const fieldNames = { title: 'menuTitle', key: 'menuId', children: 'subMenu' };
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (userId) {
            fetchList({ setIsLoading: applicationMasterDataShowLoading, userId, screenId: 'APPMST' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]); //menuType

    useEffect(() => {
        if (userId) {
            const extraParams = [
                {
                    key: 'screenId',
                    title: 'screenId',
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

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
        // handleTreeViewVisiblity,
        selectedTreeKey,
        selectedTreeSelectKey,
        setSelectedTreeSelectKey,
        fieldNames,
        handleTreeViewClick,
        treeData: gstIrnTreeData, //menuData,
        setSearchValue,
        searchValue,
        callOnForm: true,
    };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish}>
                <Row gutter={20} className={styles.drawerBodyRight}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Row>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <h2>{section?.title}</h2>
                            </Col>
                        </Row>
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
