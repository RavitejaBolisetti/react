/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect } from 'react';
import { Input, Form, Col, Row, Switch, Space, Collapse, Tabs, Typography, Divider } from 'antd';

import { productDataTree } from 'components/common/UserManagement/dummyData';
import { validateAlphanumericWithSpaceHyphenPeriod, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { expandIcon } from 'utils/accordianExpandIcon';
import { generateList as flattenData } from 'utils/generateList';
// import { APPLICATION_DEVICE_TYPE } from 'utils/applicationDeviceType';

// import { ViewRoleManagement } from './ViewRoleManagement';
import { withDrawer } from 'components/withDrawer';

import { DrawerFormButton } from 'components/common/Button';
import LeftPanel from 'components/common/LeftPanel';

import styles from 'assets/sass/app.module.scss';

import { BsExclamationSquareFill } from 'react-icons/bs';

const fieldNames = { title: 'productName', key: 'productCode', children: 'children' };

const APPLICATION_DEVICE_TYPE = {
    WEB: { key: 'W', title: 'Web' },
    MOBILE: { key: 'M', title: 'Mobile' },
};

const { TextArea } = Input;
const { Panel } = Collapse;
const { Search } = Input;
const { Text } = Typography;

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
    const { checkedKeys, setCheckedKeys, webApplications, setWebApplications, mobileApplications, setMobileApplications, deviceType, setDeviceType, setClosePanels, menuTreeData, formData, onCloseAction, form, onFinish, formActionType: { addMode, viewMode, editMode } = undefined } = props;
    const { defaultCheckedKeysMangement, setdefaultCheckedKeysMangement } = props;
    const APPLICATION_WEB = APPLICATION_DEVICE_TYPE?.WEB?.key;
    const APPLICATION_MOBILE = APPLICATION_DEVICE_TYPE?.MOBILE?.key;

    const [accordianOpen, setAccordianOpen] = useState('');
    const [searchValue, setSearchValue] = useState();
    const [activeKey, setActiveKey] = useState([]);

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
            const deviceTypePrev = checkedKeys?.[deviceType] ? checkedKeys[deviceType] : {};
            setCheckedKeys(selectedKeys.length !== 0 ? { ...checkedKeys, [deviceType]: { ...deviceTypePrev, [currentKey]: [currentKey, ...selectedKeys] } } : []);
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
                setWebApplications(mapSelectedKeyData(webApplications));
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
                    newCheckedKeys = [...newCheckedKeys, ...checkedKeys[deviceType][key]];
                }
            }
            checkedKey = [...newCheckedKeys, ...checkedMenuKeys];

            return checkedKey;
        } else {
            return defaultCheckedKeysMangement[deviceType];
        }
    };

    const AccordianTreeUtils = ({ menuData }) => {
        return (
            <>
                <Space direction="vertical" size="middle">
                    {menuData?.map((el, i) => {
                        const treeData = el?.children;
                        const flatternData = flattenData(treeData);
                        const checkedMenuKeys = flatternData?.map((i) => i.checked && i?.value);
                        const allowedAccess = treeData?.filter((i) => i.checked);

                        const myProps = {
                            fieldNames,
                            treeData,
                            searchValue,
                            setSearchValue,
                            checkable: true,
                            isTreeViewVisible: true,
                            onCheck: onCheck(el?.value),
                            disableCheckbox: viewMode,
                            checkedKeys: handleDefaultCheckedKeys(addMode, defaultCheckedKeysMangement, checkedMenuKeys),
                        };

                        return (
                            <div className={styles.managementContainer}>
                                <h1>is product mapping</h1>
                                <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={() => onChange(i)} expandIconPosition="end">
                                    <Panel
                                        header={
                                            <Row type="flex" justify="space-between" align="middle" size="large">
                                                <Row type="flex" justify="space-around" align="middle">
                                                    <Typography>{el?.value}</Typography>
                                                </Row>
                                                {allowedAccess?.length > 0 && (
                                                    <Text type="secondary" className={styles.allowAccess}>
                                                        {allowedAccess?.length} Access Provided
                                                    </Text>
                                                )}
                                            </Row>
                                        }
                                        key={i}
                                    >
                                        <Divider />
                                        <Space direction="vertical" size="middle">
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                    <Form.Item label={''} name="search" validateTrigger={['onSearch']}>
                                                        <Search placeholder="Search" initialValue={searchValue} onChange={handleSearchValue} allowClear />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.roleTree}>
                                                    <LeftPanel {...myProps} />
                                                </Col>
                                            </Row>
                                        </Space>
                                    </Panel>
                                </Collapse>
                            </div>
                        );
                    })}
                </Space>
            </>
        );
    };

    const AccordianTreePanel = () => {
        return (
            <Tabs
                defaultActiveKey="1"
                onChange={onTabChange}
                items={Object.values(APPLICATION_DEVICE_TYPE)?.map((item) => ({
                    key: item?.key,
                    label: item?.title,
                    children: AccordianTreeUtils({ menuData: viewMode ? menuTreeData?.filter((i) => i.checked) : menuTreeData }),
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
        menuTreeData: menuTreeData?.filter((i) => i.checked),
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
                {/* {viewMode ? (
                    <>
                        <ViewRoleManagement {...viewProps} />
                    </>
                ) : ( */}
                <>
                    <div>
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
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.subTitleSec}>
                            Application Access<span className={styles.mandatory}>*</span>
                        </Col>
                    </Row>
                    kaise hua?
                    {AccordianTreePanel()}
                </>
                {/* )} */}
                <DrawerFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const ProductMapping = withDrawer(AddEditFormMain, {});

// const ProductMapping = () => {
//     const [isTreeViewVisible, setTreeViewVisible] = useState(true);
//     const [selectedTreeKey, setSelectedTreeKey] = useState([]);
//     const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
//     const [searchValue, setSearchValue] = useState();

//     const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

//     const handleTreeViewClick = (keys) => {
//         console.log("🚀 ~ file: ProductMapping.js:19 ~ handleTreeViewClick ~ keys:", keys)
//     };

//     const productProps = {
//         checkable:true,
//         isTreeViewVisible,
//         handleTreeViewVisiblity,
//         selectedTreeKey,
//         selectedTreeSelectKey,
//         fieldNames,
//         handleTreeViewClick,
//         treeData: productDataTree,
//         searchValue,
//         setSearchValue,
//     };

//   return (
//     <div>
//         <LeftPanel {...productProps} />
//     </div>
//   )
// };

// export default ProductMapping;
