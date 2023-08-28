import style from "./style.module.css";
import WorkSpace from "../../../models/WorkSpace";
import { WorkSpaceCardComponent } from "../workspace-card/workspace-card";
import { WorkSpaceToolsComponent } from "../workspace-tools/workspace-tools";
import { useRef, useState } from "react";
import { ModalComponent } from "../../modal/modal-box";
import { DialogComponent } from "../../dialog/dialog-box";
import { WorkspaceCreateComponent } from "../workspace-form/workspace-create";
import { Notification, NotificationType } from "../../../models/Notification";
import { NotificationMessageComponent } from "../../notification/notification-message";
import WorkSpaceCreate from "../../../models/WorkSpaceCreate";

import { di } from "../../../di-container/container";
import { TOKENS } from "../../../di-container/tokens";
import { HttpWorkspaceService } from "../../../services/http/http-service";

const methodSigniture = (): any => {
  return;
};

export function WorkSpaceListComponent({
  workspacelist,
  ReloadData,
  onFilterWorkspace,
}: {
  workspacelist: WorkSpace[];
  ReloadData: any;
  onFilterWorkspace: any;
}) {
  const createWorkspace = useRef(methodSigniture);
  const deleteWorkspace = useRef(methodSigniture);
  const [showModal, setShowModal] = useState<boolean>();
  const [notification, setNotification] = useState<Notification>();
  const [id, setId] = useState<number>();

  let http_worspace = di.Resolver(
    TOKENS.httpWorkspaceService
  ) as HttpWorkspaceService;

  function ShowModal(flag: boolean) {
    setShowModal(flag);
  }

  function CloseModal(flag: boolean) {
    setShowModal(flag);
  }

  function _onHandleChangeFilter(workspace_name) {
    onFilterWorkspace(workspace_name);
  }

  function _onDeleteCard(id: number) {
    deleteWorkspace.current();
    setId(id);
  }

  function confirmDelete() {
    http_worspace
      .remove(id as number)
      .then((response) => {
        if (response.status === 200) {
          ReloadData((id as number) * Math.random());
          let notification: Notification = {
            type: NotificationType.SUCCESS,
            message: "Workspace component was deleted successfully.",
          };
          setNotification(notification);
        }
      })
      .catch((e: Error) => {
        let notification: Notification = {
          type: NotificationType.ERROR,
          message: "Something went wrong, workspace component wasn't deleted.",
        };
        setNotification(notification);
      });
  }

  function AcceptAndCloseModal(flag: boolean) {
    let model: WorkSpaceCreate = createWorkspace.current();
    if (model?.isValid) {
      http_worspace
        .create(model)
        .then((response) => {
          if (response.status === 201) {
            ReloadData((response.data.id as number) * Math.random());
            let notification: Notification = {
              type: NotificationType.SUCCESS,
              message: "Workspace component was created successfully.",
            };
            setNotification(notification);
          }
          setShowModal(flag);
        })
        .catch((e: Error) => {
          let notification: Notification = {
            type: NotificationType.ERROR,
            message:
              "Something went wrong, workspace component wasn't created.",
          };
          setNotification(notification);
          setShowModal(flag);
        });
    } else setShowModal(true);
  }

  return (
    <div className={style.container}>
      <WorkSpaceToolsComponent
        onShowModal={ShowModal}
        onHandleChangeFilter={_onHandleChangeFilter}
      />
      <div className={style.table}>
        {workspacelist.map((workspaceItem, index) => (
          <div className={style.cell} key={index}>
            <WorkSpaceCardComponent
              workspaceItem={workspaceItem}
              onDeleteCard={_onDeleteCard}
            />
          </div>
        ))}
      </div>

      <ModalComponent
        show={showModal as boolean}
        options={{
          title: "Create new workspace",
          size: "lg",
          centered: true,
        }}
        component={
          <WorkspaceCreateComponent createWorkspaceFunc={createWorkspace} />
        }
        onCloseModal={CloseModal}
        onAcceptAndCloseModal={AcceptAndCloseModal}
      />

      {notification && <NotificationMessageComponent notific={notification} />}

      <DialogComponent
        onHandleClickOpen={deleteWorkspace}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
