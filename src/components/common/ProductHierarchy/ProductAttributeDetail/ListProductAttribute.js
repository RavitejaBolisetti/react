import React from 'react';
import CardItemProductAttribute from './CardItemProductAttribute';

const ListProductAttribute = (props) => {
    const { form, skuAttributes, viewMode } = props;
    console.log('🚀 ~ file: ListProductAttribute.js:6 ~ ListProductAttribute ~ skuAttributes:', skuAttributes);
    return (
        <>
            {skuAttributes.length > 0 &&
                skuAttributes.map((action) => {
                    return <CardItemProductAttribute {...action} form={form} viewMode={viewMode} />;
                })}
        </>
    );
};

export default ListProductAttribute;
