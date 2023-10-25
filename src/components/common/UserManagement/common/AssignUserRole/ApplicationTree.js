/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Input, Form, Col, Row, Divider, Collapse, Tabs, Tag } from 'antd';

import { expandIcon } from 'utils/accordianExpandIcon';
import { DEVICE_TYPE } from 'constants/modules/UserManagement/DeviceType';
import LeftPanel from 'components/common/LeftPanel';
import { LANGUAGE_EN } from 'language/en';
import { NoDataFound } from 'utils/noDataFound';

import styles from '../../../TreeView.module.scss';

const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;

const { Panel } = Collapse;
const { Search } = Input;

const fieldNames = { title: 'label', key: 'value', children: 'children' };

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
    const { checkedKeys, setCheckedKeys, webApplications, roleCode, setWebApplications, mobileApplications, setMobileApplications, deviceType, setDisableMdlSaveBtn, setDeviceType, form, onFinish, formActionType: { viewMode = false } = undefined } = props;

    const APPLICATION_WEB = DEVICE_TYPE?.WEB?.key;
    const APPLICATION_MOBILE = DEVICE_TYPE?.MOBILE?.key;
    const [searchItem] = Form.useForm();

    const [searchValue, setSearchValue] = useState();
    const [activeKey, setActiveKey] = useState([]);

    const onTabChange = (newActiveKey) => {
        setDeviceType(newActiveKey);
        setActiveKey('');
        searchItem.setFieldValue('search', '');
    };

    const onChange = (key) => {
        setSearchValue('');
        searchItem.setFieldValue('search', '');
        setActiveKey(key.pop());
    };

    const onCheck =
        (currentKey) =>
        (checkedKeysValue, { halfCheckedKeys }) => {
            if (viewMode) return;
            setDisableMdlSaveBtn(false);
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

    const AccordianTreeUtils = ({ menuData }) => {
        const menuMapData = menuData?.length > 0 ? menuData : [];

        return (
            <div className={styles.modalTree}>
                <div className={styles.managementContainer}>
                    {menuMapData?.length ? (
                        menuMapData?.map((el, i) => {
                            const treeData = el?.children;
                            const allowedAccess = treeData?.filter((i) => i.checked);

                            const myProps = {
                                fieldNames,
                                treeData,
                                searchValue,
                                setSearchValue,
                                checkable: true,
                                selectable: false,
                                isTreeViewVisible: true,
                                onCheck: onCheck(el?.value),
                                disableCheckbox: viewMode,
                                checkedKeys: checkedKeys?.[deviceType]?.[el?.value] || [],
                            };

                            return (
                                <Collapse key={el?.value} expandIcon={expandIcon} activeKey={activeKey} onChange={onChange} expandIconPosition="end" collapsible="icon">
                                    <Panel
                                        header={
                                            <>
                                                {el?.label}
                                                {allowedAccess?.length > 0 && <Tag color="default" className={styles.marL20}>{`${allowedAccess?.length >= 2 ? `${allowedAccess?.length} Accesses Provided` : `${allowedAccess?.length} Access Provided`}`}</Tag>}
                                            </>
                                        }
                                        key={el?.value}
                                    >
                                        <Divider />
                                        <Form layout="vertical" autoComplete="off" form={searchItem}>
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                    <Form.Item label={''} name="search" validateTrigger={['onSearch']}>
                                                        <Search placeholder="Search" initialValue={searchValue} onChange={handleSearchValue} allowClear />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={viewMode ? styles.viewModeTree : ''}>
                                                    <LeftPanel {...myProps} />
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Panel>
                                </Collapse>
                            );
                        })
                    ) : (
                        <NoDataFound informtion={noDataTitle} />
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Tabs
                    defaultActiveKey={APPLICATION_WEB}
                    onChange={onTabChange}
                    items={Object.values(DEVICE_TYPE)?.map((item) => ({
                        key: item?.key,
                        label: item?.title,
                        children: AccordianTreeUtils({ menuData: deviceType === APPLICATION_WEB ? webApplications : mobileApplications, roleCode }),
                    }))}
                />
            </Form>
        </>
    );
};

export const ApplicationTree = ApplicationTreeMain;
