import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Form, Row, message } from 'antd';
import React, { useState } from 'react';
const beforeUpload = (file) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}

	const isLt2M = file.size / 1024 / 1024 < 2;

	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}

	return isJpgOrPng && isLt2M;
};
const UploadVariant = ({ setValue, options }) => {
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState([]);
	const [success, setSuccess] = useState(false);
	const getBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => resolve(reader.result);

			reader.onerror = (error) => reject(error);
		});

	const handleCancel = () => setPreviewVisible(false);

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewVisible(true);
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
	};

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);
	const handleChange = (info, index) => {
		// let newFileList = [...info.fileList];
		const newFileList = Object.assign(
			{},
			...info.fileList.map(({ response, status }) => ({ response, status }))
		);

		if (newFileList.status === 'uploading') {
			setSuccess((prev) => ({
				...prev,
				[index]: true,
			}));
		}
		console.log(newFileList.status);
		if (newFileList.status === 'done') {
			let data = [...options];
			data[index].images = newFileList.response;
			setValue((prev) => ({
				...prev,
				variant: data,
			}));
		}
		setFileList(newFileList);
	};
	const propsElement = {
		action: 'http://localhost:5000/upload',
		beforeUpload: beforeUpload,
	};
	return (
		<Row style={{ marginLeft: '8%' }}>
			{options.map((option, i) => {
				return (
					<Form.Item key={i} wrapperCol={{ offset: 2, span: 13 }}>
						<Upload
							{...propsElement}
							listType="picture-card"
							onPreview={handlePreview}
							onChange={(info) => handleChange(info, i)}
							multiple={false}
							onRemove={() => setSuccess((prev) => ({ ...prev, [i]: false }))}
							name="image">
							{!success[i] && uploadButton}
						</Upload>
						{option.variant}
						<Modal
							visible={previewVisible}
							title={previewTitle}
							footer={null}
							onCancel={handleCancel}>
							<img
								alt="example"
								style={{
									width: '100%',
								}}
								src={previewImage}
							/>
						</Modal>
					</Form.Item>
				);
			})}
		</Row>
	);
};

export default UploadVariant;
