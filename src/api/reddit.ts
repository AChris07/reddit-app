import axios from "axios";
import {
  RedditListingResponseInterface,
  RedditListingDataInterface,
} from "../interfaces/reddit";

const getAuthToken = async (): Promise<string> => {
  const { data } = await axios.get("/reddit/auth");
  return data.accessToken;
};

export default async function getTopPosts(
  offset: number = 0,
  nextToken?: string
): Promise<RedditListingDataInterface> {
  if (process.env.NODE_ENV === "development") {
    const { data } = await axios.get<RedditListingResponseInterface>(
      "data/top.json"
    );

    return data.data;
  }

  const accessToken = await getAuthToken();
  const { data } = await axios.get<RedditListingResponseInterface>(
    `https://oauth.reddit.com/top?count=${offset}`,
    {
      params: { count: offset, after: nextToken },
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return data.data;
}
