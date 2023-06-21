/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Helmet } from 'react-helmet';

const MetaTag = ({ metaTitle, metaDescription }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
            </Helmet>
        </div>
    );
};

export default MetaTag;
