import React, { useContext, useState, useCallback } from 'react';
import LayoutDashboard from '../../components/dashboard';
import InputElement from '../../components/form/input';
import ButtonElement from '../../components/form/button';
import UploadElement from '../../components/form/upload';
import TextAreaElement from '../../components/form/textarea';
import { GlobalContext } from '../../context/GlobalState';
import SelectElement from '../../components/form/select';
import UploadVariant from '../../components/form/UploadVariant';
import { Form, Button, Space } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

export default function Products() {
	const { setValue, value, error, handleSubmit } = useContext(GlobalContext);
	const [fields, setFields] = useState([]);
	const [variant, setVariant] = useState(false);
	const [form] = Form.useForm();

	const handleOnchange = (e) => {
		const { name, value } = e.target;
		setValue((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const addFields = () => {
		setFields([...fields, {}]);
	};

	const removeFields = (index) => {
		let data = [...fields];
		data.splice(index, 1);
		setFields(data);
	};

	const handleChangeVarian = (index, event) => {
		let data = [...fields];
		data[index][event.target.name] = event.target.value;
		setValue((prev) => ({
			...prev,
			options: data.map(({ price, variant }) => ({ variant, price })),
		}));
	};

	const handleAddVariant = () => {
		setVariant(true);
	};

	const handleKey = (e) => {
		const { value } = e.target;
		setValue((prev) => ({
			...prev,
			key: value,
		}));
	};
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

			<h1 style={{ padding: '2rem' }}>Sele Information</h1>
			<Form.Item wrapperCol={{ offset: 2, span: 16 }}>
				<Button
					type="primary"
					htmlType="button"
					icon={<PlusOutlined />}
					onClick={handleAddVariant}>
					Add Variant
				</Button>
			</Form.Item>

			{variant && (
				<div>
					<InputElement
						placeholder="example: color"
						name="key"
						label="name"
						hasFeedback
						validateStatus={error['varian'] && 'error'}
						help={error['varian']}
						onChange={handleKey}
					/>
					{fields.map((field, i) => (
						<Form.Item
							key={i}
							wrapperCol={{ offset: 2, span: 13 }}
							style={{ margin: 0 }}>
							<Space direction="vertical" style={{ width: '100%' }}>
								<Space wrap>
									<InputElement
										placeholder="example: red"
										style={{ width: '100%' }}
										name="variant"
										onChange={(event) => handleChangeVarian(i, event)}
									/>
									<InputElement
										placeholder="Price"
										style={{ width: '100%' }}
										name="price"
										onChange={(event) => handleChangeVarian(i, event)}
									/>
									<Form.Item className="item">
										<Button type="primary" onClick={() => removeFields(i)}>
											<CloseOutlined />
										</Button>
									</Form.Item>
								</Space>
							</Space>
						</Form.Item>
					))}
					<ButtonElement
						type="primary"
						onClick={addFields}
						htmlType="button"
						title="add options"
					/>
					<UploadVariant options={fields} setValue={setValue} />
				</div>
			)}

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
			<h1 style={{ padding: '2rem' }}>Delivery Information</h1>
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
