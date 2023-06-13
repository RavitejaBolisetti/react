import React, { Fragment, useState, useReducer } from 'react';
import { Form, Divider, Collapse, Card } from 'antd';

import CardAccessories from './CardAccessories';
import AddEditForm from './AddEditForm';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;

const AccessoriesAddonMain = ({ setCanFormSave, setIsBtnDisabled, isBtnDisabled, setFormBtnDisable, setAddOnItemInfo, addOnItemInfo }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [addOnform] = Form.useForm();

    const addOnformOnFinish = (val) => {
        console.log('val', val)
        setAddOnItemInfo((prev) => [...prev, val]);
        addOnform.resetFields();
        forceUpdate();
    };

    const onFieldsChange = () => {
        setCanFormSave(true);
    };

    return (
        <Fragment>
            <Card>
                <Divider />
                <AddEditForm form={addOnform} onFinish={addOnformOnFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} addOnItemInfo={addOnItemInfo} onFieldsChange={onFieldsChange} />

                {addOnItemInfo?.length > 0 &&
                    addOnItemInfo?.map((item) => {
                        return <CardAccessories {...item} form={addOnform} onFinish={addOnformOnFinish} addOnItemInfo={addOnItemInfo} setAddOnItemInfo={setAddOnItemInfo} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} onFieldsChange={onFieldsChange} />;
                    })}
            </Card>
        </Fragment>
    );
};

export default AccessoriesAddonMain;
