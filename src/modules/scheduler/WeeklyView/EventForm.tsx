import { zodResolver } from '@hookform/resolvers/zod';
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid2 as Grid,
    InputLabel,
    Link,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { Link as RRLink } from 'react-router';
import * as z from 'zod';
import { CheckButton } from '../../../components/CheckButton';
import { useDialog } from '../../../providers/DialogProvider';
import { useAppState } from '../../state/useAppState';

const schema = z.object({
    title: z.string().min(2, 'Title must be at least 2 characters long'),
    date: z.string().datetime(),
    required_role_ids: z.array(z.custom<string>()),
});

export type EventFormValues = z.infer<typeof schema>;

type Props = {
    defaultValues?: Partial<EventFormValues>;
    onSubmit: (data: EventFormValues) => void;
    onCancel: () => void;
};

export const EventForm = ({ defaultValues, onSubmit, onCancel }: Props) => {
    const { closeDialog } = useDialog();

    const roles = useAppState.use.roles();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<EventFormValues>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>{defaultValues ? 'Edit' : 'Create'} Event</DialogTitle>

            <DialogContent sx={{ overflow: 'visible' }}>
                <Stack spacing={2}>
                    <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField {...field} label="Title" error={!!errors.title} helperText={errors.title?.message} fullWidth />
                        )}
                    />

                    <Controller
                        name="date"
                        control={control}
                        defaultValue={new Date().toISOString()}
                        render={({ field: { onChange, value, ...field } }) => (
                            <DateTimePicker
                                {...field}
                                value={new Date(value)}
                                onChange={newValue => onChange(newValue?.toISOString())}
                                label="Date"
                                slotProps={{
                                    textField: {
                                        error: !!errors.date,
                                        helperText: errors.date?.message,
                                        fullWidth: true,
                                    },
                                }}
                            />
                        )}
                    />

                    <Controller
                        name="required_role_ids"
                        control={control}
                        defaultValue={[]}
                        render={({ field: { onChange, value } }) => (
                            <Box>
                                <InputLabel sx={{ mb: 1 }}>Required Roles</InputLabel>
                                <Grid container spacing={1}>
                                    {roles.map(role => {
                                        const selected = value.includes(role.id);

                                        const onClick = () => {
                                            if (selected) value.splice(value.indexOf(role.id), 1);
                                            else value.push(role.id);

                                            onChange(value);
                                        };

                                        return (
                                            <Grid key={role.id} size={{ xs: 6, sm: 4 }}>
                                                <CheckButton
                                                    onClick={onClick}
                                                    selected={selected}
                                                    color="primary"
                                                    sx={{
                                                        width: '100%',
                                                        height: '100%',
                                                    }}
                                                >
                                                    {role.name}
                                                </CheckButton>
                                            </Grid>
                                        );
                                    })}
                                    {roles.length === 0 && (
                                        <Box>
                                            <Typography variant="body2">
                                                You haven&apos;t created any roles yet.{' '}
                                                <Link component={RRLink} to="/roles" onClick={closeDialog}>
                                                    Why not try creating one?
                                                </Link>
                                            </Typography>
                                        </Box>
                                    )}
                                </Grid>
                            </Box>
                        )}
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" color="neutral" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit" disabled={!isValid}>
                    Save
                </Button>
            </DialogActions>
        </form>
    );
};
