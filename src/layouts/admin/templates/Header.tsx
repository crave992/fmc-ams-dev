import Image from "next/image";
import Logout from '@/components/Logout';
import { getCurrentUserInfo } from '@/lib/userLib'; // Import the getCurrentUserInfo function

export default function Header() {
  const userInfo = getCurrentUserInfo(); // Get the user information

  return (
    <header>
      <div className="flex flex-wrap justify-between px-3 py-2 w-full">
        <Image src="/img/FMC.webp" width={135} height={49} alt="FMC" className="logo" />
        <div className="accountInfo gap-4 flex items-center">
          {userInfo ? (
            <>
              <p>{userInfo.displayName}</p>
              {userInfo.profileImageURL && (
                <Image src={userInfo.profileImageURL} width={50} height={50} alt="Profile Image" className="rounded-full" />
              )}
            </>
          ) : (
            <p>No info available</p>
          )}
          <Logout />
        </div>
      </div>
    </header>
  );
}
