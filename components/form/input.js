import { Input, Form } from 'antd';

export default function InputElement({ name, onChange, ...props }) {
	return (
		<Form.Item labelAlign="left" {...props}>
			<Input onChange={onChange} name={name} placeholder={props.placeholder} />
		</Form.Item>
	);
}
