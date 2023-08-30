/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Row, Col, Collapse, Divider, Button, Typography } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { PlusOutlined } from '@ant-design/icons';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import styles from 'assets/sass/app.module.scss';
// import styles from 'components/common/Common.module.css';
import PaymentFormContainer from './PaymentDetails/PaymentFormContainer';
import ViewList from './ViewList';

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
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    Payment Details
                                </Text>
                                {!formActionType?.viewMode && !formActionType?.editMode && (
                                    <Button disabled={isListEditing || isAdding} onClick={addContactHandeler} icon={<PlusOutlined />} type="primary">
                                        Add
                                    </Button>
                                )}
                            </Col>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                <div className={styles.floatRight}>
                                    <Text type="secondary">Total Amount</Text>
                                    <HiOutlineCurrencyRupee style={{ color: '#ff3e5b', fontSize: '20px', marginBottom: '-4px' }} />
                                    <h style={{ color: '#8e8585' }}> : </h>
                                    <Text type="secondary">{totalReceivedAmount}</Text>
                                </div>
                            </Col>
                        </Row>
                    }
                    key="2"
                >
                    <>
                        {!formActionType?.viewMode && showAddEditForm && (
                            <>
                                <Divider />
                                <PaymentFormContainer {...props} />
                            </>
                        )}

                        <ViewList {...props} />
                    </>
                </Panel>
            </Collapse>
        </>
    );
};

export default PaymentAddEdit;
