import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import PopUp from "./PopUp";
import { Container, Button, Stack } from "react-bootstrap";

function AccountSettings({ setShowAccountSettings }) {
  const { user, deleteAccount } = useContext(AuthContext);
  const [passwordPopUp, setPasswordPopUp] = useState(false);
  const [showEditAndDeleteButton, setShowEditAndDeleteButton] = useState(true);

  const backButtonStyle = {
    background: "none",
    color: "inherit",
    border: "none",
    padding: "0",
    font: "inherit",
    cursor: "pointer",
    outline: "inherit",
    display: "flex",
    alignItems: "center",
  };

  return (
    <Container>
      <Stack gap={2} className="col-md-20 mx-auto align-items-center">
        <button
          style={backButtonStyle}
          onClick={() => setShowAccountSettings(false)}
        >
          <i className="bi bi-arrow-left"></i> Back to Settings
        </button>

        <Button
          variant="primary"
          onClick={() => {
            setPasswordPopUp(true);
            setShowEditAndDeleteButton(false);
          }}
          style={{
            display: showEditAndDeleteButton ? "block" : "none",
          }}
        >
          Edit Password
        </Button>
        <Button
          variant="danger"
          onClick={() => deleteAccount(user._id)}
          style={{
            display: showEditAndDeleteButton ? "block" : "none",
          }}
        >
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
    </Container>
  );
}

export default AccountSettings;
