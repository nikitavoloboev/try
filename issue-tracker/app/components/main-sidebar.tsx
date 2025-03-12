"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar"
import { useRouter } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router"
import {
  AlertTriangle,
  Clock,
  FileText,
  Folder,
  Home,
  Settings,
  User,
  Users,
} from "lucide-react"

export function MainSidebar() {
  const router = useRouter()
  const pathname = router.state.location.pathname

  // Determine the current context based on the URL
  const isTeamContext =
    pathname.includes("/teams/") && !pathname.includes("/projects/")
  const isProjectContext =
    pathname.includes("/projects/") && !pathname.includes("/issues/")
  const isIssueContext = pathname.includes("/issues/")

  // Extract IDs from the URL
  const teamIdMatch = pathname.match(/\/teams\/([^/]+)/)
  const teamId = teamIdMatch ? teamIdMatch[1] : null

  const projectIdMatch = pathname.match(/\/projects\/([^/]+)/)
  const projectId = projectIdMatch ? projectIdMatch[1] : null

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"}>
              <Link to="/">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/teams"}>
              <Link to="/teams">
                <Users className="h-4 w-4" />
                <span>Teams</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Global Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/profile"}>
                  <Link to="/profile">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/settings"}>
                  <Link to="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Team Context */}
        {isTeamContext && teamId && (
          <SidebarGroup>
            <SidebarGroupLabel>Team</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/teams/${teamId}`}
                  >
                    <Link to="/teams/$teamId" params={{ teamId }}>
                      <Users className="h-4 w-4" />
                      <span>Overview</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/teams/${teamId}/projects`}
                  >
                    <Link to="/teams/$teamId/projects" params={{ teamId }}>
                      <Folder className="h-4 w-4" />
                      <span>Projects</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/teams/$teamId" params={{ teamId }}>
                      <Settings className="h-4 w-4" />
                      <span>Team Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Project Context */}
        {isProjectContext && teamId && projectId && (
          <SidebarGroup>
            <SidebarGroupLabel>Project</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname === `/teams/${teamId}/projects/${projectId}`
                    }
                  >
                    <Link
                      to="/teams/$teamId/projects/$projectId"
                      params={{ teamId, projectId }}
                    >
                      <Folder className="h-4 w-4" />
                      <span>Overview</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname ===
                      `/teams/${teamId}/projects/${projectId}/issues`
                    }
                  >
                    <Link
                      to="/teams/$teamId/projects/$projectId/issues"
                      params={{ teamId, projectId }}
                    >
                      <FileText className="h-4 w-4" />
                      <span>Issues</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/teams/$teamId/projects/$projectId"
                      params={{ teamId, projectId }}
                    >
                      <Settings className="h-4 w-4" />
                      <span>Project Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Issue Context */}
        {isIssueContext && teamId && projectId && (
          <SidebarGroup>
            <SidebarGroupLabel>Quick Filters</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/teams/$teamId/projects/$projectId/issues"
                      params={{ teamId, projectId }}
                    >
                      <User className="h-4 w-4" />
                      <span>My Issues</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/teams/$teamId/projects/$projectId/issues"
                      params={{ teamId, projectId }}
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <span>Critical</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/teams/$teamId/projects/$projectId/issues"
                      params={{ teamId, projectId }}
                    >
                      <Clock className="h-4 w-4" />
                      <span>Due Soon</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
