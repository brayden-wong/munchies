import { STRATEGIES } from "@/utils";
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class RtGuard extends AuthGuard(STRATEGIES.RT) {
  constructor() {
    super();
  }
}