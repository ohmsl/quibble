import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    AppBar,
    Avatar,
    Badge,
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Checkbox,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Drawer,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    LinearProgress,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    Slider,
    Snackbar,
    Switch,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    ChevronDown as ExpandMoreIcon,
    Heart as FavoriteIcon,
    Home as HomeIcon,
    MapPin as LocationOnIcon,
    Mail as MailIcon,
    Menu as MenuIcon,
    User as PersonIcon,
    Clock as RestoreIcon,
} from 'lucide-react';
import { useState } from 'react';

export const ThemePreviewView = (): JSX.Element => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const [sliderValue, setSliderValue] = useState(30);
    const [checked, setChecked] = useState(true);
    const [radioValue, setRadioValue] = useState('a');
    const [switchChecked, setSwitchChecked] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
    const [bottomNavValue, setBottomNavValue] = useState(0);

    // Component Section
    const ComponentSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <Box sx={{ mb: 6 }}>
            <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 3, borderBottom: `1px solid ${theme.palette.divider}`, pb: 1 }}>
                {title}
            </Typography>
            {children}
        </Box>
    );

    // Variant Showcase
    const VariantShowcase = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                {title}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>{children}</Box>
        </Box>
    );

    // Handlers with proper typing
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setMenuAnchorEl(event.currentTarget);
    const handleMenuClose = () => setMenuAnchorEl(null);

    // Handler for slider to address type issues
    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setSliderValue(newValue);
        }
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => setDrawerOpen(true)}>
                        <MenuIcon size={24} />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Theme Showcase
                    </Typography>
                    <Button color="inherit" onClick={() => setSnackbarOpen(true)}>
                        Snackbar
                    </Button>
                    <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuOpen}>
                        Menu
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Theme Components
                </Typography>
                <Typography variant="body1" paragraph>
                    This page showcases all MUI components and their variants with the current theme applied.
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        {/* Buttons */}
                        <ComponentSection title="Buttons">
                            <VariantShowcase title="Button Variants">
                                <Button variant="text">Text</Button>
                                <Button variant="contained">Contained</Button>
                                <Button variant="outlined">Outlined</Button>
                            </VariantShowcase>

                            <VariantShowcase title="Button Colors">
                                <Button variant="text" color="primary">
                                    Primary
                                </Button>
                                <Button variant="text" color="secondary">
                                    Secondary
                                </Button>
                                <Button variant="text" color="error">
                                    Error
                                </Button>
                                <Button variant="text" color="warning">
                                    Warning
                                </Button>
                                <Button variant="text" color="info">
                                    Info
                                </Button>
                                <Button variant="text" color="success">
                                    Success
                                </Button>
                                <Button variant="text" disabled>
                                    Disabled
                                </Button>
                            </VariantShowcase>
                            <VariantShowcase title="">
                                <Button variant="outlined" color="primary">
                                    Primary
                                </Button>
                                <Button variant="outlined" color="secondary">
                                    Secondary
                                </Button>
                                <Button variant="outlined" color="error">
                                    Error
                                </Button>
                                <Button variant="outlined" color="warning">
                                    Warning
                                </Button>
                                <Button variant="outlined" color="info">
                                    Info
                                </Button>
                                <Button variant="outlined" color="success">
                                    Success
                                </Button>
                                <Button variant="outlined" disabled>
                                    Disabled
                                </Button>
                            </VariantShowcase>
                            <VariantShowcase title="">
                                <Button variant="contained" color="primary">
                                    Primary
                                </Button>
                                <Button variant="contained" color="secondary">
                                    Secondary
                                </Button>
                                <Button variant="contained" color="error">
                                    Error
                                </Button>
                                <Button variant="contained" color="warning">
                                    Warning
                                </Button>
                                <Button variant="contained" color="info">
                                    Info
                                </Button>
                                <Button variant="contained" color="success">
                                    Success
                                </Button>
                                <Button variant="contained" disabled>
                                    Disabled
                                </Button>
                            </VariantShowcase>

                            <VariantShowcase title="Button Sizes">
                                <Button variant="contained" size="small">
                                    Small
                                </Button>
                                <Button variant="contained" size="medium">
                                    Medium
                                </Button>
                                <Button variant="contained" size="large">
                                    Large
                                </Button>
                            </VariantShowcase>
                        </ComponentSection>

                        {/* Typography */}
                        <ComponentSection title="Typography">
                            <Typography variant="h1" gutterBottom>
                                h1. Heading
                            </Typography>
                            <Typography variant="h2" gutterBottom>
                                h2. Heading
                            </Typography>
                            <Typography variant="h3" gutterBottom>
                                h3. Heading
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                h4. Heading
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                h5. Heading
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                h6. Heading
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                subtitle1. Lorem ipsum dolor sit amet.
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                subtitle2. Lorem ipsum dolor sit amet.
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            </Typography>
                            <Typography variant="button" display="block" gutterBottom>
                                BUTTON TEXT
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                                caption text
                            </Typography>
                            <Typography variant="overline" display="block" gutterBottom>
                                OVERLINE TEXT
                            </Typography>
                        </ComponentSection>

                        {/* Form Controls */}
                        <ComponentSection title="Form Controls">
                            <VariantShowcase title="Text Fields">
                                <TextField label="Standard" variant="standard" />
                                <TextField label="Filled" variant="filled" />
                                <TextField label="Outlined" variant="outlined" />
                                <TextField label="Disabled" disabled variant="outlined" />
                                <TextField label="Error" error helperText="Error message" variant="outlined" />
                            </VariantShowcase>

                            <VariantShowcase title="Checkboxes">
                                <FormControlLabel
                                    control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />}
                                    label="Standard"
                                />
                                <FormControlLabel disabled control={<Checkbox checked={checked} />} label="Disabled" />
                                <FormControlLabel control={<Checkbox indeterminate />} label="Indeterminate" />
                            </VariantShowcase>

                            <VariantShowcase title="Radio Buttons">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Radio Group</FormLabel>
                                    <RadioGroup value={radioValue} onChange={e => setRadioValue(e.target.value)}>
                                        <FormControlLabel value="a" control={<Radio />} label="Option A" />
                                        <FormControlLabel value="b" control={<Radio />} label="Option B" />
                                        <FormControlLabel value="c" disabled control={<Radio />} label="Disabled" />
                                    </RadioGroup>
                                </FormControl>
                            </VariantShowcase>

                            <VariantShowcase title="Switches">
                                <FormControlLabel
                                    control={<Switch checked={switchChecked} onChange={() => setSwitchChecked(!switchChecked)} />}
                                    label="Standard"
                                />
                                <FormControlLabel disabled control={<Switch checked={switchChecked} />} label="Disabled" />
                            </VariantShowcase>

                            <VariantShowcase title="Select">
                                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                                    <FormLabel>Standard Select</FormLabel>
                                    <Select defaultValue={10}>
                                        <MenuItem value={10}>Option 1</MenuItem>
                                        <MenuItem value={20}>Option 2</MenuItem>
                                        <MenuItem value={30}>Option 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </VariantShowcase>

                            <VariantShowcase title="Slider">
                                <Box sx={{ width: 300 }}>
                                    <Slider value={sliderValue} onChange={handleSliderChange} aria-labelledby="continuous-slider" />
                                </Box>
                            </VariantShowcase>
                        </ComponentSection>

                        {/* Data Display */}
                        <ComponentSection title="Data Display">
                            <VariantShowcase title="Chips">
                                <Chip label="Basic" />
                                <Chip label="Clickable" onClick={() => console.log('Clicked')} />
                                <Chip label="Deletable" onDelete={() => console.log('Delete')} />
                                <Chip avatar={<Avatar>M</Avatar>} label="With Avatar" />
                                <Chip icon={<FavoriteIcon size={16} />} label="With Icon" />
                                <Chip label="Primary" color="primary" />
                                <Chip label="Success" color="success" />
                            </VariantShowcase>

                            <VariantShowcase title="Dividers">
                                <Box sx={{ width: '100%' }}>
                                    <Typography variant="body1">Above Divider</Typography>
                                    <Divider />
                                    <Typography variant="body1">Below Divider</Typography>
                                    <Divider textAlign="left">LEFT</Divider>
                                    <Typography variant="body1">Below Left Divider</Typography>
                                    <Divider textAlign="center">CENTER</Divider>
                                </Box>
                            </VariantShowcase>

                            <VariantShowcase title="Lists">
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <HomeIcon size={24} />
                                        </ListItemIcon>
                                        <ListItemText primary="List item with icon" />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText primary="Clickable list item" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Primary text" secondary="Secondary text" />
                                    </ListItem>
                                </List>
                            </VariantShowcase>

                            <VariantShowcase title="Tooltips">
                                <Tooltip title="Basic Tooltip">
                                    <Button>Hover me</Button>
                                </Tooltip>
                                <Tooltip title="Tooltip with placement" placement="right">
                                    <Button>Right</Button>
                                </Tooltip>
                                <Tooltip title="Arrow Tooltip" arrow>
                                    <Button>With Arrow</Button>
                                </Tooltip>
                            </VariantShowcase>

                            <VariantShowcase title="Tables">
                                <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell align="right">Calories</TableCell>
                                                <TableCell align="right">Fat (g)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Pizza
                                                </TableCell>
                                                <TableCell align="right">266</TableCell>
                                                <TableCell align="right">10</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Burger
                                                </TableCell>
                                                <TableCell align="right">305</TableCell>
                                                <TableCell align="right">15</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </VariantShowcase>
                        </ComponentSection>

                        {/* Navigation */}
                        <ComponentSection title="Navigation">
                            <VariantShowcase title="Breadcrumbs">
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link underline="hover" color="inherit" href="#">
                                        MUI
                                    </Link>
                                    <Link underline="hover" color="inherit" href="#">
                                        Core
                                    </Link>
                                    <Typography color="text.primary">Breadcrumbs</Typography>
                                </Breadcrumbs>
                            </VariantShowcase>

                            <VariantShowcase title="Tabs">
                                <Box sx={{ width: '100%' }}>
                                    <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
                                        <Tab label="Item One" />
                                        <Tab label="Item Two" />
                                        <Tab label="Item Three" />
                                    </Tabs>
                                </Box>
                            </VariantShowcase>

                            <VariantShowcase title="Bottom Navigation">
                                <Paper sx={{ width: 500, maxWidth: '100%' }} elevation={3}>
                                    <BottomNavigation
                                        value={bottomNavValue}
                                        onChange={(_, newValue) => {
                                            setBottomNavValue(newValue);
                                        }}
                                        showLabels
                                    >
                                        <BottomNavigationAction label="Recents" icon={<RestoreIcon size={24} />} />
                                        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon size={24} />} />
                                        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon size={24} />} />
                                    </BottomNavigation>
                                </Paper>
                            </VariantShowcase>
                        </ComponentSection>

                        {/* Feedback */}
                        <ComponentSection title="Feedback">
                            <VariantShowcase title="Alerts">
                                <Alert severity="error">This is an error alert!</Alert>
                                <Alert severity="warning">This is a warning alert!</Alert>
                                <Alert severity="info">This is an information alert!</Alert>
                                <Alert severity="success">This is a success alert!</Alert>
                            </VariantShowcase>

                            <VariantShowcase title="Badges">
                                <Badge badgeContent={4} color="primary">
                                    <MailIcon size={24} />
                                </Badge>
                                <Badge badgeContent={4} color="secondary">
                                    <MailIcon size={24} />
                                </Badge>
                                <Badge badgeContent={0} color="primary" showZero>
                                    <MailIcon size={24} />
                                </Badge>
                                <Badge badgeContent={99} color="error" max={50}>
                                    <MailIcon size={24} />
                                </Badge>
                            </VariantShowcase>

                            <VariantShowcase title="Progress">
                                <CircularProgress />
                                <CircularProgress color="secondary" />
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgress />
                                </Box>
                                <Box sx={{ width: '100%', mt: 2 }}>
                                    <LinearProgress color="success" />
                                </Box>
                            </VariantShowcase>
                        </ComponentSection>

                        {/* Surfaces */}
                        <ComponentSection title="Surfaces">
                            <VariantShowcase title="Accordion">
                                <Accordion sx={{ width: '100%' }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon size={24} />}>
                                        <Typography>Accordion 1</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                                            amet blandit leo lobortis eget.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{ width: '100%' }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon size={24} />}>
                                        <Typography>Accordion 2</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                                            amet blandit leo lobortis eget.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </VariantShowcase>

                            <VariantShowcase title="Card">
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image="https://source.unsplash.com/random/345x140"
                                        alt="random image"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Card Title
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Content that could be displayed inside a card component to demonstrate its appearance.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Share</Button>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </VariantShowcase>

                            <VariantShowcase title="Paper">
                                <Paper elevation={0} sx={{ p: 2 }}>
                                    <Typography>Elevation 0</Typography>
                                </Paper>
                                <Paper elevation={1} sx={{ p: 2 }}>
                                    <Typography>Elevation 1</Typography>
                                </Paper>
                                <Paper elevation={3} sx={{ p: 2 }}>
                                    <Typography>Elevation 3</Typography>
                                </Paper>
                                <Paper elevation={6} sx={{ p: 2 }}>
                                    <Typography>Elevation 6</Typography>
                                </Paper>
                                <Paper elevation={12} sx={{ p: 2 }}>
                                    <Typography>Elevation 12</Typography>
                                </Paper>
                                <Paper elevation={24} sx={{ p: 2 }}>
                                    <Typography>Elevation 24</Typography>
                                </Paper>
                            </VariantShowcase>
                        </ComponentSection>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
                            <Typography variant="h6" gutterBottom>
                                Theme Palette
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2">Primary</Typography>
                                <Box sx={{ display: 'flex', mb: 1, gap: 1 }}>
                                    <Box sx={{ bgcolor: 'primary.light', width: 40, height: 40, borderRadius: 1 }} />
                                    <Box sx={{ bgcolor: 'primary.main', width: 40, height: 40, borderRadius: 1 }} />
                                    <Box sx={{ bgcolor: 'primary.dark', width: 40, height: 40, borderRadius: 1 }} />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2">Secondary</Typography>
                                <Box sx={{ display: 'flex', mb: 1, gap: 1 }}>
                                    <Box sx={{ bgcolor: 'secondary.light', width: 40, height: 40, borderRadius: 1 }} />
                                    <Box sx={{ bgcolor: 'secondary.main', width: 40, height: 40, borderRadius: 1 }} />
                                    <Box sx={{ bgcolor: 'secondary.dark', width: 40, height: 40, borderRadius: 1 }} />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2">Error</Typography>
                                <Box sx={{ display: 'flex', mb: 1, gap: 1 }}>
                                    <Box sx={{ bgcolor: 'error.light', width: 40, height: 40, borderRadius: 1 }} />
                                    <Box sx={{ bgcolor: 'error.main', width: 40, height: 40, borderRadius: 1 }} />
                                    <Box sx={{ bgcolor: 'error.dark', width: 40, height: 40, borderRadius: 1 }} />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2">Warning</Typography>
                                <Box sx={{ display: 'flex', mb: 1, gap: 1 }}>
                                    <Box sx={{ bgcolor: 'warning.light', width: 40, height: 40, borderRadius: 1 }} />
                                    <Box sx={{ bgcolor: 'warning.main', width: 40, height: 40, borderRadius: 1 }} />
                                    <Box sx={{ bgcolor: 'warning.dark', width: 40, height: 40, borderRadius: 1 }} />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2">Info</Typography>
                                <Box sx={{ display: 'flex', mb: 1, gap: 1 }}>
                                    <Box sx={{ bgcolor: 'info.light', width: 40, height: 40, borderRadius: 1 }} />
                                    <Box sx={{ bgcolor: 'info.main', width: 40, height: 40, borderRadius: 1 }} />
                                    <Box sx={{ bgcolor: 'info.dark', width: 40, height: 40, borderRadius: 1 }} />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2">Success</Typography>
                                <Box sx={{ display: 'flex', mb: 1, gap: 1 }}>
                                    <Box sx={{ bgcolor: 'success.light', width: 40, height: 40, borderRadius: 1 }} />
                                    <Box sx={{ bgcolor: 'success.main', width: 40, height: 40, borderRadius: 1 }} />
                                    <Box sx={{ bgcolor: 'success.dark', width: 40, height: 40, borderRadius: 1 }} />
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2">Text</Typography>
                                <Box sx={{ mb: 1 }}>
                                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                        Text Primary
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Text Secondary
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                                        Text Disabled
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2">Background</Typography>
                                <Box sx={{ display: 'flex', mb: 1, gap: 1 }}>
                                    <Box
                                        sx={{
                                            bgcolor: 'background.paper',
                                            width: 40,
                                            height: 40,
                                            borderRadius: 1,
                                            border: '1px solid #ddd',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            bgcolor: 'background.default',
                                            width: 40,
                                            height: 40,
                                            borderRadius: 1,
                                            border: '1px solid #ddd',
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2">Divider</Typography>
                                <Box sx={{ display: 'flex', mb: 1, gap: 1, alignItems: 'center' }}>
                                    <Box sx={{ bgcolor: 'divider', width: 60, height: 4, borderRadius: 1 }} />
                                </Box>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2">Action</Typography>
                                <Box sx={{ mb: 1 }}>
                                    <Box sx={{ bgcolor: 'action.active', width: 40, height: 40, borderRadius: 1, mb: 1 }} />
                                    <Box
                                        sx={{
                                            bgcolor: 'action.hover',
                                            width: 40,
                                            height: 40,
                                            borderRadius: 1,
                                            mb: 1,
                                            border: '1px solid #ddd',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            bgcolor: 'action.selected',
                                            width: 40,
                                            height: 40,
                                            borderRadius: 1,
                                            mb: 1,
                                            border: '1px solid #ddd',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            bgcolor: 'action.disabled',
                                            width: 40,
                                            height: 40,
                                            borderRadius: 1,
                                            mb: 1,
                                            border: '1px solid #ddd',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            bgcolor: 'action.disabledBackground',
                                            width: 40,
                                            height: 40,
                                            borderRadius: 1,
                                            border: '1px solid #ddd',
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* Drawer */}
            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250 }} role="presentation">
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <HomeIcon size={24} />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <PersonIcon size={24} />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <MailIcon size={24} />
                            </ListItemIcon>
                            <ListItemText primary="Messages" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem>
                            <ListItemText primary="Settings" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Help" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message="This is a snackbar"
                action={
                    <Button color="secondary" size="small" onClick={() => setSnackbarOpen(false)}>
                        CLOSE
                    </Button>
                }
            />

            {/* Menu */}
            <Menu id="simple-menu" anchorEl={menuAnchorEl} keepMounted open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
        </Box>
    );
};
