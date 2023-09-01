/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Button, Col, Row, Select, Form, Empty, ConfigProvider } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showGlobalNotification } from 'store/actions/notification';
import { searchUserDataActions } from 'store/actions/data/userManagement/searchUser';
import { ManufacturerAppDataActions } from 'store/actions/data/userManagement/manufacturerApplication';
import { DealerAppDataActions } from 'store/actions/data/userManagement/dealerApplications';
import { RoleApplicationDataActions } from 'store/actions/data/userManagement/roleApplication';
import { UserDealerListDataActions } from 'store/actions/data/userManagement/dealersList';
import { UserRolesDataActions } from 'store/actions/data/userManagement/userRoleList';

import { UserDealerBranchLocationDataActions } from 'store/actions/data/userManagement/userDealerBranchLocation';
import { DealerBranchLocationDataActions } from 'store/actions/data/userManagement/dealerBranchLocation';

import { RoleListtDataActions } from 'store/actions/data/userManagement/roleList';

import { SearchBox } from 'components/utils/SearchBox';
import { UserMainContainer } from './UserMainContainer';

import TokenValidateDataCard from './common/TokenValidateDataCard';
import TokenErrorCard from './common/TokenErrorCard';

import DataTable from 'utils/dataTable/DataTable';

import { ADD_ACTION, EDIT_ACTION, NEXT_ACTION, VIEW_ACTION, btnVisiblity } from 'utils/btnVisiblity';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { USER_TYPE_USER } from 'constants/modules/UserManagement/userType';
import { USER_ACCESS_SECTION_DEALER, USER_ACCESS_SECTION_MANUFACTURER } from 'constants/modules/UserManagement/userAccessSection';

import { tableColumn } from './Dealer/tableColumn';
import { tableColumn as manufacturerTableColumn } from './Manufacturer/tableColumn';

import { productDataTree, adminDataTree, initialDealerBranches } from 'components/common/UserManagement/dummyData';
import styles from 'assets/sass/app.module.scss';

const { Option } = Select;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            UserManagement: {
                SearchUser: { isLoading: isDataLoading, data: userDataList = {}, detailData: userDetailData },
                RoleList: { isLoading: isRoleListLoding, data: roleListdata },
                RoleApplicaion: { isLoaded: isRoleApplicationLoaded, isLoading: isRoleApplicationLoding, data: roleApplicationData },
                UserDealerApplicatin: { isLoaded: isDlrAppLoaded, isLoading: isDlrAppLoding, data: dlrAppList },
                UserManufacturerApplication: { isLoaded: isMnmAppLoaded, isLoading: isMnmAppLoding, data: mnmAppList },
                UserDealerList: { isLoaded: isDealerListLoaded, isLoading: isDealerListLoding, data: dealerDataList },
                UserRoleList: { isLoaded: isUserRoleListLoaded, isLoading: isUserRoleListLoding, data: userRoleDataList },
                DealerBranchLocation: { isLoaded: isdlrBrLocationsLoaded, isLoading: isDlrBrLocationLoding, data: dlrBranchLocationDataList },
                UserDealerBranchLocation: { isLoaded: isUsrdlrBrLocationsLoaded, isLoading: isUsrDlrBrLocationLoding, data: usrdlrBranchLocationDataList },
            },
        },
    } = state;

    const moduleTitle = 'User Access';

    let returnValue = {
        userId,
        userDataList,
        userDetailData,
        isDataLoading,
        moduleTitle,

        roleListdata: roleListdata?.filter((i) => i?.status),
        isRoleListLoding,

        roleApplicationData,
        isRoleApplicationLoding,
        isRoleApplicationLoaded,

        isDlrAppLoaded,
        isDlrAppLoding,
        dlrAppList,
        isMnmAppLoaded,
        isMnmAppLoding,
        mnmAppList,

        dealerDataList,
        isDealerListLoaded,
        isDealerListLoding,

        userRoleDataList,
        isUserRoleListLoaded,
        isUserRoleListLoding,

        dlrBranchLocationDataList,
        isDlrBrLocationLoding,
        isdlrBrLocationsLoaded,

        usrdlrBranchLocationDataList,
        isUsrDlrBrLocationLoding,
        isUsrdlrBrLocationsLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchUserDataList: searchUserDataActions.fetchList,
            fetchDetail: searchUserDataActions.fetchDetail,
            saveUserDetails: searchUserDataActions.saveData,
            resetUserDetails: searchUserDataActions.reset,
            listShowLoading: searchUserDataActions.listShowLoading,

            fetchRoleDataList: RoleListtDataActions.fetchList,
            resetroleDataList: RoleListtDataActions.reset,
            rolelistShowLoading: RoleListtDataActions.listShowLoading,

            fetchMNMUserRoleAppDataList: ManufacturerAppDataActions.fetchList,
            resetMnmUserRoleAppDataList: ManufacturerAppDataActions.reset,
            mnmUserRoleAppListShowLoading: ManufacturerAppDataActions.listShowLoading,
            saveMNMUserRoleAppDataList: ManufacturerAppDataActions.saveData,

            fetchDLRUserRoleDataList: DealerAppDataActions.fetchList,
            resetUsrDlrRoleAppDataList: DealerAppDataActions.reset,
            usrRolelAppListShowLoading: DealerAppDataActions.listShowLoading,
            saveDLRUserRoleDataList: DealerAppDataActions.saveData,

            fetchRoleApplicationList: RoleApplicationDataActions.fetchList,
            resetRoleApplicationList: RoleApplicationDataActions.reset,
            rolelApplicationShowLoading: RoleApplicationDataActions.listShowLoading,

            fetchDealersList: UserDealerListDataActions.fetchList,
            resetDealersList: UserDealerListDataActions.reset,
            rolelDealersListShowLoading: UserDealerListDataActions.listShowLoading,

            fetchUserRoleList: UserRolesDataActions.fetchList,
            resetUserRoleList: UserRolesDataActions.reset,
            userRoleShowLoading: UserRolesDataActions.listShowLoading,

            fetchDlrBranchLocationsList: DealerBranchLocationDataActions.fetchList,
            resetDlrBranchLocationsList: DealerBranchLocationDataActions.reset,
            userDlrBrLoactionShowLoading: DealerBranchLocationDataActions.listShowLoading,

            fetchUsrDlrBranchLocationsList: UserDealerBranchLocationDataActions.fetchList,
            resetUsrDlrBranchLocationsList: UserDealerBranchLocationDataActions.reset,
            userUsrDlrBrLoactionShowLoading: UserDealerBranchLocationDataActions.listShowLoading,
            saveUsrDlrBrLoactionRoleDataList: UserDealerBranchLocationDataActions.saveData,

            showGlobalNotification,
        },
        dispatch
    ),
});


const typeData = [{ key: 'employeeCode', value: 'Token No.' }];

const UserManagementMain = (props) => {
    const { userId, fetchUserDataList, listShowLoading, isDataLoading, userDataList } = props;
    const { fetchRoleDataList, rolelistShowLoading, isRoleListLoaded } = props;
    const { fetchDealersList, rolelDealersListShowLoading, dealerDataList, isDealerListLoaded } = props;
    const { moduleTitle, productHierarchyData } = props;
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, next: false, nextBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: true, formBtnActive: false };

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [filterString, setFilterString] = useState();
    const [userType, setUserType] = useState(USER_TYPE_USER?.MANUFACTURER?.id);
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [currentSection, setCurrentSection] = useState(USER_ACCESS_SECTION_MANUFACTURER.ASSIGN_USER_ROLES);
    const [isLastSection, setLastSection] = useState(false);
    const [sectionName, setSetionName] = useState();
    const [section, setSection] = useState();

    const [disableSearch, setDisabledSearch] = useState(true);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [error, setError] = useState(false);
    const [selectedDealerCode, setselectedDealerCode] = useState('');
    const [defaultSection, setDefaultSection] = useState();

    const [AccessMacid, setAccessMacid] = useState([]);
    const [finalFormdata, setfinalFormdata] = useState({
        userDevices: [],
        userRoleMapBaseRequestList: [],
        branches: [...initialDealerBranches],
        products: [],
    });

    useEffect(() => {
        if (userId) {
            if (!isRoleListLoaded) {
                fetchRoleDataList({ setIsLoading: rolelistShowLoading, userId });
            }
            if (!isDealerListLoaded) {
                fetchDealersList({ setIsLoading: rolelDealersListShowLoading, userId });
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isRoleListLoaded, isDealerListLoaded]);

    useEffect(() => {
        if (userType) {
            const defaultSection = userType === USER_TYPE_USER.DEALER.id ? USER_ACCESS_SECTION_DEALER.ASSIGN_USER_ROLES.id : USER_ACCESS_SECTION_MANUFACTURER.ASSIGN_USER_ROLES.id;
            setSetionName(userType === USER_TYPE_USER.DEALER.id ? USER_ACCESS_SECTION_DEALER : USER_ACCESS_SECTION_MANUFACTURER);
            setDefaultSection(defaultSection);
            setSection(defaultSection);
            setFilterString();

            setDisabledSearch(userType === USER_TYPE_USER.DEALER.id ? true : false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userType]);

    useEffect(() => {
        if (currentSection && sectionName) {
            const section = Object.values(sectionName)?.find((i) => i.id === currentSection);
            setSection(section);
            const nextSection = Object.values(sectionName)?.find((i) => i.id > currentSection);
            setLastSection(!nextSection?.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection, sectionName]);

    const defaultExtraParam = [
        {
            key: 'pageSize',
            title: 'Value',
            value: page?.pageSize,
            canRemove: true,
            filter: false,
        },
        {
            key: 'pageNumber',
            title: 'Value',
            value: page?.current,
            canRemove: true,
            filter: false,
        },
        {
            key: 'sortBy',
            title: 'Sort By',
            value: page?.sortBy,
            canRemove: true,
            filter: false,
        },
        {
            key: 'sortIn',
            title: 'Sort Type',
            value: page?.sortType,
            canRemove: true,
            filter: false,
        },
    ];

    const extraParams = useMemo(() => {
        return [
            {
                key: 'userType',
                title: 'userType',
                value: userType,
                name: 'userType',
            },
            {
                key: 'employeeCode',
                title: 'employeeCode',
                value: filterString?.searchParam,
                name: 'employeeCode',
            },
            {
                key: 'dealerCode',
                title: 'dealerCode',
                value: selectedDealerCode,
                name: 'dealerCode',
            },
        ];
    }, [filterString, selectedDealerCode, userType]);

    const onErrorAction = (res) => {
        setError(res);
    };
    const onSuccessAction = (res) => {
        setselectedDealerCode('');
        setError('');
    };

    useEffect(() => {
        if (userId && userType && !isFormVisible) {
            const params = filterString?.searchParam ? extraParams : [...defaultExtraParam, ...extraParams];
            fetchUserDataList({ setIsLoading: listShowLoading, extraParams: params, userId, onErrorAction, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, userType, page?.pageSize, page?.current, filterString?.searchParam, isFormVisible]);

    const onFinish = (values, e) => {};

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleButtonClick = ({ buttonAction, record = null, openDefaultSection = true }) => {
        switch (buttonAction) {
            case FROM_ACTION_TYPE?.ADD:
                setFormActionType((prev) => ({ ...prev, viewMode: false, editMode: false, addMode: true }));
                setButtonData({ editBtn: true, nextBtn: true, cancelBtn: true });
                setIsReadOnly(false);
                record && setSelectedRecord(record);
                record && setFormData(record);
                setIsFormVisible(true);
                defaultSection && setCurrentSection(defaultSection);
                break;
            case FROM_ACTION_TYPE?.EDIT:
                setFormActionType((prev) => ({ ...prev, addMode: false, viewMode: false, editMode: true }));
                setButtonData({ saveBtn: true, editBtn: true, nextBtn: true, cancelBtn: true });
                record && setSelectedRecord(record);
                record && setFormData(record);
                setIsReadOnly(false);
                setIsFormVisible(true);
                openDefaultSection && setCurrentSection(defaultSection);
                break;
            case FROM_ACTION_TYPE?.VIEW:
                setFormActionType({ ...defaultFormActionType, addMode: false, editMode: false, viewMode: true });
                setButtonData({ editBtn: true, saveBtn: false, nextBtn: true, cancelBtn: true });
                record && setSelectedRecord(record);
                record && setFormData(record);
                setDrawer(true);
                setIsReadOnly(true);
                setIsFormVisible(true);
                defaultSection && setCurrentSection(defaultSection);
                break;
            case NEXT_ACTION:
                const nextSection = Object.values(sectionName)?.find((i) => i?.id > currentSection);
                section && setCurrentSection(nextSection?.id);
                setLastSection(!nextSection?.id);
                break;
            default:
                break;
        }

        if (buttonAction !== NEXT_ACTION) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });
            setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        }
    };

    const hanndleEditData = (record) => {
        setFormActionType({ ...defaultFormActionType, editMode: true });
        setIsReadOnly(false);
    };

    const onChangeSearchHandler = (event) => {
        setError('');
    };

    const handleDealseChange = (selectedvalue) => {
        if (selectedvalue) {
            setDisabledSearch(false);
        } else {
            setDisabledSearch(true);
        }
        setselectedDealerCode(selectedvalue);
        setError('');
    };

    const onCloseAction = () => {
        
        setIsFormVisible(false);
        setSelectedRecord([]);
        setDisabledSearch(true);
        setFilterString('');
        setselectedDealerCode('');
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
        ...props,
        filterString,
        isVisible: isFormVisible,
        onFinishFailed,
        onFinish,
        form,
        drawer,
        setDrawer,
        formData,
        formActionType,
        isReadOnly,
        setFormData,
        titleOverride: drawerTitle.concat(moduleTitle),
        productHierarchyData,
        onCloseAction,
        finalFormdata,
        setfinalFormdata,
        hanndleEditData,
        AccessMacid,
        setAccessMacid,
        userType,
        currentSection,
        setCurrentSection,
        selectedRecord,
        selectedDealerCode,
        dealerDataList,

        productDataTree,
        adminDataTree,
        section,
        sectionName,
        setSetionName,

        buttonData,
        setButtonData,
        handleButtonClick,
        setIsFormVisible,
        isLastSection,
    };

    const tableProps = {
        isLoading: isDataLoading,
        tableData: userDataList?.userSearchResponse?.userDetails && !userDataList?.userSearchResponse?.userDetails?.[0]?.dmsUserNotExist ? userDataList?.userSearchResponse?.userDetails : [],
        tableColumn: userType === USER_TYPE_USER?.DEALER?.id ? tableColumn(handleButtonClick) : manufacturerTableColumn(handleButtonClick),
        page,
        setPage,
        dynamicPagination: true,
        totalRecords: userDataList?.totalRecords,
    };

    const handleUserTypeChange = (id) => {
        setCurrentSection(userType === USER_TYPE_USER.DEALER.id ? USER_ACCESS_SECTION_DEALER.ASSIGN_USER_ROLES : USER_ACCESS_SECTION_MANUFACTURER.ASSIGN_USER_ROLES);
        setUserType(id);
        setselectedDealerCode('');
        setError('');
        form.resetFields();
        searchForm.resetFields();
        setPage({ pageSize: 10, current: 1 });
    };

    const searchBoxProps = {
        isLoading: filterString?.searchParam ? isDataLoading : false,
        searchForm,
        filterString,
        setFilterString,
        // singleField: true,
        // placeholder: 'Search token number',
        disabled: disableSearch,
        optionType: typeData,
        defaultValue: 'employeeCode',
        handleChange: onChangeSearchHandler,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={userType === USER_TYPE_USER?.DEALER?.id ? 18 : 14} lg={userType === USER_TYPE_USER?.DEALER?.id ? 18 : 14} xl={userType === USER_TYPE_USER?.DEALER?.id ? 18 : 14}>
                                <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                                    <Form.Item>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.verticallyCentered}>
                                                <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                                                    {Object.values(USER_TYPE_USER)?.map((item) => {
                                                        return (
                                                            <Button type={userType === item?.id ? 'primary' : 'link'} danger onClick={() => handleUserTypeChange(item?.id)}>
                                                                {item?.title}
                                                            </Button>
                                                        );
                                                    })}
                                                </div>
                                                {userType === USER_TYPE_USER?.DEALER?.id && (
                                                    <Select className={styles.marR20} style={{ width: '60%' }} onChange={handleDealseChange} placeholder="Select" showSearch allowClear>
                                                        {dealerDataList?.map((item) => (
                                                            <Option value={item?.dealerCode}>{item?.dealerName}</Option>
                                                        ))}
                                                    </Select>
                                                )}

                                                <div className={styles.fullWidth}>
                                                    <SearchBox {...searchBoxProps} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                        {userDataList?.userSearchResponse?.userDetails?.[0]?.dmsUserNotExist && <TokenValidateDataCard tokenData={userDataList?.userSearchResponse?.userDetails?.[0]} isLoading={listShowLoading} selectedDealerCode={selectedDealerCode} handleButtonClick={handleButtonClick} userType={userType} />}
                        {error && <TokenErrorCard error={error} />}
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
            <UserMainContainer {...formProps} />
        </>
    );
};

export const UserManagementMasterNew = connect(mapStateToProps, mapDispatchToProps)(UserManagementMain);
