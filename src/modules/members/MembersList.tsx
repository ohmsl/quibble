import { List, ListItem, ListItemText, Paper, Stack } from '@mui/material';
import { useAppState } from '../state/useAppState';

export const MembersList = () => {
    const members = useAppState.use.members();

    return (
        <List component={Stack} spacing={1}>
            {members.map(member => {
                return (
                    <ListItem key={member.name} component={Paper} variant="outlined" sx={{ minHeight: 76, pr: 7 }}>
                        <ListItemText primary={member.name} secondary={`Joined: ${member.created}`} />
                    </ListItem>
                );
            })}
        </List>
    );
};
