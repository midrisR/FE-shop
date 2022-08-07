import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
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
			span: 10,
			offset: 2,
		},
	},
};

const DynamicFields = () => {
	const onFinish = (values) => {
		console.log('Received values of form:', values);
	};

	return (
		<Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
			<Form.Item {...formItemLayout} label="Name">
				<Input
					placeholder="example: color / size"
					style={{
						width: '60%',
					}}
				/>
			</Form.Item>
			<Form.List name="variant">
				{(fields, { add, remove }, { errors }) => (
					<>
						{fields.map((field, index) => (
							<Form.Item
								{...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
								label={index === 0 ? 'options' : ''}
								key={index}>
								<Form.Item {...field} noStyle>
									<Input
										placeholder="example: color / size"
										style={{
											width: '60%',
										}}
									/>
								</Form.Item>
								{fields.length > 1 ? (
									<MinusCircleOutlined
										style={{ marginLeft: '1rem' }}
										className="dynamic-delete-button"
										onClick={() => remove(field.name)}
									/>
								) : null}
							</Form.Item>
						))}
						<Form.Item>
							<Button
								type="dashed"
								onClick={() => add()}
								style={{
									width: '20%',
								}}
								icon={<PlusOutlined />}>
								Add options
							</Button>

							<Form.ErrorList errors={errors} />
						</Form.Item>
					</>
				)}
			</Form.List>
		</Form>
	);
};

export default DynamicFields;
