"use client";

import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Activity,
  Users,
  Building,
  Beaker,
  ChevronRight,
  User,
  ShieldCheck,
  FolderKanban,
  FlaskConical,
  MapPin,
  UserCircle,
  LogOut,
  Home,
} from "lucide-react";
import { TestCategoriesList } from "@/components/test-categories/test-categories-list";
import { LabBranchesList } from "@/components/lab-branches/lab-branches-list";
import gsap from "gsap";
import { useRouter, useSearchParams } from "next/navigation";
import { PatientsList } from "@/components/patients/patients-list";
import { AdminsList } from "@/components/admins/admin-list";
import { TestList } from "@/components/tests/tests-list";
import ProfilePage from "@/components/profile";

export default function Dashboard() {
  const tab = useSearchParams().get("tab");
  const [activeTab, setActiveTab] = useState(tab ?? "patients");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const router = useRouter();
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-teal-800 text-white fixed h-full transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-teal-700">
          {sidebarOpen && <h2 className="text-xl font-bold min-w-max">Menu</h2>}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-teal-700"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-6">
          <SidebarItem
            icon={<Home size={20} />}
            text="Home"
            active={false}
            onClick={() => router.push("/")}
            collapsed={!sidebarOpen}
          />

          <SidebarItem
            icon={<User size={20} />}
            text="Patients"
            active={activeTab === "patients"}
            onClick={() => setActiveTab("patients")}
            collapsed={!sidebarOpen}
          />
          <SidebarItem
            icon={<FlaskConical size={20} />}
            text="Tests"
            active={activeTab === "tests"}
            onClick={() => setActiveTab("tests")}
            collapsed={!sidebarOpen}
          />
          <SidebarItem
            icon={<FolderKanban size={20} />}
            text="Test Categories"
            active={activeTab === "test-categories"}
            onClick={() => setActiveTab("test-categories")}
            collapsed={!sidebarOpen}
          />
          <SidebarItem
            icon={<MapPin size={20} />}
            text="Lab Branches"
            active={activeTab === "lab-branches"}
            onClick={() => setActiveTab("lab-branches")}
            collapsed={!sidebarOpen}
          />
          <SidebarItem
            icon={<ShieldCheck size={20} />}
            text="Admins"
            active={activeTab === "admins"}
            onClick={() => setActiveTab("admins")}
            collapsed={!sidebarOpen}
          />
          <SidebarItem
            icon={<UserCircle size={20} />}
            text="Profile"
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
            collapsed={!sidebarOpen}
          />
          <SidebarItem
            icon={<LogOut size={20} />}
            text="Logout"
            onClick={() => {}}
            collapsed={!sidebarOpen}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <header className="bg-white shadow-sm">
          <div className="py-4 px-6 flex items-center">
            <button
              onClick={() => router.push("/")}
              className="flex items-center text-teal-600 hover:text-teal-800 transition-colors"
            >
              <Activity className="text-teal-600 mr-2" size={24} />
              <span className="text-2xl font-bold text-gray-800">
                Los Alamos Laboratory
              </span>
            </button>{" "}
          </div>
        </header>

        <main className="p-6">
          <div ref={contentRef} className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-teal-700 mb-6">
              {activeTab === "patients" && "Patients Management"}
              {activeTab === "test-categories" && "Test Categories Management"}
              {activeTab === "lab-branches" && "Lab Branches Management"}
              {activeTab === "admins" && "Admins Management"}
              {activeTab === "tests" && "Tests Management"}
            </h2>

            {activeTab === "patients" && <PatientsList />}
            {activeTab === "test-categories" && <TestCategoriesList />}
            {activeTab === "lab-branches" && <LabBranchesList />}
            {activeTab === "admins" && <AdminsList />}
            {activeTab === "tests" && <TestList />}
            {activeTab === "profile" && <ProfilePage />}
          </div>
        </main>
      </div>
    </div>
  );
}

// TypeScript interface for SidebarItem props
interface SidebarItemProps {
  icon?: React.ReactNode;
  text?: string;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
}

// Sidebar Item Component
function SidebarItem({
  icon,
  text,
  active,
  onClick,
  collapsed,
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 mb-1 transition-colors ${
        active ? "bg-teal-700 text-white" : "text-teal-100 hover:bg-teal-700"
      }`}
    >
      <div className={`${collapsed ? "mx-auto" : ""}`}>{icon}</div>

      {!collapsed && (
        <>
          <span className="ml-3 text-sm font-medium min-w-max">{text}</span>
          {active && <ChevronRight size={16} className="ml-auto" />}
        </>
      )}
    </button>
  );
}
