"use client";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "@/app/context/data";

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

  useEffect(() => {
    if (!ens) return;
    if (!searchValue) return;

    // Reset state
    setError("");
    setEnsProfile(DEFAULT_PROFILE);
    setLoading(true);

    // Check if search value is an ENS name
    const isEnsName = Boolean(searchValue?.endsWith(".eth"));

    (async () => {
      try {
        const name = isEnsName
          ? searchValue
          : (await ens.getName(searchValue)?.name) || "";

        // Check if name exists
        if (!name) {
          // Update state
          setEnsProfile((prev) => ({ ...prev, name: searchValue }));
          setLoading(false);
          return;
        }

        const address = isEnsName
          ? (await ens.getAddress(searchValue)) || ""
          : searchValue;

        const isAddress = Boolean(address !== ZERO_ADDRESS);

        if (!isAddress) {
          throw new Error("Not found");
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
          Web3 Identity Search
        </Heading>
        <div className={styles.searchBarInput}>
          <Input
            placeholder="0xA0Cf...251e2e"
            value={searchInput}
            onChange={handleSearchChange}
            error={error}
            actionIcon={<MagnifyingGlassSimpleSVG />}
            alwaysShowAction
            onClickAction={handleSearchClick}
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
