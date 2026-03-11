import type { Metadata } from "next";
import Link from "next/link";
import { getDepartments } from "@/lib/met-api";
import DepartmentCard from "@/components/departments/departmentCard";

export const metadata: Metadata = {
  title: "Departments — Art Oracle",
  description: "Explore the Metropolitan Museum of Art's 17 collections.",
};

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <main className="flex flex-col flex-1">
      <section className="bg-(--color-surface-dark) px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <p className="label-overline mb-4">Metropolitan Museum</p>
          <h1 className="font-serif text-5xl font-light text-(--color-canvas) mb-3">Departments</h1>
          <p className="text-sm text-white/50">{departments.length} collections to explore</p>
        </div>
      </section>

      <section className="px-10 py-16 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {departments.map((dept) => (
              <DepartmentCard
                key={dept.departmentId}
                department={dept}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-(--color-surface-dark) px-10 py-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="font-serif text-2xl text-(--color-canvas) mb-1">Start exploring the collection</p>
            <p className="text-xs text-white/50">470,000+ artworks in the collection</p>
          </div>
          <Link
            href="/search"
            className="border border-(--color-accent) text-(--color-accent) text-sm px-5 py-2.5 hover:bg-(--color-accent)/10 transition-colors whitespace-nowrap"
          >
            Browse artworks →
          </Link>
        </div>
      </section>
    </main>
  );
}
