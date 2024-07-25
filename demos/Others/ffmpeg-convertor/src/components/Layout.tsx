import { ROUTES } from "@/routes/typings";
import { SidebarNav } from "./SlidebarNav";
import { Outlet } from "react-router-dom";
import { Separator } from "@radix-ui/react-separator";
import Header from "./Header";
import { cn } from "@/lib/utils";
const sidebarNavItems = [
  {
    title: "Video to GIF/WEBP",
    href: ROUTES.VIDEO_TO_GW,
  },
  {
    title: "Video to Video",
    href: ROUTES.VIDEO_TO_VIDEO,
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}
// { children }: SettingsLayoutProps
export default function Layout() {
  return (
    <div className={cn("p-12")}>
      <Header />
      <Separator className="my-6 bg-border h-[1px]" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5 ">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
