export type PostObjectType = {
	id?: string;
	userId?: number;
	title: string | undefined;
	body: string | undefined;
}
export type errorTypes = {
	title: {
		dirty: boolean,
		error: boolean,
		message: string,
	},
	body: {
		dirty: boolean,
		error: boolean,
		message: string,
	},
}