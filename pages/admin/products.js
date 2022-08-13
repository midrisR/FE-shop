import React, { useContext } from 'react';
import LayoutDashboard from '../../components/dashboard';
import InputElement from '../../components/form/input';
import ButtonElement from '../../components/form/button';
import UploadElement from '../../components/form/upload';
import TextAreaElement from '../../components/form/textarea';
import { GlobalContext } from '../../context/GlobalState';
import SelectElement from '../../components/form/select';
import DynamicFields from '../../components/form/DynamicFields';
import { Form, Divider } from 'antd';

export default function Products() {
	const { setValue, value, error, handleSubmit } = useContext(GlobalContext);
	const [form] = Form.useForm();

	const handleOnchange = (e) => {
		const { name, value } = e.target;
		setValue((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<Form
			form={form}
			labelCol={{ span: 2, offset: 0 }}
			wrapperCol={{ span: 10 }}
			autoComplete="off"
			onSubmitCapture={handleSubmit}>
			<Divider orientation="left" className="first">
				Product Information
			</Divider>
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
				labelAlign="left"
				hasFeedback
				validateStatus={error['image'] && 'error'}
				help={error['image']}
				setValue={setValue}
			/>
			<TextAreaElement
				label="description"
				labelAlign="left"
				hasFeedback
				validateStatus={error['description'] && 'error'}
				help={error['description']}
				name="description"
				onChange={handleOnchange}
			/>
			<Divider orientation="left" className="first">
				Options Product
			</Divider>
			<DynamicFields setValue={setValue} value={value} />

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

			<Divider orientation="left" className="first">
				Other Information
			</Divider>
			<SelectElement
				name="preOrder"
				label="pre order"
				labelAlign="left"
				hasFeedback
				validateStatus={error['preOrder'] && 'error'}
				help={error['preOrder']}
				setValue={setValue}
				options={[true, false]}
			/>
			{value?.preOrder && (
				<InputElement
					name="preOrder_time"
					labelAlign="left"
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
				labelAlign="left"
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
