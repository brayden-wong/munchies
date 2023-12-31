import { Public, ROUTES, CurrentUser } from "@/utils";
import { Controller, Get, Inject, Res, UseGuards } from "@nestjs/common";
import { DiscordOAuthGuard } from "./discord.oauth.guard";
import { DiscordProfile } from "./discord.types";
import { DiscordService } from "./discord.service";
import { type Response } from "express";
import { ConfigService } from "@nestjs/config";

@Controller(ROUTES.DISCORD)
export class DiscordController {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
    private readonly discordService: DiscordService,
  ) {}

  @Public()
  @UseGuards(DiscordOAuthGuard)
  @Get()
  async discordLogin() {
    return { message: "login" };
  }

  @Public()
  @UseGuards(DiscordOAuthGuard)
  @Get("callback")
  async callback(@Res() res: Response, @CurrentUser() user: DiscordProfile) {
    const result = await this.discordService.createProfile(user);

    const queryParams = `?at=${result.auth.at}&rt=${result.auth.rt}&id=${result.auth.session.userId}`;

    return res
      .status(200)
      .redirect(
        `${this.config.get("APP_URL")}/--/screens/login/login${queryParams}`,
      );
  }
}
