import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

const Rating = ({ value, text, color = "text-yellow-500" }) => {
  return (
    <div className="flex items-center">
      <span className={color}>{value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
      <span className={color}>{value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
      <span className={color}>{value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
      <span className={color}>{value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
      <span className={color}>{value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
      {text && <span className="ml-1 text-sm text-gray-600">{text}</span>}
    </div>
  )
}

export default Rating
