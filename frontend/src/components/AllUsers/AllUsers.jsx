import { useContext, useEffect, useState } from "react";
import styles from "./AllUsers.module.css";
import { getAllUsers } from "../../api/users";
import {
  toggleFollowUser,
  getFollowRequests,
  acceptFollowRequest,
} from "../../api/follow";
import { HomeContext } from "../../pages/Home/Home";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [requestsSent, setRequestsSent] = useState([]);
  const [requestsReceived, setRequestsReceived] = useState([]);
  const { following, fetchFollowing } = useContext(HomeContext);

  const fetchUsersCb = async () => {
    const fetchedUsers = await getAllUsers();
    setUsers(fetchedUsers);
  };
  const fetchFollowRequestsCb = async () => {
    const { received, sent } = await getFollowRequests();
    if (received) setRequestsReceived(received.map((req) => req.requesterId));
    if (sent) setRequestsSent(sent.map((res) => res.responderId));
  };
  useEffect(() => {
    fetchUsersCb();
    fetchFollowing();
    fetchFollowRequestsCb();
  }, []);

  async function handleFollowClick(userId, follow) {
    await toggleFollowUser(userId, follow);
    fetchFollowing();
    fetchFollowRequestsCb();
  }

  async function handleFollowRequest(userId, accept) {
    if (accept) await acceptFollowRequest(userId);
    fetchFollowing();
    fetchFollowRequestsCb();
  }

  return (
    <div className={styles.container}>
      <h2>All Users</h2>
      <div className={styles.allUsers}>
        {users.map((otherUser) => (
          <div className={styles.user} key={otherUser.id}>
            <img
              src={
                otherUser.avatarUrl
                  ? otherUser.avatarUrl
                  : "/face-man-profile.svg"
              }
              alt="profile pic"
              className={
                otherUser.avatarUrl
                  ? styles.profilePic
                  : `${styles.profilePic} genericPic`
              }
            ></img>
            <div className={styles.displayName}>{otherUser.displayName}</div>
            <div className={styles.email}>{otherUser.email}</div>
            <div className={styles.buttons}>
              {following.filter((follow) => follow.followingId === otherUser.id)
                .length > 0 ? (
                // if logged in user is already following this other user
                <button
                  className={styles.followingBtn}
                  onClick={() => handleFollowClick(otherUser.id, false)}
                >
                  <img
                    src="/check.svg"
                    alt="unfollow"
                    className={styles.followingIcon}
                  />
                  Following
                </button>
              ) : (
                // if logged in user is NOT following this other user
                <button
                  className={styles.followBtn}
                  onClick={() => {
                    if (requestsSent.includes(otherUser.id))
                      handleFollowRequest(otherUser.id, false);
                    else handleFollowClick(otherUser.id, true);
                  }}
                >
                  {requestsSent.includes(otherUser.id) ? (
                    // if logged in user sent a follow request to other user
                    <>
                      <img
                        src="/clock-outline.svg"
                        alt="pending"
                        className={styles.sentRequestIcon}
                      />
                      Follow request sent
                    </>
                  ) : (
                    <>
                      <img
                        src="/plus.svg"
                        alt="follow"
                        className={styles.followIcon}
                      />
                      Follow
                    </>
                  )}
                </button>
              )}
              {requestsReceived.includes(otherUser.id) ? (
                // if other user sent a follow request to logged in user
                <button
                  className={styles.acceptFollowBtn}
                  onClick={() => handleFollowRequest(otherUser.id, true)}
                >
                  <>
                    <img
                      src="/check.svg"
                      alt="accept"
                      className={styles.acceptFollowIcon}
                    />
                    Accept follow request
                  </>
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { AllUsers };
