import React, { useState, useRef } from 'react';
import { Divider, Form, Input, Button } from 'antd';
import DynamicFields from '../components/test/DynamicFields';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
let i = 0;
export default function Test() {
	const [form] = Form.useForm();
	const [fields, setFields] = useState([]);
	const [variants, setVariants] = useState([]);
	const deleteEl = useRef(null);
	const addOptionFields = (index) => {
		setFields([...fields, { [index]: '' }]);
	};

	const addFields = () => {
		if (variants.length < 2) setVariants([...variants, { [variants.length]: '' }]);
	};

	const removeFieldsOption = (number) => {
		// const data = fields.filter((value) => parseInt(Object.keys(value)[0]) === index);
		let options = [...fields];
		options.splice(number, 1);
		setFields(options);
	};
	console.log('fields', fields);
	const FieldsOptions = ({ index }) => {
		if (fields.length > 0) {
			return (
				<>
					{fields.map((field, number) => {
						return (
							<React.Fragment key={number}>
								{parseInt(Object.keys(field)) === index && (
									<Input.Group
										compact
										style={{
											width: '80%',
											margin: '0.75rem 0',
											display: 'flex',
										}}>
										<Input placeholder={`input text ${number}`} />
										<Button
											type="primary"
											danger
											icon={<CloseOutlined />}
											onClick={() => removeFieldsOption(number)}
										/>
									</Input.Group>
								)}
							</React.Fragment>
						);
					})}
				</>
			);
		}
	};

	return (
		<Form
			labelCol={{ span: 2 }}
			wrapperCol={{ span: 5, offset: 0 }}
			style={{ marginTop: '10rem' }}>
			{variants.map((variant, u) => (
				<Form.Item key={u} label={`Variant ${u + 1}`}>
					<Input />
					<FieldsOptions index={u} />
					<Form.Item>
						<Button
							type="dashed"
							style={{ margin: '0.50rem 0' }}
							icon={<PlusOutlined />}
							onClick={() => addOptionFields(u)}>
							add options
						</Button>
					</Form.Item>
				</Form.Item>
			))}
			<Form.Item wrapperCol={{ offset: 2 }}>
				<Button type="dashed" icon={<PlusOutlined />} onClick={addFields}>
					add Fields
				</Button>
			</Form.Item>
		</Form>
	);
}
