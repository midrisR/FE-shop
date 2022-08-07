import React from 'react';
import { Divider, Form, Input, Button } from 'antd';
import DynamicFields from '../components/test/DynamicFields';

export default function Test() {
	const [form] = Form.useForm();
	return (
		<Form name="variant">
			<Form.List name="op">
				{(fields, { add, remove }, { errors }) => (
					<>
						{fields.map((field, index) => (
							<DynamicFields name="variant" />
						))}
						<Button onClick={() => add()} type="primary">
							+
						</Button>
					</>
				)}
			</Form.List>
			{/* <Divider orientation="left" className="first">
				Add Email
			</Divider>
			<DynamicFields name="email" />
			<Divider orientation="left" className="first">
				Add Mobile
			</Divider>
			<DynamicFields name="mobile" /> */}
		</Form>
	);
}
