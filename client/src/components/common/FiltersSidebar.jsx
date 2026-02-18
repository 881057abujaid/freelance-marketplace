import Select from "../ui/Select";
import Input from "../ui/Input";
import Button from "../ui/Button";
import FilterSection from "../ui/FilterSection";

const FiltersSidebar = ({
  category,
  setCategory,
  delivery,
  setDelivery,
  sellerLevel,
  setSellerLevel,
  min,
  setMin,
  max,
  setMax,
  onApply,
  onClear,
  className = "",
}) => {
  return (
    <aside
      className={`
        w-full md:w-72
        bg-white border rounded-xl shadow-sm
        p-5
        md:sticky md:top-24
        ${className}
      `}
    >
      <h3 className="font-semibold text-lg mb-4">Filters</h3>

      <div className="space-y-4">

        {/* Category */}
        <FilterSection label="Category">
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="writing">Writing</option>
            <option value="seo">SEO</option>
          </Select>
        </FilterSection>

        {/* Delivery */}
        <FilterSection label="Delivery Time">
          <Select
            value={delivery}
            onChange={(e) => setDelivery(e.target.value)}
          >
            <option value="">Any</option>
            <option value="1">1 day</option>
            <option value="3">3 days</option>
            <option value="7">7+ days</option>
          </Select>
        </FilterSection>

        {/* Seller */}
        <FilterSection label="Seller Level">
          <Select
            value={sellerLevel}
            onChange={(e) => setSellerLevel(e.target.value)}
          >
            <option value="">Any</option>
            <option value="new">New</option>
            <option value="level1">Level 1</option>
            <option value="level2">Level 2</option>
            <option value="top">Top Rated</option>
          </Select>
        </FilterSection>

        {/* ⭐ PRICE FIX */}
        <FilterSection label="Price">

          {/* GRID prevents overflow */}
          <div className="grid grid-cols-2 gap-2">

            <Input
              type="number"
              placeholder="Min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full"
            />

            <Input
              type="number"
              placeholder="Max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full"
            />

          </div>

        </FilterSection>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">

          <Button
            className="flex-1"
            onClick={onApply}
          >
            Apply
          </Button>

          <button
            onClick={onClear}
            className="border px-3 rounded-lg text-sm"
          >
            Clear
          </button>

        </div>

      </div>
    </aside>
  );
};

export default FiltersSidebar;
