import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid2 as Grid,
    InputLabel,
    TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { CheckButton } from "../../../components/CheckButton";
import { Role } from "../../../types/Role";
import { useAppState } from "../../state/useAppState";

const schema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters long"),
    date: z.string().datetime(),
    requiredRoles: z.array(z.custom<Role>()),
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
                            margin="dense"
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
                                    margin: "dense",
                                    fullWidth: true,
                                },
                            }}
                        />
                    )}
                />

                <InputLabel sx={{ mt: 2, mb: 1 }}>Required Roles</InputLabel>
                <Controller
                    name="requiredRoles"
                    control={control}
                    defaultValue={[]}
                    render={({ field: { onChange, value } }) => (
                        <Grid container spacing={1}>
                            {roles.map((role) => (
                                <Grid key={role.name} size={{ xs: 6, sm: 4 }}>
                                    <CheckButton
                                        selected
                                        color="primary"
                                        sx={{ width: "100%" }}
                                    >
                                        {role.name}
                                    </CheckButton>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                />
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
