//List of Albums
export interface Albums {
  album_group: AlbumGroup;
  album_type: AlbumGroup;
  artists: Artist[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_playable: boolean;
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumGroup;
  uri: string;
}

export enum AlbumGroup {
  Album = "album",
}

export interface Artist {
  external_urls: string;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = "day",
  Year = "year",
}


//Single Album
export interface Album {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

//Related Artist
export interface RelatedArtist {
  external_urls: ExternalUrls;
  followers:     Followers;
  genres:        string[];
  href:          string;
  id:            string;
  images:        Image[];
  name:          string;
  popularity:    number;
  type:          string;
  uri:           string;
}

export interface Followers {
  href:  null;
  total: number;
}


