/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Input, Form, Col, Row, Switch, Collapse, Tabs, Divider, Tag } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { DrawerFormButton } from 'components/common/Button';
import { ViewRoleManagement } from './ViewRoleManagement';
import LeftPanel from 'components/common/LeftPanel';
import { InputSkeleton } from '../Skeleton';
import { withDrawer } from 'components/withDrawer';
import { LANGUAGE_EN } from 'language/en';

import { RoleManagementMenuDataActions } from 'store/actions/data/roleManagement/roleMenu';
import { RoleListDataActions } from 'store/actions/data/roleManagement/roleList';
import { showGlobalNotification } from 'store/actions/notification';

import { validateRequiredInputField } from 'utils/validation';
import { APPLICATION_DEVICE_TYPE } from 'utils/applicationDeviceType';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { expandIcon } from 'utils/accordianExpandIcon';
import { flattenData } from 'utils/flattenData';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { TextArea } = Input;
const { Panel } = Collapse;
const { Search } = Input;

const checkKey = (data, key) => data?.includes(key);

const fnMapData = ({ data, fieldNames, selectedKeys }) =>
    data?.map((item) =>
        item?.[fieldNames?.children]
            ? {
                  ...item,
                  checked: checkKey(selectedKeys, item?.[fieldNames?.key]),
                  children: fnMapData({ data: item?.[fieldNames?.children], fieldNames, selectedKeys }),
              }
            : {
                  ...item,
                  checked: checkKey(selectedKeys, item?.[fieldNames?.key]),
              }
    );

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

    let returnValue = {
        userId,
        menuTreeData: rolemenuData,
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
            menuListShowLoding: RoleManagementMenuDataActions.listShowLoading,
            listShowLoading: RoleListDataActions.listShowLoading,
            fetchMenuList: RoleManagementMenuDataActions.fetchList,
            showGlobalNotification,
        },
        dispatch
    ),
});

const AddEditFormMain = (props) => {
    const { deviceType, setDeviceType, setClosePanels, unFilteredMenuData, setUnFilteredMenuData, formData, onCloseAction, form, formActionType: { viewMode, addMode, editMode } = undefined } = props;
    const { userId, fetchList, setIsFormVisible, fetchMenuList, isDataLoading, isMenuLoading, listShowLoading, menuListShowLoding, saveData, showGlobalNotification } = props;

    const APPLICATION_WEB = APPLICATION_DEVICE_TYPE?.WEB?.key;
    const APPLICATION_MOBILE = APPLICATION_DEVICE_TYPE?.MOBILE?.key;

    const [searchValue, setSearchValue] = useState();
    const [activeKey, setActiveKey] = useState();
    const [refreshMenu, setRefreshMenu] = useState(false);
    const [showApplicationDataLoading, setShowApplicationDataLoading] = useState(true);

    const [searchItem] = Form.useForm();
    const fieldNames = { title: 'label', key: 'value', children: 'children' };

    const { buttonData, setButtonData, handleButtonClick, roleType } = props;

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowApplicationDataLoading(false);
    };

    useEffect(() => {
        if (userId && formData) {
            let menuData = {};
            const loadDataFromServer = (device, index, arr) => {
                const deviceType = device?.key;
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
                    setIsLoading: menuListShowLoding,
                    userId,
                    extraParams,
                    onErrorAction,
                    onSuccessAction: (response) => {
                        setShowApplicationDataLoading(false);
                        const menuTreeData = response?.data;
                        menuData = { ...menuData, [deviceType]: menuTreeData };
                        setUnFilteredMenuData(menuData);
                    },
                });
            };
            Object.values(APPLICATION_DEVICE_TYPE)?.forEach(loadDataFromServer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, formData?.id, refreshMenu]);

    const noApplicationValidationMessage = LANGUAGE_EN.GENERAL.APPLICATON_REQUIRE_VALIDATION;

    const onFinish = (values) => {
        const recordId = formData?.id || '';

        const filteredWebMenuData = unFilteredMenuData?.[APPLICATION_WEB]?.filter((i) => i?.checked) || [];
        const filteredMobileMenuData = unFilteredMenuData?.[APPLICATION_MOBILE]?.filter((i) => i?.checked) || [];

        if (!recordId && !filteredWebMenuData?.length && !filteredMobileMenuData?.length) {
            showGlobalNotification({ message: noApplicationValidationMessage.MESSAGE.replace('{NAME}', 'application access'), placement: 'bottomRight' });
            return;
        }

        const data = {
            ...values,
            id: recordId,
            roleType,
            webRoleManagementRequest: filteredWebMenuData,
            mobileRoleManagementRequest: filteredMobileMenuData,
        };

        const onSuccess = (res) => {
            form.resetFields();
            setRefreshMenu(true);
            fetchList({ setIsLoading: listShowLoading, userId });
            if (addMode && buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            }
        };

        const onError = (message) => {
            // listShowLoading(false);
            showGlobalNotification({ notificationType: 'error', title: 'Error', message, placement: 'bottomRight' });
        };

        const requestData = {
            data: data,
            method: editMode ? 'put' : 'post',
            setIsLoading: menuListShowLoding,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onFinishFailed = () => {};

    const onTabChange = (newActiveKey) => {
        setDeviceType(newActiveKey);
    };

    const onCollapseChange = (key) => {
        setSearchValue('');
        searchItem.setFieldValue('search', '');
        setActiveKey(key.pop());
    };

    const onCheck =
        (currentKey) =>
        (checkedKeysValue, { halfCheckedKeys }) => {
            handleFormValueChange();
            const selectedKeys = [...checkedKeysValue, ...halfCheckedKeys] || [];
            const mapSelectedKeyData = (data) =>
                data?.map((item) =>
                    item.value === currentKey
                        ? {
                              ...item,
                              checked: selectedKeys?.length > 0,
                              children: item?.children && fnMapData({ data: item?.children, fieldNames, selectedKeys }),
                          }
                        : { ...item }
                );

            if (deviceType === APPLICATION_WEB) {
                setUnFilteredMenuData({ ...unFilteredMenuData, [deviceType]: mapSelectedKeyData(unFilteredMenuData?.[deviceType]) });
            } else if (deviceType === APPLICATION_MOBILE) {
                setUnFilteredMenuData({ ...unFilteredMenuData, [deviceType]: mapSelectedKeyData(unFilteredMenuData?.[deviceType]) });
            }
        };

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const AccordianTreeUtils = ({ menuData, viewMode = false }) => {
        const dataAvailable = menuData?.length;
        return dataAvailable ? (
            <div>
                {menuData?.map((el, i) => {
                    const treeData = el?.children;
                    const flatternData = flattenData(treeData);
                    const checkedKeys = flatternData?.filter((i) => i.checked && (!i?.children || i?.children?.length <= 0));
                    const expendedKeys = flatternData?.filter((i) => i.checked);
                    const allowedAccess = treeData?.filter((i) => i.checked);
                    const myProps = {
                        callOnForm: true,
                        selectable: false,
                        fieldNames,
                        treeData,
                        searchValue,
                        setSearchValue,
                        checkable: true,
                        isTreeViewVisible: true,
                        onCheck: viewMode ? () => {} : onCheck(el?.value),
                        // disabled: viewMode,
                        expendedKeys: expendedKeys?.map((i) => i.value),
                        checkedKeys: checkedKeys?.map((i) => i.value),
                    };

                    return (
                        <div key={el?.value} className={styles.managementContainer}>
                            <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={onCollapseChange} expandIconPosition="end">
                                <Panel
                                    header={
                                        <>
                                            {el?.label}
                                            {allowedAccess?.length > 0 && <Tag color="default" className={styles.marL10}>{`${allowedAccess?.length >= 2 ? `${allowedAccess?.length} Accesses Provided` : `${allowedAccess?.length} Access Provided`}`}</Tag>}
                                        </>
                                    }
                                    key={el?.value}
                                >
                                    <Divider />
                                    <Form layout="vertical" autoComplete="off" form={searchItem}>
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <Form.Item label={''} name="search" validateTrigger={['onSearch']}>
                                                    <Search placeholder={translateContent('roleManagement.placeholder.search')} initialValue={searchValue} onChange={handleSearchValue} allowClear />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={viewMode ? styles.viewModeTree : ''}>
                                                <LeftPanel {...myProps} />
                                            </Col>
                                        </Row>
                                    </Form>
                                </Panel>
                            </Collapse>
                        </div>
                    );
                })}
            </div>
        ) : (
            <div>{translateContent('roleManagement.validation.noApplicationText')}</div>
        );
    };

    const AccordianTreePanel = ({ viewMode, menuTreeData }) => {
        return (
            <Tabs
                defaultActiveKey="1"
                onChange={onTabChange}
                items={Object.values(APPLICATION_DEVICE_TYPE)?.map((item) => ({
                    key: item?.key,
                    label: item?.title,
                    children: showApplicationDataLoading || isMenuLoading ? <InputSkeleton height={55} count={5} /> : AccordianTreeUtils({ viewMode, menuData: viewMode ? menuTreeData[item?.key]?.filter((i) => i.checked) : menuTreeData[item?.key] }),
                }))}
            />
        );
    };

    const viewProps = {
        isVisible: viewMode,
        setClosePanels,
        formData,
        styles,
        onTabChange,
        AccordianTreePanel,
        menuTreeData: unFilteredMenuData,
        disableCheckbox: true,
        isLoading: isDataLoading,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
        isLoadingOnSave: isDataLoading,
    };
    return (
        <>
            <Form form={form} autoComplete="off" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {viewMode ? (
                            <>
                                <ViewRoleManagement {...viewProps} />
                            </>
                        ) : (
                            <>
                                <div>
                                    <Row gutter={20}>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item initialValue={formData?.roleId} name="roleId" label={translateContent('roleManagement.label.roleId')} rules={[validateRequiredInputField(translateContent('global.validation.id'))]} data-testid="role">
                                                <Input maxLength={6} disabled={editMode ? true : false} placeholder={preparePlaceholderText('id')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item initialValue={formData?.roleName} name="roleName" label={translateContent('roleManagement.label.roleName')} rules={[validateRequiredInputField(translateContent('global.validation.name'))]} data-testid="roleName">
                                                <Input maxLength={50} placeholder={preparePlaceholderText('name')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                                            <Form.Item initialValue={formData?.roleDescription} label={translateContent('roleManagement.label.roleDescription')} name="roleDescription" rules={[validateRequiredInputField(translateContent('global.validation.description'))]} data-testid="roleDescription">
                                                <TextArea
                                                    placeholder={preparePlaceholderText(translateContent('global.validation.description'))}
                                                    autoSize={{
                                                        minRows: 2,
                                                        maxRows: 5,
                                                    }}
                                                    maxLength={90}
                                                    showCount
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={translateContent('global.label.status')}>
                                                <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} onChange={(checked) => (checked ? 1 : 0)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.subTitleSec}>
                                        {translateContent('roleManagement.heading.subPanel')}
                                        <span className={styles.mandatory}>*</span>
                                    </Col>
                                </Row>
                                {AccordianTreePanel({ menuTreeData: unFilteredMenuData })}
                            </>
                        )}
                    </Col>
                </Row>
                <DrawerFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(connect(mapStateToProps, mapDispatchToProps)(AddEditFormMain), {});
