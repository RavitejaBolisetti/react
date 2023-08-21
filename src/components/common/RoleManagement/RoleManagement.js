/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'antd';
import { bindActionCreators } from 'redux';

import { RoleManagementMenuDataActions } from 'store/actions/data/roleManagement/roleMenu';
import { RoleListDataActions } from 'store/actions/data/roleManagement/roleList';
import { showGlobalNotification } from 'store/actions/notification';

import { tableColumn } from './tableColumn';
import { AddEditForm } from './AddEditForm';
// import { AddEditForm } from './AddEditFormTempBck';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { APPLICATION_DEVICE_TYPE } from 'utils/applicationDeviceType';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { ListDataTable } from 'utils/ListDataTable';
import { filterFunction } from 'utils/filterFunction';
import { btnVisiblity } from 'utils/btnVisiblity';

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
        // menuTreeData: rolemenuData?.filter((i) => i?.value?.toLowerCase() === 'finac'),
        isDataLoading,
        isMenuLoading,
        isDataLoaded,
        isMenuLoaded,
        roleManagementData,
        rolemenuData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: RoleListDataActions.fetchList,
            saveData: RoleManagementMenuDataActions.saveData,
            listShowLoading: RoleListDataActions.listShowLoading,
            fetchMenuList: RoleManagementMenuDataActions.fetchList,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const RoleManagementMain = (props) => {
    const { saveData, fetchList, userId, isDataLoaded, listShowLoading, menuTreeData, showGlobalNotification, roleManagementData, fetchMenuList } = props;

    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();

    const APPLICATION_WEB = APPLICATION_DEVICE_TYPE?.WEB?.key;
    const APPLICATION_MOBILE = APPLICATION_DEVICE_TYPE?.MOBILE?.key;

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [showApplicationDataLoading, setShowApplicationDataLoading] = useState(true);
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

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onSuccessAction = () => {
        // refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
        setShowApplicationDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
        setShowApplicationDataLoading(false);
    };

    useEffect(() => {
        if (userId && (!isDataLoaded || refershData)) {
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataLoaded, refershData]);

    useEffect(() => {
        setDeviceType(APPLICATION_WEB);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType]);

    useEffect(() => {
        if (deviceType === APPLICATION_WEB && menuTreeData) {
            setUnFilteredMenuData({ ...unFilteredMenuData, [deviceType]: menuTreeData });
        } else if (deviceType === APPLICATION_MOBILE && menuTreeData) {
            setUnFilteredMenuData({ ...unFilteredMenuData, [deviceType]: menuTreeData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deviceType, menuTreeData]);

    useEffect(() => {
        if (isDataLoaded && roleManagementData && userId) {
            if (filterString) {
                const keyword = filterString?.keyword;
                const filterDataItem = roleManagementData?.filter((item) => filterFunction(keyword)(item?.roleId) || filterFunction(keyword)(item?.roleName) || filterFunction(keyword)(item?.roleDesceription));
                setSearchdata(filterDataItem);
            } else {
                setSearchdata(roleManagementData);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, roleManagementData]);

    const onFinish = (values) => {
        const recordId = formData?.id || '';

        const data = {
            ...values,
            id: recordId,
            webRoleManagementRequest: unFilteredMenuData?.[APPLICATION_WEB]?.filter((i) => i?.checked) || [],
            mobileRoleManagementRequest: unFilteredMenuData?.[APPLICATION_MOBILE]?.filter((i) => i?.checked) || [],
        };

        const onSuccess = (res) => {
            form.resetFields();
            fetchList({ setIsLoading: listShowLoading, userId });
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                setUnFilteredMenuData([]);
            }
        };

        const onError = (message) => {
            listShowLoading(false);
            showGlobalNotification({ notificationType: 'error', title: 'Error', message, placement: 'bottomRight' });
        };

        const requestData = {
            data: data,
            method: formActionType?.editMode ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    useEffect(() => {
        // if (userId && deviceType && !unFilteredMenuData?.[deviceType]) {
        if (userId && deviceType && formData) {
            setShowApplicationDataLoading(true);
            const extraParams = [
                {
                    key: 'menuType',
                    title: 'menuType',
                    value: deviceType,
                    name: 'menuType',
                },
                {
                    key: 'roleId',
                    title: 'roleId',
                    value: formData?.id,
                    name: 'roleId',
                },
            ];

            fetchMenuList({
                setIsLoading: listShowLoading,
                userId,
                extraParams,
                onErrorAction,
                onSuccessAction: () => {
                    setShowApplicationDataLoading(false);
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, deviceType, formData]);

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
            setFilterString({ ...filterString, advanceFilter: false, keyword: value });
        }
    };

    const handleResetFilter = (e) => {
        setFilterString();
        listFilterForm.resetFields();
        setShowDataLoading(false);
    };

    const handleClearInSearch = (e) => {
        if (e.target.value.length > 2) {
            listFilterForm.validateFields(['code']);
        } else if (e?.target?.value === '') {
            setFilterString();
            listFilterForm.resetFields();
            setShowDataLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
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
        onCloseAction: () => {
            form.resetFields();
            setIsFormVisible(false);
            setFormData([]);
            setUnFilteredMenuData([]);
        },
        formData,
        onFinish,
        deviceType,

        formActionType,
        setFormActionType,
        onFinishFailed,

        tableData: searchData,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,

        APPLICATION_WEB,
        APPLICATION_MOBILE,

        showApplicationDataLoading,
        setShowApplicationDataLoading,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick),
        tableData: searchData,
    };

    const title = 'Role Management';

    const advanceFilterResultProps = {
        advanceFilter: false,
        filterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        onSearchHandle,
        handleResetFilter,
        handleClearInSearch,
        handleReferesh,
        handleButtonClick,
        title,
        tableData: searchData,
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
