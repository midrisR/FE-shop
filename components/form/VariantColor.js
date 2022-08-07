import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Divider } from 'antd';
import React from 'react';
const formItemLayout = {
	wrapperCol: {
		sm: {
			span: 6,
			offset: 2,
		},
	},
};

export default function VariantColor() {
	return (
		<Form.List name="fields">
			{(fields, { add, remove }) => {
				return (
					<>
						{fields.map((field, index) => (
							<Form.Item
								key={index}
								{...formItemLayout}
								name="options"
								style={{ marginBottom: '0px' }}>
								<Input.Group compat>
									<Input placeholder="options" />
									{fields.length > 1 ? (
										<Form.Item {...formItemLayout}>
											<Button
												type="danger"
												onClick={() => remove(field.name)}
												icon={<MinusCircleOutlined />}></Button>
										</Form.Item>
									) : null}
								</Input.Group>
							</Form.Item>
						))}
						<Form.Item {...formItemLayout}>
							<Button type="dashed" onClick={() => add()} style={{ width: '30%' }}>
								<PlusOutlined /> Add Options
							</Button>
						</Form.Item>
					</>
				);
			}}
		</Form.List>
	);
}
