"use client";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../context/data";

import styles from "./styles.module.css";
import ProfileCard from "../ProfileCard";

import { Input, MagnifyingGlassSimpleSVG, Heading } from "@ensdomains/thorin";

const DEFAULT_PROFILE = {
  name: "",
  address: "",
  description: "",
  avatar: "",
  url: "",
};
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export default function SearchBar() {
  const { isDarkTheme, ens } = useContext(DataContext);

  const [searchInput, setSearchInput] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ensProfile, setEnsProfile] = useState(DEFAULT_PROFILE);

  const color = isDarkTheme ? "#ffffff" : "#141414";

  const handleSearchClick = () => {
    if (searchInput !== searchValue) {
      // Reset state
      setLoading(true);
      setError("");
      setEnsProfile(DEFAULT_PROFILE);
    }

    // Update state
    setSearchValue(searchInput.trim());
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleSearchReset = () => {
    // Reset state
    setSearchInput("");
    setSearchValue("");
    setError("");
    setEnsProfile(DEFAULT_PROFILE);
  };

  useEffect(() => {
    if (!ens) return;
    if (!searchValue) return;

    // Reset state
    setError("");
    setEnsProfile(DEFAULT_PROFILE);
    setLoading(true);

    // Check if search value is an ENS name
    const isEnsName = Boolean(searchValue?.endsWith(".eth"));
    const isValidAddress = Boolean(
      searchValue?.startsWith("0x") && searchValue?.length === 42,
    );

    (async () => {
      try {
        if (!isEnsName && !isValidAddress) {
          throw new Error("Invalid address or ENS name");
        }

        const name = isEnsName
          ? searchValue
          : (await ens.getName(searchValue)?.name) || "";

        // Check if name exists
        if (!name) {
          throw new Error("No ENS name found");
        }

        const address = isEnsName
          ? (await ens.getAddress(searchValue))?.toLowerCase() || ""
          : searchValue?.toLowerCase();

        const isAddress = Boolean(address !== ZERO_ADDRESS);

        if (!isAddress) {
          throw new Error("No Ethereum address found");
        }

        const avatar = (await ens.getText(searchValue, "avatar")) || "";
        const description =
          (await ens.getText(searchValue, "description")) || "";
        const url = (await ens.getText(searchValue, "url")) || "";

        // Update state
        setEnsProfile({
          name,
          address,
          avatar,
          description,
          url,
        });
        setLoading(false);
      } catch (error) {
        setError(error.message.split("(")[0]);
        setLoading(false);
      }
    })();
  }, [ens, searchValue]);

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBarWrapper}>
        <Heading as="h1" align="center" level="1" color={color}>
          ENS Identity Search
        </Heading>
        <div className={styles.searchBarInput}>
          <Input
            placeholder="Search by ens or address..."
            value={searchInput}
            onChange={handleSearchChange}
            error={error}
            icon={<MagnifyingGlassSimpleSVG />}
            onClickAction={handleSearchReset}
            onKeyDown={handleSearchKeyDown}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            clearable
          />
        </div>
        <br />
        {(loading || (ensProfile.name && ensProfile.address)) && (
          <div className={styles.searchBarResult}>
            <ProfileCard loading={loading} profile={ensProfile} color={color} />
          </div>
        )}
      </div>
    </div>
  );
}
