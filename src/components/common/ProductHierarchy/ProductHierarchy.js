import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'antd';
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';

import TreeView from 'components/common/TreeView';
import styles from 'pages/common/Common.module.css';
import { ParentHierarchy } from '../parentHierarchy/ParentHierarchy';
import { addToolTip } from 'utils/customMenuLink';
import { ChangeHistory } from 'components/common/ChangeHistory';
import { ProductMaster } from './ProductMaster';
import AddEditForm from './AddEditForm';

const mapStateToProps = (state) => {
    const {
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
    };

    return returnValue;
};

export const ProductHierarchyBase = ({ isChangeHistoryVisible, isAttributeVisible }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);

    const handleTreeViewVisibleClink = () => setTreeViewVisible(!isTreeViewVisible);

    return (
        <>
            <Row gutter={20}>
                <div className={styles.treeCollapsibleButton} style={{ marginTop: '-8px', marginLeft: '10px' }} onClick={handleTreeViewVisibleClink}>
                    {isTreeViewVisible ? addToolTip('Collapse')(<FaAngleDoubleLeft />) : addToolTip('Expand')(<FaAngleDoubleRight />)}
                </div>
            </Row>

            <Row gutter={20}>
                {isTreeViewVisible ? (
                    <Col xs={24} sm={24} md={!isTreeViewVisible ? 1 : 12} lg={!isTreeViewVisible ? 1 : 8} xl={!isTreeViewVisible ? 1 : 8} xxl={!isTreeViewVisible ? 1 : 8}>
                        <div className={styles.leftpanel}>
                            <div className={styles.treeViewContainer}>
                                <div className={styles.treemenu}>
                                    <TreeView isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                                </div>
                            </div>
                        </div>
                    </Col>
                ) : undefined}

                <Col xs={24} sm={24} md={!isTreeViewVisible ? 24 : 12} lg={!isTreeViewVisible ? 24 : 16} xl={!isTreeViewVisible ? 24 : 16} xxl={!isTreeViewVisible ? 24 : 16} className={styles.paddingRightZero}>
                    {isChangeHistoryVisible ? (
                        <ChangeHistory />
                    ) : (
                        <div className="right col" style={{ padding: '0' }}>
                            {isAttributeVisible ? <ProductMaster /> : <AddEditForm />}
                        </div>
                    )}
                </Col>
            </Row>

            <ParentHierarchy title={'Parent Hierarchy'} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        </>
    );
};

export const ProductHierarchy = connect(mapStateToProps, null)(ProductHierarchyBase);
