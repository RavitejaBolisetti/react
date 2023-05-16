import React from 'react';

const Account = () => {
    const [openAccordian, setOpenAccordian] = useState('');

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    return (
        <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian}>
            <Panel header={'Application Actions'} key="1"></Panel>
        </Collapse>
    );
};

export default Account;
