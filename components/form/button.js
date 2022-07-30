import { Form, Button } from 'antd';
export default function ButtonElement({ ...props }) {
	return (
		<Form.Item wrapperCol={{ offset: 2 }}>
			<Button {...props}>{props.title}</Button>
		</Form.Item>
	);
}
