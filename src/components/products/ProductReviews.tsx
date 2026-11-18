import type { ProductReview } from "@/types/product";

export function ProductReviews({ reviews }: { reviews: ProductReview[] }) {
  if (reviews.length === 0) {
    return (
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Reviews</h2>
        <p className="text-sm text-slate-500">No reviews yet.</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-lg font-semibold text-slate-900">Reviews</h2>
      <ul className="space-y-3">
        {reviews.map((review, index) => (
          <li
            key={review.reviewerEmail + index}
            className="rounded-xl border border-slate-100 p-4"
          >
            <p className="font-medium text-slate-800">
              {review.reviewerName}
              <span className="ml-2 text-sm font-normal text-slate-500">
                ★ {review.rating}
              </span>
            </p>
            <p className="mt-1 text-sm text-slate-600">{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
