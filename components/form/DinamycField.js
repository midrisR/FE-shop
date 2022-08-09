import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Divider } from 'antd';
import React from 'react';
const formItemLayout = {
	labelCol: {
		lg: { span: 2 },
	},
	wrapperCol: {
		lg: { span: 10 },
	},
};
const formItemLayoutWithOutLabel = {
	wrapperCol: {
		xs: {
			span: 20,
			offset: 1,
		},
		sm: {
			span: 3,
			offset: 2,
		},
	},
};

const DynamicFields = ({ name, changeName, changeOptions }) => {
	const onFinish = (values) => {
		console.log('Received values of form:', values);
	};

	return (
		<>
			<Form.Item {...formItemLayout} label="Name">
				<Input
					placeholder="example: color / size"
					name="name"
					onChange={changeName}
					style={{
						width: '60%',
					}}
				/>
			</Form.Item>
			<Form.List name="variant">
				{(fields, { add, remove }) => (
					<>
						{fields.map((field, index) => (
							<Form.Item
								key={index}
								{...(index >= 0 ? formItemLayout : formItemLayoutWithOutLabel)}
								label={index >= 0 ? 'options' : ''}>
								<Form.Item {...field} noStyle>
									<Input
										name={name}
										placeholder="passenger name"
										onChange={(event) => changeOptions(event, index)}
										style={{
											width: '60%',
										}}
									/>
								</Form.Item>
								{fields.length > 1 ? (
									<MinusCircleOutlined
										className="dynamic-delete-button"
										onClick={() => remove(field.name)}
									/>
								) : null}
							</Form.Item>
						))}
						<Form.Item {...formItemLayoutWithOutLabel}>
							<Button
								type="dashed"
								onClick={() => add()}
								style={{
									width: '60%',
								}}
								icon={<PlusOutlined />}>
								Add options
							</Button>
						</Form.Item>
					</>
				)}
			</Form.List>
		</>
	);
};

export default DynamicFields;
