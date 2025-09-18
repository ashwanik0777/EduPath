import React, { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Target,
  TrendingUp,
  Calendar,
  Award,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
  LogOut,
} from "lucide-react";

export type MenuItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  color?: string;
  children?: MenuItem[];
};

interface SidebarProps {
  menuItems: MenuItem[];
  activePage: string;
  onPageChange: (id: string) => void;
  userInfo: { name: string; role: string };
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  activePage,
  onPageChange,
  userInfo,
  onLogout,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleCollapsedItemClick = (item: MenuItem, e: React.MouseEvent) => {
    if (item.children && item.children.length > 0) {
      setExpandedSection(expandedSection === item.id ? null : item.id);
    } else {
      onPageChange(item.id);
    }
  };

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const renderMenuItem = (item: MenuItem) => {
    const IconComponent = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSection === item.id;
    const isActive = activePage === item.id;

    if (sidebarCollapsed) {
      return (
        <button
          key={item.id}
          onClick={(e) => handleCollapsedItemClick(item, e)}
          className={`w-full flex items-center justify-center p-3 text-left transition-colors duration-200 rounded group relative ${
            isActive ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
          title={item.label}
        >
          <IconComponent className={`h-5 w-5 ${isActive ? "text-white" : `${item.color} group-hover:text-white`}`} />
        </button>
      );
    }

    if (hasChildren) {
      return (
        <div key={item.id}>
          <button
            onClick={() => toggleSection(item.id)}
            className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 group"
          >
            <div className="flex items-center">
              <IconComponent className={`h-4 w-4 mr-3 ${item.color} group-hover:text-white`} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            {isExpanded ? (
              <ChevronDown className="h-3 w-3 text-gray-500" />
            ) : (
              <ChevronRightIcon className="h-3 w-3 text-gray-500" />
            )}
          </button>

          {isExpanded && (
            <div className="relative ml-6 mt-1">
              {/* Main vertical line */}
              <div
                className="absolute left-0 top-0 w-px bg-gray-700"
                style={{ height: `${(item.children!.length - 1) * 40 + 20}px` }}
              ></div>

              <div className="space-y-1">
                {item.children?.map((child, index) => {
                  const ChildIcon = child.icon;
                  const isChildActive = activePage === child.id;

                  return (
                    <div key={child.id} className="relative flex items-center">
                      {/* Curved connecting line */}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center">
                        <div className="w-4 h-4 border-l border-b border-gray-700 rounded-bl-lg"></div>
                      </div>

                      <button
                        onClick={() => onPageChange(child.id)}
                        className={`flex items-end pl-6 pr-4 py-2 w-full rounded text-left transition-colors duration-200 ${
                          isChildActive
                            ? "bg-purple-600 text-white"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        <ChildIcon className={`h-4 w-4 mr-3 ${isChildActive ? "text-white" : child.color}`} />
                        <span className="text-sm">{child.label}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => onPageChange(item.id)}
        className={`w-full flex items-center px-4 py-3 text-left transition-colors duration-200 rounded group ${
          isActive ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`}
      >
        <IconComponent className={`h-4 w-4 mr-3 ${isActive ? "text-white" : `${item.color} group-hover:text-white`}`} />
        <span className="text-sm font-medium">{item.label}</span>
      </button>
    );
  };

  return (
    <aside
      className={`${sidebarCollapsed ? "w-16" : "w-72"} bg-gray-900 text-white flex flex-col transition-all duration-300 ease-in-out relative z-40`}
    >
      {/* Header */}
      <div className={`${sidebarCollapsed ? "p-2" : "p-4"} border-b border-gray-800`}>
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-gray-700 rounded-full mr-3">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{userInfo.name}</h3>
                  <p className="text-xs text-gray-400">{userInfo.role}</p>
                </div>
              </div>
              
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto py-4 ${sidebarCollapsed ? "px-1" : "px-2"}`}>
        <div className="space-y-1">{menuItems.map((item) => renderMenuItem(item))}</div>
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-gray-800 p-4">
        {!sidebarCollapsed ? (
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-gray-700 rounded-full mr-3">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{userInfo.name}</h3>
                  <p className="text-xs text-gray-400">{userInfo.role}</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-2 hover:bg-red-600 rounded-lg transition-colors group"
                title="Logout"
              >
                <LogOut className="h-4 w-4 text-gray-400 group-hover:text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="p-2 bg-gray-700 rounded-full">
              <Users className="h-4 w-4 text-white" />
            </div>
            <button
              onClick={onLogout}
              className="p-2 hover:bg-red-600 rounded-lg transition-colors group"
              title="Logout"
            >
              <LogOut className="h-4 w-4 text-gray-400 group-hover:text-white" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
