import axios from 'axios';

const url = 'http://localhost:8000/media';

export const create = async (userId, formData) => {
	const res = await axios.post(`${url}/create/${userId}`, formData);
	return res;
}

export const read = async (videoId) => {
	const res = await axios.get(`${url}/video/credentials/${videoId}`);
	return res;
}

export const update = async (videoId, formData) => {
	const res = await axios.put(`${url}/video/credentials/${videoId}`, formData);
	return res;
}

export const list = async () => {
	const res = await axios.get(`${url}`);
	return res;
}

export const getVideo = async (mediaId) => {
	const res = await axios.get(`${url}/video/${mediaId}`);
	return res;
}

export const listByUser = async userId => {
	const res = await axios.get(`${url}/list/by-user/${userId}`);
	return res;
}

export const listRelated = async mediaId => {
	const res = await axios.get(`${url}/list/related/${mediaId}`);
	return res;
}
