import React, { Fragment, useState, useReducer } from 'react';
import { Form, Divider, Collapse, Card } from 'antd';

import CardAccessories from './CardAccessories';
import AddEditForm from './AddEditForm';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;

const AccessoriesAddonMain = ({ setCanFormSave, setIsBtnDisabled, isBtnDisabled, setFormBtnDisable, SetAddOnItemInfo, addOnItemInfo }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [openAccordian, setOpenAccordian] = useState('');

    const [addOnform] = Form.useForm();

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const addOnformOnFinish = (val) => {
        SetAddOnItemInfo((prev) => [...prev, val]);
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
                        return <CardAccessories {...item} form={addOnform} onFinish={addOnformOnFinish} addOnItemInfo={addOnItemInfo} SetAddOnItemInfo={SetAddOnItemInfo} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} onFieldsChange={onFieldsChange} />;
                    })}
            </Card>
        </Fragment>
    );
};

export default AccessoriesAddonMain;
