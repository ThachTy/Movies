import { ReactNode, createContext, useState } from 'react'

type Props = {
    children: ReactNode
}

type SearchMoviesContext = {
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

export const SearchMoviesContext = createContext<SearchMoviesContext | Object>({});


function SearchMoviesProvider({ children }: Props) {
    const [open, setOpen] = useState<boolean>(false)
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    return (
        <SearchMoviesContext.Provider value={{ open, handleOpen, handleClose }}>
            {children}
        </SearchMoviesContext.Provider >
    )
}

export default SearchMoviesProvider
