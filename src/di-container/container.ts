import { createContainer, Container } from "brandi";
import { CardService } from "../services/card-service";
import { useInjection } from "brandi-react";
import { TOKENS } from "./tokens";
import { TokenValue } from "brandi";
import { HttpWorkspaceService } from "../services/http/http-service";

function Register(): Container {
  const container = createContainer();

  container.bind(TOKENS.cardService).toInstance(CardService).inTransientScope();
  container
    .bind(TOKENS.httpWorkspaceService)
    .toInstance(HttpWorkspaceService)
    .inTransientScope();

  return container;
}

function Resolver<T extends TokenValue<unknown>>(token: T): any {
  const obj = useInjection(token);

  return obj;
}

// https://brandi.js.org/brandi-react
export const di = {
  Register,
  Resolver,
};
