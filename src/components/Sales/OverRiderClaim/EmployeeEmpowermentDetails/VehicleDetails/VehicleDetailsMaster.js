/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState } from 'react';
import { Card, Form } from 'antd';

import VehicleDetailsForm from './VehicleDetailsForm';
import CardVehicleDetails from './CardVehicleDetails';

const VehicleDetailsMaster = ({ formActionType, chessisNoList }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [vehicleForm] = Form.useForm();

    const [vehicledetailData, setVehicleDetailData] = useState([]);
    const [canFormSave, setCanFormSave] = useState(true);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    const onDocumentFormFinish = () => {
        vehicleForm.validateFields().then((val) => {
            console.log("🚀 ~ file: VehicleDetailsMaster.js:26 ~ vehicleForm.validateFields ~ val:", val)
            setVehicleDetailData((prev) => [...prev, val]);
            vehicleForm.resetFields();
            forceUpdate();
        }).catch(err => console.log(err));
    };
console.log('vehicledetailData',vehicledetailData);
    const onFieldsChange = () => {
        setCanFormSave(true);
    };

    const formProps = {
        onFinish: onDocumentFormFinish,
        chessisNoList,
        formActionType,
        form: vehicleForm,
        setIsBtnDisabled,
        dataList: vehicledetailData,
    };

    return (
        <>
        {/* <Card> */}
            <VehicleDetailsForm {...formProps} isBtnDisabled={isBtnDisabled} onFieldsChange={onFieldsChange} />
            {vehicledetailData?.length > 0 &&
                vehicledetailData.map((data) => {
                    return <CardVehicleDetails formData={data}  {...formProps} setVehicleDetailData={setVehicleDetailData} forceUpdate={forceUpdate} isBtnDisabled={isBtnDisabled} onFieldsChange={onFieldsChange} />;
                })}
        {/* </Card> */}
        </>
    );
};

export default VehicleDetailsMaster;
