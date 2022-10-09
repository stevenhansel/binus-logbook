import { useEffect, useState } from "react";

import useStore from "../stores";

import { User } from '../types/domain'

const mockUser: User = {
  name: "Kaguya",
  profilePictureUrl: "https://avatarfiles.alphacoders.com/314/314482.jpg",
  enrichments: [
    {
      id: 1,
      semester: "Even Semester 2021/2022",
      semesterValue: "20221",
      track: "Certified Research",
      companyPartner: "Shinomiya Corps",
      position: "COO",
      location: "Tokyo, Japan",
      workingOfficeHours: "",
      siteSupervisorName: "",
      siteSupervisorEmail: "",
      siteSupervisorPhoneNumber: "",
      facultySupervisor: "",
      officePhoneNumber: ""
    },
    {
      id: 2,
      semester: "Odd Semester 2021/2022",
      semesterValue: "20221",
      track: "Certified Research",
      companyPartner: "Shinomiya Corps",
      position: "CEO",
      location: "Tokyo, Japan",
      workingOfficeHours: "",
      siteSupervisorName: "",
      siteSupervisorEmail: "",
      siteSupervisorPhoneNumber: "",
      facultySupervisor: "",
      officePhoneNumber: ""
    }
  ],
}

const useMeQuery = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser)

  const fetchMe = async () => {
    setError('')
    setIsLoading(true)
    setIsFetched(true)

    try {
      setUser(mockUser)
    } catch (err) {
      setError(String(err))
    }

    setIsLoading(false)
  };

  useEffect(() => {
    if (!isFetched) {
      fetchMe()
    }
  }, [isFetched]);
  
  return {
    data: user,
    error,
    isLoading,
    refetch: () => setIsFetched(false),
  }
};

export default useMeQuery;
