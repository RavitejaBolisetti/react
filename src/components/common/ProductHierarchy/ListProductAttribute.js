import React from 'react';
import { Fragment } from 'react';

import CardItemProductAttribute from './CardItemProductAttribute';

const ListProductAttribute = (props) => {
    const { form, skuAttributes } = props;
    return (
        <>
            {skuAttributes.length > 0 &&
                skuAttributes.map((action) => {
                    return <CardItemProductAttribute {...action} form={form} />;
                })}
        </>
    );
};

export default ListProductAttribute;
