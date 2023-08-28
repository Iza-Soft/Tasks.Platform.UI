import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import style from "./style.module.css";

export function WorkSpaceToolsComponent({
  onShowModal,
  onHandleChangeFilter,
}: {
  onShowModal: any;
  onHandleChangeFilter: any;
}) {
  const onShowModal_ = (flag: boolean) => {
    onShowModal(flag);
  };

  function _onHandleChangeFilter(event) {
    onHandleChangeFilter(event.target.value);
  }
  return (
    <div className={style.container}>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <TextField
          sx={{ width: "50ch" }}
          id="input-with-icon-textfield"
          label="Search field"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
          onChange={_onHandleChangeFilter}
        />
        <div className={style.icons}>
          <Tooltip title="Create new items">
            <IconButton onClick={() => onShowModal_(true)}>
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sort items by">
            <IconButton>
              <SortOutlinedIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Box>
    </div>
  );
}
