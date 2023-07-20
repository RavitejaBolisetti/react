/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

const path = require('path');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const pathToAntLessOverride = 'assets/ant-overrides.less';

const themeOverrideVariables = lessToJs(fs.readFileSync(path.join(__dirname, pathToAntLessOverride), 'utf8'));

process.env.BROWSER = 'none';

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: themeOverrideVariables,
    })
);
