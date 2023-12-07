import styles from "./styles.module.css";
import { Card, Typography, Avatar, Skeleton } from "@ensdomains/thorin";
import { trimAddress } from "@/app/helpers/functions";

export default function ProfileCard({ loading, profile }) {
  const { name, address, description, avatar } = profile;

  return (
    <Card>
      <div className={styles.profileCardHead}>
        <div className={styles.profileCardAvatar}>
          <Avatar label="avatar" src={avatar} />
        </div>
        <div className={styles.profileCardInfo}>
          <Skeleton loading={loading}>
            <Typography fontVariant="extraLarge">{name}</Typography>
          </Skeleton>
          <Skeleton loading={loading}>
            <Typography fontVariant="base">{trimAddress(address)}</Typography>
          </Skeleton>
        </div>
      </div>
      <Skeleton loading={loading}>
        <Typography fontVariant="large">{description}</Typography>
      </Skeleton>
    </Card>
  );
}
