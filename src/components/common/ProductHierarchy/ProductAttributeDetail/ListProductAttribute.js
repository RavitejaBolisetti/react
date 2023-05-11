import React from 'react';
import {CardItemProductAttribute} from './CardItemProductAttribute';

const ListProductAttribute = (props) => {
    const { form, skuAttributes, viewMode,setFormBtnActive,productHierarchyAttributeData } = props;

    const cardItemProductAttributeProp = {
        setFormBtnActive,
        productHierarchyAttributeData,
    }
    //console.log('SUCK IT', setFormBtnActive);
    return (
        <>
            {skuAttributes?.length > 0 &&
                skuAttributes.map((action) => {
                    return  <CardItemProductAttribute {...action} form={form} viewMode={viewMode} {...cardItemProductAttributeProp} />;
                })}
        </>
    );
};

export default ListProductAttribute;
