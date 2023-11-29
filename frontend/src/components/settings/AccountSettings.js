import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import PopUp from './PopUp'; // Ensure the path to PopUp is correct
import { Button, Stack } from "react-bootstrap";

function AccountSettings({ setShowAccountSettings }) {
    const { user, deleteAccount } = useContext(AuthContext);
    const [passwordPopUp, setPasswordPopUp] = useState(false);

    const backButtonStyle = {
        background: 'none',
        color: 'inherit',
        border: 'none',
        padding: '0',
        font: 'inherit',
        cursor: 'pointer',
        outline: 'inherit',
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <div>
            <Stack gap={2} className="col-md-20 mx-auto">
            <button style={backButtonStyle} onClick={() => setShowAccountSettings(false)}>
                <i className="bi bi-arrow-left"></i> Back to Settings
            </button>
                
                <Button variant="primary" onClick={() => setPasswordPopUp(true)}>
                    Edit Password
                </Button>
                <Button variant="danger" onClick={() => deleteAccount(user._id)}>
                    Delete Account
                </Button>
                {passwordPopUp && (
                    <PopUp
                        userId={user._id}
                        trigger={passwordPopUp}
                        setTrigger={setPasswordPopUp}
                    />
                )}
            </Stack>
           
        </div>
    );
}

export default AccountSettings;