import React, { Fragment, useState, useReducer } from 'react';
import { Form, Divider } from 'antd';

import CardProduct from './CardProduct';
import FormsProduct from './FormsProduct';

const ProductAttribueMaster = ({ productHierarchyAttributeData, footerEdit = false, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable, setFinalFormdata, finalFormdata, actions }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [form] = Form.useForm();

    const onActionFormFinish = () => {
        form.validateFields()
            .then((data) => {
                console.log('data',data)
                // setIsBtnDisabled(!(attributeName || attributeValue));
            })
                .catch((err) => console.error(err));

        // const attributeName = form.getFieldValue('attributeName');
        // const attributeValue = form.getFieldValue('attributeValue');
        // const { value, label } = val?.applicationName;
        // const { actionId } = actions?.find((el) => el?.id === value);
        // setFinalFormdata({ ...finalFormdata, applicationAction: [...finalFormdata.applicationAction, { actionName: label, status: val?.status, id: val?.id, actionMasterId: value, actionId: actionId }] });
        // form.resetFields();
    };

    return (
        <Fragment>
            {/* <Divider /> */}
            <FormsProduct finalFormdata={finalFormdata} form={form} onFinish={onActionFormFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} actions={actions} productHierarchyAttributeData={productHierarchyAttributeData} />
            {finalFormdata?.applicationAction?.length > 0 &&
                finalFormdata?.applicationAction?.map((action) => {
                    return <CardProduct {...action} form={form} onFinish={onActionFormFinish} setFinalFormdata={setFinalFormdata} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} productHierarchyAttributeData={productHierarchyAttributeData} />;
                })}
        </Fragment>
    );
};

export default ProductAttribueMaster;
