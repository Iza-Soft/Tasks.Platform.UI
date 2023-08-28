import { useEffect, useState } from "react";
import style from "./style.module.css";
import { AxiosError } from "axios";
import LinearProgress from "@mui/material/LinearProgress";

import { di } from "./di-container/container";
import { TOKENS } from "./di-container/tokens";
import { WorkSpaceListComponent } from "./components/workspace/workspace-list/workspace-list";
import { NotificationMessageComponent } from "./components/notification/notification-message";
import WorkSpace from "./models/WorkSpace";
import { Notification, NotificationType } from "./models/Notification";
import { HttpWorkspaceService } from "./services/http/http-service";

// https://react.dev/reference/react/Component#usage - How realy have to work with components
export function App() {
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState<boolean>(progress < 100);
  const [workSpaceList, setWorkSpaceList] = useState<WorkSpace[]>();
  const [notification, setNotification] = useState<Notification>();
  const [workspaceName, setWorkspaceName] = useState<string>();
  const [id, setId] = useState<number | undefined>(undefined);

  let http_worspace = di.Resolver(
    TOKENS.httpWorkspaceService
  ) as HttpWorkspaceService;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(undefined);
          setShowProgress(false);
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 290);

    http_worspace
      .getAll()
      .then((responce: any) => {
        let workSpaceList: WorkSpace[] = responce.data as WorkSpace[];

        if (workspaceName && workspaceName !== "") {
          workSpaceList = workSpaceList.filter((item) =>
            item.name.includes(workspaceName.toLocaleLowerCase())
          );
        }

        setWorkSpaceList(workSpaceList);
        setShowProgress(false);
        clearInterval(timer);
      })
      .catch((e: AxiosError) => {
        let notification: Notification = {
          type: NotificationType.ERROR,
          message: e.message,
        };
        setNotification(notification);
        clearInterval(timer);
        setShowProgress(false);
        console.log(e);
      });
  }, [id]);

  const ReloadData = (id: number) => {
    setId(id);
  };

  function _onFilterWorkspace(workspace_name) {
    setWorkspaceName(workspace_name);
    ReloadData(Math.random());
  }

  return (
    <div className={style.main_container}>
      <div className={style.header}>
        <div className="row">
          <div className="col-4">
            <div></div>
          </div>
          <div className="col-md-12 col-lg-4"></div>
        </div>
      </div>
      <div className={style.body}>
        {showProgress && (
          <LinearProgress
            variant="determinate"
            sx={{
              backgroundColor: "rgb(222, 159, 22, 0.5)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "rgb(222, 159, 22, 1)",
              },
            }}
            value={progress}
          />
        )}
        {workSpaceList && (
          <WorkSpaceListComponent
            workspacelist={workSpaceList}
            ReloadData={ReloadData}
            onFilterWorkspace={_onFilterWorkspace}
          />
        )}
      </div>

      <div className={style.footer}>
        <p>&copy; 2023 by Ripi Soft. All Rights Reserved.</p>
      </div>

      {notification && <NotificationMessageComponent notific={notification} />}
    </div>
  );
}
