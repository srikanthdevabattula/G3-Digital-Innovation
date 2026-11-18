import Link from "next/link";

type Props = {
  title: string;
  backHref?: string;
  action?: React.ReactNode;
};

export function PageHeader({ title, backHref, action }: Props) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {backHref ? (
          <Link
            href={backHref}
            className="rounded-xl bg-white px-3 py-2 text-sm font-medium text-indigo-600 no-underline shadow-sm hover:bg-slate-50"
          >
            Back
          </Link>
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg text-white">
            ▦
          </span>
        )}
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      </div>
      {action}
    </div>
  );
}
