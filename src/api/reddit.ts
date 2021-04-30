import axios from "axios";
import {
  RedditListingResponseInterface,
  RedditListingInterface,
} from "../interfaces/reddit";

const getAuthToken = async (): Promise<string> => {
  const { data } = await axios.get("/reddit/auth");
  return data.accessToken;
};

export default async function getTopPosts(): Promise<RedditListingInterface[]> {
  if (process.env.NODE_ENV === "development") {
    const { data } = await axios.get<RedditListingResponseInterface>(
      "data/top.json"
    );

    return data.data.children;
  }

  const accessToken = await getAuthToken();
  const { data } = await axios.get<RedditListingResponseInterface>(
    "https://oauth.reddit.com/top",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return data.data.children;
}
