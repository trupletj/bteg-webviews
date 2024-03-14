"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
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
  const [empCode, setEmpCode] = useState(90012131); // Replace with dynamic values if needed
  const [phone, setPhone] = useState(99135213); // Replace with dynamic values if needed
  const [code, setCode] = useState(115257); // Replace with dynamic values if needed
  const [userId, setUserId] = useState(1765); // Replace with dynamic values if needed
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        "http://172.30.10.245:8000/sms/getTsalinReport",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            emp_code: 90012131,
            phone: 99135213,
            code: 115257,
            user_id: 1765,
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* ... your form fields if needed ... */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Get Tsalin Report"}
        </button>
      </form>
      {errorMessage && <p className="error-message">MSG : {errorMessage}</p>}
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
