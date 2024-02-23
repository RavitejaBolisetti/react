/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState } from 'react';
import { Card, Form, Collapse, Divider } from 'antd';

import PartDetailsCard from './PartDetailsCard';
import AddEditForm from './AddEditForm';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;

const PartDetailsMain = ({}) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [finalFormdata, setFinalFormdata] = useState([]);
    const [canFormSave, setCanFormSave] = useState(false);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [docForm] = Form.useForm();

    const onDocumentFormFinish = () => {
        docForm
            .validateFields()
            .then((val) => {
                setFinalFormdata((prev) => [...prev, val]);
                docForm.resetFields();
                forceUpdate();
            })
            .catch((err) => console.error(err));
    };

    const onFieldsChange = () => {
        setCanFormSave(true);
    };

    return (
        <Collapse defaultActiveKey={1}>
            <Panel
                key={1}
                header={
                    <>
                        <span>{translateContent('Part Details')}</span>
                    </>
                }
                showArrow={false}
                collapsible='disabled'
            >
                <Divider />
                <AddEditForm form={docForm} onFinish={onDocumentFormFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} finalFormdata={finalFormdata} onFieldsChange={onFieldsChange} />
                {finalFormdata?.length > 0 &&
                    finalFormdata?.map((data) => {
                        return <PartDetailsCard formData={data} form={docForm} onFinish={onDocumentFormFinish} finalFormdata={finalFormdata} setfinalFormdata={setFinalFormdata} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} onFieldsChange={onFieldsChange} />;
                    })}
            </Panel>
        </Collapse>
    );
};

export default PartDetailsMain;
