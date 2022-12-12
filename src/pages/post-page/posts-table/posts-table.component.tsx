import { TableRow , TableContainer, TableBody, TableCell, Table, CircularProgress } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PostsContext, PostsContextType } from '../../../context/posts.context';
import { PostObjectType } from '../../../utils/types/types';

export const PostsTable = () => {
  const PostsContextApi = useContext<PostsContextType | null>(PostsContext);

  if (!PostsContextApi) {
    return null;
  }
  const { state } = PostsContextApi;
  const { fetch } = state;

  if (Array.isArray(fetch.posts)) {
    const { posts } = fetch;

    return (
      <TableContainer>
        <Table>
          <TableBody>
            {posts !== null && posts.map((post: PostObjectType) => {
              const { id, title, body } = post;

              return (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{body}</TableCell>
                  <TableCell>
                    <Link to={`/details/${id}`} className="table-link">show more</Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  } else {
    return <CircularProgress />
  }
}
