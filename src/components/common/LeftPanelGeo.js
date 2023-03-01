import { Input, Tree } from 'antd';
import { useMemo, useState } from 'react';
const { Search } = Input;
const x = 3;
const y = 2;
const z = 1;
const defaultData = [
    {
        id: '0c8ab7b5-eeb2-470b-9df7-6beb56837399',
        geoCode: 'afr11',
        geoName: 'Africa',
        attributeKey: '59077c54-6cbf-46d0-9729-8cb6fbb7cd87',
        geoParentCode: 'DMS',
        isActive: 'N',
        children: [
            {
                id: '2892e871-0da3-4412-b283-a5c1366d436b',
                geoCode: 'egy',
                geoName: 'egypt',
                attributeKey: '8722e53d-ecc1-48a0-8076-347a377cd854',
                geoParentCode: '0c8ab7b5-eeb2-470b-9df7-6beb56837399',
                isActive: 'N',
                children: [
                    {
                        id: '7d16f761-1b4f-477c-a1ea-aa6c6e45c0d2',
                        geoCode: 'USA',
                        geoName: 'America',
                        attributeKey: '59077c54-6cbf-46d0-9729-8cb6fbb7cd87',
                        geoParentCode: '2892e871-0da3-4412-b283-a5c1366d436b',
                        isActive: 'N',
                        children: [
                            {
                                id: 'c9034449-4f5f-4c34-8827-ed495ee86b73',
                                geoCode: 'dfvdfs',
                                geoName: 'dfsvdfv',
                                attributeKey: '59077c54-6cbf-46d0-9729-8cb6fbb7cd87',
                                geoParentCode: '7d16f761-1b4f-477c-a1ea-aa6c6e45c0d2',
                                isActive: 'N',
                                children: [],
                            },
                        ],
                    },
                    {
                        id: '4e4e9c92-42cf-4537-8a3d-4f870ba5e91f',
                        geoCode: '34568',
                        geoName: 'Cairo',
                        attributeKey: '8722e53d-ecc1-48a0-8076-347a377cd854',
                        geoParentCode: '2892e871-0da3-4412-b283-a5c1366d436b',
                        isActive: 'Y',
                        children: [
                            {
                                id: 'a1af0e78-acab-4058-9e21-e74759b00b9d',
                                geoCode: 'asfdsf',
                                geoName: 'fdsafd',
                                attributeKey: '8722e53d-ecc1-48a0-8076-347a377cd854',
                                geoParentCode: '4e4e9c92-42cf-4537-8a3d-4f870ba5e91f',
                                isActive: 'N',
                                children: [],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: '067c09fd-c6d2-4962-8743-76b553d71d5e',
        geoCode: 'GJ',
        geoName: 'Gujarat',
        attributeKey: '0eb57e6b-af05-4689-8e61-c9db39b6e85d',
        geoParentCode: 'DMS',
        isActive: 'N',
        children: [
            {
                id: '02686ec1-fb42-4722-9085-603db0e1f8d8',
                geoCode: 'sur',
                geoName: 'SURAT',
                attributeKey: '0eb57e6b-af05-4689-8e61-c9db39b6e85d',
                geoParentCode: '067c09fd-c6d2-4962-8743-76b553d71d5e',
                isActive: 'N',
                children: [],
            },
            {
                id: '947abeca-937d-4eff-9025-38f44e992a0b',
                geoCode: 'AH',
                geoName: 'Ahmedabad',
                attributeKey: '0eb57e6b-af05-4689-8e61-c9db39b6e85d',
                geoParentCode: '067c09fd-c6d2-4962-8743-76b553d71d5e',
                isActive: 'N',
                children: [],
            },
            {
                id: '28b5d1ae-ebbe-4591-9b00-b5a4e0d59456',
                geoCode: 'C002',
                geoName: 'Vadodra',
                attributeKey: 'dde075c1-dc3a-4691-b788-1edbf0824c07',
                geoParentCode: '067c09fd-c6d2-4962-8743-76b553d71d5e',
                isActive: 'N',
                children: [
                    {
                        id: 'decdc4b5-b36f-423f-b188-57b8cd6e301e',
                        geoCode: 'T001',
                        geoName: 'Dabhoi',
                        attributeKey: '30a7cdde-ef2f-4ede-a914-e2c143ccf885',
                        geoParentCode: '28b5d1ae-ebbe-4591-9b00-b5a4e0d59456',
                        isActive: 'N',
                        children: [
                            {
                                id: '9a01f525-6a84-4928-b863-3c9d60a7e736',
                                geoCode: 'P0001',
                                geoName: '391110',
                                attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                                geoParentCode: 'decdc4b5-b36f-423f-b188-57b8cd6e301e',
                                isActive: 'N',
                                children: [],
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
                children: [
                    {
                        id: '9ddf8ba5-48c4-4a5a-9725-299cfc128d70',
                        geoCode: 'AKT',
                        geoName: 'Akoti',
                        attributeKey: '30a7cdde-ef2f-4ede-a914-e2c143ccf885',
                        geoParentCode: 'febf18e8-63be-4c80-a702-077caba17311',
                        isActive: 'N',
                        children: [
                            {
                                id: 'e72d1683-94fc-41e3-a213-a06b792f5b97',
                                geoCode: '394356',
                                geoName: '394356',
                                attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                                geoParentCode: '9ddf8ba5-48c4-4a5a-9725-299cfc128d70',
                                isActive: 'N',
                                children: [],
                            },
                            {
                                id: '9bb33470-43c4-4005-af6d-0b72231b9c84',
                                geoCode: 'AB',
                                geoName: '499349',
                                attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                                geoParentCode: '9ddf8ba5-48c4-4a5a-9725-299cfc128d70',
                                isActive: 'N',
                                children: [],
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
                children: [
                    {
                        id: 'bc386fc4-a79b-4b68-b05c-5f769d431a2e',
                        geoCode: '677677',
                        geoName: '677677',
                        attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                        geoParentCode: '861c41f4-d831-4dff-b6a4-04678b4f7d17',
                        isActive: 'N',
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        id: 'c48a4e25-02c6-4d74-b46e-5232b321ce2b',
        geoCode: 'AS00',
        geoName: 'Asiaaaa',
        attributeKey: '59077c54-6cbf-46d0-9729-8cb6fbb7cd87',
        geoParentCode: 'DMS',
        isActive: 'N',
        children: [
            {
                id: '40adb14d-7794-4f62-b0d4-c492bffe29e0',
                geoCode: 'In00',
                geoName: 'India',
                attributeKey: '8722e53d-ecc1-48a0-8076-347a377cd854',
                geoParentCode: 'c48a4e25-02c6-4d74-b46e-5232b321ce2b',
                isActive: 'N',
                children: [],
            },
        ],
    },
    {
        id: 'f7544dbe-81be-4617-b1e2-e82982e97bf7',
        geoCode: 'euro',
        geoName: 'Europe',
        attributeKey: '59077c54-6cbf-46d0-9729-8cb6fbb7cd87',
        geoParentCode: 'DMS',
        isActive: 'N',
        children: [
            {
                id: '995ae838-16ea-40c4-85d4-79744d1a236a',
                geoCode: 'Ger00',
                geoName: 'Germany',
                attributeKey: '8722e53d-ecc1-48a0-8076-347a377cd854',
                geoParentCode: 'f7544dbe-81be-4617-b1e2-e82982e97bf7',
                isActive: 'N',
                children: [],
            },
        ],
    },
    {
        id: '5acce565-c372-491a-ac3a-32b8ffcd236c',
        geoCode: 'UP',
        geoName: 'Uttar Pradesh1',
        attributeKey: '0eb57e6b-af05-4689-8e61-c9db39b6e85d',
        geoParentCode: 'DMS',
        isActive: 'N',
        children: [
            {
                id: '4a04303f-b9b4-43d0-832f-35b7cd815e7f',
                geoCode: 'GBN',
                geoName: 'Gauttam Buddha Nagar',
                attributeKey: 'dde075c1-dc3a-4691-b788-1edbf0824c07',
                geoParentCode: '5acce565-c372-491a-ac3a-32b8ffcd236c',
                isActive: 'N',
                children: [
                    {
                        id: '88ad4cbb-80d7-435d-8251-dac21a69a082',
                        geoCode: 'GN',
                        geoName: 'Greater Noida',
                        attributeKey: '30a7cdde-ef2f-4ede-a914-e2c143ccf885',
                        geoParentCode: '4a04303f-b9b4-43d0-832f-35b7cd815e7f',
                        isActive: 'N',
                        children: [
                            {
                                id: '1b0eef35-a426-4085-825c-387391ac1b22',
                                geoCode: '203401',
                                geoName: '203401',
                                attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                                geoParentCode: '88ad4cbb-80d7-435d-8251-dac21a69a082',
                                isActive: 'N',
                                children: [],
                            },
                            {
                                id: 'dcbf517e-7e5a-4655-b490-05c780fa0612',
                                geoCode: '203402',
                                geoName: '203402',
                                attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                                geoParentCode: '88ad4cbb-80d7-435d-8251-dac21a69a082',
                                isActive: 'N',
                                children: [],
                            },
                            {
                                id: 'af663bcc-8aec-4041-8378-04d630506092',
                                geoCode: '203403',
                                geoName: '203403',
                                attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                                geoParentCode: '88ad4cbb-80d7-435d-8251-dac21a69a082',
                                isActive: 'N',
                                children: [],
                            },
                            {
                                id: 'ec9ba4f5-72c2-499b-8d73-a0d99af9876e',
                                geoCode: '201306',
                                geoName: '201306',
                                attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                                geoParentCode: '88ad4cbb-80d7-435d-8251-dac21a69a082',
                                isActive: 'N',
                                children: [],
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
                children: [
                    {
                        id: 'ce975a97-9dee-450a-917d-ad3773fcf649',
                        geoCode: 'SEC63',
                        geoName: '201403',
                        attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                        geoParentCode: '44695d7a-4de3-4d27-9253-7e40607947d0',
                        isActive: 'N',
                        children: [
                            {
                                id: 'df0ac73f-9b33-4492-86a4-ecbf30b44a96',
                                geoCode: '1234',
                                geoName: '499345',
                                attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                                geoParentCode: 'ce975a97-9dee-450a-917d-ad3773fcf649',
                                isActive: 'N',
                                children: [],
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
                        children: [],
                    },
                    {
                        id: 'd379f1c1-0c6d-4ba8-a7be-203a59170e83',
                        geoCode: '201301',
                        geoName: '201301',
                        attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                        geoParentCode: '44695d7a-4de3-4d27-9253-7e40607947d0',
                        isActive: 'N',
                        children: [],
                    },
                    {
                        id: 'e20b398d-bfd6-4630-937b-f24125417108',
                        geoCode: '11231',
                        geoName: '201331',
                        attributeKey: '0eb57e6b-af05-4689-8e61-c9db39b6e85d',
                        geoParentCode: '44695d7a-4de3-4d27-9253-7e40607947d0',
                        isActive: 'N',
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        id: '7b932349-4993-4dad-878c-d60b3ef8122b',
        geoCode: '01',
        geoName: '01',
        attributeKey: '59077c54-6cbf-46d0-9729-8cb6fbb7cd87',
        geoParentCode: 'DMS',
        isActive: 'N',
        children: [
            {
                id: '3429d1df-01f4-48f5-bef8-15e805a01768',
                geoCode: '011',
                geoName: '01-01',
                attributeKey: '8722e53d-ecc1-48a0-8076-347a377cd854',
                geoParentCode: '7b932349-4993-4dad-878c-d60b3ef8122b',
                isActive: 'N',
                children: [],
            },
        ],
    },
];

// const generateData = (_level, _preKey, _tns) => {
//   const preKey = _preKey || '0';
//   const tns = _tns || defaultData;
//   const children = [];
//   for (let i = 0; i < x; i++) {
//     const key = `${preKey}-${i}`;
//     tns.push({
//       title: key,
//       key,
//     });
//     if (i < y) {
//       children.push(key);
//     }
//   }
//   if (_level < 0) {
//     return tns;
//   }
//   const level = _level - 1;
//   children.forEach((key, index) => {
//     tns[index].children = [];
//     return generateData(level, key, tns[index].children);
//   });
// };
// generateData(z);

const dataList = [];
const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        console.log(node, 'NODE');
        const { id } = node;
        dataList.push({
            id,
            title: id,
        });
        if (node.children) {
            generateList(node.children);
        }
    }
};
generateList(defaultData);

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some((item) => item.id === key)) {
                parentKey = node.id;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};

const LeftPanelGeo = () => {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

    const onChange = (e) => {
        const { value } = e.target;
        console.log(dataList, 'LIST');

        const newExpandedKeys = dataList
            .map((item) => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.id, defaultData);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        setExpandedKeys(newExpandedKeys);
        setSearchValue(value);
        setAutoExpandParent(true);
    };
    const treeData = useMemo(() => {
        const loop = (data) =>
            data.map((item) => {
                //console.log(item)
                const strTitle = item.geoName;
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
                if (item.children) {
                    return {
                        title,
                        key: item.id,
                        children: loop(item.children),
                    };
                }
                return {
                    title,
                    key: item.id,
                };
            });
        return loop(defaultData);
    }, [searchValue]);

    return (
        <div>
            <Search
                style={{
                    marginBottom: 8,
                }}
                placeholder="Search"
                onChange={onChange}
            />
            <Tree onExpand={onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent} treeData={treeData} />
        </div>
    );
};
export default LeftPanelGeo;
