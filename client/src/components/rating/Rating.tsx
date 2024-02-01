import { Rating as Component } from 'flowbite-react';

type RatingProps = {
	rating: number;
};
export const Rating = ({ rating }: RatingProps) => {
	return (
		<Component>
			{
				Array.from({ length: 5 }, (_, i) => (
					<Component.Star key={i} filled={i < rating} />
				))
			}
			{/* <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{`${rating} out of 5`}</p> */}
		</Component>
	);
}
