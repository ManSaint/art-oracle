import Link from "next/link";
import type { MetDepartment } from "@/lib/met-api";

type Props = {
  department: MetDepartment;
};

export default function DepartmentCard({ department }: Props) {
  return (
    <Link
      href={`/departments/${department.departmentId}`}
      className="border border-(--color-border) px-4 py-5 text-center font-serif hover:bg-(--color-border) transition-colors"
    >
      {department.displayName}
    </Link>
  );
}
