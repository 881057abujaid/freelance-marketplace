import Input from "../ui/Input";
import Button from "../ui/Button";

const SearchBar = ({ value, setValue, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="flex gap-3">
            <Input
                placeholder="Search gigs..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <Button type="submit">Search</Button>
        </form>
    );
}
export default SearchBar;