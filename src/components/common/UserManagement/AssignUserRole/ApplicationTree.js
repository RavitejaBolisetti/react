/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Input, Form, Col, Row, Divider, Space, Collapse, Tabs, Typography } from 'antd';

import { validateAlphanumericWithSpaceHyphenPeriod, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { expandIcon } from 'utils/accordianExpandIcon';
// import { flattenData } from 'utils/flattenData';
// import { APPLICATION_DEVICE_TYPE } from 'utils/applicationDeviceType';

// import { ViewRoleManagement } from './ViewRoleManagement';
import { withDrawer } from 'components/withDrawer';

import { DrawerFormButton } from 'components/common/Button';
import LeftPanel from 'components/common/LeftPanel';

import style from 'components/common/TreeView.module.css';
import styles from 'components/common/Common.module.css';

// import dummyMenuData from './../../RoleManagement/Treedata.json';

const dummyMenuData = [{}];

const { TextArea } = Input;
const { Panel } = Collapse;
const { Search } = Input;
const { Text } = Typography;

const APPLICATION_DEVICE_TYPE = {
    WEB: { key: 'W', title: 'Web' },
    MOBILE: { key: 'M', title: 'Mobile' },
};
const fieldNames = { title: 'label', key: 'value', children: 'children' };

const flattenData = (data) => {
    const listItem = [];
    const generateList = (data) => {
        for (let node of data) {
            listItem.push({
                ...node,
            });
            if (node?.children) {
                generateList(node?.children);
            }
        }

        return listItem;
    };
    generateList(data);
};

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

const ApplicationTreeMain = (props) => {
    const { checkedKeys, setCheckedKeys, webApplications, roleCode, setWebApplications, mobileApplications, setMobileApplications, deviceType, setDeviceType, setClosePanels, formData, onCloseAction, form, onFinish, formActionType: { addMode = false, viewMode, editMode } = undefined } = props;
    const { defaultCheckedKeysMangement, setdefaultCheckedKeysMangement } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;
    console.log('🚀 ~ file: ApplicationTree.js:71 ~ ApplicationTreeMain ~ webApplications:', webApplications);
    console.log('🚀 ~ file: ApplicationTree.js:71 ~ ApplicationTreeMain ~ checkedKeys:', checkedKeys);

    const APPLICATION_WEB = APPLICATION_DEVICE_TYPE?.WEB?.key;
    const APPLICATION_MOBILE = APPLICATION_DEVICE_TYPE?.MOBILE?.key;

    const [searchValue, setSearchValue] = useState();
    const [activeKey, setActiveKey] = useState([]);

    const handleFormValueChange = () => {
        // setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        // setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onFinishFailed = () => {};

    const onTabChange = (newActiveKey) => {
        setDeviceType(newActiveKey);
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setActiveKey(newActivekeys);
        } else {
            setActiveKey([...activeKey, values]);
        }
    };

    const onCheck =
        (currentKey) =>
        (checkedKeysValue, { halfCheckedKeys }) => {
            setdefaultCheckedKeysMangement({ ...defaultCheckedKeysMangement, [deviceType]: checkedKeysValue });
            handleFormValueChange();
            const selectedKeys = [...checkedKeysValue, ...halfCheckedKeys] || [];
            // const deviceTypePrev = checkedKeys?.[roleCode]?.[deviceType] ? checkedKeys?.[roleCode]?.[deviceType] : {};
            const deviceTypePrev = checkedKeys?.[roleCode];
            const applicationTypePrev = checkedKeys?.[roleCode]?.[deviceType];
            // const roleTypePrevKeys = checkedKeys?.[roleCode] ? checkedKeys?.[roleCode] : {};
            setCheckedKeys(selectedKeys.length !== 0 ? { ...checkedKeys, [roleCode]: { ...deviceTypePrev, [deviceType]: { ...applicationTypePrev, [currentKey]: [...selectedKeys] } } } : {});

            const mapSelectedKeyData = (data) => {
                return data[roleCode][deviceType]?.map((item) =>
                    item?.value === currentKey
                        ? {
                              ...item,
                              checked: true,
                              children: item?.children && fnMapData({ data: item?.children, fieldNames, selectedKeys }),
                          }
                        : { ...item }
                );
            };
            if (deviceType === APPLICATION_WEB) {
                setWebApplications((prev) => ({ ...prev, [roleCode]: { ...prev[roleCode], [deviceType]: mapSelectedKeyData(webApplications) } }));
            } else if (deviceType === APPLICATION_MOBILE) {
                setMobileApplications(mapSelectedKeyData(mobileApplications));
            }
        };

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const handleDefaultCheckedKeys = (Mode, keys, checkedMenuKeys) => {
        if (!Mode) {
            let newCheckedKeys = [];
            let checkedKey = [];
            if (!viewMode) {
                for (const key in checkedKeys[deviceType]) {
                    newCheckedKeys = [...checkedKeys[deviceType][key]];
                }
            }
            checkedKey = [...newCheckedKeys, ...checkedMenuKeys];

            return checkedKey;
        } else {
            return defaultCheckedKeysMangement[deviceType];
        }
    };

    const AccordianTreeUtils = ({ menuData, roleCode }) => {
        const mapData = Array.isArray(menuData) ? menuData : menuData.hasOwnProperty('label') ? [menuData] : [];
        return (
            <div>
                {/* <Space direction="vertical" size="middle" style={{ display: 'flex' }}> */}
                {mapData?.map((el, i) => {
                    // const treeData = [el];
                    const treeData = el?.children;
                    const flatternData = flattenData(treeData);
                    const checkedMenuKeys = flatternData?.map((i) => i.checked && i?.value);
                    const allowedAccess = checkedMenuKeys?.filter((i) => i.checked && i?.vlaue);

                    const myProps = {
                        fieldNames,
                        treeData,
                        searchValue,
                        setSearchValue,
                        checkable: true,
                        isTreeViewVisible: true,
                        onCheck: onCheck(el?.value),
                        disableCheckbox: viewMode,
                        checkedKeys: checkedKeys?.[roleCode]?.[deviceType]?.[el?.value] || [],
                        // checkedKeys: handleDefaultCheckedKeys(addMode, defaultCheckedKeysMangement, checkedMenuKeys),
                    };

                    return (
                        <div className={styles.accordianContainer}>
                            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(i)} expandIconPosition="end">
                                <Panel
                                    header={
                                        <Row type="flex" justify="space-between" align="middle" size="large">
                                            <Row type="flex" justify="space-around" align="middle">
                                                <Typography>{el?.label}</Typography>
                                            </Row>
                                            {allowedAccess?.length > 0 && <Text type="secondary">{allowedAccess?.length} Access Provided</Text>}
                                        </Row>
                                    }
                                    key={i}
                                >
                                    <Divider />
                                    {/* <Space direction="vertical" size="middle" style={{ display: 'flex' }}> */}
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                            <Form.Item label={''} name="search" validateTrigger={['onSearch']}>
                                                <Search placeholder="Search" initialValue={searchValue} onChange={handleSearchValue} allowClear />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={style.roleTree}>
                                            <LeftPanel {...myProps} />
                                        </Col>
                                    </Row>
                                    {/* </Space> */}
                                </Panel>
                            </Collapse>
                        </div>
                    );
                })}
                {/* </Space> */}
            </div>
        );
    };

    const viewProps = {
        isVisible: viewMode,
        setClosePanels,
        formData,
        styles,
        onTabChange,
        menuTreeData: dummyMenuData?.filter((i) => i.checked),
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
                {viewMode ? (
                    <>{''}</>
                ) : (
                    <>
                        {/* <div className={styles.roleDescription}> </div> */}

                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.subTitleSec}>
                                Application Access<span className={styles.mandatory}>*</span>
                            </Col>
                        </Row>
                        {/* device type WEB Mobile Tab */}
                        <Tabs
                            defaultActiveKey={APPLICATION_WEB}
                            onChange={onTabChange}
                            items={Object.values(APPLICATION_DEVICE_TYPE)?.map((item) => ({
                                key: item?.key,
                                label: item?.title,
                                // children: AccordianTreeUtils({ menuData: !viewMode ? webApplications['R001']['W']?.filter((i) => i?.checked) : dummyMenuData }),
                                children: AccordianTreeUtils({ menuData: webApplications.hasOwnProperty(roleCode) && webApplications[roleCode].hasOwnProperty(deviceType) && webApplications[roleCode][deviceType], roleCode }),
                            }))}
                        />
                    </>
                )}
                {/* <DrawerFormButton {...buttonProps} /> */}
            </Form>
        </>
    );
};

export const ApplicationTree = ApplicationTreeMain;
