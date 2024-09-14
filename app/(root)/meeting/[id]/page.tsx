const page = ({ params }: { params: { id: string } }) => {
	return <div>Meeting room {params.id}</div>;
};

export default page;
