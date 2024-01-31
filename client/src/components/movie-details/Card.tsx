/* eslint-disable @typescript-eslint/no-unused-vars */

import { Movie, Review } from "../../services/api";
export const Card = ({
  id,
  title,
  description,
  // poster,
  // trailer,
  userId,
  reviews,
  // createdAt,
  // updatedAt,
}: Movie) => {
  console.log(id, reviews);
  return (
    <>
      <div key={id} className="w-auto bg-gray-50 p-5 dark:bg-gray-900">
        <h5 className="i flex space-x-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white lg:block">
          {title}
        </h5>{" "}
        <p className="w-full rounded-md border-none px-2 py-2 text-gray-700 outline-none focus:ring-0 dark:bg-inherit dark:text-gray-400">
          {description}
        </p>
        <p>{userId}</p>
        <p>
          {reviews?.map((review: Review, index) => (
            <span key={index}>{review.title}</span>
          ))}
        </p>
        {/* <p>
					{reviews?.map((review, index) => (
						<span key={index}>{review}</span>
					))}
				</p> */}
        {/* <p>{createdAt?.toLocaleDateString()}</p>
				<p>{updatedAt?.toLocaleDateString()}</p> */}
      </div>
    </>
  );
};
