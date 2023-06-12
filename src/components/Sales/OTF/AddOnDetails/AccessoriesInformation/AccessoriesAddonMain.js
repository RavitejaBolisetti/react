import React, { Fragment, useState, useReducer } from 'react';
import { Form, Divider, Collapse } from 'antd';

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
            <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian}>
                <Panel header={'Accessories Information'} key="1">
                    <AddEditForm form={addOnform} onFinish={addOnformOnFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} addOnItemInfo={addOnItemInfo} onFieldsChange={onFieldsChange} />

                    {addOnItemInfo?.length > 0 &&
                        addOnItemInfo?.map((item) => {
                            return <CardAccessories {...item} form={addOnform} onFinish={addOnformOnFinish} addOnItemInfo={addOnItemInfo} SetAddOnItemInfo={SetAddOnItemInfo} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} onFieldsChange={onFieldsChange} />;
                        })}
                </Panel>
            </Collapse>
        </Fragment>
    );
};

export default AccessoriesAddonMain;
