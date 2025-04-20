import { Link } from "react-router-dom"

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <div className="flex justify-center mt-8">
        <ul className="flex space-x-1">
          {[...Array(pages).keys()].map((x) => (
            <li key={x + 1}>
              <Link
                to={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${x + 1}`
                      : `/page/${x + 1}`
                    : `/admin/productlist/${x + 1}`
                }
                className={`px-3 py-1 rounded-md ${
                  x + 1 === page ? "bg-primary text-white" : "bg-gray-200 text-secondary-dark hover:bg-gray-300"
                }`}
              >
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  )
}

export default Paginate
