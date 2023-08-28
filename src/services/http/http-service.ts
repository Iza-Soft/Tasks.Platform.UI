import { EndPoints } from "../../models/HttpEndPoint";
import http from "./http-common";

export class HttpWorkspaceService {
  public getAll = () => {
    return http.get<Array<any>>(EndPoints.workspace.base);
  };

  public getById = (id: number) => {
    return http.get<any>(`${EndPoints.workspace.base}${id}`);
  };

  public update = (data: any) => {
    return http.put<any>(`${EndPoints.workspace.base}${data.id}`, data);
  };

  public remove = (id: number) => {
    return http.delete<any>(`${EndPoints.workspace.base}${id}/`);
  };

  public create = (data: any) => {
    return http.post<any>(EndPoints.workspace.base, data);
  };
}
