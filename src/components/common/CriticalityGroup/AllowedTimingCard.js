import React from 'react';

import { Form, Row, Col, Button, Input, TimePicker, Space } from 'antd';

import { LinearTrash } from 'Icons';
import { PlusOutlined } from '@ant-design/icons';

import { validateRequiredInputField } from 'utils/validation';
import { generateRandomNumber } from 'utils/generateRandomNumber';
import { LANGUAGE_EN } from 'language/en';

const AllowedTimingCard = (props) => {
    const { form, style, disabledProps, showGlobalNotification, removeItem, setTimesegmentLengthTracker, forceUpdate, validatedDuplicateTime, TimesegmentLengthTracker } = props;

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <p className={style.allowedTimingAlignment}>Allowed Timings</p>
                </Col>
            </Row>

            <Form.List name="allowedTimings">
                {(fields, { add, remove, ...restP }) => (
                    <>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={!disabledProps?.disabled ? style.addTimeBtn : style.hideInViewMode}>
                                <Button
                                    type="link"
                                    {...disabledProps}
                                    onClick={() => {
                                        add();
                                        setTimesegmentLengthTracker(generateRandomNumber());
                                    }}
                                    icon={<PlusOutlined />}
                                >
                                    Add Time
                                </Button>
                            </Col>
                        </Row>
                        <div>
                            {fields.length > 0 ? (
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <div className={style.timingHeader}>
                                            <Row gutter={20}>
                                                <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                                    <div className={style.paddingLeft}>Start Time</div>
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                                    <div className={style.paddingLeft2}> End Time</div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            ) : null}
                        </div>

                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} className={style.allowedTiming}>
                                    <Space size="middle">
                                        <Row gutter={20}>
                                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                                <Form.Item {...restField} name={[name, 'timeSlotFrom']} rules={[validateRequiredInputField('start time'), { validator: TimesegmentLengthTracker && validatedDuplicateTime('timeSlotFrom') }]}>
                                                    <TimePicker use12Hours size="large" format="h:mm A" {...disabledProps} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'timeSlotTo']}
                                                    rules={[
                                                        validateRequiredInputField('end time'),
                                                        {
                                                            validator: TimesegmentLengthTracker && validatedDuplicateTime('timeSlotTo'),
                                                        },
                                                    ]}
                                                >
                                                    <TimePicker use12Hours size="large" format="h:mm A" {...disabledProps} />
                                                </Form.Item>
                                            </Col>
                                            <Form.Item hidden {...restField} name={[name, 'id']}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item hidden {...restField} name={[name, 'isDeleted']} initialValue="N">
                                                <Input />
                                            </Form.Item>
                                            <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                                <Button
                                                    icon={<LinearTrash />}
                                                    className={!disabledProps?.disabled ? style.deleteBtn : style.hideInViewMode}
                                                    danger
                                                    ghost
                                                    onClick={() => {
                                                        removeItem(name, fields, restField);
                                                        remove(name);
                                                        setTimesegmentLengthTracker(generateRandomNumber());
                                                        forceUpdate();
                                                        showGlobalNotification({ notificationType: 'success', message: LANGUAGE_EN.GENERAL.ALLOWED_TIMING_DELETED.MESSAGE, placement: 'bottomRight', showTitle: false });
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </Space>
                                </div>
                            ))}
                        </>
                    </>
                )}
            </Form.List>
        </>
    );
};

export default AllowedTimingCard;
