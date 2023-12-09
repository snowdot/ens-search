import styles from "./styles.module.css";
import {
  Card,
  Typography,
  Avatar,
  Skeleton,
  SkeletonGroup,
} from "@ensdomains/thorin";
import IdentitiesCard from "../IdentitiesCard";

const PLACEHOLDER_PROFILE = {
  name: "ENS Account",
  address: "0x0000000000000000000000000000000000000000",
  description:
    "This is the placeholder for the description that will be shown when the profile is loading",
  avatar: "",
  url: "",
};

export default function ProfileCard({ loading, profile, color }) {
  const displayProfile = loading ? PLACEHOLDER_PROFILE : profile;
  const { name, address, description, avatar, url } = displayProfile;

  return (
    <Card>
      <SkeletonGroup loading={loading}>
        <div className={styles.profileCardHead}>
          <div className={styles.profileCardAvatar}>
            <Avatar label="avatar" src={avatar} />
          </div>
          <div className={styles.profileCardInfo}>
            <Skeleton>
              <Typography fontVariant="extraLargeBold" color={color}>
                {name}
              </Typography>
            </Skeleton>
            <Skeleton>
              <Typography
                fontVariant="small"
                color={color}
                weight="normal"
                ellipsis
              >
                {address}
              </Typography>
            </Skeleton>
          </div>
        </div>
        {description && (
          <Skeleton>
            <Typography fontVariant="base" weight="normal" color={color}>
              {description}
            </Typography>
          </Skeleton>
        )}
        <Skeleton>
          {address && <IdentitiesCard address={address?.toLowerCase()} />}
        </Skeleton>
      </SkeletonGroup>
    </Card>
  );
}
