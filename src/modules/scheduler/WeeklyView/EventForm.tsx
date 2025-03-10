import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    Checkbox,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid2 as Grid,
    InputLabel,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { CheckButton } from "../../../components/CheckButton";
import { useAppState } from "../../state/useAppState";

const schema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters long"),
    date: z.string().datetime(),
    requiredRoleIds: z.set(z.custom<string>()),
    recurring: z.boolean().default(false),
});

export type EventFormValues = z.infer<typeof schema>;

type Props = {
    defaultValues?: EventFormValues;
    onSubmit: (data: EventFormValues) => void;
    onCancel: () => void;
};

export const EventForm = ({ defaultValues, onSubmit, onCancel }: Props) => {
    const roles = useAppState.use.roles();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<EventFormValues>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>{defaultValues ? "Edit" : "Create"} Event</DialogTitle>

            <DialogContent>
                <Stack spacing={2}>
                    <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Title"
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                fullWidth
                            />
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
                                onChange={(newValue) =>
                                    onChange(newValue?.toISOString())
                                }
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
                        name="requiredRoleIds"
                        control={control}
                        defaultValue={new Set<string>()}
                        render={({ field: { onChange, value } }) => (
                            <Box>
                                <InputLabel sx={{ mb: 1 }}>
                                    Required Roles
                                </InputLabel>
                                <Grid container spacing={1}>
                                    {roles.map((role) => {
                                        const onClick = () => {
                                            if (value.has(role.id))
                                                value.delete(role.id);
                                            else value.add(role.id);

                                            onChange(value);
                                        };

                                        return (
                                            <Grid
                                                key={role.id}
                                                size={{ xs: 6, sm: 4 }}
                                            >
                                                <CheckButton
                                                    onClick={onClick}
                                                    selected={value.has(
                                                        role.id,
                                                    )}
                                                    color="primary"
                                                    sx={{
                                                        width: "100%",
                                                        height: "100%",
                                                    }}
                                                >
                                                    {role.name}
                                                </CheckButton>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Box>
                        )}
                    />

                    <Controller
                        name="recurring"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <Box>
                                <FormControlLabel
                                    control={<Checkbox {...field} />}
                                    label="Recurring Event"
                                />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    If enabled, the event will repeat on the
                                    same day of the week every week.
                                </Typography>
                            </Box>
                        )}
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" color="neutral" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!isValid}
                >
                    Save
                </Button>
            </DialogActions>
        </form>
    );
};
