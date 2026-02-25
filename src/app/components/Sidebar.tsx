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
          className={`w-full flex items-center justify-center p-3 text-left transition-all duration-300 rounded-full group relative ${
            isActive
              ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-900/40"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
          title={item.label}
        >
          <IconComponent className={`h-5 w-5 transition-transform duration-300 ${isActive ? "text-white scale-105" : `${item.color} group-hover:text-white group-hover:scale-105`}`} />
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
                ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-900/40"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <div className="flex items-center">
              <IconComponent className={`h-4 w-4 mr-3 transition-transform duration-300 ${isActive ? "text-white" : `${item.color} group-hover:text-white group-hover:scale-105`}`} />
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
                className="absolute left-0 top-0 w-px bg-slate-700/70"
                style={{ height: `${(item.children!.length - 1) * 40 + 20}px` }}
              ></div>

              <div className="space-y-1">
                {item.children?.map((child) => {
                  const ChildIcon = child.icon;
                  const isChildActive = activePage === child.id;

                  return (
                    <div key={child.id} className="relative flex items-center">
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center">
                        <div className="w-4 h-4 border-l border-b border-slate-700/70 rounded-bl-lg"></div>
                      </div>

                      <button
                        onClick={() => onPageChange(child.id)}
                        className={`flex items-end pl-6 pr-4 py-2 w-full rounded-full text-left transition-all duration-300 ${
                          isChildActive
                            ? "bg-indigo-600/90 text-white shadow-sm"
                            : "text-slate-400 hover:bg-white/10 hover:text-white"
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
            ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-900/40"
            : "text-slate-300 hover:bg-white/10 hover:text-white"
        }`}
      >
        <IconComponent className={`h-4 w-4 mr-3 transition-transform duration-300 ${isActive ? "text-white" : `${item.color} group-hover:text-white group-hover:scale-105`}`} />
        <span className="text-sm font-medium">{item.label}</span>
      </button>
    );
  };

  return (
    <aside
      className={`${sidebarCollapsed ? "w-20" : "w-[18.5rem]"} my-3 ml-3 mr-2 bg-gradient-to-b from-slate-950/95 via-slate-900/95 to-slate-950/95 text-white flex flex-col transition-all duration-300 ease-in-out relative z-40 h-[calc(100vh-1.5rem)] border border-white/15 shadow-[0_20px_55px_rgba(2,6,23,0.55)] rounded-[2.2rem] overflow-hidden backdrop-blur-xl`}
    >
      <div className={`${sidebarCollapsed ? "p-2" : "p-4"} border-b border-white/10`}>
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center justify-between w-full pr-2">
              <div className="flex items-center">
                <div className="mr-3">
                  {userInfo.profileImage ? (
                    <img
                      src={userInfo.profileImage}
                      alt={userInfo.name}
                      className="h-9 w-9 rounded-full object-cover border border-slate-500"
                    />
                  ) : (
                    <div className="p-2 bg-white/10 rounded-full border border-white/10">
                      <Users className="h-4 w-4 text-slate-100" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white max-w-[150px] truncate">{userInfo.name}</h3>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">{userInfo.role}</p>
                </div>
              </div>

            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2.5 hover:bg-white/10 rounded-full transition-colors border border-white/10"
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      <nav className={`flex-1 overflow-y-auto py-4 ${sidebarCollapsed ? "px-2" : "px-3"}`}>
        <div className="space-y-1">{menuItems.map((item) => renderMenuItem(item))}</div>
      </nav>

      <div className="border-t border-white/10 p-4 bg-gradient-to-t from-white/5 to-transparent">
        {!sidebarCollapsed ? (
          <div className="bg-white/5 rounded-[1.8rem] p-4 border border-white/15 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3">
                  {userInfo.profileImage ? (
                    <img
                      src={userInfo.profileImage}
                      alt={userInfo.name}
                      className="h-8 w-8 rounded-full object-cover border border-slate-500"
                    />
                  ) : (
                    <div className="p-2 bg-white/10 rounded-full border border-white/10">
                      <Users className="h-4 w-4 text-slate-100" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white max-w-[120px] truncate">{userInfo.name}</h3>
                  <p className="text-xs text-slate-400">Signed in</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-2.5 hover:bg-rose-600 rounded-full transition-colors group border border-white/10"
                title="Logout"
              >
                <LogOut className="h-4 w-4 text-slate-400 group-hover:text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            {userInfo.profileImage ? (
              <img
                src={userInfo.profileImage}
                alt={userInfo.name}
                className="h-8 w-8 rounded-full object-cover border border-slate-500"
              />
            ) : (
              <div className="p-2 bg-white/10 rounded-full border border-white/10">
                <Users className="h-4 w-4 text-slate-100" />
              </div>
            )}
            <button
              onClick={onLogout}
              className="p-2.5 hover:bg-rose-600 rounded-full transition-colors group border border-white/10"
              title="Logout"
            >
              <LogOut className="h-4 w-4 text-slate-400 group-hover:text-white" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
