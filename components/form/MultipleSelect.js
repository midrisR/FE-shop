import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button, Form } from 'antd';
const { Option } = Select;
let index = 0;
export default function MultipleSelect({ index, setValue, options }) {
	const [items, setItems] = useState([]);
	const [name, setName] = useState('');
	const inputRef = useRef(null);

	const onNameChange = (event) => {
		setName(event.target.value);
	};
	const addItem = (e) => {
		e.preventDefault();
		setItems([...items, name]);
		setName('');
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	};
	const handleSelect = (value) => {
		let data = [...options];
		data[index].size = value;
		setValue((prev) => ({
			...prev,
			variant: data,
		}));
	};

	return (
		<Form.Item>
			<Select
				mode="multiple"
				allowClear
				name="select"
				style={{ width: '100%' }}
				placeholder="Please select size"
				onChange={(value) => handleSelect(value)}
				dropdownRender={(menu) => (
					<>
						{menu}
						<Divider style={{ margin: '8px 0' }} />
						<Space style={{ padding: '0 8px 4px' }}>
							<Input
								placeholder="Please enter item"
								ref={inputRef}
								value={name}
								style={{ width: '100%' }}
								onChange={onNameChange}
							/>
							<Button type="text" icon={<PlusOutlined />} onClick={addItem}>
								Add
							</Button>
						</Space>
					</>
				)}>
				{items.map((item) => (
					<Option key={item}>{item}</Option>
				))}
			</Select>
		</Form.Item>
	);
}
