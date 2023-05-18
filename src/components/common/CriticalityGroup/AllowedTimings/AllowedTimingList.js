import React, { useState } from 'react';

import { Form, Row, Col, Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { LANGUAGE_EN } from 'language/en';

import AddEditForm from './AddEditForm';
import AllowedTimingCard from './AllowedTimingCard';

import styles from 'components/common/Common.module.css';

const AllowedTimingList = (props) => {
    const { timeData, setTimeData, isAddTimeVisible, setIsAddTimeVisible } = props;
    const { formActionType, formData, setFormData, showGlobalNotification, forceUpdate, handleFormValueChange, handleFormFieldChange } = props;

    const [timingForm] = Form.useForm();
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    const validatedDuplicateTime = (timeSlotFrom, timeSlotTo) => {
        let timeSegments = [...timeData, { timeSlotFrom, timeSlotTo }];
        if (timeSegments?.length === 1) {
            return false;
        }

        timeSegments?.sort((timeSegment1, timeSegment2) => timeSegment1['timeSlotFrom']?.localeCompare(timeSegment2['timeSlotFrom']));

        for (let i = 0; i < timeSegments.length - 1; i++) {
            const currentEndTime = timeSegments[i]['timeSlotTo'];
            const nextStartTime = timeSegments[i + 1]['timeSlotFrom'];
            if (currentEndTime > nextStartTime) {
                showGlobalNotification({ notificationType: 'error', title: 'Error', message: LANGUAGE_EN.GENERAL.TIME_OVERLAPPING.MESSAGE, placement: 'bottomRight' });
                return true;
            }
        }
        return false;
    };

    const onTimingFormFinish = (values) => {
        let timeSlotFrom = values?.timeSlotFrom?.format('HH:mm');
        let timeSlotTo = values?.timeSlotTo?.format('HH:mm');
        let overlap = validatedDuplicateTime(timeSlotFrom, timeSlotTo);
        !overlap && setTimeData([...timeData, { timeSlotFrom, timeSlotTo }]);
        timingForm.resetFields();
        setFormData(...formData, timeData);
        forceUpdate();
    };

    const formProps = {
        isAddTimeVisible,
        form: timingForm,
        onFinish: onTimingFormFinish,
        validatedDuplicateTime,
        handleFormValueChange,
        handleFormFieldChange,
    };

    const cardProps = {
        form: timingForm,
        timeData,
        setTimeData,
        formData,
        setFormData,
        showGlobalNotification,
        onFinish: onTimingFormFinish,
        forceUpdate,
    };
    const showTime = timeData?.length > 0 || ((formActionType?.addMode || formActionType?.editMode) && isAddTimeVisible);

    return (
        <>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.graySeparator}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <p className={styles.allowedTimingAlignment}>Allowed Timings</p>
                        </Col>

                        {!formActionType?.viewMode && (
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles.addTimeBtn}>
                                <Button
                                    type="link"
                                    onClick={() => {
                                        setIsAddTimeVisible(!isAddTimeVisible);
                                        timingForm.resetFields();
                                    }}
                                    icon={<PlusOutlined />}
                                >
                                    Add Time
                                </Button>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>

            {showTime && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className={styles.timingHeader}>
                            <Row gutter={20}>
                                <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                    <div className={styles.paddingLeft}>Start Time</div>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <div className={styles.paddingLeft}> End Time</div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            )}
            <div className={styles.advanceTimingContainer}>
                {!formActionType?.viewMode && isAddTimeVisible && <AddEditForm {...formProps} />}
                {timeData?.length > 0 && (
                    <div className={styles.viewTiming}>
                        <div className={styles.seprator}></div>
                        {timeData?.map((timing) => {
                            return <AllowedTimingCard styles={{ marginBottom: '10px', backgroundColor: '#B5B5B6' }} {...cardProps} {...timing} />;
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default AllowedTimingList;
