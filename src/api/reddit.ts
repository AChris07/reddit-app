import axios from "axios";
import {
  RedditListingResponseInterface,
  RedditListingInterface,
} from "../interfaces/reddit";

// TODO: Replace mocked response with actual data fetch from Reddit
export default async function getTopPosts(): Promise<RedditListingInterface[]> {
  const { data } = await axios.get<RedditListingResponseInterface>(
    "data/top.json"
  );

  return data.data.children;
}
