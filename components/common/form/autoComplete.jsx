import { getCustomerByName } from '@/dataFetcher/customer';
import { AutoComplete } from 'antd';
import React, { useState } from 'react';

const AutoCompleteInput = ({ placeholder, options, onSelect, setSearch, handleSearch }) => {
    const [value, setValue] = useState('');
    console.log('🚀 ~ file: autoComplete.jsx:7 ~ AutoCompleteInput ~ value:', value);
    const { Option } = AutoComplete;
    return (
        <AutoComplete
            options={options}
            onSelect={(values) => {
                console.log(values, 'onSelect');
            }}
            onSearch={(values) => handleSearch(values)}
            // value={value}
            // onChange={(values) => {
            //     setValue(values);
            //     console.log(values, 'onchange');
            // }}
            placeholder={placeholder}
        />
    );
};

export default AutoCompleteInput;
