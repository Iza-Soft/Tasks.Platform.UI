import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import style from "./style.module.css";
import WorkSpace from "../../../models/WorkSpace";
import { di } from "../../../di-container/container";
import { RgbaColor } from "../../../models/RgbColor";
import { CardService } from "../../../services/card-service";
import { TOKENS } from "../../../di-container/tokens";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export function WorkSpaceCardComponent({
  workspaceItem,
  onDeleteCard,
}: {
  workspaceItem: WorkSpace;
  onDeleteCard: any;
}) {
  const [cardLogo, setCardLogo] = useState<string>();
  const [state, setState] = useState({ displayColorPicker: false });

  // https://casesandberg.github.io/react-color/#api-onChangeComplete
  // https://edupala.com/best-react-color-picker-and-how-to-implement-it/
  const [avatarBgColor, setAvatarBgColor] = useState<string>();
  const [cardBgColor, setCardBgColor] = useState<string>();

  let cardService: CardService = di.Resolver(TOKENS.cardService) as CardService;

  useEffect(() => {
    let splitName = workspaceItem.name.split(" ");
    let logo: string = "";
    splitName.map((item) => {
      logo += item[0].toUpperCase();
    });
    setCardLogo(logo);

    let rgba: RgbaColor = cardService.CalculateHexToRgb(workspaceItem.bgcolor);
    setAvatarBgColor(
      `rgba(${rgba.Red}, ${rgba.Green}, ${rgba.Black}, ${rgba.Alpha})`
    );
    setCardBgColor(
      `rgba(${rgba.Red}, ${rgba.Green}, ${rgba.Black}, ${rgba.Alpha / 10})`
    );
  }, []);

  function handleClick() {
    setState({ displayColorPicker: !state.displayColorPicker });
  }

  function handleClose() {
    setState({ displayColorPicker: false });
  }

  function _onDeleteCard() {
    onDeleteCard(workspaceItem.id);
  }

  const handleChangeBgColor = (newValue: any) => {
    let avatarBgColor = `rgba(${newValue.rgb.r}, ${newValue.rgb.g}, ${newValue.rgb.b}, ${newValue.rgb.a})`;
    let cardBgColor = `rgba(${newValue.rgb.r}, ${newValue.rgb.g}, ${
      newValue.rgb.b
    }, ${newValue.rgb.a / 10})`;
    setAvatarBgColor(avatarBgColor);
    setCardBgColor(cardBgColor);
  };
  return (
    <div className={style.container}>
      <Card
        sx={{
          bgcolor: cardBgColor,
          minWidth: 275,
          minHeight: 275,
          p: 1,
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: avatarBgColor, borderRadius: 2 }}
              aria-label="recipe"
            >
              {cardLogo}
            </Avatar>
          }
          action={
            <Box>
              <Tooltip title="Edit item">
                <IconButton aria-label="settings">
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete item">
                <IconButton aria-label="settings" onClick={_onDeleteCard}>
                  <DeleteOutlineIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Color picker">
                <IconButton aria-label="settings" onClick={handleClick}>
                  <FormatColorFillIcon />
                </IconButton>
              </Tooltip>

              {state.displayColorPicker && (
                <div className={style.popover}>
                  <SketchPicker
                    disableAlpha={true}
                    color={avatarBgColor}
                    onChange={(e) => handleChangeBgColor(e)}
                  />
                </div>
              )}
            </Box>
          }
          title={workspaceItem.name.toUpperCase()}
          subheader={new Date(workspaceItem.created_at).toUTCString()}
        />
        <CardContent>
          <Typography component={"div"} sx={{ ml: 7, mb: 1 }}>
            <Stack direction="row" spacing={1}>
              <Chip
                label={`Not Started: ${workspaceItem.not_started_task_count}`}
                variant="outlined"
                sx={{ width: 150 }}
              />
            </Stack>
          </Typography>
          <Typography component={"div"} sx={{ ml: 7, mb: 1 }}>
            <Stack direction="row" spacing={1}>
              <Chip
                label={`In progress: ${workspaceItem.in_progress_task_count}`}
                variant="outlined"
                sx={{ width: 150 }}
              />
            </Stack>
          </Typography>
          <Typography component={"div"} sx={{ ml: 7, mb: 1 }}>
            <Stack direction="row" spacing={1}>
              <Chip
                label={`Completed: ${workspaceItem.completed_task_count}`}
                variant="outlined"
                sx={{ width: 150 }}
              />
            </Stack>
          </Typography>
          <Typography component={"div"} sx={{ ml: 7, mb: 1 }}>
            <Stack direction="row" spacing={1}>
              <Chip
                label={`Total count: ${workspaceItem.total_task_count}`}
                variant="outlined"
                sx={{ width: 150 }}
              />
            </Stack>
          </Typography>
          <Typography component={"div"} variant="body2" sx={{ mt: 3 }}>
            <LinearProgressWithLabel value={workspaceItem.progress} />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
