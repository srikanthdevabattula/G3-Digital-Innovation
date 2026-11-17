import Link from "next/link";

export default async function EditProductPlaceholder({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="p-6">
      <p>The shared create/edit form is the next step.</p>
      <Link href={"/products/" + id} className="mt-4 inline-block">
        Back to product
      </Link>
    </main>
  );
}
