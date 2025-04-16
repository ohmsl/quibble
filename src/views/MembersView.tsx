import { Typography } from '@mui/material';
import { MembersList } from '../modules/members/MembersList';

export const MembersView = () => {
    return (
        <>
            <Typography variant="h5">Members</Typography>
            <MembersList />
        </>
    );
};
