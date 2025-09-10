"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import Link from "next/link";
import {
  User,
  GraduationCap,
  FileText,
  BookOpen,
  Home,
  Camera,
  Briefcase,
  Users,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  LucideIcon,
  Calendar,
} from "lucide-react";

// Types
type NavItem = {
  slug: string;
  label: string;
  isExternal?: boolean;
};

type NavMenu = {
  key: string;
  label: string;
  icon: LucideIcon;
  baseRoute?: string;
  items?: NavItem[];
  directPath?: string;
};

type DropdownMenuItemProps = {
  item: NavItem;
  baseRoute?: string;
  onClick?: () => void;
};

type DropdownMenuProps = {
  items: NavItem[];
  baseRoute: string;
  onItemClick?: () => void;
};

type DesktopMenuItemProps = {
  menu: NavMenu;
  isActive: boolean;
  onToggle: (key: string) => void;
  menuRef: (ref: HTMLLIElement | null) => void;
  onMenuClose: () => void;
};

type MobileMenuItemProps = {
  menu: NavMenu;
  isExpanded: boolean;
  onToggle: () => void;
  onSubmenuToggle: (key: string) => void;
};

type MenuIconProps = {
  icon: LucideIcon;
  size?: number;
};

// Navigation configuration data
const NAVIGATION_CONFIG: NavMenu[] = [
  {
    key: "nss-home",
    label: "Home",
    icon: Home,
    directPath: "/",
  },
  {
    key: "about-nss",
    label: "About NSS",
    icon: User,
    directPath: "/AboutNSS",
  },
  {
    key: "whos-who",
    label: "Who's Who",
    icon: Users,
    directPath: "/Who'sWho",
  },
  {
    key: "nss-news",
    label: "News",
    icon: FileText,
    directPath: "News",
  },
  {
    key: "nss-events",
    label: "Events",
    icon: Calendar,
    directPath: "/Events",
  },
  {
    key: "nss-gallery",
    label: "Photogallery",
    icon: Camera,
    directPath: "/PhotoGallery",
  },
];


// Custom hooks for navbar functionality
const useScrollDetection = (): boolean => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolled;
};

const useDropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRefs = useRef<Map<string, HTMLLIElement | null>>(new Map());

  const toggleMenu = (menuKey: string) => {
    setActiveMenu(prev => (prev === menuKey ? null : menuKey));
  };

  const closeMenu = () => setActiveMenu(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isInsideMenu = Array.from(menuRefs.current.values())
        .some(ref => ref?.contains(event.target as Node));

      if (!isInsideMenu) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    activeMenu,
    toggleMenu,
    closeMenu,
    menuRefs,
  };
};

const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [expandedSubmenus, setExpandedSubmenus] = useState<Set<string>>(new Set());

  const toggle = () => setIsOpen(prev => !prev);
  const close = () => setIsOpen(false);

  const toggleSubmenu = (menuKey: string) => {
    setExpandedSubmenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(menuKey)) {
        newSet.delete(menuKey);
      } else {
        newSet.add(menuKey);
      }
      return newSet;
    });
  };

  return {
    isOpen,
    toggle,
    close,
    expandedSubmenus,
    toggleSubmenu,
  };
};

// UI Components
const MenuIcon: React.FC<MenuIconProps> = ({ icon: Icon, size = 16 }) => <Icon size={size} />;

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ item, baseRoute, onClick }) => {
  if (item.isExternal) {
    return (
      <a
        href={item.slug}
        target="_blank"
        rel="noopener noreferrer"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        onClick={onClick}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link
      href={`${baseRoute}/${item.slug}`}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
      onClick={onClick}
    >
      {item.label}
    </Link>
  );
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, baseRoute, onItemClick }) => (
  <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
    {items.map((item, index) => (
      <DropdownMenuItem
        key={`${item.slug}-${index}`}
        item={item}
        baseRoute={baseRoute}
        onClick={onItemClick}
      />
    ))}
  </div>
);

const DesktopMenuItem: React.FC<DesktopMenuItemProps> = ({
  menu,
  isActive,
  onToggle,
  menuRef,
  onMenuClose,
}) => {
  if (menu.directPath) {
    return (
      <li>
        <Link
          href={menu.directPath}
          className="flex items-center gap-1 hover:text-blue-600 text-gray-700 px-3 py-2 text-sm font-medium transition-colors"
        >
          <MenuIcon icon={menu.icon} />
          {menu.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="relative" ref={menuRef} aria-haspopup="true">
      <button
        onClick={() => onToggle(menu.key)}
        className="flex items-center gap-1 hover:text-blue-600 text-gray-700 px-3 py-2 text-sm font-medium transition-colors"
        aria-expanded={isActive}
      >
        <MenuIcon icon={menu.icon} />
        {menu.label}
        {isActive ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {isActive && menu.items && menu.baseRoute && (
        <DropdownMenu
          items={menu.items}
          baseRoute={menu.baseRoute}
          onItemClick={onMenuClose}
        />
      )}
    </li>
  );
};

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({
  menu,
  isExpanded,
  onToggle,
  onSubmenuToggle,
}) => {
  if (menu.directPath) {
    return (
      <Link
        href={menu.directPath}
        className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        onClick={onToggle}
      >
        <span className="flex items-center gap-2">
          <MenuIcon icon={menu.icon} />
          {menu.label}
        </span>
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => onSubmenuToggle(menu.key)}
        className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <span className="flex items-center gap-2">
          <MenuIcon icon={menu.icon} />
          {menu.label}
        </span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isExpanded && menu.items && menu.baseRoute && (
        <div className="bg-gray-50">
          {menu.items.map((item, index) => (
            <DropdownMenuItem
              key={`mobile-${item.slug}-${index}`}
              item={item}
              baseRoute={menu.baseRoute}
              onClick={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Navbar Component
const Navbar: React.FC = () => {
  const isScrolled = useScrollDetection();
  const { activeMenu, toggleMenu, closeMenu, menuRefs } = useDropdownMenu();
  const { isOpen: isMobileOpen, toggle: toggleMobile, close: closeMobile, expandedSubmenus, toggleSubmenu } = useMobileMenu();

  // Memoize navigation items to prevent unnecessary re-renders
  const navigationItems = useMemo<NavMenu[]>(() => NAVIGATION_CONFIG, []);

  const setMenuRef = (menuKey: string, ref: HTMLLIElement | null) => {
    if (ref) {
      menuRefs.current.set(menuKey, ref);
    } else {
      menuRefs.current.delete(menuKey);
    }
  };

  return (
      <nav
        className={`w-full z-40 bg-white transition-all duration-300 ${isScrolled ? "shadow-md" : "shadow"
          }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="px-4 md:px-">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center" aria-label="GBU Home">
              <img
                src="/logo.svg"
                alt="GBU Logo"
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <ul className="flex items-center space-x-1">
                {navigationItems.map((menu) => (
                  <DesktopMenuItem
                    key={menu.key}
                    menu={menu}
                    isActive={activeMenu === menu.key}
                    onToggle={toggleMenu}
                    menuRef={(ref) => setMenuRef(menu.key, ref)}
                    onMenuClose={closeMenu}
                  />
                ))}
              </ul>
              <button>
                <Link
                  href="/login"
                  className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors"
                >
                  Login
                </Link>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobile}
              className="lg:hidden p-2 text-gray-700 transition-colors"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileOpen && (
            <div className="lg:hidden border-t border-gray-200">
              <div className="py-2">
                {navigationItems.map((menu) => (
                  <MobileMenuItem
                    key={menu.key}
                    menu={menu}
                    isExpanded={expandedSubmenus.has(menu.key)}
                    onToggle={closeMobile}
                    onSubmenuToggle={toggleSubmenu}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
  );
};

export default Navbar;
