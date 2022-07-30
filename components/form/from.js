import { Form } from 'antd';
export default function FromWrapper({ children, onSubmit, ref }) {
	const [form] = Form.useForm();
	return (
		<Form
			form={form}
			initialValues={{
				preOrder: 'false',
				condition: 'new',
				prefix: '12',
			}}
			labelCol={{ span: 2 }}
			wrapperCol={{ span: 10 }}
			autoComplete="off"
			onSubmitCapture={onSubmit}>
			{children}
		</Form>
	);
}
