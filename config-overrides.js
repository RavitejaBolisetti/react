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
