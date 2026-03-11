import Link from "next/link";
import type { MetDepartment } from "@/lib/met-api";

type Props = {
  department: MetDepartment;
};

export default function DepartmentCard({ department }: Props) {
  return (
    <Link
      href={`/departments/${department.departmentId}`}
      className="border border-(--color-border) px-4 py-5 text-center text-lg font-serif font-bold text-(--color-foreground) hover:bg-(--color-foreground) hover:text-(--color-background) hover:border-(--color-foreground) transition-colors"
    >
      {department.displayName}
    </Link>
  );
}
