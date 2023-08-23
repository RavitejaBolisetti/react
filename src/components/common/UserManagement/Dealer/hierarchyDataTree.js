/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import { Input, Col, Row, Space, Collapse } from 'antd';
import { FaSquare } from 'react-icons/fa';
import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineCheck } from 'react-icons/ai';


const { Panel } = Collapse;
const { Search } = Input;

const AccordianTreeUtils = ({data, menuAlteredData, expandedKeys, checkedKeys, onTreeCheck, OnExpanded}) => {
    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                {menuAlteredData?.map((el) => (
                    <Collapse expandIcon={() => <AiOutlinePlusSquare style={{ width: '16px', height: '16px' }} />}>
                        <Panel header={el?.menuTitle}>
                            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Search
                                            placeholder="Search"
                                            style={{
                                                width: '100%',
                                            }}
                                            allowClear
                                        />
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <CheckboxTree
                                            nodes={[el]}
                                            expanded={expandedKeys[el?.value]}
                                            checked={!!checkedKeys[el?.value]}
                                            onCheck={(checked, targetNode) => onTreeCheck(checked, targetNode, el?.value)}
                                            onExpand={(expanded, targetNode) => OnExpanded(expanded, targetNode, el?.value)}
                                            // onMoveNode={OnChanges}
                                            title={{
                                                label: 'name',
                                                value: 'code',
                                                children: 'items',
                                            }}
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
                ))}
            </Space>
        </>
    );
};