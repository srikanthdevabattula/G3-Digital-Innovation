import type { ProductReview } from "@/types/product";

export function ProductReviews({ reviews }: { reviews: ProductReview[] }) {
  if (reviews.length === 0) {
    return (
      <section className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">Reviews</h2>
        <p>No reviews yet.</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="mb-2 text-xl font-semibold">Reviews</h2>
      <ul className="space-y-3">
        {reviews.map((review, index) => (
          <li key={review.reviewerEmail + index} className="border-b pb-3">
            <p className="font-medium">
              {review.reviewerName} — {review.rating}/5
            </p>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
