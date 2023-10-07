import { Input, Switch, DatePicker, InputNumber } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
const { TextArea } = Input;
const { RangePicker } = DatePicker;
export const ANSWER_TYPES = [
    { id: 1, key: 'OT', value: 'Open Text', type: <TextArea placeholder={preparePlaceholderText('Open Text')} /> },
    { id: 2, key: 'D', value: 'Date', type: <DatePicker placeholder={preparePlaceholderText('Date')} /> },
    { id: 3, key: 'NWD', value: 'Number With Decimal', type: <InputNumber step="0.00000000000001" stringMode placeholder={preparePlaceholderText('Number With Decimal')} /> },
    { id: 4, key: 'NWTD', value: 'Number Without Demical', type: <InputNumber placeholder={preparePlaceholderText('Number Without Demical')} /> },
    { id: 5, key: 'FX', value: 'Fixed', type: <Input placeholder={preparePlaceholderText('Fixed')} /> },
    { id: 6, key: 'DR', value: 'Date Range', type: <RangePicker placeholder={preparePlaceholderText('Fixed')} /> },
    { id: 7, key: 'TG', value: 'Toggle', type: <Switch placeholder={preparePlaceholderText('Toggle')} /> },
    { id: 8, key: 'NRWD', value: 'Number Range With Decimal', type: <InputNumber placeholder={preparePlaceholderText('Number Range With Decimal')} /> },
    { id: 9, key: 'NRWTD', value: 'Number Range Without Decimal', type: <InputNumber placeholder={preparePlaceholderText('Number Range Without Decimal')} /> },
];
