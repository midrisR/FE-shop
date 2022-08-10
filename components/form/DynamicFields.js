import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import UploadVariant from './UploadVariant';

const FieldsOptions = ({ options, index, handleChangeOption, removeFieldsOption }) => {
	return (
		<>
			{options.map((option, number) => {
				return (
					<React.Fragment key={number}>
						{option.key === index && (
							<Input.Group
								compact
								style={{
									margin: '0.75rem 0',
								}}>
								<Input
									name="option"
									style={{ width: 'calc(50%)' }}
									placeholder={`example: red / xl `}
									value={option.option}
									onChange={(event) => handleChangeOption(event, number)}
								/>
								<Button
									type="primary"
									danger
									icon={<CloseOutlined />}
									onClick={() => removeFieldsOption(number)}
								/>
							</Input.Group>
						)}
					</React.Fragment>
				);
			})}
		</>
	);
};

const UploadImgae = ({ images, index, handleChangeimage, options }) => {
	return (
		<Space>
			{images.map((image, number) => {
				return (
					<React.Fragment key={number}>
						{image.key === index && (
							<UploadVariant
								images={images}
								name={options[number]}
								index={number}
								handleChange={handleChangeimage}
							/>
						)}
					</React.Fragment>
				);
			})}
		</Space>
	);
};

export default function DynamicFields({ setValue, value }) {
	const [options, setOptions] = useState([]);
	const [images, setImages] = useState([]);
	const [variants, setVariants] = useState([]);
	const [form] = Form.useForm();

	const handleChangeName = (event, index) => {
		const data = [...variants];
		data[index][event.target.name] = event.target.value;
		setVariants(data);
	};

	const handleChangeOption = (event, index) => {
		let data = [...options];
		data[index][event.target.name] = event.target.value;
		setOptions(data);
	};
	const handleChangeimage = (event, index) => {
		let data = [...images];
		data[index]['image'] = event[0].response;
		console.log(event);
		setImages(data);
	};

	const addOptionFields = (index) => {
		setOptions([...options, { option: '', key: index }]);
		setImages([...images, { image: '', key: index }]);
	};

	const addFields = () => {
		if (variants.length < 2) setVariants([...variants, { variant: '', key: variants.length }]);
	};

	const removeFieldsOption = (number) => {
		let option = [...options];
		let image = [...images];
		option.splice(number, 1);
		image.splice(number, 1);
		setOptions(option);
		setImages(image);
	};

	const removeFieldsVariant = (number) => {
		let variant = [...variants];
		variant.splice(number, 1);
		setVariants(variant);
	};

	useEffect(() => {
		const result = variants.map((item) => {
			const obj = options.filter(({ key }) => key === item.key);
			return { name: item.variant, value: obj.map((val) => val.option) };
		});
		setValue((prev) => ({
			...prev,
			variant: result,
		}));
	}, [options, variants]);
	console.log(images);
	return (
		<>
			{variants.map((variant, u) => (
				<React.Fragment key={u}>
					<Form.Item labelAlign="left" label={`Variant ${u + 1}`}>
						<Input.Group compact>
							<Input
								name="variant"
								placeholder="example: color / size"
								style={{
									width: u > 0 ? 'calc(86%)' : '100%',
									marginRight: '0.5rem',
								}}
								onChange={(event) => handleChangeName(event, u)}
							/>
							{u !== 0 && (
								<Button type="dashed" danger onClick={() => removeFieldsVariant(u)}>
									Delete
								</Button>
							)}
						</Input.Group>
						<FieldsOptions
							options={options}
							index={u}
							handleChangeOption={handleChangeOption}
							removeFieldsOption={removeFieldsOption}
						/>
						<Button
							type="dashed"
							style={{ margin: '0.50rem 0' }}
							icon={<PlusOutlined />}
							onClick={() => addOptionFields(u)}>
							add options
						</Button>
						{u === 0 && (
							<div style={{ display: 'block' }}>
								<UploadImgae
									images={images}
									options={options}
									index={u}
									handleChangeimage={handleChangeimage}
								/>
							</div>
						)}
					</Form.Item>
				</React.Fragment>
			))}
			{variants.length < 2 && (
				<Form.Item wrapperCol={{ offset: 2 }}>
					<Button type="dashed" icon={<PlusOutlined />} onClick={addFields}>
						add variant
					</Button>
				</Form.Item>
			)}
		</>
	);
}
