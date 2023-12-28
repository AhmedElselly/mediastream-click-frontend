import axios from 'axios';

const url = 'http://localhost:8000/comments';

export const createComment = async (userId, mediaId) => {
	const res = await axios.post(`${url}/${userId}/${mediaId}`, {text});
	return res;
}

export const listComments = async mediaId => {
	const res = await axios.get(`${url}/media/${mediaId}`);

	return res;
}

export const getComment = async commentId => {
	const res = await axios.get(`${url}/read/${commentId}`);
	return res;
}

export const updateComment = async commentId => {
	const res = await axios.put(`${url}/comments/update/${commentId}`, {text});
	return res;
}