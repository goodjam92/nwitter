import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import { dbService } from "../firebase";

import NweetFactory from "../components/NweetFactory";
const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    // (snapshot) 실시간으로 데이터를 받아서 표시할 수 있는 아주 좋은 방법
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  return (
    <div className="homeContainer">
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
