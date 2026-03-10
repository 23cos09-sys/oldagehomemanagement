import {
  LayoutDashboard, Users, UserCog, Pill, CalendarDays,
  Heart, Package, BarChart3, LogOut, User
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard, roles: ['admin', 'staff', 'volunteer'] },
  { title: 'Residents', url: '/residents', icon: Users, roles: ['admin', 'staff'] },
  { title: 'Staff', url: '/staff', icon: UserCog, roles: ['admin'] },
  { title: 'Medications', url: '/medications', icon: Pill, roles: ['admin', 'staff'] },
  { title: 'Events', url: '/events', icon: CalendarDays, roles: ['admin', 'staff', 'volunteer'] },
  { title: 'Donations', url: '/donations', icon: Heart, roles: ['admin'] },
  { title: 'Inventory', url: '/inventory', icon: Package, roles: ['admin', 'staff'] },
  { title: 'Reports', url: '/reports', icon: BarChart3, roles: ['admin'] },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const { user, logout } = useAuth();

  const filteredItems = navItems.filter(item =>
    user ? item.roles.includes(user.role) : false
  );

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map(item => {
                const isActive = item.url === '/' ? location.pathname === '/' : location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <NavLink
                            to={item.url}
                            end={item.url === '/'}
                            className="flex items-center gap-3"
                            activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
                          >
                            <item.icon className="h-5 w-5 shrink-0" />
                            {!collapsed && <span className="font-heading text-sm">{item.title}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {collapsed && (
                        <TooltipContent side="right">
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-3">
                  <User className="h-5 w-5 shrink-0" />
                  {!collapsed && (
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-heading truncate">{user?.name}</span>
                      <span className="text-[10px] text-sidebar-foreground/60 capitalize">{user?.role}</span>
                    </div>
                  )}
                </SidebarMenuButton>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">{user?.name}</TooltipContent>}
            </Tooltip>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton onClick={logout} className="flex items-center gap-3">
                  <LogOut className="h-5 w-5 shrink-0" />
                  {!collapsed && <span className="font-heading text-sm">Sign Out</span>}
                </SidebarMenuButton>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">Sign Out</TooltipContent>}
            </Tooltip>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
