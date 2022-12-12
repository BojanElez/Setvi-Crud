export const titleValidator = (title: string | undefined) => {
  if (!title) {
    return 'Title is required';
  }
  return '';
};

export const bodyValidator = (body: string | undefined) => {
  if (!body) {
    return 'Body is required';
  }
  return '';
};