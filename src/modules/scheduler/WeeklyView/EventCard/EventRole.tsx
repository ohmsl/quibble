import { Box, ListItem, ListItemIcon, Select, Typography } from "@mui/material";
import { useState } from "react";
import { RolesRecord } from "../../../../types/pb_types";
import { roleIconMap } from "../../../roles/roleIcons";

type Props = {
    role: RolesRecord;
};

export const EventRole: React.FC<Props> = ({ role }) => {
    const [value, setValue] = useState("none");
    const Icon = roleIconMap[role.icon as keyof typeof roleIconMap];

    return (
        <ListItem
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                "&:first-child": { pt: 0 },
                "&:last-child": { pb: 0 },
            }}
            disableGutters
        >
            <Box display="flex">
                <ListItemIcon>{Icon ? <Icon /> : null}</ListItemIcon>
                <Typography fontWeight="bold">{role.name}</Typography>
            </Box>

            <Select
                size="small"
                error={value === "none"}
                onChange={(e) => setValue(e.target.value)}
                native
            >
                <option value="none">None</option>
                <option value="option1">Ollie Slater</option>
            </Select>
        </ListItem>
    );
};
