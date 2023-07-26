import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {

  const router = useRouter();

    return (
      <div className="sideBar max-w-md w-full flex">
        <ul className="flex flex-col mt-8">
          <li> <Link href={"/admin/dashboard"} className={`py-5 px-5 block ${router.pathname === '/admin/dashboard' ? 'bg-gray-500 text-gray-50' : ''}`}>Dashboard</Link> </li>
          <li> <Link href={"/admin/account-settings"} className={`py-5 px-5 block ${router.pathname === '/admin/account-settings' ? 'bg-gray-500 text-gray-50' : ''}`}> Account Settings </Link> </li>
          <li> <Link href={"/admin/employee-track-record"} className={`py-5 px-5 block ${router.pathname === '/admin/employee-track-record' ? 'bg-gray-500 text-gray-50' : ''}`}> Employee Track Record </Link> </li>
        </ul>
      </div>
    )
  }