export interface RedditListingResponseInterface {
  kind: string;
  data: RedditListingDataInterface;
}

export interface RedditListingDataInterface {
  modhash: string;
  dist: number;
  children: RedditListingInterface[];
  after: string;
}

export interface RedditListingInterface {
  kind: string;
  data: RedditPostInterface;
}

export interface RedditPostInterface {
  domain: string;
  banned_by: string | null;
  media_embed: Record<string, string>;
  subreddit: string;
  selftext_html: string | null;
  selftext: string;
  link_flair_text: string | null;
  id: string;
  gilded: number;
  secure_media_embed: Record<string, string>;
  clicked: boolean;
  report_reasons: string | null;
  author: string;
  media: Record<string, string> | null;
  score: number;
  approved_by: string | null;
  over_18: boolean;
  hidden: boolean;
  thumbnail: string;
  subreddit_id: string;
  edited: boolean;
  link_flair_css_class: string | null;
  author_flair_css_class: string | null;
  downs: number;
  saved: boolean;
  is_self: boolean;
  name: string;
  permalink: string;
  stickied: boolean;
  created: number;
  url: string;
  author_flair_text: string | null;
  title: string;
  created_utc: number;
  ups: number;
  num_comments: number;
  visited: boolean;
  num_reports: number | null;
}
