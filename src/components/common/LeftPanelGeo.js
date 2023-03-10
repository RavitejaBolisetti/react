import { Input, Tree } from 'antd';
import { useMemo, useState } from 'react';
const { Search } = Input;
const defaultData = [
    {
        id: '067c09fd-c6d2-4962-8743-76b553d71d5e',
        geoCode: 'GJ',
        geoName: 'Gujarat',
        attributeKey: '0eb57e6b-af05-4689-8e61-c9db39b6e85d',
        geoParentCode: 'DMS',
        isActive: 'N',
        subGeo: [
            {
                id: '02686ec1-fb42-4722-9085-603db0e1f8d8',
                geoCode: 'sur',
                geoName: 'SURAT',
                attributeKey: '0eb57e6b-af05-4689-8e61-c9db39b6e85d',
                geoParentCode: '067c09fd-c6d2-4962-8743-76b553d71d5e',
                isActive: 'N',
                subGeo: [],
            },
            {
                id: '947abeca-937d-4eff-9025-38f44e992a0b',
                geoCode: 'AH',
                geoName: 'Ahmedabad',
                attributeKey: '0eb57e6b-af05-4689-8e61-c9db39b6e85d',
                geoParentCode: '067c09fd-c6d2-4962-8743-76b553d71d5e',
                isActive: 'N',
                subGeo: [],
            },
            {
                id: '28b5d1ae-ebbe-4591-9b00-b5a4e0d59456',
                geoCode: 'C002',
                geoName: 'Vadodra',
                attributeKey: 'dde075c1-dc3a-4691-b788-1edbf0824c07',
                geoParentCode: '067c09fd-c6d2-4962-8743-76b553d71d5e',
                isActive: 'N',
                subGeo: [
                    {
                        id: 'decdc4b5-b36f-423f-b188-57b8cd6e301e',
                        geoCode: 'T001',
                        geoName: 'Dabhoi',
                        attributeKey: '30a7cdde-ef2f-4ede-a914-e2c143ccf885',
                        geoParentCode: '28b5d1ae-ebbe-4591-9b00-b5a4e0d59456',
                        isActive: 'N',
                        subGeo: [
                            {
                                id: '9a01f525-6a84-4928-b863-3c9d60a7e736',
                                geoCode: 'P0001',
                                geoName: '391110',
                                attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                                geoParentCode: 'decdc4b5-b36f-423f-b188-57b8cd6e301e',
                                isActive: 'N',
                                subGeo: [],
                            },
                        ],
                    },
                ],
            },
            {
                id: 'febf18e8-63be-4c80-a702-077caba17311',
                geoCode: 'SU',
                geoName: 'Sura',
                attributeKey: 'dde075c1-dc3a-4691-b788-1edbf0824c07',
                geoParentCode: '067c09fd-c6d2-4962-8743-76b553d71d5e',
                isActive: 'N',
                subGeo: [
                    {
                        id: '9ddf8ba5-48c4-4a5a-9725-299cfc128d70',
                        geoCode: 'AKT',
                        geoName: 'Akoti',
                        attributeKey: '30a7cdde-ef2f-4ede-a914-e2c143ccf885',
                        geoParentCode: 'febf18e8-63be-4c80-a702-077caba17311',
                        isActive: 'N',
                        subGeo: [
                            {
                                id: 'e72d1683-94fc-41e3-a213-a06b792f5b97',
                                geoCode: '394356',
                                geoName: '394356',
                                attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                                geoParentCode: '9ddf8ba5-48c4-4a5a-9725-299cfc128d70',
                                isActive: 'N',
                                subGeo: [],
                            },
                            {
                                id: '9bb33470-43c4-4005-af6d-0b72231b9c84',
                                geoCode: 'AB',
                                geoName: '499349',
                                attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                                geoParentCode: '9ddf8ba5-48c4-4a5a-9725-299cfc128d70',
                                isActive: 'N',
                                subGeo: [],
                            },
                        ],
                    },
                ],
            },
            {
                id: '861c41f4-d831-4dff-b6a4-04678b4f7d17',
                geoCode: 'SUR',
                geoName: 'Surat',
                attributeKey: '0eb57e6b-af05-4689-8e61-c9db39b6e85d',
                geoParentCode: '067c09fd-c6d2-4962-8743-76b553d71d5e',
                isActive: 'N',
                subGeo: [
                    {
                        id: 'bc386fc4-a79b-4b68-b05c-5f769d431a2e',
                        geoCode: '677677',
                        geoName: '677677',
                        attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                        geoParentCode: '861c41f4-d831-4dff-b6a4-04678b4f7d17',
                        isActive: 'N',
                        subGeo: [],
                    },
                ],
            },
        ],
    },
    {
        id: 'c48a4e25-02c6-4d74-b46e-5232b321ce2b',
        geoCode: 'AS00',
        geoName: 'Asia',
        attributeKey: '59077c54-6cbf-46d0-9729-8cb6fbb7cd87',
        geoParentCode: 'DMS',
        isActive: 'N',
        subGeo: [
            {
                id: '40adb14d-7794-4f62-b0d4-c492bffe29e0',
                geoCode: 'In00',
                geoName: 'India',
                attributeKey: '8722e53d-ecc1-48a0-8076-347a377cd854',
                geoParentCode: 'c48a4e25-02c6-4d74-b46e-5232b321ce2b',
                isActive: 'N',
                subGeo: [],
            },
        ],
    },

    {
        id: '5acce565-c372-491a-ac3a-32b8ffcd236c',
        geoCode: 'UP',
        geoName: 'Uttar Pradesh',
        attributeKey: '0eb57e6b-af05-4689-8e61-c9db39b6e85d',
        geoParentCode: 'DMS',
        isActive: 'N',
        subGeo: [
            {
                id: '4a04303f-b9b4-43d0-832f-35b7cd815e7f',
                geoCode: 'GBN',
                geoName: 'Gauttam Buddha Nagar',
                attributeKey: 'dde075c1-dc3a-4691-b788-1edbf0824c07',
                geoParentCode: '5acce565-c372-491a-ac3a-32b8ffcd236c',
                isActive: 'N',
                subGeo: [
                    {
                        id: '88ad4cbb-80d7-435d-8251-dac21a69a082',
                        geoCode: 'GN',
                        geoName: 'Greater Noida',
                        attributeKey: '30a7cdde-ef2f-4ede-a914-e2c143ccf885',
                        geoParentCode: '4a04303f-b9b4-43d0-832f-35b7cd815e7f',
                        isActive: 'N',
                        subGeo: [
                            {
                                id: '1b0eef35-a426-4085-825c-387391ac1b22',
                                geoCode: '203401',
                                geoName: '203401',
                                attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                                geoParentCode: '88ad4cbb-80d7-435d-8251-dac21a69a082',
                                isActive: 'N',
                                subGeo: [],
                            },
                            {
                                id: 'dcbf517e-7e5a-4655-b490-05c780fa0612',
                                geoCode: '203402',
                                geoName: '203402',
                                attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                                geoParentCode: '88ad4cbb-80d7-435d-8251-dac21a69a082',
                                isActive: 'N',
                                subGeo: [],
                            },
                            {
                                id: 'af663bcc-8aec-4041-8378-04d630506092',
                                geoCode: '203403',
                                geoName: '203403',
                                attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                                geoParentCode: '88ad4cbb-80d7-435d-8251-dac21a69a082',
                                isActive: 'N',
                                subGeo: [],
                            },
                            {
                                id: 'ec9ba4f5-72c2-499b-8d73-a0d99af9876e',
                                geoCode: '201306',
                                geoName: '201306',
                                attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                                geoParentCode: '88ad4cbb-80d7-435d-8251-dac21a69a082',
                                isActive: 'N',
                                subGeo: [],
                            },
                        ],
                    },
                ],
            },
            {
                id: '44695d7a-4de3-4d27-9253-7e40607947d0',
                geoCode: 'NDA',
                geoName: 'Noida',
                attributeKey: '30a7cdde-ef2f-4ede-a914-e2c143ccf885',
                geoParentCode: '5acce565-c372-491a-ac3a-32b8ffcd236c',
                isActive: 'N',
                subGeo: [
                    {
                        id: 'ce975a97-9dee-450a-917d-ad3773fcf649',
                        geoCode: 'SEC63',
                        geoName: '201403',
                        attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                        geoParentCode: '44695d7a-4de3-4d27-9253-7e40607947d0',
                        isActive: 'N',
                        subGeo: [
                            {
                                id: 'df0ac73f-9b33-4492-86a4-ecbf30b44a96',
                                geoCode: '1234',
                                geoName: '499345',
                                attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                                geoParentCode: 'ce975a97-9dee-450a-917d-ad3773fcf649',
                                isActive: 'N',
                                subGeo: [],
                            },
                        ],
                    },
                    {
                        id: '29299794-9a73-4dc4-8d83-d027ab7d15bc',
                        geoCode: '222222',
                        geoName: '201404',
                        attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                        geoParentCode: '44695d7a-4de3-4d27-9253-7e40607947d0',
                        isActive: 'N',
                        subGeo: [],
                    },
                    {
                        id: 'd379f1c1-0c6d-4ba8-a7be-203a59170e83',
                        geoCode: '201301',
                        geoName: '201301',
                        attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                        geoParentCode: '44695d7a-4de3-4d27-9253-7e40607947d0',
                        isActive: 'N',
                        subGeo: [],
                    },
                    {
                        id: 'e20b398d-bfd6-4630-937b-f24125417108',
                        geoCode: '11231',
                        geoName: '201331',
                        attributeKey: '0eb57e6b-af05-4689-8e61-c9db39b6e85d',
                        geoParentCode: '44695d7a-4de3-4d27-9253-7e40607947d0',
                        isActive: 'N',
                        subGeo: [],
                    },
                ],
            },
        ],
    },
];

const LeftPanelGeo = ({ fieldNames }) => {
    // const [expandedKeys, setExpandedKeys] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState(['067c09fd-c6d2-4962-8743-76b553d71d5e']);
    const [searchValue, setSearchValue] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            dataList.push({
                id: node[fieldNames?.key],
                title: node[fieldNames?.title],
            });
            if (node[fieldNames?.children]) {
                generateList(node[fieldNames?.children]);
            }
        }
    };
    generateList(defaultData);

    const getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node[fieldNames?.children]) {
                if (node[fieldNames?.children].some((item) => item[fieldNames?.key] === key)) {
                    parentKey = node[fieldNames?.key];
                } else if (getParentKey(key, node[fieldNames?.children])) {
                    parentKey = getParentKey(key, node[fieldNames?.children]);
                }
            }
        }
        console.log('🚀 ~ file: LeftPanelGeo.js:303 ~ getParentKey ~ parentKey:', parentKey);
        return parentKey;
    };

    const onChange = (e) => {
        const { value } = e.target;

        const newExpandedKeys = dataList
            .map((item) => {
                if (item?.title?.indexOf(value) > -1) {
                    console.log('🚀 ~ file: LeftPanelGeo.js:311 ~ .map ~ item:', item, value, defaultData);
                    return getParentKey(item?.id, defaultData);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        setExpandedKeys(value ? newExpandedKeys : []);
        setSearchValue(value);
        setAutoExpandParent(true);
    };

    const treeData = useMemo(() => {
        const loop = (data) =>
            data.map((item) => {
                const strTitle = item[fieldNames?.title];
                const index = strTitle.indexOf(searchValue);
                const beforeStr = strTitle.substring(0, index);
                const afterStr = strTitle.slice(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <span>
                            {beforeStr}
                            <span className="site-tree-search-value" style={{ color: 'red' }}>
                                {searchValue}
                            </span>
                            {afterStr}
                        </span>
                    ) : (
                        <span>{strTitle}</span>
                    );
                if (item[fieldNames?.children]) {
                    return {
                        title,
                        key: item[fieldNames?.key],
                        children: loop(item[fieldNames?.children]),
                    };
                }
                return {
                    title,
                    key: item[fieldNames?.key],
                };
            });
        return loop(defaultData);
    }, [searchValue, fieldNames]);


    return (
        <div>
            <Search
                style={{
                    marginBottom: 8,
                }}
                placeholder="Search"
                onChange={onChange}
                allowClear
            />
            <Tree onExpand={onExpand} expandedKeys={expandedKeys} showLine={true} showIcon={true} autoExpandParent={autoExpandParent} treeData={treeData} />
        </div>
    );
};
export default LeftPanelGeo;
