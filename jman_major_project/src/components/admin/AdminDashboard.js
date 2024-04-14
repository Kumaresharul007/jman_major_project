import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import UsersDisplay from './UsersDisplay';
import { useNavigate } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

export default function AdminDashboard() {

    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>

        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <UsersDisplay />
            </BootstrapDialog>
        </React.Fragment>

        <AppBar style={{position: "fixed", zIndex: "1"}} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        // href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    ADMIN
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={() => {handleCloseNavMenu(); navigate('/coursecreation')}}>
                                <Typography textAlign="center">Create a new training</Typography>
                            </MenuItem>               
                            <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/usercreation'); }}>
                                <Typography textAlign="center">Add a new user</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/trainingplans') }}>
                                <Typography textAlign="center">View all plans</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { handleCloseNavMenu(); handleClickOpen() }}>
                                <Typography textAlign="center">View all users</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/assessmentupload') }}>
                                <Typography textAlign="center">Upload assessment report</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        // href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    ADMIN
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "end" }}>
                        <Button
                            onClick={() => {handleCloseNavMenu(); navigate('/coursecreation')}}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Create a training plan
                        </Button>
                        <Button
                            onClick={() => { handleCloseNavMenu(); navigate('/usercreation'); }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Add a new user
                        </Button>
                        <Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            onClick={() => { handleCloseNavMenu(); navigate('/trainingplans') }}
                        >
                            View all plans
                        </Button>
                        <Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            onClick={() => { handleCloseNavMenu(); handleClickOpen() }}
                        >
                            View all users
                        </Button>
                        <Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            onClick={() => { handleCloseNavMenu(); navigate('/assessmentupload') }}
                        >
                            Upload assessment report
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={() => { handleCloseUserMenu(); logout();}}>
                                <Typography style={{color: "red"}} textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar><br />
        </>
    );
}