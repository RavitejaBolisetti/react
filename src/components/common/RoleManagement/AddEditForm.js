/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Input, Form, Col, Row, Switch, Space, Collapse, Tabs } from 'antd';

import { validateAlphanumericWithSpaceHyphenPeriod, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { expandIcon } from 'utils/accordianExpandIcon';
import { flattenData } from 'utils/flattenData';
import { APPLICATION_DEVICE_TYPE } from 'utils/applicationDeviceType';

import { ViewRoleManagement } from './ViewRoleManagement';
import { withDrawer } from 'components/withDrawer';

import { DrawerFormButton } from 'components/common/Button';
import LeftPanel from 'components/common/LeftPanel';

import styles from 'components/common/Common.module.css';

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

const AddEditFormMain = (props) => {
    const { deviceType, setDeviceType, setClosePanels, unFilteredMenuData, setUnFilteredMenuData, formData, onCloseAction, form, onFinish, formActionType: { viewMode, editMode } = undefined } = props;

    const APPLICATION_WEB = APPLICATION_DEVICE_TYPE?.WEB?.key;
    const APPLICATION_MOBILE = APPLICATION_DEVICE_TYPE?.MOBILE?.key;

    const [searchValue, setSearchValue] = useState();
    const [activeKey, setActiveKey] = useState();
    console.log('🚀 ~ kuldeep file: AddEditForm.js:51 ~ AddEditFormMain ~ activeKey:', activeKey);

    const [searchItem] = Form.useForm();

    const fieldNames = { title: 'label', key: 'value', children: 'children' };

    const { buttonData, setButtonData, handleButtonClick } = props;

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
        // const isPresent = activeKey.includes(values);
        // if (isPresent) {
        //     const newActivekeys = [];
        //     activeKey.forEach((item) => {
        //         if (item !== values) {
        //             newActivekeys.push(item);
        //         }
        //     });
        //     setActiveKey(newActivekeys);
        // } else {
        //     setActiveKey([...activeKey, values]);
        // }
    };

    const onCheck =
        (currentKey) =>
        (checkedKeysValue, { halfCheckedKeys }) => {
            handleFormValueChange();
            const selectedKeys = [...checkedKeysValue, ...halfCheckedKeys] || [];
            // const deviceTypePrev = checkedMenuKeys?.[deviceType] ? checkedMenuKeys[deviceType] : {};
            // setCheckedMenuKeys(selectedKeys?.length > 0 ? { ...checkedMenuKeys, [deviceType]: { ...deviceTypePrev, [currentKey]: [currentKey, ...selectedKeys] } } : { ...checkedMenuKeys, [deviceType]: { ...deviceTypePrev } });

            const mapSelectedKeyData = (data) =>
                data?.map((item) =>
                    item.value === currentKey
                        ? {
                              ...item,
                              checked: true,
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
        console.log('menuData', menuData);
        return (
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                {menuData?.map((el, i) => {
                    const treeData = el?.children;
                    const flatternData = flattenData(treeData);
                    const checkedKeys = flatternData?.filter((i) => i.checked && (!i?.children || i?.children?.length <= 0));
                    const expendedKeys = flatternData?.filter((i) => i.checked);
                    const allowedAccess = treeData?.filter((i) => i.checked);
                    const myProps = {
                        callOnForm: true,
                        fieldNames,
                        treeData,
                        searchValue,
                        setSearchValue,
                        checkable: true,
                        isTreeViewVisible: true,
                        onCheck: onCheck(el?.value),
                        disableCheckbox: viewMode,
                        expendedKeys: expendedKeys?.map((i) => i.value),
                        checkedKeys: checkedKeys?.map((i) => i.value), // handleDefaultCheckedKeys(viewMode, defaultCheckedKeysMangement, checkedMenuKeys),
                    };

                    return (
                        <div className={`${styles.accordianContainer} ${styles.rolemanagmentContaner}`}>
                            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={onCollapseChange} expandIconPosition="end">
                                <Panel
                                    header={
                                        <Row>
                                            {el?.label}
                                            {allowedAccess?.length > 0 && <div className={styles.allowAccess}>{allowedAccess?.length} Access Provided</div>}
                                        </Row>
                                    }
                                    key={i}
                                >
                                    <div style={{ borderTop: 'solid 1px #E6E6E6', paddingTop: '10px' }}>
                                        <Form layout="vertical" autoComplete="off" form={searchItem}>
                                            <Row>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.roleMangementSearch}>
                                                    <Form.Item label={''} name="search" validateTrigger={['onSearch']}>
                                                        <Search placeholder="Search" initialValue={searchValue} onChange={handleSearchValue} allowClear />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                    <LeftPanel {...myProps} />
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </Panel>
                            </Collapse>
                        </div>
                    );
                })}
            </Space>
        );
    };

    const AccordianTreePanel = ({ viewMode, menuTreeData }) => {
        console.log('🚀 ~ file: AddEditForm.js:182 ~ AccordianTreePanel ~ menuTreeData:', menuTreeData);
        return (
            <Tabs
                defaultActiveKey="1"
                onChange={onTabChange}
                items={Object.values(APPLICATION_DEVICE_TYPE)?.map((item) => ({
                    key: item?.key,
                    label: item?.title,
                    children: AccordianTreeUtils({ viewMode, menuData: viewMode ? menuTreeData[item?.key]?.filter((i) => i.checked) : menuTreeData[item?.key] }),
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
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };
    return (
        <>
            <Form form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {viewMode ? (
                            <>
                                <ViewRoleManagement {...viewProps} />
                            </>
                        ) : (
                            <>
                                <div className={styles.roleDescription}>
                                    <Row gutter={20}>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item initialValue={formData?.roleId} name="roleId" label="Role Id" rules={[validateRequiredInputField('id'), validationFieldLetterAndNumber('id')]}>
                                                <Input maxLength={6} placeholder={preparePlaceholderText('id')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item initialValue={formData?.roleName} name="roleName" label="Role Name" rules={[validateRequiredInputField('name'), validateAlphanumericWithSpaceHyphenPeriod('name')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('name')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                            <Form.Item initialValue={formData?.roleDesceription} label="Role Description" name="roleDescription" rules={[validateRequiredInputField('description')]}>
                                                <TextArea
                                                    placeholder={preparePlaceholderText('description')}
                                                    autoSize={{
                                                        minRows: 2,
                                                        maxRows: 5,
                                                    }}
                                                    maxLength={250}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.subTitleSec}>
                                        Application Access<span className={styles.mandatory}>*</span>
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

export const AddEditForm = withDrawer(AddEditFormMain, {});
