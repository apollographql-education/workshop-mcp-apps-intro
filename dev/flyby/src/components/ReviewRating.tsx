import ReactStars from 'react-rating-stars-component';
import { brandColors } from '../theme';
import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5';

interface ReviewRatingProps {
  edit?: boolean;
  isHalf?: boolean;
  rating?: number | null;
  setReviewsInput?: (rating: number) => void;
  size?: number;
  isLight?: boolean;
}

// https://www.npmjs.com/package/react-rating-stars-component

export default function ReviewRating({
  edit = false,
  isHalf = false,
  rating = 0,
  setReviewsInput = () => {},
  size = 32,
  isLight = false
}: ReviewRatingProps) {
  const color = isLight ? brandColors.white : brandColors.black;
  const starConfig = {
    size,
    isHalf,
    color,
    activeColor: color,
    emptyIcon: <IoStarOutline />,
    halfIcon: <IoStarHalf />,
    filledIcon: <IoStar />
  };

  return (
    <ReactStars
      a11y
      count={5}
      edit={edit}
      value={rating}
      onChange={setReviewsInput}
      {...starConfig}
    />
  );
}
