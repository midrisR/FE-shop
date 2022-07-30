import { Input, Form } from 'antd';
import React from 'react';

const { TextArea } = Input;

export default function TextAreaElement({ ...props }) {
	return (
		<Form.Item {...props}>
			<TextArea rows={12} name="description" onChange={props.onChange} />
		</Form.Item>
	);
}
