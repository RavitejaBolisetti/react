/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import { Input, Form, Col, Row, Switch, Button, Space, Collapse, Tabs, Tree } from 'antd';
import { FaSquare } from 'react-icons/fa';
import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineCheck } from 'react-icons/ai';

import { validateAlphanumericWithSpaceHyphenPeriod, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

import { withDrawer } from 'components/withDrawer';
import { ViewRoleManagement } from './ViewRoleManagement';
import { makeTreeFromArray, chackedKeysMapData } from './TranformMenudata';
import { getHierarchyParents } from 'utils/getHierarchyParents';
// import TreeSample from './TreeSample';

const { TextArea } = Input;
const { Panel } = Collapse;
const { Search } = Input;

const { TreeNode } = Tree;

const AddEditFormMain = (props) => {
    const { setDeviceType, onErrorAction, extraParams, fetchMenuList, setClosePanels, listShowLoading, userId, rowData, showSaveBtn, menuTreeData, formData, isFormBtnActive, onCloseAction, setFormBtnActive, handleEditData, form, isReadOnly, onFinish, footerEdit, setSaveAndAddNewBtnClicked, isViewModeVisible } = props;

    const [expandedKeys, setExpandedKeys] = useState({});
    const [referenceKeys, setreferenceKeys] = useState({});
    const [accordianOpen, setAccordianOpen] = useState('');
    const [checkedKeysTreeData, setcheckedKeysTreeData] = useState();

    const fieldNames = { title: 'label', key: 'value', children: 'children' };
    const finalMenuList = [];
    const flatternMenu = (data) => {
        for (let node of data) {
            finalMenuList.push({
                ...node,
                uid: node[fieldNames?.key],
            });

            if (node[fieldNames?.children]) {
                flatternMenu(node[fieldNames?.children]);
            }
        }
    };

    menuTreeData && flatternMenu(menuTreeData);
    const generateDataList = (treeData) => {
        let listData = [];
        const generateMenuList = (data) => {
            for (let i = 0; i < data?.length; i++) {
                const node = data[i];
                const { children, ...rest } = node;
                listData.push({
                    ...rest,
                });
                if (node?.children) {
                    generateMenuList(node?.children);
                }
            }
        };
        generateMenuList(treeData);
        setcheckedKeysTreeData(listData);
    };

    useEffect(() => {
        if (menuTreeData?.length) {
          //  console.log('🚀 ~ file: AddEditFormTemp.js:56 ~ useEffect ~ menuTreeData:', menuTreeData);
            const chackedKeysdata = chackedKeysMapData(menuTreeData);
            setreferenceKeys(chackedKeysdata);
            generateDataList(menuTreeData);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuTreeData]);

    useEffect(() => {
        if (!checkedKeysTreeData?.length) return;

        // let dataWithCheckedKeys = checkedKeysTreeData.map(el => {
        //     if(el.value) {

        //     }
        // })

        let checkedTreeData = makeTreeFromArray(checkedKeysTreeData, 'Web');
       // console.log('checkedTreeData', checkedTreeData);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkedKeysTreeData]);

    useEffect(() => {
        if (userId && formData?.id) {
            extraParams['1']['value'] = rowData?.id;
            fetchMenuList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, formData?.id]);

    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data?.length; i++) {
            const node = data[i];
            dataList.push({
                value: node?.value,
                label: node?.label,
                parentId: node?.parentId,
            });
            if (node?.children) {
                generateList(node?.children);
            }
        }
        return dataList;
    };

    const expandedKeysOnSearch = (treedataList, searchVal) => {
        const dataListArray = generateList(treedataList);
        let activeKeys = [];
        const searchFilterList = dataList?.filter((el) => el?.label?.toLowerCase().includes(searchVal?.toLowerCase()));
        if (searchFilterList?.length > 0) {
            searchFilterList?.forEach((val) => {
                activeKeys?.push(val?.value);

                if (val?.parentId) {
                    const getAllParentKeys = (pid) => {
                        const parentRes = dataListArray?.find((el) => el?.id === pid);
                        activeKeys.push(val?.parentId);
                        if (parentRes?.parentId) {
                            activeKeys.push(parentRes?.parentId);
                            getAllParentKeys(parentRes.parentId);
                        }
                    };
                    getAllParentKeys(val?.parentId);
                }
                setExpandedKeys(searchVal?.length ? (prev) => ({ ...prev, [treedataList[0].value]: [...new Set(activeKeys)] }) : {});
            });
        } else {
            setExpandedKeys([]);
        }
    };

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const onFinishFailed = () => {};

    const deepSearch = (data, value, key = 'value', sub = 'children', tempObj = {}) => {
        if (value && data) {
            data.find((node) => {
                if (node[key] === value) {
                    tempObj.found = node;
                    return node;
                }
                return deepSearch(node[sub], value, key, sub, tempObj);
            });
            if (tempObj.found) {
                return tempObj.found;
            }
        }
        return false;
    };

    function searchTree(tree, nodesProp, prop, value) {
        var i,
            f = null; // iterator, found node
        if (Array.isArray(tree)) {
            // if entry object is array objects, check each object
            for (i = 0; i < tree.length; i++) {
                f = searchTree(tree[i], nodesProp, prop, value);
                if (f) {
                    // if found matching object, return it.
                    return f;
                }
            }
        } else if (typeof tree === 'object') {
            // standard tree node (one root)
            if (tree[prop] !== undefined && tree[prop] === value) {
                return tree; // found matching node
            }
        }
        if (tree[nodesProp] !== undefined && tree[nodesProp].length > 0) {
            // if this is not maching node, search nodes, children (if prop exist and it is not empty)
            return searchTree(tree[nodesProp], nodesProp, prop, value);
        } else {
            return null; // node does not match and it neither have children
        }
    }

    var data = [
        {
            title: 'topNode',
            children: [
                {
                    title: 'node1',
                    children: [
                        {
                            title: 'randomNode_1',
                        },
                        {
                            title: 'node2',
                            children: [
                                {
                                    title: 'randomNode_2',
                                    children: [
                                        {
                                            title: 'node2',
                                            children: [
                                                {
                                                    title: 'randomNode_3',
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];

    var r = searchTree(data, 'children', 'title', 'node4');
    //var r = searchTree(data, 'children', 'title', 'node2');  // check it too
    //console.log(r, 'searchTree');

    const onTreeCheck = (checked, targetNode, value) => {
        const fieldNames = { key: 'value', children: 'parent' };

        const dataList = [targetNode?.value];
        const generateList = (data) => {
            for (let node of data) {
                dataList.push(node[fieldNames?.key]);
                if (node[fieldNames?.children]) {
                    generateList(node[fieldNames?.children]);
                }
            }
        };

        //console.log('Kuldeep', targetNode, targetNode?.children);

        // targetNode && generateList(targetNode?.[fieldNames?.key]);
        // console.log('🚀 ~ file: AddEditFormTemp.js:140 ~ onTreeCheck ~ checked:', dataList, targetNode);

        let parentKeys = '';
        if (targetNode?.isChild && targetNode?.parent) {
            const fieldNames = { title: 'label', key: 'value', children: 'children' };
            parentKeys = getHierarchyParents({ children: menuTreeData }, targetNode?.[fieldNames?.key], fieldNames);
        } else {
            parentKeys = [targetNode?.value];
        }

        const childKeys = [];
        if (targetNode?.children) {
            const getTargetNodeKey = (data) => {
                for (let node of data) {
                    childKeys.push(node?.value);
                    if (node?.children) {
                        getTargetNodeKey(node?.children);
                    }
                }
            };
            getTargetNodeKey(targetNode?.children);
        }

        const selectedKeys = [...parentKeys, ...childKeys];
        if (targetNode?.checked) {
            //console.log('Add Keys', selectedKeys);
        } else {
           // console.log('Remove Keys', selectedKeys);
        }
        setreferenceKeys((prev) => ({ ...prev, [value]: checked }));
    };

    const onChanges = (value) => {
       // console.log('this is the Change in the Tree =>>>>>', value);
    };

    const onExpanded = (expanded, targetNode, value) => {
        setExpandedKeys({ ...expandedKeys, [value]: expanded });
    };

    const onTabChange = (newActiveKey) => {
        setDeviceType(newActiveKey);
    };

    const handleCollapse = (key) => {
        setAccordianOpen((prev) => (prev === key ? '' : key));
    };

    const AccordianTreeUtils = () => {
        return (
            <>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    {/* <TreeSample /> */}
                    <Tree defaultExpandedKeys={['0-0-0']}>
                        <TreeNode checkable={true} title="parent 1" key="0-0">
                            <TreeNode className={styles.leafItem} title="parent 1-0" key="0-0-0">
                                <TreeNode title="leaf" key="0-0-0-0" />
                                <TreeNode title="leaf" key="0-0-0-1" />
                                <TreeNode title="leaf" key="0-0-0-2" />
                            </TreeNode>
                            <TreeNode title="parent 1-1" key="0-0-1">
                                <TreeNode className={styles.leafItem} title="leaf" key="0-0-1-0" />
                            </TreeNode>
                            <TreeNode title="parent 1-2" key="0-0-2">
                                <TreeNode className={styles.leafItem} title="leaf" key="0-0-2-0" />
                                <TreeNode className={styles.leafItem} title="leaf" key="0-0-2-1" />
                            </TreeNode>
                        </TreeNode>
                    </Tree>
                    {menuTreeData?.map(
                        (el, i) =>
                            console.log('el', el) || (
                                <Collapse activeKey={accordianOpen} onChange={() => handleCollapse(i)} expandIcon={() => <AiOutlinePlusSquare style={{ width: '16px', height: '16px' }} />}>
                                    <Panel key={i} header={el?.value}>
                                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                    <Search
                                                        placeholder="Search"
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        onChange={(event) => expandedKeysOnSearch([el], event.target.value)}
                                                        allowClear
                                                    />
                                                </Col>
                                            </Row>
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                    <CheckboxTree
                                                        checkModel={'all'}
                                                        nodes={[el]}
                                                        expanded={expandedKeys[el?.value] || []}
                                                        // expanded={expandedKeys[el?.value]}
                                                        checked={referenceKeys[el?.value] || []}
                                                        // checked={checkedKeys || []}
                                                        onCheck={(checked, targetNode) => onTreeCheck(checked, targetNode, el?.value)}
                                                        onExpand={(expanded, targetNode) => onExpanded(expanded, targetNode, el?.value)}
                                                        onMoveNode={onChanges}
                                                        fields
                                                        icons={{
                                                            check: <AiOutlineCheck style={{ width: '8px', height: '8px', color: '#EA3A51', border: ' 1px solid #B5B5B6', padding: '3px', borderRadius: '5px' }} />,
                                                            uncheck: <div style={{ width: '14px', height: '14px', color: '#EA3A51', border: ' 1px solid #B5B5B6', borderRadius: '4px' }} />,
                                                            halfCheck: <FaSquare style={{ width: '10px', height: '10px', color: '#FF3E5B', border: ' 1px solid #B5B5B6', borderRadius: '5px', padding: '2px' }} />,
                                                            expandClose: <AiOutlinePlusSquare style={{ width: '18px', height: '18px', color: '#EA3A51' }} />,
                                                            expandOpen: <AiOutlineMinusSquare style={{ width: '18px', height: '18px', color: '#EA3A51' }} />,
                                                            expandAll: <span className="rct-icon rct-icon-expand-all" />,
                                                            collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
                                                            parentClose: '',
                                                            parentOpen: '',
                                                            leaf: '',
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Space>
                                    </Panel>
                                </Collapse>
                            )
                    )}
                </Space>
            </>
        );
    };

    const viewProps = {
        isVisible: isViewModeVisible,
        setClosePanels,
        formData,
        styles,
    };

    return (
        <>
            <Form form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
                {!isViewModeVisible ? (
                    <>
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={formData?.roleId} name="roleId" label="Role Id" rules={[validateRequiredInputField('id'), validationFieldLetterAndNumber('id')]}>
                                    <Input maxLength={6} placeholder={preparePlaceholderText('id')} disabled={isReadOnly} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={formData?.roleName} name="roleName" label="Role Name" rules={[validateRequiredInputField('name'), validateAlphanumericWithSpaceHyphenPeriod('name')]}>
                                    <Input maxLength={50} placeholder={preparePlaceholderText('name')} disabled={isReadOnly} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item initialValue={formData?.roleDesceription} label="Role Description" name="roleDesceription" rules={[validateRequiredInputField('description')]}>
                                    <TextArea
                                        placeholder={preparePlaceholderText('description')}
                                        autoSize={{
                                            minRows: 2,
                                            maxRows: 5,
                                        }}
                                        maxLength={250}
                                        disabled={isReadOnly}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={formData?.activeIndicator} labelAlign="left" wrapperCol={{ span: 24 }} name="activeIndicator" label="Status">
                                    <Switch checkedChildren="Active" defaultChecked unCheckedChildren="Inactive" value={formData?.activeIndicator} disabled={isReadOnly} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <hr />
                        <Tabs
                            defaultActiveKey="1"
                            onChange={onTabChange}
                            items={[
                                {
                                    label: 'Web',
                                    key: 'W',
                                    children: AccordianTreeUtils(menuTreeData),
                                },
                                {
                                    label: 'Mobile',
                                    key: 'M',
                                    children: AccordianTreeUtils(menuTreeData),
                                },
                            ]}
                        />
                    </>
                ) : (
                    <ViewRoleManagement {...viewProps} />
                )}
                <Row gutter={20} className={styles.formFooter}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                        <Button danger onClick={onCloseAction}>
                            {footerEdit ? 'Close' : 'Cancel'}
                        </Button>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                        {!footerEdit && showSaveBtn && (
                            <Button disabled={!isFormBtnActive} onClick={() => setSaveAndAddNewBtnClicked(false)} htmlType="submit" type="primary">
                                Save
                            </Button>
                        )}

                        {!formData?.id && (
                            <Button htmlType="submit" disabled={!isFormBtnActive} onClick={() => setSaveAndAddNewBtnClicked(true)} type="primary">
                                Save & Add New
                            </Button>
                        )}

                        {footerEdit && (
                            <Button onClick={handleEditData} form="myForm" key="submitAndNew" htmlType="submit" type="primary">
                                Edit
                            </Button>
                        )}
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
