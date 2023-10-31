/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'antd';
import { bindActionCreators } from 'redux';

import { RoleListDataActions } from 'store/actions/data/roleManagement/roleList';
import { showGlobalNotification } from 'store/actions/notification';

import { tableColumn } from './tableColumn';
import { AddEditForm } from './AddEditForm';
import AppliedAdvanceFilter from './AppliedAdvanceFilter';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { APPLICATION_DEVICE_TYPE } from 'utils/applicationDeviceType';
import { ListDataTable } from 'utils/ListDataTable';
import { filterFunction } from 'utils/filterFunction';
import { btnVisiblity } from 'utils/btnVisiblity';
import { USER_TYPE_USER } from 'constants/modules/UserManagement/userType';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            RoleManagementData: {
                RoleList: { isLoaded: isDataLoaded = false, isLoading: isDataLoading = false, data: roleManagementData = [] },
                RoleMenu: { isLoaded: isMenuLoaded = false, isLoading: isMenuLoading = false, data: rolemenuData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Role Management';
    let returnValue = {
        userId,
        moduleTitle,
        menuTreeData: rolemenuData,
        isDataLoading,
        isMenuLoading,
        isDataLoaded,
        isMenuLoaded,
        roleManagementData: roleManagementData,
        // roleManagementData: roleManagementData?.map((role) => ({ ...role, roleType: Object.values(USER_TYPE)?.find((i) => i.key === role?.roleType)?.title })),
        rolemenuData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: RoleListDataActions.fetchList,
            listShowLoading: RoleListDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const RoleManagementMain = (props) => {
    const { fetchList, userId, isDataLoaded, listShowLoading, isDataLoading, showGlobalNotification, roleManagementData, fetchMenuList } = props;
    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();

    const APPLICATION_WEB = APPLICATION_DEVICE_TYPE?.WEB?.key;
    const [showDataLoading, setShowDataLoading] = useState(false);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [saveAndAddNewBtnClicked, setSaveAndAddNewBtnClicked] = useState(false);
    const [deviceType, setDeviceType] = useState();

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [unFilteredMenuData, setUnFilteredMenuData] = useState([]);
    const [roleType, setRoleType] = useState(USER_TYPE_USER?.MANUFACTURER?.id);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onSuccessAction = () => {
        setRefershData(false);
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (userId && (!showDataLoading || refershData)) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    useEffect(() => {
        setDeviceType(APPLICATION_WEB);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType]);

    useEffect(() => {
        if (isDataLoaded && roleManagementData && userId) {
            const roleList = roleManagementData?.filter((i) => i?.roleType === roleType);
            if (filterString) {
                const keyword = filterString?.keyword;
                const filterDataItem = roleList?.filter((item) => filterFunction(keyword)(item?.roleName));
                setSearchdata(filterDataItem);
            } else {
                setSearchdata(roleList);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, roleManagementData, roleType]);

    const handleReferesh = () => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, keyword: value });
        }
    };

    // const handleResetFilter = () => {
    //     setFilterString();
    //     listFilterForm.resetFields();
    //     setShowDataLoading(false);
    // };

    const handleClearInSearch = (e) => {
        if (e.target.value.length > 2) {
            listFilterForm.validateFields(['code']);
        } else if (e?.target?.value === '') {
            setFilterString();
            listFilterForm.resetFields();
            setShowDataLoading(false);
        }
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setFormData([]);
    };

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View ';
        } else if (formActionType?.editMode) {
            return 'Edit ';
        } else {
            return 'Add ';
        }
    }, [formActionType]);

    const formProps = {
        unFilteredMenuData,
        setUnFilteredMenuData,
        saveAndAddNewBtnClicked,
        setSaveAndAddNewBtnClicked,
        listShowLoading,
        fetchMenuList,
        onErrorAction,
        userId,
        form,
        setDeviceType,
        isVisible: isFormVisible,
        titleOverride: drawerTitle.concat('Role'),
        onCloseAction,

        formData,
        deviceType,

        formActionType,
        setFormActionType,
        buttonData,

        setButtonData,
        handleButtonClick,

        setIsFormVisible,
        roleType,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick),
        tableData: searchData,
        isLoading: isDataLoading || showDataLoading,
    };

    const handleToggleButton = (key) => {
        setRoleType(key);
    };

    const advanceFilterResultProps = {
        //advanceFilter: false,
        //filterString,
        from: listFilterForm,
        onSearchHandle,
        //handleResetFilter,
        handleClearInSearch,
        handleReferesh,
        handleButtonClick,
        title: '',
        tableData: searchData,
        currentItem: roleType,
        handleToggleButton,
        isToggleBtnVisible: true,
    };

    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={showDataLoading} {...tableProps} handleAdd={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const RoleManagement = connect(mapStateToProps, mapDispatchToProps)(RoleManagementMain);
