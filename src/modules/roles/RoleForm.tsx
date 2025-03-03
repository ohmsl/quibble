import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { IconPicker } from "./IconPicker";
import { roleIconMap } from "./roleIcons";

const icons = Object.entries(roleIconMap).map(([name, Icon]) => ({
    name: name as keyof typeof roleIconMap,
    Icon,
}));

const schema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    description: z.string().optional(),
    icon: z.custom<keyof typeof roleIconMap>(),
    minAssignments: z.number().min(0, "Minimum assignments must be at least 0"),
    maxAssignments: z.number().min(1, "Maximum assignments must be at least 1"),
});

export type RoleFormValues = z.infer<typeof schema>;

type Props = {
    defaultValues?: Partial<RoleFormValues>;
    onSubmit: (data: RoleFormValues) => void;
    onClose: () => void;
};

export const RoleForm: React.FC<Props> = ({
    defaultValues,
    onSubmit,
    onClose,
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RoleFormValues>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues,
    });

    return (
        <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ height: "100%" }}
        >
            <DialogTitle>{defaultValues ? "Edit" : "Create"} Role</DialogTitle>

            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    overflowY: "visible",
                    gap: 2,
                }}
            >
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Title"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            fullWidth
                        />
                    )}
                />

                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Description"
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            minRows={3}
                            multiline
                            fullWidth
                        />
                    )}
                />

                <Stack direction="row" spacing={2}>
                    <Controller
                        name="minAssignments"
                        control={control}
                        defaultValue={0}
                        render={({ field: { onChange, ...field } }) => (
                            <TextField
                                {...field}
                                onChange={(e) =>
                                    onChange(Number(e.target.value))
                                }
                                label="Minimum Assignments"
                                error={!!errors.minAssignments}
                                helperText={errors.minAssignments?.message}
                                type="number"
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="maxAssignments"
                        control={control}
                        defaultValue={1}
                        render={({ field: { onChange, ...field } }) => (
                            <TextField
                                {...field}
                                onChange={(e) => {
                                    onChange(Number(e.target.value));
                                }}
                                label="Maximum Assignments"
                                error={!!errors.maxAssignments}
                                helperText={errors.maxAssignments?.message}
                                type="number"
                                fullWidth
                            />
                        )}
                    />
                </Stack>

                <Controller
                    name="icon"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                        const onSelectIcon = (
                            icon: keyof typeof roleIconMap,
                        ) => {
                            console.log(icon);
                            onChange(icon);
                        };

                        return (
                            <>
                                <IconPicker
                                    icons={icons}
                                    onChange={onSelectIcon}
                                    value={value}
                                />
                                {errors.icon?.message && (
                                    <Typography variant="body2" color="error">
                                        {errors.icon?.message}
                                    </Typography>
                                )}
                            </>
                        );
                    }}
                />
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" color="neutral" onClick={onClose}>
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
        </Stack>
    );
};
