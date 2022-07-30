import { useContext } from 'react';
import { Select, Form, Cascader } from 'antd';
import React from 'react';
const { Option } = Select;

export default function SelectElement({ setValue, ...props }) {
	const handleChange = (value) => {
		setValue((prev) => ({
			...prev,
			[props.name]: value,
		}));
	};
	return (
		<Form.Item {...props}>
			<Select name={props.name} style={{ width: 120 }} onChange={handleChange}>
				{props.options.map((val, i) => {
					return (
						<Option key={i} value={val}>
							{val.toString()}
						</Option>
					);
				})}
			</Select>
		</Form.Item>
	);
}
