/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Card, Row, Button, Form, Divider, Typography } from 'antd';
import { FiEdit, FiTrash, FiUpload } from 'react-icons/fi';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import VehicleDetailsForm from './VehicleDetailsForm';
import { convertDate, converDateDayjs, dateFormatView } from 'utils/formatDateTime';
import { FiDownload } from 'react-icons/fi';

const { Text } = Typography;

const CardVehicleDetails = (prop) => {
    const { formData, setVehicleDetailData, setIsBtnDisabled, isBtnDisabled, onFieldsChange, chessisNoList } = prop;
    console.log("🚀 ~ file: CardVehicleDetails.js:18 ~ CardVehicleDetails ~ formData:", formData)
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        return () => {
            setIsEditing(false);
            setIsBtnDisabled(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDownload = (id) => {

    };

    const onEdit = (data) => {
        form.setFieldsValue({
            ...data
        });
        setIsEditing(true);
        setIsBtnDisabled(true);
    };

    const onUpdate = () => {
        form.validateFields()
            .then((newFormData) => {
                setVehicleDetailData((prev) => {
                    const newList = prev;
                    const indx = prev?.findIndex((el) => el?.deliveryChallanNo === formData?.deliveryChallanNo);
                    newList?.splice(indx, 1, { ...newFormData });
                    return [...newList ];
                });
                setIsEditing(false);
                setIsBtnDisabled(false);
                form.resetFields();
            })
            .catch((err) => {
                return err;
            });
    };

    const handleDeleteDocType = (val) => {
        setVehicleDetailData((prev) => {
            const newList = prev;
            const indx = prev?.findIndex((el) => el.deliveryChallanNo === val?.deliveryChallanNo);
            newList?.documentType?.splice(indx, 1);
            return [...newList];
        });
        setIsEditing(false);
        setIsBtnDisabled(false);
        form.resetFields();
    };

    const onCancel = () => {
        setIsEditing(false);
        setIsBtnDisabled(false);
    };

    return (
        <>
            <Card key={formData?.chessisNo}>
                <Row align="middle" className={styles.marB20}>
                    <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                        <div>
                            <Text strong>{formData?.chessisNo}</Text>
                        </div>
                        <div>
                            <Text type="secondary">{'Challan No : ' || translateContent('applicationMaster.text.code')}{formData?.deliveryChallanNo}</Text>
                        </div>
                        <div>
                            <Text type="secondary">{'Challan Date : ' || translateContent('applicationMaster.text.code')}{convertDate(formData?.deliveryChallanDate, dateFormatView)}</Text>
                        </div>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} className={styles.buttonsGroupRight}>
                        {!isEditing ? (
                            <>
                                {/* <Button disabled={isBtnDisabled} type="link" icon={<FiEdit />} onClick={() => onEdit(formData)} /> */}
                                <Button disabled={isBtnDisabled} type="link" icon={<FiDownload />} onClick={() => handleDownload('id')} />
                                {!formData?.id?.length > 0 && <Button disabled={isBtnDisabled} onClick={() => handleDeleteDocType(formData)} type="link" icon={<FiTrash />}></Button>}
                            </>
                        ) : (
                            <>
                                <Button type="link" onClick={onUpdate}>
                                    {translateContent('global.buttons.add')}
                                </Button>
                                <Button type="link" onClick={() => onCancel()}>
                                    {translateContent('global.buttons.cancel')}
                                </Button>
                            </>
                        )}
                    </Col>
                </Row>

                {isEditing && (
                    <>
                        <Divider />
                        <VehicleDetailsForm formData={formData} form={form} isEditing={isEditing} onFieldsChange={onFieldsChange} chessisNoList={chessisNoList} />
                    </>
                )}
            </Card>
        </>
    );
};

export default CardVehicleDetails;
