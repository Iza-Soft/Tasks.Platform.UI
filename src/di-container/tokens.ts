import { token } from "brandi";
import { CardService } from "../services/card-service";
import { HttpWorkspaceService } from "../services/http/http-service";
export const TOKENS = {
  cardService: token<CardService>("cardService"),
  httpWorkspaceService: token<HttpWorkspaceService>("httpWorkspaceService"),
};
