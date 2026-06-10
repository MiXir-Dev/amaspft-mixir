import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppRoute } from "@/constants/app.const";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: AppRoute.HOME });
  },
});
