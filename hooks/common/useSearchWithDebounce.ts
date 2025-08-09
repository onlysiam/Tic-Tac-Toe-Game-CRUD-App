import { useEffect, useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import type { UnknownAction } from "redux";
import { searchDelay } from "@configs/app";

interface UseSearchWithDebounceProps<T extends UnknownAction = UnknownAction> {
  delay?: number;
  loadingState: boolean;
  searchSkip?: number;
  searchLimit?: number;
  searchAction: (searchText: string, ...args: any[]) => T;
  searchActionParams?: any[];
  queryParameters?: string;
  resetSearchStateAction: () => UnknownAction;
}

type UseSearchWithDebounceReturn = [
  isSearching: boolean,
  search: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  searchedInput: string,
  setSearchedInput: React.Dispatch<React.SetStateAction<string>>,
  searchHandler: (e: ChangeEvent<HTMLInputElement>) => void
];

export function useSearchWithDebounce<T extends UnknownAction = UnknownAction>({
  delay,
  loadingState,
  searchSkip,
  searchLimit,
  searchAction,
  searchActionParams,
  queryParameters,
  resetSearchStateAction,
}: UseSearchWithDebounceProps<T>): UseSearchWithDebounceReturn {
  const dispatch = useDispatch();

  delay = delay ?? searchDelay;
  searchSkip = searchSkip ?? 0;
  searchLimit = searchLimit ?? 0;
  searchActionParams = searchActionParams!?.length > 0 ? searchActionParams : [];

  const [isSearching, setSearching] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchedInput, setSearchedInput] = useState<string>("");

  useEffect(() => {
    const delayFn = setTimeout(() => setSearch(searchQuery), delay);
    return () => clearTimeout(delayFn);
  }, [searchQuery, delay]);

  useEffect(() => {
    if (!searchedInput) {
      setSearchQuery("");
      setSearch("");
    }
  }, [searchedInput]);

  useEffect(() => {
    if (searchedInput) {
      setSearching(true);
    }
    if (!searchedInput) {
      setSearching(false);
    }
  }, [searchedInput]);

  useEffect(() => {
    if (!loadingState && isSearching) {
      setSearching(false);
    }
  }, [loadingState]);

  //
  // @desc  loading search results if the search state is triggered
  //
  useEffect(() => {
    if (search && searchedInput) {
      const pagination = generatePagination(searchSkip, searchLimit, queryParameters!);
      dispatch(searchAction(searchedInput, ...searchActionParams!, pagination));
    }
  }, [search]);

  //   handlers
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedInput((state) => (state = e.target.value));
    if (e.target.value) {
      setSearchQuery((state) => (state = e.target.value));
    } else if (!e.target.value) {
      dispatch(resetSearchStateAction());
    }
  };

  return [isSearching, search, setSearchQuery, searchedInput, setSearchedInput, searchHandler];
}
const generatePagination = (skip: number, limit: number, queryParameters: string) => {
  if (queryParameters) return `skip=${skip}&limit=${limit}&${queryParameters}`;
  return `skip=${skip}&limit=${limit}`;
};
