/*
 *   Copyright (c) 2024 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { translateContent } from 'utils/translateContent';

export const refactorProductAttributeData = (productData) => {
    return (
        <div>
            <p>
                {translateContent('commonModules.toolTip.color')} - <span>{productData['color'] ?? 'NA'}</span>
            </p>
            <p>
                {translateContent('commonModules.toolTip.seating')} - <span>{productData['seatingCapacity'] ?? 'NA'}</span>
            </p>
            <p>
                {translateContent('commonModules.toolTip.fuel')} - <span>{productData['fuel'] ?? 'NA'}</span>
            </p>
            <p>
                {translateContent('commonModules.toolTip.variant')} - <span>{productData['variant'] ?? 'NA'}</span>
            </p>
            <p>
                {translateContent('commonModules.toolTip.name')} - <span>{productData['name'] ?? 'NA'}</span>
            </p>
        </div>
    );
};
