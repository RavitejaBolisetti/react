/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Row, Col, Collapse, Divider, Button, Typography } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { PlusOutlined } from '@ant-design/icons';
import { BsCurrencyRupee } from 'react-icons/bs';

import ViewList from './ViewList';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;
const { Text } = Typography;
const PaymentAddEdit = (props) => {
    const { setIsAdding, paymentForm, handleCollapse, isAdding, isListEditing, setShowAddEditForm, showAddEditForm, setOpenAccordian, openAccordian, formActionType, totalReceivedAmount } = props;

    const addContactHandeler = (e) => {
        e.stopPropagation();
        setIsAdding(true);
        paymentForm.resetFields();
        setShowAddEditForm(true);
        setOpenAccordian([2]);
    };
    return (
        <>
            <Collapse onChange={() => handleCollapse(2)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel
                    header={
                        <Row>
                            <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                <Text strong style={{ marginTop: '4px' }}>
                                    {translateContent('receipts.heading.collapse.paymentDetails')}
                                </Text>
                                <Text type="secondary" className={`${styles.headText} ${styles.marL5}`}>
                                    {' '}
                                    {`|`}
                                </Text>
                                <span className={styles.marL5}>
                                    <Text type="secondary">Total Amount :</Text>
                                    <BsCurrencyRupee style={{ fontSize: '16px', marginBottom: '-4px' }} />
                                    <Text type="secondary">{totalReceivedAmount}</Text>
                                    <Text type="secondary">/- INR</Text>
                                </span>
                                {!formActionType?.viewMode && !formActionType?.editMode && (
                                    <Button className={styles.marL20} disabled={isListEditing || isAdding} onClick={addContactHandeler} icon={<PlusOutlined />} type="primary">
                                        {translateContent('global.buttons.add')}
                                    </Button>
                                )}
                            </Col>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                {/* <div className={`${styles.floatRight} ${styles.marT5}`}>
                                    <Text type="secondary">{translateContent('receipts.label.totalAmount')}</Text>
                                    <HiOutlineCurrencyRupee style={{ color: '#ff3e5b', fontSize: '20px', marginBottom: '-4px' }} />
                                    <h style={{ color: '#8e8585' }}> : </h>
                                    <Text type="secondary">{totalReceivedAmount}</Text>
                                </div> */}
                            </Col>
                        </Row>
                    }
                    key="2"
                >
                    <>
                        {!formActionType?.viewMode && showAddEditForm && (
                            <>
                                <Divider />
                                {/* <PaymentFormContainer {...props} /> */}
                            </>
                        )}
                        <Divider />
                        <ViewList {...props} />
                    </>
                </Panel>
            </Collapse>
        </>
    );
};

export default PaymentAddEdit;
