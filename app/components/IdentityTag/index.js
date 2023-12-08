import { Tag } from "@ensdomains/thorin";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

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
    case "bayc":
      return "https://opensea.io";
    case "farcaster":
      return "https://warpcast.com";
    default:
      return "";
  }
};

export default function IdentityTag({ platform, identity }) {
  const name = PLATFORMS[platform];
  const color = COLORS[name];
  const style = COLO_STYLES[name];
  const imgSrc = `/${name}.svg`;
  const hrefLink = getHrefLink(name);

  return (
    <Link href={hrefLink}>
      <Tag colorStyle={style} className={styles.identityTag} size="medium">
        <div className={styles.tagImg}>
          <Image src={imgSrc} alt="tag" width={16} height={16} />
        </div>
        <div>{identity}</div>
      </Tag>
    </Link>
  );
}
