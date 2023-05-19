import { React } from 'react';

import { Col, Row, Form, Input, Checkbox, Space, Button } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewIndividualAccountDetails';
import styles from 'components/common/Common.module.css';

const { TextArea } = Input;

// const onChange = (e) => {
//     console.log(`checked = ${e.target.checked}`);
// };
// const apiKey = 'vipDealerInd';
// const handleCheckboxChange = (event) => {
//     const isChecked = event.target.checked;
//     console.log('API Key:', apiKey);
//     console.log('Checkbox value:', isChecked);
// };

const { Search } = Input;

const AddEditFormMain = (props) => {
    // const { onCloseAction } = props;
    const { onCloseAction, isViewModeVisible } = props;
    const [form] = Form.useForm();
    const handleReset = () => {
        form.resetFields();
    };

    const viewProps = {
        styles,
    };

    return (
        <>
            {!isViewModeVisible ? (
                <Form form={form} id="myForm" autoComplete="off" layout="vertical">
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="Credit Limit" name="limitAmt">
                                <Input placeholder={preparePlaceholderText('limit')} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="Credit Limit Days" name="limitDays">
                                <Input placeholder={preparePlaceholderText('limit')} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="Outstanding Amount" name="outstandingAmt">
                                <Input placeholder={preparePlaceholderText('amount')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="Parts Discount %" name="partsDiscount">
                                <Input placeholder={preparePlaceholderText('discount')} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="Labour Discount %" name="laborDiscount">
                                <Input placeholder={preparePlaceholderText('discount')} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item label="Remarks" name="remarks">
                                <TextArea rows={3} maxLength={250} placeholder={preparePlaceholderText('remark')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item valuePropName="checked" name="vipDealerInd">
                                <Checkbox>VIP Dealer</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                    <br></br>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Button danger onClick={onCloseAction}>
                                Cancel
                            </Button>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Button type="primary" className={styles.floatRight}>
                                Save & Proceed
                                {/* onClick={onFinish} */}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
