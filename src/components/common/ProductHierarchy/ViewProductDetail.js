import React from 'react';
import { Button, Col, Row, Descriptions } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends } from 'react-icons/fa';

export const ViewProductDetailMain = ({ viewTitle, buttonData, attributeData, selectedTreeData, handleEditBtn, handleRootChildBtn, handleChildBtn, handleSiblingBtn, setClosePanels, styles }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.contentHeaderRightBackground}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <div>
            <div className={`${styles.viewContainer} ${styles.hierarchyRightContaner}`}>
                <Descriptions {...viewProps} >
                    
                    <Descriptions.Item label="Attribute Level">{attributeData?.find((attribute) => attribute.id === selectedTreeData?.attributeKey)?.hierarchyAttribueName}</Descriptions.Item>
                    <Descriptions.Item label="Parent">Parent Name</Descriptions.Item>
                    <Descriptions.Item label="Code">{selectedTreeData.prodctCode}</Descriptions.Item>
                    <Descriptions.Item label="Short Description">{selectedTreeData?.prodctShrtName}</Descriptions.Item>
                    <Descriptions.Item label="Long Description">{selectedTreeData?.prodctLongName}</Descriptions.Item>
                    <Descriptions.Item label="Status">{selectedTreeData?.active === 'Y' ? 'Active' : 'InActive'}</Descriptions.Item>
                   
                </Descriptions>
            </div>
            <div className={styles.hyrbuttonContainer}>
            <div className={styles.buttonContainer}>
                <div className={styles.btnLeft}>
                    {buttonData?.editBtn && (
                        <Button danger onClick={() => handleEditBtn()}>
                            <FaEdit className={styles.buttonIcon} />
                            Edit
                        </Button>
                    )}
                </div>

                <div className={styles.btnRight}>
                    {buttonData?.rootChildBtn && (
                        <Button danger type="primary" onClick={() => handleRootChildBtn()}>
                            <FaUserPlus className={styles.buttonIcon} />
                            Add Child
                        </Button>
                    )}

                    {buttonData?.childBtn && (
                        <Button danger type="primary"
                            onClick={() => {
                                handleChildBtn();
                                setClosePanels(['1']);
                            }}
                        >
                            <FaUserPlus className={styles.buttonIcon} />
                            Add Child
                        </Button>
                    )}

                    {buttonData?.siblingBtn && (
                        <Button danger onClick={() => handleSiblingBtn()}>
                            <FaUserFriends className={styles.buttonIcon} />
                            Add Sibling
                        </Button>
                    )}
                </div>
            </div>
            </div>
        </div>
    );
};

export const ViewProductDetail = ViewProductDetailMain;
