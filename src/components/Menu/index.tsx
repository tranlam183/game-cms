import React, { ReactNode, useEffect } from 'react';
import { Stack, Box, Link, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemText, ListItemIcon, SxProps } from '@mui/material';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletButton from 'components/WalletButton';

const drawerWidth = 240;
interface UIProps {
    children?:ReactNode;
    styled?:SxProps;
}


const Menu = (props:UIProps) => {
    const {children,styled ={flexGrow: 1, pt: 10,px:3}} = props;
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { publicKey } = useWallet();

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        if (publicKey) {

        }
    }, [publicKey])
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={open} sx={{}}>
                <Toolbar sx={{ backgroundColor: 'primary.main', alignItems: 'center', justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* <Typography variant="h6" noWrap component="div">
                        Mini variant drawer
                    </Typography> */}
                    <WalletButton />
                </Toolbar>

            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader  >
                    {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
                    <Stack direction='row' alignItems='center' justifyContent='center' width='100%'>
                        <Box
                            component="img"
                            src="/images/logo.png"
                            sx={{ width: 30 }}
                            mx={1}
                        />
                        <Typography variant='h6' sx={{ fontSize: 25, fontWeight: 'bold', letterSpacing: 1 }}>RaceFi</Typography>
                    </Stack>
                </DrawerHeader>
                <Divider />
                <List>
                    {MENU_LIST.map((item, index) => (
                        <Link href={item.url}>
                            <ListItem key={index} disablePadding sx={{ display: 'block' }} >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={item.content} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <Box component="main" sx={styled}>
              {children}
            </Box>
        </Box>
    )
}
export default Menu;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const MENU_LIST = [
    {
        content: "Home",
        url: "/",
    },
    {
        content: "RaceTrack",
        url: "/racetrack",
    },
    {
        content: "Tournaments",
        url: "/tournaments",
    },
    {
        content: "Test Center",
        url: "/testcenter",
    },
];