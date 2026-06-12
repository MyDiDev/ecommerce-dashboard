import { Outlet, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faBoxes,
  faShoppingCart,
  faChartBar,
  faCog,
  faUserFriends,
  faChevronDown,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function AppLayout() {
  const location = useLocation();
  const navItems = [
    { name: "Overview", icon: faChartBar, path: "/" },
    { name: "Products", icon: faBoxes, path: "/products" },
    { name: "Orders", icon: faShoppingCart, path: "/orders" },
    { name: "Customers", icon: faUserFriends, path: "/customers" },
  ];

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === "/") return "Overview";
    return path.substring(1).charAt(0).toUpperCase() + path.substring(2);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] text-[var(--color-text-main)] font-sans flex">
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen w-64 glass-panel border-r border-[var(--color-border-main)] z-40 hidden md:flex flex-col"
      >
        <div className="h-16 flex items-center px-6 border-b border-[var(--color-border-main)] cursor-pointer hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-glow mr-3">
            <FontAwesomeIcon
              icon={faLayerGroup}
              className="text-white text-xs"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-white tracking-tight">
              Acme Corp
            </h2>
            <p className="text-[10px] text-[var(--color-text-muted)] font-medium">
              Production
            </p>
          </div>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-[var(--color-text-muted)] text-xs"
          />
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto hide-scrollbar">
          <p className="px-3 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-3">
            Main Menu
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden ${
                  isActive
                    ? "text-white bg-[var(--color-bg-elevated)] shadow-sm border border-[var(--color-border-subtle)]"
                    : "text-[var(--color-text-muted)] hover:text-white hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-0 w-1 h-full bg-blue-500"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`text-sm w-5 ${isActive ? "text-blue-400" : "group-hover:text-slate-300"}`}
                  />
                  <span className="font-medium text-sm">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}

          <p className="px-3 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-3 mt-8">
            System
          </p>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                isActive
                  ? "text-white bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]"
                  : "text-[var(--color-text-muted)] hover:text-white hover:bg-white/5"
              }`
            }
          >
            <FontAwesomeIcon
              icon={faCog}
              className="text-sm w-5 group-hover:text-slate-300"
            />
            <span className="font-medium text-sm">Settings</span>
          </NavLink>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[var(--color-border-main)]">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 border border-[var(--color-border-main)] flex items-center justify-center font-bold text-xs text-white">
              DA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                Diego Admin
              </p>
              <p className="text-xs text-[var(--color-text-muted)] truncate">
                diego@acmecorp.com
              </p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="sticky top-0 h-16 glass-panel z-30 flex items-center justify-between px-8"
        >
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-[var(--color-text-muted)] flex items-center gap-2">
              Acme Corp <span className="text-slate-600">/</span>{" "}
              <span className="text-white">{getBreadcrumb()}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Spotlight Search */}
            <div className="relative group hidden lg:block">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm group-focus-within:text-blue-400 transition-colors"
              />
              <input
                type="text"
                placeholder="Search orders, customers..."
                className="w-64 lg:w-80 pl-9 pr-12 py-1.5 bg-[var(--color-bg-surface)] border border-[var(--color-border-main)] rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-slate-500"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border-main)] rounded text-[10px] font-mono text-slate-400"></kbd>
                <kbd className="px-1.5 py-0.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border-main)] rounded text-[10px] font-mono text-slate-400">
                  K
                </kbd>
              </div>
            </div>

            <button className="relative text-slate-400 hover:text-white transition-colors">
              <FontAwesomeIcon icon={faBell} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            </button>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
