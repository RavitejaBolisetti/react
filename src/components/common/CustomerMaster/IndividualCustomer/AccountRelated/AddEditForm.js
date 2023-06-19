import { React } from 'react';

import { Row, Col, Form, Input, Checkbox, Button } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';

import { validateNumberWithTwoDecimalPlaces, validationNumber, valueBetween0to100 } from 'utils/validation';

const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, onFinish, onFinishFailed } = props;
    const { buttonData, setButtonData } = props;

    const { setIsViewModeVisible } = props;

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };

    const viewProps = {
        onCloseAction,
        handleEdit,
        formData,
    };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Credit Limit" name="creditAmount" initialValue={formData?.creditAmount} rules={[validateNumberWithTwoDecimalPlaces('credit limit amount')]}>
                            <Input placeholder={preparePlaceholderText('limit')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Credit Limit Days" name="creditDays" initialValue={formData?.creditDays} rules={[validationNumber('credit limit days')]}>
                            <Input placeholder={preparePlaceholderText('limit')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Outstanding Amount" initialValue={formData?.outstandingAmount} name="outstandingAmount" rules={[validateNumberWithTwoDecimalPlaces('outstanding amount')]}>
                            <Input placeholder={preparePlaceholderText('amount')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Parts Discount %" name="partsDiscount" initialValue={formData?.partsDiscount} rules={[{ validator: (fieldData, value) => valueBetween0to100(value, 'parts discount') }]}>
                            <Input placeholder={preparePlaceholderText('discount')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Labour Discount %" name="labourDiscount" initialValue={formData?.labourDiscount} rules={[{ validator: (fieldData, value) => valueBetween0to100(value, 'labour discount') }]}>
                            <Input placeholder={preparePlaceholderText('discount')} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item label="Remarks" name="remarks" initialValue={formData?.remarks}>
                            <TextArea rows={2} maxLength={250} placeholder={preparePlaceholderText('remark')} />
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
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Button htmlType="Submit">Submit </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
