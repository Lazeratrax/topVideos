
export interface ISearchString {
  search_string: string;
}

export interface IVideoParams {
  channelId: string;
  part: string;
  chart: string;
  maxResults: number;
  q: string;
  key: string;
  isFavorite: boolean;
}

export interface IVideosResponseString {
  nextPageToken: string;
  items: IVideoItem[];
}

export interface IVideoItem {
  snippet: ISnippet;
  id: IVideoItemId;
}

export interface IVideoItemId {
  videoId: string;
}

export interface ISnippet {
  title: string;
  thumbnails: IListThumbnails;
  description?: string;
  publishTime?: string;
}

export interface IListThumbnails {
  medium: Thumbnail;
}

export interface Thumbnail {
  url: string;
}
