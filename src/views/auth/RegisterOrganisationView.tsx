import { useState } from 'react';

export const RegisterOrganisationView = () => {
    const [organisationName, setOrganisationName] = useState('');

    return (
        <div>
            <h1>Register Organisation</h1>
            <input type="text" value={organisationName} onChange={e => setOrganisationName(e.target.value)} />
            <button onClick={() => console.log('Organisation registered')}>Register</button>
        </div>
    );
};
