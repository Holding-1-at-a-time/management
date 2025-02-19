/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 23/09/2024 - 09:58:46
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 23/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
'use client'

import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export function CreateOrganization() {
  const [name, setName] = useState("");
  const createOrganization = useAction(api.organizations.createOrganization);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      return;
    }

    try {
      await createOrganization({ name, org_name: 'Organization' });
      setName("");
      alert("Organization created successfully!");
    } catch (error) {
      console.error("Failed to create organization:", error);
      alert("Failed to create organization. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Organization Name"
        className="w-full px-3 py-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Create Organization
      </button>
    </form>
  );
};