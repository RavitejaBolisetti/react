/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Input, Form, Col, Row, Divider, Collapse, Tabs, Typography } from 'antd';

import { expandIcon } from 'utils/accordianExpandIcon';
// import { flattenData } from 'utils/flattenData';
import { DEVICE_TYPE } from 'constants/modules/UserManagement/deviceType';

import LeftPanel from 'components/common/LeftPanel';

import style from '../../../../../components/common/TreeView.module.scss';
//import style from 'components/common/TreeView.module.css';
import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Search } = Input;
const { Text } = Typography;

const fieldNames = { title: 'label', key: 'value', children: 'children' };

const flattenData = (data) => {
    if (data) {
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
    }
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
    const { checkedKeys, setCheckedKeys, webApplications, roleCode, setWebApplications, mobileApplications, setMobileApplications, deviceType, setDeviceType, setClosePanels, formData, onCloseAction, form, onFinish, formActionType: { addMode = false, viewMode = false, editMode = true } = undefined } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;

    const APPLICATION_WEB = DEVICE_TYPE?.WEB?.key;
    const APPLICATION_MOBILE = DEVICE_TYPE?.MOBILE?.key;

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
            const selectedKeys = [...checkedKeysValue, ...halfCheckedKeys] || [];
            const deviceTypePrev = checkedKeys || {};
            const appPrev = checkedKeys?.[deviceType] ? checkedKeys[deviceType] : {};
            setCheckedKeys(checkedKeysValue.length !== 0 ? { ...deviceTypePrev, [deviceType]: { ...appPrev, [currentKey]: [...checkedKeysValue] } } : []);

            const mapSelectedKeyData = (data) => {
                return data?.map((item) =>
                    item?.value === currentKey
                        ? {
                              ...item,
                              checked: selectedKeys?.length ? true : false,
                              children: item?.children && fnMapData({ data: item?.children, fieldNames, selectedKeys }),
                          }
                        : { ...item }
                );
            };
            if (deviceType === APPLICATION_WEB) {
                setWebApplications(mapSelectedKeyData(webApplications));
            } else if (deviceType === APPLICATION_MOBILE) {
                setMobileApplications(mapSelectedKeyData(mobileApplications));
            }
        };

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const AccordianTreeUtils = ({ menuData, roleCode }) => {
        const menuMapData = menuData?.length > 0 ? menuData : [];

        return (
            <div className={styles.modalTree}>
                {menuMapData?.map((el, i) => {
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
                        checkedKeys: checkedKeys?.[deviceType]?.[el?.value] || [],
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
                                </Panel>
                            </Collapse>
                        </div>
                    );
                })}
            </div>
        );
    };

    const viewProps = {
        isVisible: viewMode,
        setClosePanels,
        formData,
        styles,
        onTabChange,
        // menuTreeData: dummyMenuData?.filter((i) => i.checked),
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
                <Tabs
                    defaultActiveKey={APPLICATION_WEB}
                    onChange={onTabChange}
                    items={Object.values(DEVICE_TYPE)?.map((item) => ({
                        key: item?.key,
                        label: item?.title,
                        // children: AccordianTreeUtils({ menuData: !viewMode ? webApplications['R001']['W']?.filter((i) => i?.checked) : dummyMenuData }),
                        // children: AccordianTreeUtils({ menuData: menuList?.[deviceType], roleCode }),
                        children: AccordianTreeUtils({ menuData: deviceType === APPLICATION_WEB ? webApplications : mobileApplications, roleCode }),
                    }))}
                />
            </Form>
        </>
    );
};

export const ApplicationTree = ApplicationTreeMain;
