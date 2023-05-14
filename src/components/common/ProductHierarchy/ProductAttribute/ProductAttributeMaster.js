import React, { Fragment, useReducer, useState,useEffect } from 'react';
import { Form } from 'antd';
import CardProductAttribute from './CardProductAttribute';
import FormProductAttribute from './FormProductAttribute';

const ProductAttributeMaster = (props) => {
    const { productHierarchyAttributeData,isVisible } = props;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [attributeForm] = Form.useForm();

    const [finalFormdata, setFinalFormdata] = useState([]);
    const [ editedValue, setEditedValue ] = useState(null);
    const [ formDecider, setFormDecider] = useState(false);

    const onAttributeFormFinish = (val) => {
        finalFormdata.push(val)
        attributeForm.resetFields();
        forceUpdate();
    };

    const cardAttributeProps = {
        attributeForm,
        onAttributeFormFinish,
        forceUpdate,
        isVisible,
        finalFormdata,
        setFinalFormdata,
        editedValue,
        setEditedValue,
        formDecider, 
        setFormDecider,
    };

    const formProductAttributeProps = {
        ...cardAttributeProps,
        productHierarchyAttributeData,
    };

     useEffect(() => {
       
    }, [finalFormdata]);

    return (
        <Fragment>
            {/* <Divider /> */}
            <div>
                <FormProductAttribute {...formProductAttributeProps} />
            </div>

            {finalFormdata?.length > 0 &&
                finalFormdata?.map((action) => {
                    return (
                        <CardProductAttribute {...cardAttributeProps} 
                            attributeName={action?.attributeName?.label}
                            attributeValue={action?.attributeValue}
                            attributeId={action?.attributeName?.key}
                        />
                    )
                })
            }
        </Fragment>
    );
};

export default ProductAttributeMaster;
