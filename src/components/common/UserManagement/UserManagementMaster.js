/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Button, Col, Row, Form, Empty, ConfigProvider } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showGlobalNotification } from 'store/actions/notification';
import { userManagementDataActions } from 'store/actions/data/userManagement';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';

import { SearchBox } from 'components/utils/SearchBox';
import { AddEditForm } from './AddEditForm';

import TokenValidateDataCard from './TokenValidateDataCard';
import TokenErrorCard from './TokenErrorCard';

import DataTable from 'utils/dataTable/DataTable';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { USER_TYPE_USER } from 'constants/modules/UserManagement/userType';
import { tableColumn } from './Dealer/tableColumn';
import { tableColumn as manufacturerTableColumn } from './Manufacturer/tableColumn';

import { manufacturerList, dealerList, dealerTokenData, dealerResData, manufacturerResData, productDataTree, adminDataTree, initialDealerBranches } from './dummyData';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            UserManagement: { isLoaded: isDataLoaded = false, isLoading, isFormDataLoaded, data: UserManagementdealerData = [] },
            ProductHierarchy: { data: productHierarchyData = [] },
            HierarchyAttributeMaster: { data: attributeData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'User Access';

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        isLoading,
        UserManagementdealerData,
        productHierarchyData,
        moduleTitle,
        attributeData,
        isFormDataLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchDealerDetails: userManagementDataActions.fetchDealerDetails,
            saveDealerDetails: userManagementDataActions.saveDealerDetails,
            listShowLoading: userManagementDataActions.listShowLoading,

            fetchManufacturerDetails: userManagementDataActions.fetchManufacturerDetails,
            saveManufacturerDetails: userManagementDataActions.saveManufacturerDetails,

            fetchList: productHierarchyDataActions.fetchList,
            hierarchyAttributeFetchList: hierarchyAttributeMasterDataActions.fetchList,

            showGlobalNotification,
        },
        dispatch
    ),
});

// for token type select
const typeData = [{ key: 'tokenNumber', value: 'Token Number' }];

export const UserManagementMain = ({ saveData, userId, moduleTitle, productHierarchyData, attributeData, hierarchyAttributeFetchList, saveDealerDetails, UserManagementdealerData, fetchDealerDetails, isDataLoaded, fetchList, listShowLoading, qualificationData, showGlobalNotification, isLoading, isFormDataLoaded, onSaveShowLoading }) => {
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [filterString, setFilterString] = useState();
    const [userType, setUserType] = useState(USER_TYPE_USER?.DEALER?.id);
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [isReadOnly, setIsReadOnly] = useState(false); //not required
    const [drawer, setDrawer] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [error, setError] = useState(false);
    const [selectedDealer, setSelectedDealer] = useState();

    const [validateTokenData, setValidateTokenData] = useState();
    const [AccessMacid, setAccessMacid] = useState([]);
    const [finalFormdata, setfinalFormdata] = useState({
        userDevices: [],
        userRoleMapBaseRequestList: [
            {
                id: 'string',
                roleId: 'string',
                status: true,
                webRoleManagementRequest: [
                    {
                        id: 'string',
                        applicationId: 'string',
                        value: 'string',
                        status: true,
                        children: ['string'],
                    },
                ],
                mobileRoleManagementRequest: [
                    {
                        id: 'string',
                        applicationId: 'string',
                        value: 'string',
                        status: true,
                        children: ['string'],
                    },
                ],
            },
        ],
        branches: [...initialDealerBranches],
        products: [],
    });
    console.log('🚀 ~ file: UserManagementMaster.js:114 ~ UserManagementMain ~ finalFormdata:', finalFormdata);

    //for setting initial value in select token field
    useEffect(() => {
        searchForm.setFieldValue('searchType', 'tokenNumber');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setError(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userType]);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            // fetchList({ setIsLoading: listShowLoading, userId });
            hierarchyAttributeFetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    const handleTableChange = (sorter, filters) => {};

    const onSuccess = (res) => {
        listShowLoading(false);
        form.resetFields();
        setSelectedRecord({});
        setDrawer(false);
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };
    const onSuccessAction = (message) => {
        setError(false);
        setValidateTokenData(dealerTokenData);
    };

    const onErrorAction = (message) => {
        setValidateTokenData({});
        setError(true);
    };

    const onFinish = (values, e) => {
        const requestData = {
            data: dealerResData,
            setIsLoading: listShowLoading,
            userId,
            onErrorAction,
            onSuccess,
        };

        saveDealerDetails(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleAdd = () => {
        form.setFieldsValue({
            userRole: 'Mahindra',
        });
    };

    const handleButtonClick = ({ buttonAction, record }) => {
        switch (buttonAction) {
            case FROM_ACTION_TYPE?.ADD:
                setFormActionType((prev) => ({ ...prev, viewMode: false, editMode: false, addMode: true }));
                setButtonData({ editBtn: false, saveBtn: true, cancelBtn: true });
                setIsReadOnly(false);
                setFormData(record);
                setIsFormVisible(true);
                break;
            case FROM_ACTION_TYPE?.EDIT:
                setFormActionType((prev) => ({ ...prev, addMode: false, viewMode: false, editMode: true }));
                setButtonData({ editBtn: false, saveBtn: true, cancelBtn: true });
                setSelectedRecord(record);
                setFormData(record);
                setIsReadOnly(false);
                setIsFormVisible(true);
                break;
            case FROM_ACTION_TYPE?.VIEW:
                setFormActionType({ ...defaultFormActionType, addMode: false, editMode: false, viewMode: true });
                setButtonData({ editBtn: true, saveBtn: false, cancelBtn: true });
                setSelectedRecord(record);
                setDrawer(true);
                setIsReadOnly(true);
                setIsFormVisible(true);
                break;
            default:
                break;
        }
    };

    const hanndleEditData = (record) => {
        setFormActionType({ ...defaultFormActionType, editMode: true });
        setIsReadOnly(false);
    };

    // fetch token data
    useEffect(() => {
        if (
            userId &&
            filterString?.searchParam?.length > 0
            // && selectedDealer
        ) {
            fetchDealerDetails({ setIsLoading: listShowLoading, userId, id: filterString?.searchParam, FetchError: onErrorAction, onSuccessAction });
            setFilterString({});
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, filterString?.searchParam, userType]);

    const onChangeSearchHandler = (event) => {
        setError(false);
    };

    // can be use leter to select dealer
    // const handleDealseChange = (selectedvalue) => {
    //     setdisabled(false);
    //     setSelectedDealer(selectedvalue);
    // };

    const onCloseAction = () => {
        setIsFormVisible(false);
        setSelectedRecord([]);
    };

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View ';
        } else if (formActionType?.editMode) {
            return 'Edit ';
        } else {
            return 'Add New ';
        }
    }, [formActionType]);

    const formProps = {
        filterString,
        isVisible: isFormVisible,
        onFinishFailed,
        onFinish,
        form,
        handleAdd,
        drawer,
        setDrawer,
        formData,
        formActionType,
        isReadOnly,
        setFormData,
        titleOverride: drawerTitle.concat(moduleTitle),
        validateTokenData,
        productHierarchyData,
        onCloseAction,
        finalFormdata,
        setfinalFormdata,
        hanndleEditData,
        AccessMacid,
        setAccessMacid,
        userType,
        selectedRecord,

        productDataTree,
        adminDataTree,

        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const tableProps = {
        // isLoading: isLoading,
        tableData: userType === USER_TYPE_USER?.DEALER?.id ? dealerList : manufacturerList,
        tableColumn: userType === USER_TYPE_USER?.DEALER?.id ? tableColumn(handleButtonClick) : manufacturerTableColumn(handleButtonClick),
        onChange: handleTableChange,
    };

    const handleCustomerTypeChange = (id) => {
        setUserType(id);
        // navigate(ROUTING_USER_MANAGEMENT_MANUFACTURER);
    };

    //validate TOKEN NUMBER  search box
    const searchBoxProps = {
        searchForm,
        filterString,
        setFilterString,
        disabledProps: false,
        optionType: typeData,
        defaultValue: 'tokenNumber',
        handleChange: onChangeSearchHandler,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                                    <Form.Item>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.verticallyCentered}>
                                                {/* <Col xs={24} sm={24} md={userType === USER_TYPE_USER?.DEALER?.id ? 18 : 12} lg={userType === USER_TYPE_USER?.DEALER?.id ? 18 : 12} xl={userType === USER_TYPE_USER?.DEALER?.id ? 18 : 12} className={styles.searchAndLabelAlign}> */}
                                                <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                                                    {Object.values(USER_TYPE_USER)?.map((item) => {
                                                        return (
                                                            <Button type={userType === item?.id ? 'primary' : 'link'} danger onClick={() => handleCustomerTypeChange(item?.id)}>
                                                                {item?.title}
                                                            </Button>
                                                        );
                                                    })}
                                                </div>
                                                {/* this can be use leter */}
                                                {/* {userType === USER_TYPE_USER?.DEALER?.id && (
                                                    <Select className={`${styles.headerSelectField} ${styles.marR20}`} onChange={handleDealseChange} placeholder="Select" showSearch allowClear>
                                                        {dealersData?.map((item) => (
                                                            <Option value={item}>{item}</Option>
                                                        ))}
                                                    </Select>
                                                )} */}

                                                <div className={styles.fullWidth}>
                                                    <SearchBox {...searchBoxProps} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>

                        {dealerTokenData?.employeeCode && <TokenValidateDataCard tokenData={dealerTokenData} selectedDealer={selectedDealer} handleButtonClick={handleButtonClick} userType={userType} />}
                        {!error && <TokenErrorCard filterString={filterString?.searchParam} />}
                    </div>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ConfigProvider
                        renderEmpty={() => (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={<span> No record found.</span>}
                            ></Empty>
                        )}
                    >
                        <DataTable {...tableProps} />
                    </ConfigProvider>
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const UserManagementMaster = connect(mapStateToProps, mapDispatchToProps)(UserManagementMain);
