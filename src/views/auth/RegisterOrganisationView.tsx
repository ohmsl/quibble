import {
    Box,
    Button,
    Container,
    Divider,
    Stack,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export const RegisterOrganisationView = () => {
    const theme = useTheme();

    const { user, registerOrganisation } = useAuth();
    const [organisationName, setOrganisationName] = useState("");
    const [invitationCode, setInvitationCode] = useState("");

    const handleRegisterOrganisation = () => {
        registerOrganisation(organisationName);
    };

    return (
        <Container maxWidth="sm" sx={{ containerType: "inline-size" }}>
            <Stack spacing={2}>
                <Box>
                    <Typography variant="h5">Hi, {user?.name}</Typography>
                    <Typography variant="subtitle1">
                        You&apos;ll need to create or join an organisation to
                        continue
                    </Typography>
                </Box>

                <Stack
                    gap={2}
                    sx={{
                        flexDirection: "row",
                        [theme.containerQueries.down("xs")]: {
                            flexDirection: "column",
                        },
                    }}
                >
                    <Stack spacing={2}>
                        <TextField
                            label="Congregation Name"
                            value={organisationName}
                            onChange={(e) =>
                                setOrganisationName(e.target.value)
                            }
                        />
                        <Button
                            variant="contained"
                            onClick={handleRegisterOrganisation}
                        >
                            Create
                        </Button>
                    </Stack>

                    <Divider
                        orientation={
                            theme.breakpoints.down("sm")
                                ? "horizontal"
                                : "vertical"
                        }
                        flexItem
                    >
                        <Typography variant="body2">OR</Typography>
                    </Divider>

                    <Stack spacing={2}>
                        <TextField
                            label="Invitation Code"
                            value={invitationCode}
                            onChange={(e) => setInvitationCode(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            onClick={() =>
                                console.log("Organisation registered")
                            }
                        >
                            Join
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    );
};
