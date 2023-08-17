/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Row, Col, Collapse, Divider, Button, Typography } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { PlusOutlined } from '@ant-design/icons';
import PaymentFormContainer from './PaymentDetails/PaymentFormContainer';
import ViewList from './ViewList';

const { Panel } = Collapse;
const { Text } = Typography;
const PaymentAddEdit = (props) => {
    const { formData, setIsAdding, paymentForm, handleCollapse, isAdding, isListEditing, setShowAddEditForm, showAddEditForm, setOpenAccordian, formActionType } = props;

    const addContactHandeler = (e) => {
        e.stopPropagation();
        setIsAdding(true);
        paymentForm.resetFields();
        setShowAddEditForm(true);
        setOpenAccordian([2]);
    };
    return (
        <>
            <Collapse onChange={() => handleCollapse(2)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" defaultActiveKey={[2]}>
                <Panel
                    header={
                        <Row>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    Payment Details
                                </Text>
                                {!formActionType?.viewMode && !formActionType?.editMode && (
                                    <Button disabled={isListEditing || isAdding} onClick={addContactHandeler} icon={<PlusOutlined />} type="primary">
                                        Add
                                    </Button>
                                )}
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
