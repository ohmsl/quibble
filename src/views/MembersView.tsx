import { MembersList } from '../modules/members/MembersList';
import { MembersToolbar } from '../modules/members/MembersToolbar';

export const MembersView = () => {
    return (
        <>
            <MembersToolbar />
            <MembersList />
        </>
    );
};
