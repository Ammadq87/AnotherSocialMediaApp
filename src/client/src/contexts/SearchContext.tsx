import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../../service/AccountService";

interface SearchContextType {
    results: any[];
    setResults: (results: any[]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [results, setResults] = useState<User[]>([]);

    return (
        <SearchContext.Provider value={{ results, setResults }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
};
