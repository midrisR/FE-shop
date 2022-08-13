import { Button, Form, Input, Table, Typography } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
const EditableContext = React.createContext(null);
const { Title } = Typography;
const EditableRow = ({ index, ...props }) => {
	const [form] = Form.useForm();
	return (
		<Form form={form} component={false}>
			<EditableContext.Provider value={form}>
				<tr {...props} />
			</EditableContext.Provider>
		</Form>
	);
};

const EditableCell = ({
	title,
	editable,
	children,
	dataIndex,
	record,
	handleSave,
	...restProps
}) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef(null);
	const form = useContext(EditableContext);
	useEffect(() => {
		if (editing) {
			inputRef.current.focus();
		}
	}, [editing]);

	const toggleEdit = () => {
		setEditing(!editing);
		form.setFieldsValue({
			[dataIndex]: record[dataIndex],
		});
	};

	const save = async () => {
		try {
			const values = await form.validateFields();
			toggleEdit();
			handleSave({ ...record, ...values });
		} catch (errInfo) {
			console.log('Save failed:', errInfo);
		}
	};

	let childNode = children;

	if (editable) {
		childNode = editing ? (
			<Form.Item
				style={{
					margin: 0,
				}}
				name={dataIndex}
				rules={[
					{
						required: true,
						message: `${title} is required.`,
					},
				]}>
				<Input ref={inputRef} onPressEnter={save} onBlur={save} />
			</Form.Item>
		) : (
			<div
				className="editable-cell-value-wrap"
				style={{
					paddingRight: 24,
				}}
				onClick={toggleEdit}>
				{children}
			</div>
		);
	}

	return <td {...restProps}>{childNode}</td>;
};

export default function EditTable({ options, price, setPrice }) {
	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		const variants = options.filter(({ type }) => type === 'motif');
		const sizeCol = options.filter(({ type }) => type === 'size');
		const size = sizeCol.map(({ option }) => option);

		const dataSource = variants.map(({ option }, index) => {
			const x = {
				key: index,
				name: option,
				price: price,
				size: size,
				dataIndex: option,
				width: '30%',
				editable: true,
			};
			return x;
		});
		setDataSource(dataSource);
	}, [options]);
	const handleChangePrice = (event, index) => {
		let data = [...price];
		data[index][event.target.name] = event.target.value;
		setPrice(data);
	};

	const defaultColumns = [
		{
			title: 'name',
			dataIndex: 'name',
			width: '30%',
			render: (text) => (
				<Title strong level={5}>
					{text}
				</Title>
			),
		},
		{
			title: 'size',
			dataIndex: 'size',
			width: '20%',
			render: (_, { size }) => (
				<>
					{size.map((tag, i) => {
						return <p key={i}>{tag.toUpperCase()}</p>;
					})}
				</>
			),
		},
		{
			title: 'price',
			dataIndex: 'price',

			// editable: true,
			render: (_, { price }) => (
				<>
					{price.map((tag, i) => {
						return (
							<Input
								key={i}
								placeholder="price"
								name="price"
								onChange={(event) => handleChangePrice(event, i)}
							/>
						);
					})}
				</>
			),
		},
	];

	const handleSave = (row) => {
		const newData = [...dataSource];
		const index = newData.findIndex((item) => row.key === item.key);
		const item = newData[index];
		newData.splice(index, 1, { ...item, ...row });
		setDataSource(newData);
	};

	const components = {
		body: {
			row: EditableRow,
			cell: EditableCell,
		},
	};
	const columns = defaultColumns.map((col) => {
		if (!col.editable) {
			return col;
		}

		return {
			...col,
			onCell: (record) => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.title,
				handleSave,
			}),
		};
	});

	return (
		<div>
			{JSON.stringify(dataSource)}
			<Table
				size="small"
				wrapperCol={{ offset: 2 }}
				components={components}
				rowClassName={() => 'editable-row'}
				bordered
				dataSource={dataSource}
				columns={columns}
			/>
		</div>
	);
}
