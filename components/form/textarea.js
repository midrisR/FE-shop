import { Input, Form } from 'antd';
import React from 'react';

const { TextArea } = Input;

export default function TextAreaElement({ ...props }) {
	return (
		<Form.Item {...props}>
			<TextArea rows={2} name="description" onChange={props.onChange} />
		</Form.Item>
	);
}
