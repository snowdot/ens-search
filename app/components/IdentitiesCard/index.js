import { Tag } from "@ensdomains/thorin";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

const GET_IDENTITIES_BY_ADDRESS = gql`
  query findByAddress($identity: String!) {
    identity(platform: "ethereum", identity: $identity) {
      nft {
        category
        id
      }
      neighborWithTraversal(depth: 1) {
        source
        to {
          identity
        }
      }
    }
  }
`;

const PLATFORMS = {
  ens: "ens",
  lens: "lens",
  farcaster: "farcaster",
  unstoppabledomains: "unstoppabledomains",
};

export const COLORS = {
  ens: "#5198FF",
  lens: "#69C372",
  farcaster: "#8862D0",
  unstoppabledomains: "#0F67FE",
};

export const COLO_STYLES = {
  ens: "blueSecondary",
  lens: "greenSecondary",
  farcaster: "indigoSecondary",
  unstoppabledomains: "blueSecondary",
};

const getHrefLink = (name) => {
  switch (name) {
    case "ens":
      return "https://app.ens.domains";
    case "lens":
      return "https://hey.xyz/u";
    case "farcaster":
      return "https://warpcast.com";
    case "unstoppabledomains":
      return "https://ud.me";
    default:
      return "";
  }
};

const IdentityTag = ({ category, identity }) => {
  const name = PLATFORMS[category];
  const color = COLORS[name];
  const style = COLO_STYLES[name];
  const imgSrc = `/${name}.svg`;
  const hrefLink = `${getHrefLink(name)}/${name === "lens" ? identity.split(".lens")[0] : identity
    }`;
  const trimIdentity =
    identity?.split("").length > 40 ? `${identity?.slice(0, 40)}...` : identity;

  return (
    <Link href={hrefLink} target="_blank">
      <Tag colorStyle={style} className={styles.identityTag} size="medium">
        <div className={styles.tagImg}>
          <Image src={imgSrc} alt="tag" width={16} height={16} />
        </div>
        <div className={styles.identityTagIdentity}>{trimIdentity}</div>
      </Tag>
    </Link>
  );
};

export default function IdentitiesCard({ address }) {
  const [identities, setIdentities] = useState([]);
  const { data, loading } = useQuery(GET_IDENTITIES_BY_ADDRESS, {
    variables: { identity: address },
    skip: !address,
    context: {
      timeout: 8000,
    },
  });

  useEffect(() => {
    // Reset state
    setIdentities([]);

    if (loading) return;
    if (!data) return;

    // Get data from NEXT.ID
    const nfts = data?.identity?.nft || [];
    const neighbors = data?.identity?.neighborWithTraversal || [];

    let ensDomains = [];
    if (nfts.length) {
      ensDomains = nfts
        .filter((item) => item.category === "ENS")
        .map((item) => {
          return {
            category: item.category.toLowerCase() || "",
            identity: item.id || "",
          };
        });
    }

    let otherDomains = [];
    if (neighbors.length) {
      otherDomains = neighbors
        .filter(
          (item) =>
            (item?.source === "unstoppabledomains" &&
              item?.to?.identity.includes(".x")) ||
            item?.source === "lens" ||
            item?.source === "farcaster",
        )
        .map((item) => {
          return {
            category: item?.source.toLowerCase() || "",
            identity: item?.to?.identity || "",
          };
        });
    }
    const domains = [...ensDomains, ...otherDomains];

    // Update state
    setIdentities(domains);
  }, [data, loading]);

  return (
    <>
      {identities.length > 0 && (
        <>
          <br />
          <div className={styles.identitiesCard}>
            {identities.map((elem, index) => (
              <IdentityTag key={index} {...elem} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
