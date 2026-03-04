import { metFetch } from "./client";
import { MetDepartment, MetDepartmentsResponse } from "./types";

export async function getDepartments(): Promise<MetDepartment[]> {
  const res = await metFetch<MetDepartmentsResponse>("/departments");
  return res.departments;
}

// The Met only has 19 departments, so we just fetch all of them
// and find the right one locally instead of making a separate API call.
export async function getDepartment(id: number): Promise<MetDepartment | null> {
  const match = (await getDepartments()).find((dept) => dept.departmentId === id);
  return match ?? null;
}
