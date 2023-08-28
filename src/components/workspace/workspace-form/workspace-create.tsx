import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AbcIcon from "@mui/icons-material/Abc";
import InputAdornment from "@mui/material/InputAdornment";
import { useEffect, useRef, useState } from "react";

import WorkSpaceCreate from "../../../models/WorkSpaceCreate";

export function WorkspaceCreateComponent({ createWorkspaceFunc }) {
  const valueRef = useRef(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    createWorkspaceFunc.current = GetAndValidateWorkspaceData;
  }, []);

  function handleChange() {
    if (valueRef.current && valueRef.current["value"] !== "") {
      setError(false);
    } else {
      setError(true);
    }
  }

  function GetAndValidateWorkspaceData(): WorkSpaceCreate {
    let value: string | undefined = undefined;
    if (valueRef.current) {
      value =
        (valueRef.current["value"] as string).trim() !== ""
          ? valueRef.current["value"]
          : undefined;
    }
    if (!value) {
      setError(true);
    }
    return { name: value, isValid: value ? true : false };
  }
  return (
    <div>
      <Box sx={{ padding: "20px" }}>
        <TextField
          inputRef={valueRef}
          sx={{ width: "100%" }}
          id="input-with-icon-textfield"
          label="Enter worspace name"
          variant="standard"
          required
          error={error}
          helperText={error ? "The field is required" : ""}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AbcIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
        />
      </Box>
    </div>
  );
}
