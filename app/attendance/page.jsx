"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

function Attendance() {
  const searchParams = useSearchParams();

  // const [empCode, setEmpCode] = useState(90012131); // Replace with dynamic values if needed
  // const [phone, setPhone] = useState(99135213); // Replace with dynamic values if needed
  // const [code, setCode] = useState(115257); // Replace with dynamic values if needed
  // const [userId, setUserId] = useState(1765); // Replace with dynamic values if needed
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const empCode = searchParams.get("empCode");
    const phone = searchParams.get("phone");
    const code = searchParams.get("code");
    const userId = searchParams.get("userId");
    // declare the data fetching function
    const handleSubmit = async (event) => {
      // event.preventDefault();
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch(
          "http://172.30.10.245:8000/sms/getTsalinReport",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              emp_code: empCode,
              phone,
              code,
              user_id: userId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    // call the function
    handleSubmit()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <div>
      {/* <h1>empCOde : {empCode}</h1>
      <h1>phone : {phone}</h1>
      <h1>code : {code}</h1>
      <h1>userId : {userId}</h1> */}

      {isLoading && (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )}
      {errorMessage && <p className="error-message">MSG : {errorMessage}</p>}
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
      {data && (
        <pre>
          {/* Display your fetched data here */}
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default Attendance;
