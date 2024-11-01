import { useRef } from "react";
import AccountService from "../../../service/AccountService";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../contexts/SearchContext"

export default function Search() {
    const searchQuery = useRef("");
    const { setResults } = useSearch();
    const navigate = useNavigate();

    function handleSearchQuery(q: string) {
        searchQuery.current = q;
    }

    async function search() {
        const response = await AccountService.findUsers(searchQuery.current);
        setResults(response); // Store results in context
        navigate("/find"); // Navigate to the results page
    }

    async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            await search();
        }
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); search(); }}
            className="relative w-1/6 flex justify-end">
            <input
                name="username"
                type="text"
                placeholder="Search"
                className="h-8 bg-custom-black border-custom-gray border text-custom-light-gray"
                onKeyDown={handleKeyDown}
                onChange={(e) => handleSearchQuery(e.target.value)}
            />
        </form>
    );
}
