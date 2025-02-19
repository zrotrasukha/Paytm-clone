import { useNavigate } from "react-router";
import { useState } from "react";
import DashboardHeader from "../components/dashboardHeader";
import { useEffect } from "react";
import { useAppContext } from "../context/context";
import axios from "axios";
import { useDebounce } from "@uidotdev/usehooks";
import { usersResponseType } from "../utils/types";
import SearchedUserBox from "../components/searchedUserBox";
export default function DashboardPage() {
  const { setUsername, balance, setBalance } = useAppContext();
  const [searchResults, setSearchResults] = useState<usersResponseType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const navigate = useNavigate();


  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/getuser",
        { withCredentials: true },
      );
      if (response.status === 404 || response.status === 500) {
        navigate("/signin");
        throw new Error("User not found");
      }
      setUsername(response.data.user.firstName);
    } catch (error) {
      console.log(error);
      navigate("/signin");
      return { error: "Error while fetching user" };
    }
  };

  const getBalance = async () => {
    try {
      const balanceResponse = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        { withCredentials: true });
      setBalance(balanceResponse.data.balance);
      return balanceResponse.data.balance;
    } catch (error) {
      return { error: "Error while fetching balance" };
    }
  }

  const getAllUsers = async () => {
    try {
      const allUsersResponse = await axios.get("http://localhost:3000/api/v1/user/getallusers", { withCredentials: true });
      if (!allUsersResponse) {
        throw new Error;
      }
      return allUsersResponse;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
    getBalance();
  }, []);

  useEffect(() => {
    if (!debouncedSearchQuery) {
      const response = async () => {
        const response = await getAllUsers();
        if (!response || response?.status !== 200) {
          setSearchResults([]);
          return;
        }
        setSearchResults(response.data.users);
        return;
      };
      response();
      return;
    }

    const onSearch = async () => {
      setIsSearching(true);
      try {
        const response = await getUserBulk();

        if (response?.status !== 200 || !response) {
          throw new Error("Error while fetching users");
        }
        setSearchResults(response.data.users);
      } catch (error) {
        console.log(error);
      }
      setIsSearching(false);
    }
    if (debouncedSearchQuery) {
      onSearch();
    }
  }, [debouncedSearchQuery])

  const getUserBulk = async () => {
    try {
      const usersResponse = await axios.get(
        `http://localhost:3000/api/v1/user/bulk?search=${debouncedSearchQuery}`,
        { withCredentials: true }
      )
      if (!usersResponse) {

        throw new Error("Error while fetching users");
      }
      return usersResponse
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <DashboardHeader />
      <div className="bg-zinc-900 h-screen py-6 px-4 w-screen">
        <div className="flex text-white gap-3">
          <p className="font-bold">Your Balance: Rs {balance}</p>
        </div>
        <div className="flex-col  pt-5 text-white">
          <h2 className="text-xl font-bold">Users</h2>
          <div className=" flex p-2 focus:outline-none border-2 border-neutral-500 text-sm  w-full mt-2 rounded-sm">
            <input
              type="search" placeholder="Search User"
              className="focus:outline-none h-10  w-full"
              autoFocus
              onChange={(e) => { setSearchQuery(e.target.value) }}
              value={searchQuery}
            />
            <button
              className="h-10 font-semibold w-24 rounded-sm bg-white  hover:bg-neutral-200 text-black"
              disabled={isSearching}
            >
              Search
            </button>
          </div>
          <div className="mt-10">

            {searchResults.map((user, index) => {
              return <SearchedUserBox
                className="mt-2"
                key={index}
                username={user.firstName + " " + user.lastName}

              />
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
