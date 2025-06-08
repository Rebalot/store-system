import { useState } from "react"
import { Filter, X, ChevronDown } from "lucide-react"
import { useMediaQuery } from "react-responsive";

const ProductFilters = ({ onFiltersChange, categories, priceRange }) => {
  const isMdOrLarger = useMediaQuery({ query: '(min-width: 768px)' });
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "name",
    inStock: false,
  })

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      category: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "name",
      inStock: false,
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== "" && value !== "name" && value !== false)

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
          {hasActiveFilters && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Active</span>}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <X size={16} />
              Clear
            </button>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex items-center gap-1 text-gray-600">
            <ChevronDown size={16} className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      <div className={`flex flex-col mt-4 gap-3 ${isMdOrLarger ? "block" : isOpen ? "block" : "hidden"}`}>
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between gap-3">
          {/* Min Price */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              placeholder={`$${priceRange.min}`}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          {/* Max Price */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              placeholder={`$${priceRange.max}`}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* In Stock Only */}
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => handleFilterChange("inStock", e.target.checked)}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-gray-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">In stock only</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default ProductFilters
