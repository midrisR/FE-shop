import FromWrapper from './from';

export default function FormElement({ children, onSubmit, ref }) {
	return (
		<FromWrapper ref={ref} onSubmit={onSubmit}>
			{children}
		</FromWrapper>
	);
}
