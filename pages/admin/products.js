import React, { useContext, useState, useCallback } from 'react';
import LayoutDashboard from '../../components/dashboard';
import InputElement from '../../components/form/input';
import ButtonElement from '../../components/form/button';
import UploadElement from '../../components/form/upload';
import TextAreaElement from '../../components/form/textarea';
import { GlobalContext } from '../../context/GlobalState';
import SelectElement from '../../components/form/select';
import UploadVariant from '../../components/form/UploadVariant';
import MultipleSelect from '../../components/form/MultipleSelect';
import { Form, Button, Divider } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import DynamicFields from '../../components/form/DinamycField';

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

export default function Products() {
	const { setValue, value, error, handleSubmit } = useContext(GlobalContext);
	const [form] = Form.useForm();

	const [obj, setObj] = useState([]);

	const handleOnchange = (e) => {
		const { name, value } = e.target;
		setValue((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setObj((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	console.log(obj);

	return (
		<Form
			form={form}
			labelCol={{ span: 2 }}
			wrapperCol={{ span: 10 }}
			autoComplete="off"
			onSubmitCapture={handleSubmit}>
			<h1 style={{ padding: '2rem' }}>Product Information</h1>
			<InputElement
				name="name"
				label="name"
				hasFeedback
				validateStatus={error['name'] && 'error'}
				help={error['name']}
				onChange={handleOnchange}
			/>
			<UploadElement
				label="image"
				hasFeedback
				validateStatus={error['image'] && 'error'}
				help={error['image']}
				setValue={setValue}
			/>
			<TextAreaElement
				label="description"
				hasFeedback
				validateStatus={error['description'] && 'error'}
				help={error['description']}
				name="description"
				onChange={handleOnchange}
			/>
			<Divider orientation="left" className="first">
				Information Product
			</Divider>
			<Form.List name="op">
				{(fields, { add, remove }, { errors }) => (
					<React.Fragment>
						{fields.map((field, index) => (
							<React.Fragment key={index + 1}>
								<Divider orientation="left" className="first">
									variant {index + 1}
								</Divider>
								<Form.Item
									wrapperCol={{ span: 4, offset: 2 }}
									style={{ marginBottom: 0 }}>
									<Button
										onClick={() => remove(field.name)}
										type="primary"
										danger
										size="small"
										icon={<CloseOutlined />}
									/>
								</Form.Item>
								<DynamicFields
									name="variant"
									changeName={handleChange}
									ChangeOptions={handleChange}
								/>
							</React.Fragment>
						))}
						<Form.Item {...formItemLayoutWithOutLabel}>
							<Button onClick={() => add()} type="primary" icon={<PlusOutlined />}>
								Add variant
							</Button>
						</Form.Item>
					</React.Fragment>
				)}
			</Form.List>

			<InputElement
				name="price"
				label="price"
				hasFeedback
				validateStatus={error['price'] && 'error'}
				help={error['price']}
				onChange={handleOnchange}
			/>

			<InputElement
				name="wholesaler"
				label="wholesale price"
				hasFeedback
				validateStatus={error['wholesaler'] && 'error'}
				help={error['wholesaler']}
				onChange={handleOnchange}
			/>

			<InputElement
				name="stock"
				label="stock"
				hasFeedback
				validateStatus={error['stock'] && 'error'}
				help={error['stock']}
				onChange={handleOnchange}
			/>

			<Divider orientation="left" className="first">
				Delivery Information
			</Divider>
			<InputElement
				name="weight"
				label="weight"
				hasFeedback
				validateStatus={error['weight'] && 'error'}
				help={error['weight']}
				onChange={handleOnchange}
			/>

			<InputElement
				name="long"
				label="long"
				hasFeedback
				validateStatus={error['long'] && 'error'}
				help={error['long']}
				onChange={handleOnchange}
			/>

			<InputElement
				name="wide"
				label="wide"
				hasFeedback
				validateStatus={error['wide'] && 'error'}
				help={error['wide']}
				onChange={handleOnchange}
			/>

			<h1 style={{ padding: '2rem' }}>Other</h1>
			<SelectElement
				name="preOrder"
				label="pre order"
				hasFeedback
				validateStatus={error['preOrder'] && 'error'}
				help={error['preOrder']}
				setValue={setValue}
				options={[true, false]}
			/>
			{value?.preOrder && (
				<InputElement
					name="preOrder_time"
					label="day"
					hasFeedback
					validateStatus={error['preOrder_time'] && 'error'}
					help={error['preOrder_time']}
					onChange={handleOnchange}
				/>
			)}

			<InputElement
				name="sku"
				label="sku"
				hasFeedback
				validateStatus={error['sku'] && 'error'}
				help={error['sku']}
				onChange={handleOnchange}
			/>

			<SelectElement
				name="condition"
				label="condition"
				hasFeedback
				validateStatus={error['condition'] && 'error'}
				setValue={setValue}
				options={['new', 'seccond']}
			/>
			<ButtonElement type="primary" htmlType="button" onClick={handleSubmit} title="submit" />
		</Form>
	);
}

Products.getLayout = function getLayout(page) {
	return <LayoutDashboard>{page}</LayoutDashboard>;
};
