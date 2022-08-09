import React, { useState, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const FieldsOptions = ({ options, index, handleChangeOption, removeFieldsOption }) => {
	return (
		<>
			{options.map((option, number) => {
				return (
					<React.Fragment key={number}>
						{option.key === index && (
							<Input.Group
								compact
								style={{
									width: '80%',
									margin: '0.75rem 0',
									display: 'flex',
								}}>
								<Input
									name="option"
									placeholder={`input text ${number}`}
									value={option.option}
									onChange={(event) => handleChangeOption(event, number)}
								/>
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
};

export default function Test() {
	const [options, setOptions] = useState([]);
	const [variants, setVariants] = useState([]);
	const [form] = Form.useForm();

	const handleChangeName = (event, index) => {
		const data = [...variants];
		data[index][event.target.name] = event.target.value;
		setVariants(data);
	};

	const handleChangeOption = (event, index) => {
		let data = [...options];
		data[index][event.target.name] = event.target.value;
		setOptions(data);
	};

	const addOptionFields = (index) => {
		setOptions([...options, { option: '', key: index }]);
	};

	const addFields = () => {
		if (variants.length < 2) setVariants([...variants, { variant: '', key: variants.length }]);
	};

	const removeFieldsOption = (number) => {
		let option = [...options];
		option.splice(number, 1);
		setOptions(option);
	};

	return (
		<Form
			labelCol={{ span: 2 }}
			wrapperCol={{ span: 5, offset: 0 }}
			style={{ marginTop: '1rem' }}
			form={form}>
			{JSON.stringify(options)}
			{variants.map((variant, u) => (
				<Form.Item key={u} label={`Variant ${u + 1}`}>
					<Input name="variant" onChange={(event) => handleChangeName(event, u)} />
					<FieldsOptions
						options={options}
						index={u}
						handleChangeOption={handleChangeOption}
						removeFieldsOption={removeFieldsOption}
					/>
					<Button
						type="dashed"
						style={{ margin: '0.50rem 0' }}
						icon={<PlusOutlined />}
						onClick={() => addOptionFields(u)}>
						add options
					</Button>
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
