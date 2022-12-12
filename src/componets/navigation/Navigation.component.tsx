import { Link } from 'react-router-dom';
import {AppBar, Stack, Button, Toolbar, Box } from '@mui/material';

export const Navigation = () => {
  return (
    <Box>
      <AppBar position="static">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Toolbar>
            <Button>
              <Link to={'/'} className="navbar-link">Home</Link>
            </Button>
          </Toolbar>
          <Toolbar>
            <Button>
              <Link to={'/posts'} className="navbar-link">Post</Link>
            </Button>
            <Button>
              <Link to={'/add-new-post'} className="navbar-link">Add New Post</Link>
            </Button>
          </Toolbar>
        </Stack>
      </AppBar>
    </Box>
  )
}
