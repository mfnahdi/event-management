import { Sidebar } from 'flowbite-react';
import { MdDashboardCustomize } from "react-icons/md";
import { VscSymbolEvent } from "react-icons/vsc";
import { MdTheaterComedy } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa6";
import { TbChartInfographic } from "react-icons/tb";




const SidebarPromoter = ({ activeLink }: any) => {
  return (
    <section className="h-screen sticky top-0">
      <Sidebar aria-label="Default sidebar example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="/dashboard"
              icon={MdDashboardCustomize}
              active={activeLink === 'dashboard'}
            >
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              href="/dashboard/events"
              icon={VscSymbolEvent}
              active={activeLink === 'events'}
            >
              Events
            </Sidebar.Item>
            <Sidebar.Item
              href="/dashboard/attendent"
              icon={MdTheaterComedy}
              active={activeLink === 'attendees'}
            >
              Attendance
            </Sidebar.Item>
            <Sidebar.Item
              href="/dashboard/transaction"
              icon={FaCartArrowDown}
              active={activeLink === 'transactions'}
            >
              Transactions
            </Sidebar.Item>
            <Sidebar.Item
              href="/dashboard/analytics"
              icon={TbChartInfographic}
              active={activeLink === 'analytics'}
            >
              Graphic
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </section>
  );
};

export default SidebarPromoter;
