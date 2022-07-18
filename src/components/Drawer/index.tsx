import { Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, Stack } from '@mui/material';
import React, { ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface UIProps {
    children?: ReactNode;
    anchorDirection: 'left' | 'top' | 'right' | 'bottom';
}

const TemporaryDrawer = (props: UIProps) => {
    const { children, anchorDirection } = props;
    const [state, setState] = React.useState(false);
    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState(open);
            };
    return (
        <React.Fragment >
            <Button variant="outlined" onClick={toggleDrawer(true)}>Create</Button>
            <Drawer
                anchor={anchorDirection}
                open={state}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 500, pt: 10,border: '1px solid black',height:'100%',position:'relative' }}
                    role="presentation"
                // onClick={toggleDrawer(false)}
                // onKeyDown={toggleDrawer(false)}
                >
                    <Stack
                        sx={{ width: '100%',  alignItems: 'flex-end', pr: 2 }}
                    >
                        <IconButton
                            onClick={toggleDrawer(false)}
                            sx={{ width: 35 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Stack>

                    {children}
                    {/* <Divider /> */}
                </Box>
            </Drawer>
        </React.Fragment>
    )
}

export default TemporaryDrawer;