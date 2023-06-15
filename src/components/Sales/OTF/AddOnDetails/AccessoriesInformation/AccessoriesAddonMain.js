import React, { Fragment, useReducer } from 'react';
import { Form } from 'antd';

import CardAccessories from './CardAccessories';
import AddEditForm from './AddEditForm';

const AccessoriesAddonMain = ({ setIsBtnDisabled, isBtnDisabled, setFormBtnDisable, setAddOnItemInfo, addOnItemInfo }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [addOnform] = Form.useForm();

    const addOnformOnFinish = (val) => {
        setAddOnItemInfo((prev) => [...prev, val]);
        addOnform.resetFields();
        forceUpdate();
    };

    const onFieldsChange = () => {
        // setCanFormSave(true);
    };

    return (
        <Fragment>
            <AddEditForm form={addOnform} onFinish={addOnformOnFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} addOnItemInfo={addOnItemInfo} onFieldsChange={onFieldsChange} />

            {addOnItemInfo?.length > 0 &&
                addOnItemInfo?.map((item) => {
                    return <CardAccessories {...item} form={addOnform} onFinish={addOnformOnFinish} addOnItemInfo={addOnItemInfo} setAddOnItemInfo={setAddOnItemInfo} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} onFieldsChange={onFieldsChange} />;
                })}
        </Fragment>
    );
};

export default AccessoriesAddonMain;
