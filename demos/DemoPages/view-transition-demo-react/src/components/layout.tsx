// import { ROUTESMAP } from "@/router/const";
import {Outlet } from "react-router-dom";


// const sidebarNavItems = [
//     {
//         title: "Home",
//         href: ROUTESMAP.HOME,
//     },
//     {
//         title: "Detail",
//         href: ROUTESMAP.DETAIL,
//     },
// ];

// interface SettingsLayoutProps {
//     children: React.ReactNode;
// }
// { children }: SettingsLayoutProps

export default function Layout() {
  
    return (
        <div className="container mx-auto">

            <div className="p-6">
                <Outlet />
            </div>
        </div>
    );
}