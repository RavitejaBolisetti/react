const { Form, Switch, Input } = require("antd");
const { validateRequiredInputField } = require("./validation");

export const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, form, ...restProps }) => {
    let inputField = '';
    switch (inputType) {
        case 'switch':
            inputField = (
                <Form.Item
                    normalize={(a, b) =>  a ? 'Y' : 'N'}
                    style={{
                        margin: 0,
                    }}
                    key={record.id + index + dataIndex + "swi"}
                    name={[index, dataIndex]}
                    // rules={[validateRequiredInputField(`${title}`)]}
                    initialValue={record[dataIndex]}
                >
                    <Switch defaultChecked={record[dataIndex] === 'Y'} readOnly={!record?.isEditable && !record.deletable} disabled={!record?.isEditable && !record.deletable}checkedChildren="Yes" unCheckedChildren="No" />
                </Form.Item>
            );
            break;
        default:
            inputField = (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    key={record.id + index + dataIndex + "swi"}
                    name={[index, dataIndex]}
                    rules={[validateRequiredInputField(`${title}`)]}
                    initialValue={record[dataIndex]}
                >
                    <Input readOnly={!record?.isEditable && !record.deletable} disabled={!record?.isEditable && !record.deletable} />
                </Form.Item>
            );
            break;
    }
    return <td key={record.id + index + dataIndex + "swi"}>{inputField}</td>;
};