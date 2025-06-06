import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import useUsers from "@/hooks/useUsers";

const Header = () => {
  const navigate = useNavigate();
  const { profile, logoutUser } = useUsers();
  console.log("profile :", profile);
  const handleOnclick = () => {
    navigate("/login");
  };

  const logout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <header className="my-2 ">
      <div className="flex   items-center px-6  py-4 bg-white shadow-md rounded-xl outline-1 outline-gray-100 ">
        <div className="flex  w-full items-center text-2xl font-semibold text-gray-800  text-center max-sm:mr-10   justify-between    ">
          <span className="rounded-full border-2 border-amber-100 p-3">
            <BsShop className="text-gray-600 " />
          </span>
          <div>
            <span className="text-3xl">🍽️</span>
            <span className="text-indigo-600 text-3xl mx-2">
              <Link to={"/"}>MenuX</Link>{" "}
            </span>
          </div>

          {profile ? (
            <div className="flex outline-1 items-center gap-2 ">
              <div className="flex-col flex">
                <span className="text-start text-[12px] font-medium text-gray-500">
                  {" "}
                  Logged as :
                </span>
                <span className="text-[15px] font-medium text-gray-700">
                  {" "}
                  {profile.email}
                </span>
              </div>

              <DropdownMenuHeader logout={logout} />
            </div>
          ) : (
            <div className="flex">
              <span
                onClick={handleOnclick}
                className="flex items-center flex-col"
              >
                <FaUserCircle
                  className="outline-none text-gray-600 "
                  size={35}
                />
                <span className="text-[12px]">Login</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;

export function DropdownMenuHeader({ logout }: { logout: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IoIosArrowDropdownCircle />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50 border-gray-100  " align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>Support</DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span onClick={logout}>Log out</span>

          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
