import type { Metadata } from "next";
import { getDepartments } from "@/lib/met-api";
import DepartmentCard from "@/components/departments/departmentCard";

export const metadata: Metadata = {
  title: "Departments — Art Oracle",
  description: "Explore the Metropolitan Museum of Art's 17 collections.",
};

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <main>
      <section className="py-16 px-10 max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl font-light mb-10">Departments</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {departments.map((dept) => (
            <DepartmentCard
              key={dept.departmentId}
              department={dept}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
