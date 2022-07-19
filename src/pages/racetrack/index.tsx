import React, { useEffect } from 'react';
import { Stack, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, IconButton, InputBase, Button, SelectChangeEvent, FormControl, Select, OutlinedInput, MenuItem, Checkbox, ListItemText, InputLabel, Box } from '@mui/material';
import Menu from 'components/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import TemporaryDrawer from 'components/Drawer';
import { TextInputLayout } from 'components';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { BodyUrlRacetrack, DataStatus } from 'store/racetrack/reducer';
import { getRacetrack, postRacetrack } from 'store/racetrack/actions';
import { useWallet } from '@solana/wallet-adapter-react';
import { updateSnackbar } from 'store/app';



interface Column {
    id?: 'name' | 'image' | 'laps' | 'timeReq';
    label?: string;
    minWidth?: number | string;
    align?: 'right';
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: '25%' },
    { id: 'image', label: 'Image', minWidth: '25%' },
    {
        id: 'laps',
        label: 'Laps',
        minWidth: '25%',
        align: 'right',
    },
    {
        id: 'timeReq',
        label: 'Time',
        minWidth: '25%',
        align: 'right',
    },
    // {
    //     id: 'timeReq',
    //     label: 'Time',
    //     minWidth: '25%',
    //     align: 'right',
    // },
];


const RaceTrack = () => {
    const [page, setPage] = React.useState(0);
    const [openModal, setOpenModal] = React.useState(false);
    const [bodyReqValues, setBodyReq] = React.useState<BodyUrlRacetrack>({
        name: '',
        description: '',
        image: '',
        background: '',
        laps: 0,
        timeReq: 0,
        models: [],
    })
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const racetracks = useAppSelector((state) => state.racetrack);
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(getRacetrack(racetracks.params))
    }, [])

    // useEffect(() => {
    //     if (racetracks.dataStatus === DataStatus.Succeeded) {
    //         setBodyReq({
    //             name: '',
    //             description: '',
    //             image: '',
    //             background: '',
    //             laps: 0,
    //             timeReq: 0,
    //             models: [],
    //         })
    //         setOpenModal(false)
    //         dispatch(updateSnackbar({ message: "NFT address is copied" }))
    //         dispatch(getRacetrack(racetracks.params))
    //     }

    // }, [racetracks.dataStatus]);
    const onSubmit = async () => {
        const resp = await dispatch(postRacetrack(bodyReqValues)).unwrap()
        if (resp?._id) {
            setBodyReq({
                name: '',
                description: '',
                image: '',
                background: '',
                laps: 0,
                timeReq: 0,
                models: [],
            })
            setOpenModal(false)
            dispatch(updateSnackbar({ message: "Success!", severity: "success" }))
        }
        else {
            dispatch(updateSnackbar({ message: "Error", severity: "error"  }))
        }
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // const [modelsName, setModels] = React.useState<string[]>([]);
    const handleChange = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;
        setBodyReq({ ...bodyReqValues, models: typeof value === 'string' ? value.split(',') : value })
    };


    return (
        <Menu >
            <Stack direction='row' alignItems='center' justifyContent='space-around' py={5}>
                <Stack direction='row' alignItems='center'>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600 }}
                    >
                        <InputBase
                            sx={{ pl: 1, flex: 1 }}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <IconButton type="submit" sx={{ mx: '20px' }} aria-label="search">
                        <FilterListIcon />
                    </IconButton>
                </Stack>
                <TemporaryDrawer anchorDirection={'right'} stateModel={openModal}>
                    <Stack p={2}  >
                        <TextInputLayout title='Name' type='text' onChangeValue={(value) => setBodyReq({ ...bodyReqValues, name: value })} />
                        <TextInputLayout title='Description' type='text' onChangeValue={(value) => setBodyReq({ ...bodyReqValues, description: value })} />
                        <TextInputLayout title='Image' type='text' onChangeValue={(value) => setBodyReq({ ...bodyReqValues, image: value })} />
                        <TextInputLayout title='Background' type='text' onChangeValue={(value) => setBodyReq({ ...bodyReqValues, background: value })} />
                        <TextInputLayout title='Laps' type='text' onChangeValue={(value) => setBodyReq({ ...bodyReqValues, laps: Number(value) })} />
                        <TextInputLayout title='TimeReq' type='text' onChangeValue={(value) => setBodyReq({ ...bodyReqValues, timeReq: Number(value) })} />
                        <FormControl sx={{ width: '100%', mt: 1 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Models</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={bodyReqValues.models}
                                onChange={handleChange}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {racetracks.models?.map((name: string) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={bodyReqValues.models?.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Stack position="absolute" sx={{ bottom: 50, left: '45%', }}>
                            <Button variant="contained" onClick={() => onSubmit()}>Create</Button>
                        </Stack>
                    </Stack>
                </TemporaryDrawer>
            </Stack>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{ width: '100%' }}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ width: column.minWidth, fontWeight: 'bold', border: '1px solid' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {racetracks.racetrackItems?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column) => {
                                                const value = row[column?.id ?? ''];
                                                if (column.id !== 'image') {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {value}
                                                        </TableCell>
                                                    );
                                                }
                                                else {
                                                    return (
                                                        <TableCell key={index} >
                                                            <Box component='img' src={row.image} sx={{ height: '100px', objectFit: 'cover' }} />
                                                        </TableCell>
                                                    );
                                                }
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={racetracks.racetrackItems?.length ?? 1}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Menu>
    )
}
export default RaceTrack;


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
