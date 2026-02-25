import React, { useState } from "react";
import {
  Users,
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
  userInfo: { name: string; role: string; profileImage?: string };
  onLogout: () => void;
  onProfileClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  activePage,
  onPageChange,
  userInfo,
  onLogout,
  onProfileClick,
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
    const isChildActive = hasChildren ? item.children?.some((child) => child.id === activePage) : false;
    const isActive = activePage === item.id || Boolean(isChildActive);

    if (sidebarCollapsed) {
      return (
        <button
          key={item.id}
          onClick={(e) => handleCollapsedItemClick(item, e)}
          className={`w-full flex items-center justify-center p-3 text-left transition-all duration-300 rounded-full group relative ${
            isActive
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
              : "text-slate-600 hover:bg-indigo-50 hover:text-slate-900"
          }`}
          title={item.label}
        >
          <IconComponent className={`h-5 w-5 transition-transform duration-300 ${isActive ? "text-white scale-105" : `${item.color} group-hover:scale-105`}`} />
        </button>
      );
    }

    if (hasChildren) {
      return (
        <div key={item.id}>
          <button
            onClick={() => toggleSection(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-full transition-all duration-300 group ${
              isActive
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                : "text-slate-600 hover:bg-indigo-50 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center">
              <IconComponent className={`h-4 w-4 mr-3 transition-transform duration-300 ${isActive ? "text-white" : `${item.color} group-hover:scale-105`}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            {isExpanded ? (
              <ChevronDown className={`h-3 w-3 transition-colors ${isActive ? "text-white" : "text-slate-500"}`} />
            ) : (
              <ChevronRightIcon className={`h-3 w-3 transition-colors ${isActive ? "text-white" : "text-slate-500"}`} />
            )}
          </button>

          {isExpanded && (
            <div className="relative ml-6 mt-2 animate-in fade-in-0 slide-in-from-top-1 duration-200">
              <div
                className="absolute left-0 top-0 w-px bg-slate-300"
                style={{ height: `${(item.children!.length - 1) * 40 + 20}px` }}
              ></div>

              <div className="space-y-1">
                {item.children?.map((child) => {
                  const ChildIcon = child.icon;
                  const isChildActive = activePage === child.id;

                  return (
                    <div key={child.id} className="relative flex items-center">
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center">
                        <div className="w-4 h-4 border-l border-b border-slate-300 rounded-bl-lg"></div>
                      </div>

                      <button
                        onClick={() => onPageChange(child.id)}
                        className={`flex items-end pl-6 pr-4 py-2 w-full rounded-full text-left transition-all duration-300 ${
                          isChildActive
                            ? "bg-indigo-600/90 text-white shadow-sm"
                            : "text-slate-500 hover:bg-indigo-50 hover:text-slate-900"
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
        className={`w-full flex items-center px-4 py-3 text-left transition-all duration-300 rounded-full group ${
          isActive
            ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
            : "text-slate-600 hover:bg-indigo-50 hover:text-slate-900"
        }`}
      >
        <IconComponent className={`h-4 w-4 mr-3 transition-transform duration-300 ${isActive ? "text-white" : `${item.color} group-hover:scale-105`}`} />
        <span className="text-sm font-medium">{item.label}</span>
      </button>
    );
  };

  return (
    <aside
      className={`${sidebarCollapsed ? "w-20" : "w-[18.5rem]"} my-3 ml-3 mr-2 bg-white/55 text-slate-900 flex flex-col transition-all duration-300 ease-in-out relative z-40 h-[calc(100vh-1.5rem)] border border-slate-200/80 shadow-[0_20px_55px_rgba(99,102,241,0.12)] rounded-[2.2rem] overflow-hidden backdrop-blur-xl`}
    >
      <div className={`${sidebarCollapsed ? "p-2" : "p-4"} border-b border-slate-200/80`}>
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center justify-between w-full pr-2">
              <div className="flex items-center">
                <div className="mr-3">
                  {userInfo.profileImage ? (
                    <img
                      src={userInfo.profileImage}
                      alt={userInfo.name}
                      className="h-9 w-9 rounded-full object-cover border border-slate-300"
                    />
                  ) : (
                    <div className="p-2 bg-indigo-50 rounded-full border border-indigo-100">
                      <Users className="h-4 w-4 text-indigo-600" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 max-w-[150px] truncate">{userInfo.name}</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">{userInfo.role}</p>
                </div>
              </div>

            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2.5 hover:bg-indigo-50 rounded-full transition-colors border border-slate-200"
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4 text-slate-500" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-slate-500" />
            )}
          </button>
        </div>
      </div>

      <nav className={`flex-1 overflow-y-auto py-4 ${sidebarCollapsed ? "px-2" : "px-3"}`}>
        <div className="space-y-1">{menuItems.map((item) => renderMenuItem(item))}</div>
      </nav>

      <div className="border-t border-slate-200/80 p-4 bg-white/50">
        {!sidebarCollapsed ? (
          <div className="bg-white/80 rounded-[1.8rem] p-4 border border-slate-200 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  if (onProfileClick) onProfileClick();
                }}
                className="flex items-center rounded-2xl px-1 py-1 transition-colors hover:bg-indigo-50"
                title="Open profile"
              >
                <div className="mr-3">
                  {userInfo.profileImage ? (
                    <img
                      src={userInfo.profileImage}
                      alt={userInfo.name}
                      className="h-8 w-8 rounded-full object-cover border border-slate-300"
                    />
                  ) : (
                    <div className="p-2 bg-indigo-50 rounded-full border border-indigo-100">
                      <Users className="h-4 w-4 text-indigo-600" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-900 max-w-[120px] truncate">{userInfo.name}</h3>
                  <p className="text-xs text-slate-500">Signed in</p>
                </div>
              </button>
              <button
                onClick={onLogout}
                className="p-2.5 hover:bg-rose-600 rounded-full transition-colors group border border-slate-200"
                title="Logout"
              >
                <LogOut className="h-4 w-4 text-slate-500 group-hover:text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <button
              type="button"
              onClick={() => {
                if (onProfileClick) onProfileClick();
              }}
              className="rounded-full transition-transform hover:scale-105"
              title="Open profile"
            >
              {userInfo.profileImage ? (
                <img
                  src={userInfo.profileImage}
                  alt={userInfo.name}
                  className="h-8 w-8 rounded-full object-cover border border-slate-300"
                />
              ) : (
                <div className="p-2 bg-indigo-50 rounded-full border border-indigo-100">
                  <Users className="h-4 w-4 text-indigo-600" />
                </div>
              )}
            </button>
            <button
              onClick={onLogout}
              className="p-2.5 hover:bg-rose-600 rounded-full transition-colors group border border-slate-200"
              title="Logout"
            >
              <LogOut className="h-4 w-4 text-slate-500 group-hover:text-white" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
