import {getComment} from '../../../media/apiComments';

const EditComment = props => {
	return(
		<div>
			<h1>Edit Comment</h1>
		</div>
	)
}

export const getServerSideProps = async ctx => {
	const res = await getComment(ctx.query.id);
	return {props: {
		comment: res.data
	}}
}

export default EditComment;