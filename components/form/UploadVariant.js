import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Typography } from 'antd';
import React, { useState } from 'react';

const { Title } = Typography;

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => resolve(reader.result);

		reader.onerror = (error) => reject(error);
	});

export default function UploadVariant({ handleChange, images, index, name }) {
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');

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
			<div
				style={{
					marginTop: 8,
				}}>
				Upload
			</div>
		</div>
	);
	return (
		<>
			<Upload
				action="http://localhost:5000/upload"
				listType="picture-card"
				name="image"
				multiple={false}
				onPreview={handlePreview}
				onChange={({ fileList: newFileList }) => handleChange(newFileList, index)}>
				{images[index].image === '' && uploadButton}
			</Upload>
			<Title style={{ textAlign: 'center' }} level={5}>
				{' '}
				{name.option}
			</Title>
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
		</>
	);
}
