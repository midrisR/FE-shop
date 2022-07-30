import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Form } from 'antd';
import React, { useState } from 'react';

const UploadElement = ({ setValue, ...props }) => {
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState([]);

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
			<div
				style={{
					marginTop: 8,
				}}>
				Upload
			</div>
		</div>
	);
	const handleChange = (info) => {
		let newFileList = [...info.fileList];
		if (info.file.status === 'done') {
			const url = newFileList.map((url) => url.response);
			setValue((prev) => ({
				...prev,
				image: url,
			}));
		}

		setFileList(newFileList);
	};
	const propsElement = {
		action: 'http://localhost:5000/upload',
		onChange: handleChange,
		multiple: true,
	};
	return (
		<Form.Item {...props}>
			<Upload
				{...propsElement}
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				multiple={true}
				name="image">
				{uploadButton}
			</Upload>
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
};

export default UploadElement;
