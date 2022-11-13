import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  GatsbyImageData: any;
  JSON: any;
  db_date: any;
  db_timestamptz: any;
};

export type AvifOptions = {
  lossless?: InputMaybe<Scalars['Boolean']>;
  quality?: InputMaybe<Scalars['Int']>;
  speed?: InputMaybe<Scalars['Int']>;
};

export type BlurredOptions = {
  /** Force the output format for the low-res preview. Default is to use the same format as the input. You should rarely need to change this */
  toFormat?: InputMaybe<ImageFormat>;
  /** Width of the generated low-res preview. Default is 20px */
  width?: InputMaybe<Scalars['Int']>;
};

export type BooleanQueryOperatorInput = {
  eq?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  ne?: InputMaybe<Scalars['Boolean']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
};

export enum Chapter {
  Club = 'Club',
  Huron = 'Huron',
  Other = 'Other',
  Ottawa = 'Ottawa',
  Simcoe = 'Simcoe',
  Toronto = 'Toronto'
}

export type ChapterQueryOperatorInput = {
  eq?: InputMaybe<Chapter>;
  in?: InputMaybe<Array<InputMaybe<Chapter>>>;
  ne?: InputMaybe<Chapter>;
  nin?: InputMaybe<Array<InputMaybe<Chapter>>>;
};

export type DateQueryOperatorInput = {
  eq?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  ne?: InputMaybe<Scalars['Date']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
};

export type Directory = Node & {
  __typename?: 'Directory';
  absolutePath: Scalars['String'];
  accessTime: Scalars['Date'];
  atime: Scalars['Date'];
  atimeMs: Scalars['Float'];
  base: Scalars['String'];
  birthTime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars['Float']>;
  changeTime: Scalars['Date'];
  children: Array<Node>;
  ctime: Scalars['Date'];
  ctimeMs: Scalars['Float'];
  dev: Scalars['Int'];
  dir: Scalars['String'];
  ext: Scalars['String'];
  extension: Scalars['String'];
  gid: Scalars['Int'];
  id: Scalars['ID'];
  ino: Scalars['Float'];
  internal: Internal;
  mode: Scalars['Int'];
  modifiedTime: Scalars['Date'];
  mtime: Scalars['Date'];
  mtimeMs: Scalars['Float'];
  name: Scalars['String'];
  nlink: Scalars['Int'];
  parent?: Maybe<Node>;
  prettySize: Scalars['String'];
  rdev: Scalars['Int'];
  relativeDirectory: Scalars['String'];
  relativePath: Scalars['String'];
  root: Scalars['String'];
  size: Scalars['Int'];
  sourceInstanceName: Scalars['String'];
  uid: Scalars['Int'];
};


export type DirectoryAccessTimeArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryAtimeArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryBirthTimeArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryChangeTimeArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryCtimeArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryModifiedTimeArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryMtimeArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type DirectoryConnection = {
  __typename?: 'DirectoryConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<DirectoryEdge>;
  group: Array<DirectoryGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<Directory>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type DirectoryConnectionDistinctArgs = {
  field: DirectoryFieldSelector;
};


export type DirectoryConnectionGroupArgs = {
  field: DirectoryFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type DirectoryConnectionMaxArgs = {
  field: DirectoryFieldSelector;
};


export type DirectoryConnectionMinArgs = {
  field: DirectoryFieldSelector;
};


export type DirectoryConnectionSumArgs = {
  field: DirectoryFieldSelector;
};

export type DirectoryEdge = {
  __typename?: 'DirectoryEdge';
  next?: Maybe<Directory>;
  node: Directory;
  previous?: Maybe<Directory>;
};

export type DirectoryFieldSelector = {
  absolutePath?: InputMaybe<FieldSelectorEnum>;
  accessTime?: InputMaybe<FieldSelectorEnum>;
  atime?: InputMaybe<FieldSelectorEnum>;
  atimeMs?: InputMaybe<FieldSelectorEnum>;
  base?: InputMaybe<FieldSelectorEnum>;
  birthTime?: InputMaybe<FieldSelectorEnum>;
  birthtime?: InputMaybe<FieldSelectorEnum>;
  birthtimeMs?: InputMaybe<FieldSelectorEnum>;
  changeTime?: InputMaybe<FieldSelectorEnum>;
  children?: InputMaybe<NodeFieldSelector>;
  ctime?: InputMaybe<FieldSelectorEnum>;
  ctimeMs?: InputMaybe<FieldSelectorEnum>;
  dev?: InputMaybe<FieldSelectorEnum>;
  dir?: InputMaybe<FieldSelectorEnum>;
  ext?: InputMaybe<FieldSelectorEnum>;
  extension?: InputMaybe<FieldSelectorEnum>;
  gid?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  ino?: InputMaybe<FieldSelectorEnum>;
  internal?: InputMaybe<InternalFieldSelector>;
  mode?: InputMaybe<FieldSelectorEnum>;
  modifiedTime?: InputMaybe<FieldSelectorEnum>;
  mtime?: InputMaybe<FieldSelectorEnum>;
  mtimeMs?: InputMaybe<FieldSelectorEnum>;
  name?: InputMaybe<FieldSelectorEnum>;
  nlink?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  prettySize?: InputMaybe<FieldSelectorEnum>;
  rdev?: InputMaybe<FieldSelectorEnum>;
  relativeDirectory?: InputMaybe<FieldSelectorEnum>;
  relativePath?: InputMaybe<FieldSelectorEnum>;
  root?: InputMaybe<FieldSelectorEnum>;
  size?: InputMaybe<FieldSelectorEnum>;
  sourceInstanceName?: InputMaybe<FieldSelectorEnum>;
  uid?: InputMaybe<FieldSelectorEnum>;
};

export type DirectoryFilterInput = {
  absolutePath?: InputMaybe<StringQueryOperatorInput>;
  accessTime?: InputMaybe<DateQueryOperatorInput>;
  atime?: InputMaybe<DateQueryOperatorInput>;
  atimeMs?: InputMaybe<FloatQueryOperatorInput>;
  base?: InputMaybe<StringQueryOperatorInput>;
  birthTime?: InputMaybe<DateQueryOperatorInput>;
  birthtime?: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  changeTime?: InputMaybe<DateQueryOperatorInput>;
  children?: InputMaybe<NodeFilterListInput>;
  ctime?: InputMaybe<DateQueryOperatorInput>;
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>;
  dev?: InputMaybe<IntQueryOperatorInput>;
  dir?: InputMaybe<StringQueryOperatorInput>;
  ext?: InputMaybe<StringQueryOperatorInput>;
  extension?: InputMaybe<StringQueryOperatorInput>;
  gid?: InputMaybe<IntQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  ino?: InputMaybe<FloatQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  mode?: InputMaybe<IntQueryOperatorInput>;
  modifiedTime?: InputMaybe<DateQueryOperatorInput>;
  mtime?: InputMaybe<DateQueryOperatorInput>;
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  nlink?: InputMaybe<IntQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  prettySize?: InputMaybe<StringQueryOperatorInput>;
  rdev?: InputMaybe<IntQueryOperatorInput>;
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
  root?: InputMaybe<StringQueryOperatorInput>;
  size?: InputMaybe<IntQueryOperatorInput>;
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>;
  uid?: InputMaybe<IntQueryOperatorInput>;
};

export type DirectoryGroupConnection = {
  __typename?: 'DirectoryGroupConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<DirectoryEdge>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
  group: Array<DirectoryGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<Directory>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type DirectoryGroupConnectionDistinctArgs = {
  field: DirectoryFieldSelector;
};


export type DirectoryGroupConnectionGroupArgs = {
  field: DirectoryFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type DirectoryGroupConnectionMaxArgs = {
  field: DirectoryFieldSelector;
};


export type DirectoryGroupConnectionMinArgs = {
  field: DirectoryFieldSelector;
};


export type DirectoryGroupConnectionSumArgs = {
  field: DirectoryFieldSelector;
};

export type DirectorySortInput = {
  absolutePath?: InputMaybe<SortOrderEnum>;
  accessTime?: InputMaybe<SortOrderEnum>;
  atime?: InputMaybe<SortOrderEnum>;
  atimeMs?: InputMaybe<SortOrderEnum>;
  base?: InputMaybe<SortOrderEnum>;
  birthTime?: InputMaybe<SortOrderEnum>;
  birthtime?: InputMaybe<SortOrderEnum>;
  birthtimeMs?: InputMaybe<SortOrderEnum>;
  changeTime?: InputMaybe<SortOrderEnum>;
  children?: InputMaybe<NodeSortInput>;
  ctime?: InputMaybe<SortOrderEnum>;
  ctimeMs?: InputMaybe<SortOrderEnum>;
  dev?: InputMaybe<SortOrderEnum>;
  dir?: InputMaybe<SortOrderEnum>;
  ext?: InputMaybe<SortOrderEnum>;
  extension?: InputMaybe<SortOrderEnum>;
  gid?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  ino?: InputMaybe<SortOrderEnum>;
  internal?: InputMaybe<InternalSortInput>;
  mode?: InputMaybe<SortOrderEnum>;
  modifiedTime?: InputMaybe<SortOrderEnum>;
  mtime?: InputMaybe<SortOrderEnum>;
  mtimeMs?: InputMaybe<SortOrderEnum>;
  name?: InputMaybe<SortOrderEnum>;
  nlink?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  prettySize?: InputMaybe<SortOrderEnum>;
  rdev?: InputMaybe<SortOrderEnum>;
  relativeDirectory?: InputMaybe<SortOrderEnum>;
  relativePath?: InputMaybe<SortOrderEnum>;
  root?: InputMaybe<SortOrderEnum>;
  size?: InputMaybe<SortOrderEnum>;
  sourceInstanceName?: InputMaybe<SortOrderEnum>;
  uid?: InputMaybe<SortOrderEnum>;
};

export type DuotoneGradient = {
  highlight: Scalars['String'];
  opacity?: InputMaybe<Scalars['Int']>;
  shadow: Scalars['String'];
};

export enum EventType {
  Brevet = 'Brevet',
  Fleche = 'Fleche',
  Other = 'Other',
  Permanent = 'Permanent',
  Populaire = 'Populaire'
}

export type EventTypeQueryOperatorInput = {
  eq?: InputMaybe<EventType>;
  in?: InputMaybe<Array<InputMaybe<EventType>>>;
  ne?: InputMaybe<EventType>;
  nin?: InputMaybe<Array<InputMaybe<EventType>>>;
};

export type Feedblog = Node & {
  __typename?: 'Feedblog';
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
  children: Array<Node>;
  comments?: Maybe<Scalars['String']>;
  content?: Maybe<FeedblogContent>;
  contentSnippet?: Maybe<Scalars['String']>;
  creator?: Maybe<Scalars['String']>;
  dc?: Maybe<FeedblogDc>;
  guid?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  internal: Internal;
  isoDate?: Maybe<Scalars['Date']>;
  link?: Maybe<Scalars['String']>;
  parent?: Maybe<Node>;
  pubDate?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};


export type FeedblogIsoDateArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type FeedblogConnection = {
  __typename?: 'FeedblogConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<FeedblogEdge>;
  group: Array<FeedblogGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<Feedblog>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type FeedblogConnectionDistinctArgs = {
  field: FeedblogFieldSelector;
};


export type FeedblogConnectionGroupArgs = {
  field: FeedblogFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type FeedblogConnectionMaxArgs = {
  field: FeedblogFieldSelector;
};


export type FeedblogConnectionMinArgs = {
  field: FeedblogFieldSelector;
};


export type FeedblogConnectionSumArgs = {
  field: FeedblogFieldSelector;
};

export type FeedblogContent = {
  __typename?: 'FeedblogContent';
  encoded?: Maybe<Scalars['String']>;
  encodedSnippet?: Maybe<Scalars['String']>;
};

export type FeedblogContentFieldSelector = {
  encoded?: InputMaybe<FieldSelectorEnum>;
  encodedSnippet?: InputMaybe<FieldSelectorEnum>;
};

export type FeedblogContentFilterInput = {
  encoded?: InputMaybe<StringQueryOperatorInput>;
  encodedSnippet?: InputMaybe<StringQueryOperatorInput>;
};

export type FeedblogContentSortInput = {
  encoded?: InputMaybe<SortOrderEnum>;
  encodedSnippet?: InputMaybe<SortOrderEnum>;
};

export type FeedblogDc = {
  __typename?: 'FeedblogDc';
  creator?: Maybe<Scalars['String']>;
};

export type FeedblogDcFieldSelector = {
  creator?: InputMaybe<FieldSelectorEnum>;
};

export type FeedblogDcFilterInput = {
  creator?: InputMaybe<StringQueryOperatorInput>;
};

export type FeedblogDcSortInput = {
  creator?: InputMaybe<SortOrderEnum>;
};

export type FeedblogEdge = {
  __typename?: 'FeedblogEdge';
  next?: Maybe<Feedblog>;
  node: Feedblog;
  previous?: Maybe<Feedblog>;
};

export type FeedblogFieldSelector = {
  categories?: InputMaybe<FieldSelectorEnum>;
  children?: InputMaybe<NodeFieldSelector>;
  comments?: InputMaybe<FieldSelectorEnum>;
  content?: InputMaybe<FeedblogContentFieldSelector>;
  contentSnippet?: InputMaybe<FieldSelectorEnum>;
  creator?: InputMaybe<FieldSelectorEnum>;
  dc?: InputMaybe<FeedblogDcFieldSelector>;
  guid?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  internal?: InputMaybe<InternalFieldSelector>;
  isoDate?: InputMaybe<FieldSelectorEnum>;
  link?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  pubDate?: InputMaybe<FieldSelectorEnum>;
  title?: InputMaybe<FieldSelectorEnum>;
};

export type FeedblogFilterInput = {
  categories?: InputMaybe<StringQueryOperatorInput>;
  children?: InputMaybe<NodeFilterListInput>;
  comments?: InputMaybe<StringQueryOperatorInput>;
  content?: InputMaybe<FeedblogContentFilterInput>;
  contentSnippet?: InputMaybe<StringQueryOperatorInput>;
  creator?: InputMaybe<StringQueryOperatorInput>;
  dc?: InputMaybe<FeedblogDcFilterInput>;
  guid?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  isoDate?: InputMaybe<DateQueryOperatorInput>;
  link?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  pubDate?: InputMaybe<StringQueryOperatorInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
};

export type FeedblogGroupConnection = {
  __typename?: 'FeedblogGroupConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<FeedblogEdge>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
  group: Array<FeedblogGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<Feedblog>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type FeedblogGroupConnectionDistinctArgs = {
  field: FeedblogFieldSelector;
};


export type FeedblogGroupConnectionGroupArgs = {
  field: FeedblogFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type FeedblogGroupConnectionMaxArgs = {
  field: FeedblogFieldSelector;
};


export type FeedblogGroupConnectionMinArgs = {
  field: FeedblogFieldSelector;
};


export type FeedblogGroupConnectionSumArgs = {
  field: FeedblogFieldSelector;
};

export type FeedblogMeta = Node & {
  __typename?: 'FeedblogMeta';
  children: Array<Node>;
  description?: Maybe<Scalars['String']>;
  feedUrl?: Maybe<Scalars['String']>;
  generator?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  internal: Internal;
  language?: Maybe<Scalars['String']>;
  lastBuildDate?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  paginationLinks?: Maybe<FeedblogMetaPaginationLinks>;
  parent?: Maybe<Node>;
  title?: Maybe<Scalars['String']>;
};

export type FeedblogMetaConnection = {
  __typename?: 'FeedblogMetaConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<FeedblogMetaEdge>;
  group: Array<FeedblogMetaGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<FeedblogMeta>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type FeedblogMetaConnectionDistinctArgs = {
  field: FeedblogMetaFieldSelector;
};


export type FeedblogMetaConnectionGroupArgs = {
  field: FeedblogMetaFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type FeedblogMetaConnectionMaxArgs = {
  field: FeedblogMetaFieldSelector;
};


export type FeedblogMetaConnectionMinArgs = {
  field: FeedblogMetaFieldSelector;
};


export type FeedblogMetaConnectionSumArgs = {
  field: FeedblogMetaFieldSelector;
};

export type FeedblogMetaEdge = {
  __typename?: 'FeedblogMetaEdge';
  next?: Maybe<FeedblogMeta>;
  node: FeedblogMeta;
  previous?: Maybe<FeedblogMeta>;
};

export type FeedblogMetaFieldSelector = {
  children?: InputMaybe<NodeFieldSelector>;
  description?: InputMaybe<FieldSelectorEnum>;
  feedUrl?: InputMaybe<FieldSelectorEnum>;
  generator?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  internal?: InputMaybe<InternalFieldSelector>;
  language?: InputMaybe<FieldSelectorEnum>;
  lastBuildDate?: InputMaybe<FieldSelectorEnum>;
  link?: InputMaybe<FieldSelectorEnum>;
  paginationLinks?: InputMaybe<FeedblogMetaPaginationLinksFieldSelector>;
  parent?: InputMaybe<NodeFieldSelector>;
  title?: InputMaybe<FieldSelectorEnum>;
};

export type FeedblogMetaFilterInput = {
  children?: InputMaybe<NodeFilterListInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  feedUrl?: InputMaybe<StringQueryOperatorInput>;
  generator?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  language?: InputMaybe<StringQueryOperatorInput>;
  lastBuildDate?: InputMaybe<StringQueryOperatorInput>;
  link?: InputMaybe<StringQueryOperatorInput>;
  paginationLinks?: InputMaybe<FeedblogMetaPaginationLinksFilterInput>;
  parent?: InputMaybe<NodeFilterInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
};

export type FeedblogMetaGroupConnection = {
  __typename?: 'FeedblogMetaGroupConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<FeedblogMetaEdge>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
  group: Array<FeedblogMetaGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<FeedblogMeta>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type FeedblogMetaGroupConnectionDistinctArgs = {
  field: FeedblogMetaFieldSelector;
};


export type FeedblogMetaGroupConnectionGroupArgs = {
  field: FeedblogMetaFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type FeedblogMetaGroupConnectionMaxArgs = {
  field: FeedblogMetaFieldSelector;
};


export type FeedblogMetaGroupConnectionMinArgs = {
  field: FeedblogMetaFieldSelector;
};


export type FeedblogMetaGroupConnectionSumArgs = {
  field: FeedblogMetaFieldSelector;
};

export type FeedblogMetaPaginationLinks = {
  __typename?: 'FeedblogMetaPaginationLinks';
  self?: Maybe<Scalars['String']>;
};

export type FeedblogMetaPaginationLinksFieldSelector = {
  self?: InputMaybe<FieldSelectorEnum>;
};

export type FeedblogMetaPaginationLinksFilterInput = {
  self?: InputMaybe<StringQueryOperatorInput>;
};

export type FeedblogMetaPaginationLinksSortInput = {
  self?: InputMaybe<SortOrderEnum>;
};

export type FeedblogMetaSortInput = {
  children?: InputMaybe<NodeSortInput>;
  description?: InputMaybe<SortOrderEnum>;
  feedUrl?: InputMaybe<SortOrderEnum>;
  generator?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  internal?: InputMaybe<InternalSortInput>;
  language?: InputMaybe<SortOrderEnum>;
  lastBuildDate?: InputMaybe<SortOrderEnum>;
  link?: InputMaybe<SortOrderEnum>;
  paginationLinks?: InputMaybe<FeedblogMetaPaginationLinksSortInput>;
  parent?: InputMaybe<NodeSortInput>;
  title?: InputMaybe<SortOrderEnum>;
};

export type FeedblogSortInput = {
  categories?: InputMaybe<SortOrderEnum>;
  children?: InputMaybe<NodeSortInput>;
  comments?: InputMaybe<SortOrderEnum>;
  content?: InputMaybe<FeedblogContentSortInput>;
  contentSnippet?: InputMaybe<SortOrderEnum>;
  creator?: InputMaybe<SortOrderEnum>;
  dc?: InputMaybe<FeedblogDcSortInput>;
  guid?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  internal?: InputMaybe<InternalSortInput>;
  isoDate?: InputMaybe<SortOrderEnum>;
  link?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  pubDate?: InputMaybe<SortOrderEnum>;
  title?: InputMaybe<SortOrderEnum>;
};

export enum FieldSelectorEnum {
  Select = 'SELECT'
}

export type File = Node & {
  __typename?: 'File';
  absolutePath: Scalars['String'];
  accessTime: Scalars['Date'];
  atime: Scalars['Date'];
  atimeMs: Scalars['Float'];
  base: Scalars['String'];
  birthTime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars['Float']>;
  blksize?: Maybe<Scalars['Int']>;
  blocks?: Maybe<Scalars['Int']>;
  changeTime: Scalars['Date'];
  /** Returns the first child node of type ImageSharp or null if there are no children of given type on this node */
  childImageSharp?: Maybe<ImageSharp>;
  children: Array<Node>;
  /** Returns all children nodes filtered by type ImageSharp */
  childrenImageSharp?: Maybe<Array<Maybe<ImageSharp>>>;
  ctime: Scalars['Date'];
  ctimeMs: Scalars['Float'];
  dev: Scalars['Int'];
  dir: Scalars['String'];
  ext: Scalars['String'];
  extension: Scalars['String'];
  gid: Scalars['Int'];
  id: Scalars['ID'];
  ino: Scalars['Float'];
  internal: Internal;
  mode: Scalars['Int'];
  modifiedTime: Scalars['Date'];
  mtime: Scalars['Date'];
  mtimeMs: Scalars['Float'];
  name: Scalars['String'];
  nlink: Scalars['Int'];
  parent?: Maybe<Node>;
  prettySize: Scalars['String'];
  /** Copy file to static directory and return public url to it */
  publicURL?: Maybe<Scalars['String']>;
  rdev: Scalars['Int'];
  relativeDirectory: Scalars['String'];
  relativePath: Scalars['String'];
  root: Scalars['String'];
  size: Scalars['Int'];
  sourceInstanceName: Scalars['String'];
  uid: Scalars['Int'];
};


export type FileAccessTimeArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileAtimeArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileBirthTimeArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileChangeTimeArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileCtimeArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileModifiedTimeArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileMtimeArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type FileConnection = {
  __typename?: 'FileConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<FileEdge>;
  group: Array<FileGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<File>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type FileConnectionDistinctArgs = {
  field: FileFieldSelector;
};


export type FileConnectionGroupArgs = {
  field: FileFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type FileConnectionMaxArgs = {
  field: FileFieldSelector;
};


export type FileConnectionMinArgs = {
  field: FileFieldSelector;
};


export type FileConnectionSumArgs = {
  field: FileFieldSelector;
};

export type FileEdge = {
  __typename?: 'FileEdge';
  next?: Maybe<File>;
  node: File;
  previous?: Maybe<File>;
};

export type FileFieldSelector = {
  absolutePath?: InputMaybe<FieldSelectorEnum>;
  accessTime?: InputMaybe<FieldSelectorEnum>;
  atime?: InputMaybe<FieldSelectorEnum>;
  atimeMs?: InputMaybe<FieldSelectorEnum>;
  base?: InputMaybe<FieldSelectorEnum>;
  birthTime?: InputMaybe<FieldSelectorEnum>;
  birthtime?: InputMaybe<FieldSelectorEnum>;
  birthtimeMs?: InputMaybe<FieldSelectorEnum>;
  blksize?: InputMaybe<FieldSelectorEnum>;
  blocks?: InputMaybe<FieldSelectorEnum>;
  changeTime?: InputMaybe<FieldSelectorEnum>;
  childImageSharp?: InputMaybe<ImageSharpFieldSelector>;
  children?: InputMaybe<NodeFieldSelector>;
  childrenImageSharp?: InputMaybe<ImageSharpFieldSelector>;
  ctime?: InputMaybe<FieldSelectorEnum>;
  ctimeMs?: InputMaybe<FieldSelectorEnum>;
  dev?: InputMaybe<FieldSelectorEnum>;
  dir?: InputMaybe<FieldSelectorEnum>;
  ext?: InputMaybe<FieldSelectorEnum>;
  extension?: InputMaybe<FieldSelectorEnum>;
  gid?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  ino?: InputMaybe<FieldSelectorEnum>;
  internal?: InputMaybe<InternalFieldSelector>;
  mode?: InputMaybe<FieldSelectorEnum>;
  modifiedTime?: InputMaybe<FieldSelectorEnum>;
  mtime?: InputMaybe<FieldSelectorEnum>;
  mtimeMs?: InputMaybe<FieldSelectorEnum>;
  name?: InputMaybe<FieldSelectorEnum>;
  nlink?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  prettySize?: InputMaybe<FieldSelectorEnum>;
  publicURL?: InputMaybe<FieldSelectorEnum>;
  rdev?: InputMaybe<FieldSelectorEnum>;
  relativeDirectory?: InputMaybe<FieldSelectorEnum>;
  relativePath?: InputMaybe<FieldSelectorEnum>;
  root?: InputMaybe<FieldSelectorEnum>;
  size?: InputMaybe<FieldSelectorEnum>;
  sourceInstanceName?: InputMaybe<FieldSelectorEnum>;
  uid?: InputMaybe<FieldSelectorEnum>;
};

export type FileFilterInput = {
  absolutePath?: InputMaybe<StringQueryOperatorInput>;
  accessTime?: InputMaybe<DateQueryOperatorInput>;
  atime?: InputMaybe<DateQueryOperatorInput>;
  atimeMs?: InputMaybe<FloatQueryOperatorInput>;
  base?: InputMaybe<StringQueryOperatorInput>;
  birthTime?: InputMaybe<DateQueryOperatorInput>;
  birthtime?: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  blksize?: InputMaybe<IntQueryOperatorInput>;
  blocks?: InputMaybe<IntQueryOperatorInput>;
  changeTime?: InputMaybe<DateQueryOperatorInput>;
  childImageSharp?: InputMaybe<ImageSharpFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  childrenImageSharp?: InputMaybe<ImageSharpFilterListInput>;
  ctime?: InputMaybe<DateQueryOperatorInput>;
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>;
  dev?: InputMaybe<IntQueryOperatorInput>;
  dir?: InputMaybe<StringQueryOperatorInput>;
  ext?: InputMaybe<StringQueryOperatorInput>;
  extension?: InputMaybe<StringQueryOperatorInput>;
  gid?: InputMaybe<IntQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  ino?: InputMaybe<FloatQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  mode?: InputMaybe<IntQueryOperatorInput>;
  modifiedTime?: InputMaybe<DateQueryOperatorInput>;
  mtime?: InputMaybe<DateQueryOperatorInput>;
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  nlink?: InputMaybe<IntQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  prettySize?: InputMaybe<StringQueryOperatorInput>;
  publicURL?: InputMaybe<StringQueryOperatorInput>;
  rdev?: InputMaybe<IntQueryOperatorInput>;
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
  root?: InputMaybe<StringQueryOperatorInput>;
  size?: InputMaybe<IntQueryOperatorInput>;
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>;
  uid?: InputMaybe<IntQueryOperatorInput>;
};

export type FileGroupConnection = {
  __typename?: 'FileGroupConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<FileEdge>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
  group: Array<FileGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<File>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type FileGroupConnectionDistinctArgs = {
  field: FileFieldSelector;
};


export type FileGroupConnectionGroupArgs = {
  field: FileFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type FileGroupConnectionMaxArgs = {
  field: FileFieldSelector;
};


export type FileGroupConnectionMinArgs = {
  field: FileFieldSelector;
};


export type FileGroupConnectionSumArgs = {
  field: FileFieldSelector;
};

export type FileSortInput = {
  absolutePath?: InputMaybe<SortOrderEnum>;
  accessTime?: InputMaybe<SortOrderEnum>;
  atime?: InputMaybe<SortOrderEnum>;
  atimeMs?: InputMaybe<SortOrderEnum>;
  base?: InputMaybe<SortOrderEnum>;
  birthTime?: InputMaybe<SortOrderEnum>;
  birthtime?: InputMaybe<SortOrderEnum>;
  birthtimeMs?: InputMaybe<SortOrderEnum>;
  blksize?: InputMaybe<SortOrderEnum>;
  blocks?: InputMaybe<SortOrderEnum>;
  changeTime?: InputMaybe<SortOrderEnum>;
  childImageSharp?: InputMaybe<ImageSharpSortInput>;
  children?: InputMaybe<NodeSortInput>;
  childrenImageSharp?: InputMaybe<ImageSharpSortInput>;
  ctime?: InputMaybe<SortOrderEnum>;
  ctimeMs?: InputMaybe<SortOrderEnum>;
  dev?: InputMaybe<SortOrderEnum>;
  dir?: InputMaybe<SortOrderEnum>;
  ext?: InputMaybe<SortOrderEnum>;
  extension?: InputMaybe<SortOrderEnum>;
  gid?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  ino?: InputMaybe<SortOrderEnum>;
  internal?: InputMaybe<InternalSortInput>;
  mode?: InputMaybe<SortOrderEnum>;
  modifiedTime?: InputMaybe<SortOrderEnum>;
  mtime?: InputMaybe<SortOrderEnum>;
  mtimeMs?: InputMaybe<SortOrderEnum>;
  name?: InputMaybe<SortOrderEnum>;
  nlink?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  prettySize?: InputMaybe<SortOrderEnum>;
  publicURL?: InputMaybe<SortOrderEnum>;
  rdev?: InputMaybe<SortOrderEnum>;
  relativeDirectory?: InputMaybe<SortOrderEnum>;
  relativePath?: InputMaybe<SortOrderEnum>;
  root?: InputMaybe<SortOrderEnum>;
  size?: InputMaybe<SortOrderEnum>;
  sourceInstanceName?: InputMaybe<SortOrderEnum>;
  uid?: InputMaybe<SortOrderEnum>;
};

export type FloatQueryOperatorInput = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

export type GatsbyImageDataQueryOperatorInput = {
  eq?: InputMaybe<Scalars['GatsbyImageData']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['GatsbyImageData']>>>;
  ne?: InputMaybe<Scalars['GatsbyImageData']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['GatsbyImageData']>>>;
};

export enum GatsbyImageFormat {
  Auto = 'AUTO',
  Avif = 'AVIF',
  Jpg = 'JPG',
  NoChange = 'NO_CHANGE',
  Png = 'PNG',
  Webp = 'WEBP'
}

export enum GatsbyImageLayout {
  Constrained = 'CONSTRAINED',
  Fixed = 'FIXED',
  FullWidth = 'FULL_WIDTH'
}

export enum GatsbyImagePlaceholder {
  Blurred = 'BLURRED',
  DominantColor = 'DOMINANT_COLOR',
  None = 'NONE',
  TracedSvg = 'TRACED_SVG'
}

export type GraphQlSource = Node & {
  __typename?: 'GraphQLSource';
  children: Array<Node>;
  fieldName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  internal: Internal;
  parent?: Maybe<Node>;
  typeName?: Maybe<Scalars['String']>;
};

export type GraphQlSourceConnection = {
  __typename?: 'GraphQLSourceConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<GraphQlSourceEdge>;
  group: Array<GraphQlSourceGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<GraphQlSource>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type GraphQlSourceConnectionDistinctArgs = {
  field: GraphQlSourceFieldSelector;
};


export type GraphQlSourceConnectionGroupArgs = {
  field: GraphQlSourceFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type GraphQlSourceConnectionMaxArgs = {
  field: GraphQlSourceFieldSelector;
};


export type GraphQlSourceConnectionMinArgs = {
  field: GraphQlSourceFieldSelector;
};


export type GraphQlSourceConnectionSumArgs = {
  field: GraphQlSourceFieldSelector;
};

export type GraphQlSourceEdge = {
  __typename?: 'GraphQLSourceEdge';
  next?: Maybe<GraphQlSource>;
  node: GraphQlSource;
  previous?: Maybe<GraphQlSource>;
};

export type GraphQlSourceFieldSelector = {
  children?: InputMaybe<NodeFieldSelector>;
  fieldName?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  internal?: InputMaybe<InternalFieldSelector>;
  parent?: InputMaybe<NodeFieldSelector>;
  typeName?: InputMaybe<FieldSelectorEnum>;
};

export type GraphQlSourceFilterInput = {
  children?: InputMaybe<NodeFilterListInput>;
  fieldName?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  parent?: InputMaybe<NodeFilterInput>;
  typeName?: InputMaybe<StringQueryOperatorInput>;
};

export type GraphQlSourceGroupConnection = {
  __typename?: 'GraphQLSourceGroupConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<GraphQlSourceEdge>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
  group: Array<GraphQlSourceGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<GraphQlSource>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type GraphQlSourceGroupConnectionDistinctArgs = {
  field: GraphQlSourceFieldSelector;
};


export type GraphQlSourceGroupConnectionGroupArgs = {
  field: GraphQlSourceFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type GraphQlSourceGroupConnectionMaxArgs = {
  field: GraphQlSourceFieldSelector;
};


export type GraphQlSourceGroupConnectionMinArgs = {
  field: GraphQlSourceFieldSelector;
};


export type GraphQlSourceGroupConnectionSumArgs = {
  field: GraphQlSourceFieldSelector;
};

export type GraphQlSourceSortInput = {
  children?: InputMaybe<NodeSortInput>;
  fieldName?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  internal?: InputMaybe<InternalSortInput>;
  parent?: InputMaybe<NodeSortInput>;
  typeName?: InputMaybe<SortOrderEnum>;
};

export enum ImageCropFocus {
  Attention = 'ATTENTION',
  Center = 'CENTER',
  East = 'EAST',
  Entropy = 'ENTROPY',
  North = 'NORTH',
  Northeast = 'NORTHEAST',
  Northwest = 'NORTHWEST',
  South = 'SOUTH',
  Southeast = 'SOUTHEAST',
  Southwest = 'SOUTHWEST',
  West = 'WEST'
}

export enum ImageFit {
  Contain = 'CONTAIN',
  Cover = 'COVER',
  Fill = 'FILL',
  Inside = 'INSIDE',
  Outside = 'OUTSIDE'
}

export enum ImageFormat {
  Auto = 'AUTO',
  Avif = 'AVIF',
  Jpg = 'JPG',
  NoChange = 'NO_CHANGE',
  Png = 'PNG',
  Webp = 'WEBP'
}

export enum ImageLayout {
  Constrained = 'CONSTRAINED',
  Fixed = 'FIXED',
  FullWidth = 'FULL_WIDTH'
}

export enum ImagePlaceholder {
  Blurred = 'BLURRED',
  DominantColor = 'DOMINANT_COLOR',
  None = 'NONE',
  TracedSvg = 'TRACED_SVG'
}

export type ImageSharp = Node & {
  __typename?: 'ImageSharp';
  children: Array<Node>;
  fixed?: Maybe<ImageSharpFixed>;
  fluid?: Maybe<ImageSharpFluid>;
  gatsbyImageData: Scalars['GatsbyImageData'];
  id: Scalars['ID'];
  internal: Internal;
  original?: Maybe<ImageSharpOriginal>;
  parent?: Maybe<Node>;
  resize?: Maybe<ImageSharpResize>;
};


export type ImageSharpFixedArgs = {
  background?: InputMaybe<Scalars['String']>;
  base64Width?: InputMaybe<Scalars['Int']>;
  cropFocus?: InputMaybe<ImageCropFocus>;
  duotone?: InputMaybe<DuotoneGradient>;
  fit?: InputMaybe<ImageFit>;
  grayscale?: InputMaybe<Scalars['Boolean']>;
  height?: InputMaybe<Scalars['Int']>;
  jpegProgressive?: InputMaybe<Scalars['Boolean']>;
  jpegQuality?: InputMaybe<Scalars['Int']>;
  pngCompressionSpeed?: InputMaybe<Scalars['Int']>;
  pngQuality?: InputMaybe<Scalars['Int']>;
  quality?: InputMaybe<Scalars['Int']>;
  rotate?: InputMaybe<Scalars['Int']>;
  toFormat?: InputMaybe<ImageFormat>;
  toFormatBase64?: InputMaybe<ImageFormat>;
  traceSVG?: InputMaybe<Potrace>;
  trim?: InputMaybe<Scalars['Float']>;
  webpQuality?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
};


export type ImageSharpFluidArgs = {
  background?: InputMaybe<Scalars['String']>;
  base64Width?: InputMaybe<Scalars['Int']>;
  cropFocus?: InputMaybe<ImageCropFocus>;
  duotone?: InputMaybe<DuotoneGradient>;
  fit?: InputMaybe<ImageFit>;
  grayscale?: InputMaybe<Scalars['Boolean']>;
  jpegProgressive?: InputMaybe<Scalars['Boolean']>;
  jpegQuality?: InputMaybe<Scalars['Int']>;
  maxHeight?: InputMaybe<Scalars['Int']>;
  maxWidth?: InputMaybe<Scalars['Int']>;
  pngCompressionSpeed?: InputMaybe<Scalars['Int']>;
  pngQuality?: InputMaybe<Scalars['Int']>;
  quality?: InputMaybe<Scalars['Int']>;
  rotate?: InputMaybe<Scalars['Int']>;
  sizes?: InputMaybe<Scalars['String']>;
  srcSetBreakpoints?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  toFormat?: InputMaybe<ImageFormat>;
  toFormatBase64?: InputMaybe<ImageFormat>;
  traceSVG?: InputMaybe<Potrace>;
  trim?: InputMaybe<Scalars['Float']>;
  webpQuality?: InputMaybe<Scalars['Int']>;
};


export type ImageSharpGatsbyImageDataArgs = {
  aspectRatio?: InputMaybe<Scalars['Float']>;
  avifOptions?: InputMaybe<AvifOptions>;
  backgroundColor?: InputMaybe<Scalars['String']>;
  blurredOptions?: InputMaybe<BlurredOptions>;
  breakpoints?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  formats?: InputMaybe<Array<InputMaybe<ImageFormat>>>;
  height?: InputMaybe<Scalars['Int']>;
  jpgOptions?: InputMaybe<JpgOptions>;
  layout?: InputMaybe<ImageLayout>;
  outputPixelDensities?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  placeholder?: InputMaybe<ImagePlaceholder>;
  pngOptions?: InputMaybe<PngOptions>;
  quality?: InputMaybe<Scalars['Int']>;
  sizes?: InputMaybe<Scalars['String']>;
  tracedSVGOptions?: InputMaybe<Potrace>;
  transformOptions?: InputMaybe<TransformOptions>;
  webpOptions?: InputMaybe<WebPOptions>;
  width?: InputMaybe<Scalars['Int']>;
};


export type ImageSharpResizeArgs = {
  background?: InputMaybe<Scalars['String']>;
  base64?: InputMaybe<Scalars['Boolean']>;
  cropFocus?: InputMaybe<ImageCropFocus>;
  duotone?: InputMaybe<DuotoneGradient>;
  fit?: InputMaybe<ImageFit>;
  grayscale?: InputMaybe<Scalars['Boolean']>;
  height?: InputMaybe<Scalars['Int']>;
  jpegProgressive?: InputMaybe<Scalars['Boolean']>;
  jpegQuality?: InputMaybe<Scalars['Int']>;
  pngCompressionLevel?: InputMaybe<Scalars['Int']>;
  pngCompressionSpeed?: InputMaybe<Scalars['Int']>;
  pngQuality?: InputMaybe<Scalars['Int']>;
  quality?: InputMaybe<Scalars['Int']>;
  rotate?: InputMaybe<Scalars['Int']>;
  toFormat?: InputMaybe<ImageFormat>;
  traceSVG?: InputMaybe<Potrace>;
  trim?: InputMaybe<Scalars['Float']>;
  webpQuality?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type ImageSharpConnection = {
  __typename?: 'ImageSharpConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<ImageSharpEdge>;
  group: Array<ImageSharpGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<ImageSharp>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type ImageSharpConnectionDistinctArgs = {
  field: ImageSharpFieldSelector;
};


export type ImageSharpConnectionGroupArgs = {
  field: ImageSharpFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type ImageSharpConnectionMaxArgs = {
  field: ImageSharpFieldSelector;
};


export type ImageSharpConnectionMinArgs = {
  field: ImageSharpFieldSelector;
};


export type ImageSharpConnectionSumArgs = {
  field: ImageSharpFieldSelector;
};

export type ImageSharpEdge = {
  __typename?: 'ImageSharpEdge';
  next?: Maybe<ImageSharp>;
  node: ImageSharp;
  previous?: Maybe<ImageSharp>;
};

export type ImageSharpFieldSelector = {
  children?: InputMaybe<NodeFieldSelector>;
  fixed?: InputMaybe<ImageSharpFixedFieldSelector>;
  fluid?: InputMaybe<ImageSharpFluidFieldSelector>;
  gatsbyImageData?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  internal?: InputMaybe<InternalFieldSelector>;
  original?: InputMaybe<ImageSharpOriginalFieldSelector>;
  parent?: InputMaybe<NodeFieldSelector>;
  resize?: InputMaybe<ImageSharpResizeFieldSelector>;
};

export type ImageSharpFilterInput = {
  children?: InputMaybe<NodeFilterListInput>;
  fixed?: InputMaybe<ImageSharpFixedFilterInput>;
  fluid?: InputMaybe<ImageSharpFluidFilterInput>;
  gatsbyImageData?: InputMaybe<GatsbyImageDataQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  original?: InputMaybe<ImageSharpOriginalFilterInput>;
  parent?: InputMaybe<NodeFilterInput>;
  resize?: InputMaybe<ImageSharpResizeFilterInput>;
};

export type ImageSharpFilterListInput = {
  elemMatch?: InputMaybe<ImageSharpFilterInput>;
};

export type ImageSharpFixed = {
  __typename?: 'ImageSharpFixed';
  aspectRatio?: Maybe<Scalars['Float']>;
  base64?: Maybe<Scalars['String']>;
  height: Scalars['Float'];
  originalName?: Maybe<Scalars['String']>;
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcSetWebp?: Maybe<Scalars['String']>;
  srcWebp?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  width: Scalars['Float'];
};

export type ImageSharpFixedFieldSelector = {
  aspectRatio?: InputMaybe<FieldSelectorEnum>;
  base64?: InputMaybe<FieldSelectorEnum>;
  height?: InputMaybe<FieldSelectorEnum>;
  originalName?: InputMaybe<FieldSelectorEnum>;
  src?: InputMaybe<FieldSelectorEnum>;
  srcSet?: InputMaybe<FieldSelectorEnum>;
  srcSetWebp?: InputMaybe<FieldSelectorEnum>;
  srcWebp?: InputMaybe<FieldSelectorEnum>;
  tracedSVG?: InputMaybe<FieldSelectorEnum>;
  width?: InputMaybe<FieldSelectorEnum>;
};

export type ImageSharpFixedFilterInput = {
  aspectRatio?: InputMaybe<FloatQueryOperatorInput>;
  base64?: InputMaybe<StringQueryOperatorInput>;
  height?: InputMaybe<FloatQueryOperatorInput>;
  originalName?: InputMaybe<StringQueryOperatorInput>;
  src?: InputMaybe<StringQueryOperatorInput>;
  srcSet?: InputMaybe<StringQueryOperatorInput>;
  srcSetWebp?: InputMaybe<StringQueryOperatorInput>;
  srcWebp?: InputMaybe<StringQueryOperatorInput>;
  tracedSVG?: InputMaybe<StringQueryOperatorInput>;
  width?: InputMaybe<FloatQueryOperatorInput>;
};

export type ImageSharpFixedSortInput = {
  aspectRatio?: InputMaybe<SortOrderEnum>;
  base64?: InputMaybe<SortOrderEnum>;
  height?: InputMaybe<SortOrderEnum>;
  originalName?: InputMaybe<SortOrderEnum>;
  src?: InputMaybe<SortOrderEnum>;
  srcSet?: InputMaybe<SortOrderEnum>;
  srcSetWebp?: InputMaybe<SortOrderEnum>;
  srcWebp?: InputMaybe<SortOrderEnum>;
  tracedSVG?: InputMaybe<SortOrderEnum>;
  width?: InputMaybe<SortOrderEnum>;
};

export type ImageSharpFluid = {
  __typename?: 'ImageSharpFluid';
  aspectRatio: Scalars['Float'];
  base64?: Maybe<Scalars['String']>;
  originalImg?: Maybe<Scalars['String']>;
  originalName?: Maybe<Scalars['String']>;
  presentationHeight: Scalars['Int'];
  presentationWidth: Scalars['Int'];
  sizes: Scalars['String'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcSetWebp?: Maybe<Scalars['String']>;
  srcWebp?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
};

export type ImageSharpFluidFieldSelector = {
  aspectRatio?: InputMaybe<FieldSelectorEnum>;
  base64?: InputMaybe<FieldSelectorEnum>;
  originalImg?: InputMaybe<FieldSelectorEnum>;
  originalName?: InputMaybe<FieldSelectorEnum>;
  presentationHeight?: InputMaybe<FieldSelectorEnum>;
  presentationWidth?: InputMaybe<FieldSelectorEnum>;
  sizes?: InputMaybe<FieldSelectorEnum>;
  src?: InputMaybe<FieldSelectorEnum>;
  srcSet?: InputMaybe<FieldSelectorEnum>;
  srcSetWebp?: InputMaybe<FieldSelectorEnum>;
  srcWebp?: InputMaybe<FieldSelectorEnum>;
  tracedSVG?: InputMaybe<FieldSelectorEnum>;
};

export type ImageSharpFluidFilterInput = {
  aspectRatio?: InputMaybe<FloatQueryOperatorInput>;
  base64?: InputMaybe<StringQueryOperatorInput>;
  originalImg?: InputMaybe<StringQueryOperatorInput>;
  originalName?: InputMaybe<StringQueryOperatorInput>;
  presentationHeight?: InputMaybe<IntQueryOperatorInput>;
  presentationWidth?: InputMaybe<IntQueryOperatorInput>;
  sizes?: InputMaybe<StringQueryOperatorInput>;
  src?: InputMaybe<StringQueryOperatorInput>;
  srcSet?: InputMaybe<StringQueryOperatorInput>;
  srcSetWebp?: InputMaybe<StringQueryOperatorInput>;
  srcWebp?: InputMaybe<StringQueryOperatorInput>;
  tracedSVG?: InputMaybe<StringQueryOperatorInput>;
};

export type ImageSharpFluidSortInput = {
  aspectRatio?: InputMaybe<SortOrderEnum>;
  base64?: InputMaybe<SortOrderEnum>;
  originalImg?: InputMaybe<SortOrderEnum>;
  originalName?: InputMaybe<SortOrderEnum>;
  presentationHeight?: InputMaybe<SortOrderEnum>;
  presentationWidth?: InputMaybe<SortOrderEnum>;
  sizes?: InputMaybe<SortOrderEnum>;
  src?: InputMaybe<SortOrderEnum>;
  srcSet?: InputMaybe<SortOrderEnum>;
  srcSetWebp?: InputMaybe<SortOrderEnum>;
  srcWebp?: InputMaybe<SortOrderEnum>;
  tracedSVG?: InputMaybe<SortOrderEnum>;
};

export type ImageSharpGroupConnection = {
  __typename?: 'ImageSharpGroupConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<ImageSharpEdge>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
  group: Array<ImageSharpGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<ImageSharp>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type ImageSharpGroupConnectionDistinctArgs = {
  field: ImageSharpFieldSelector;
};


export type ImageSharpGroupConnectionGroupArgs = {
  field: ImageSharpFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type ImageSharpGroupConnectionMaxArgs = {
  field: ImageSharpFieldSelector;
};


export type ImageSharpGroupConnectionMinArgs = {
  field: ImageSharpFieldSelector;
};


export type ImageSharpGroupConnectionSumArgs = {
  field: ImageSharpFieldSelector;
};

export type ImageSharpOriginal = {
  __typename?: 'ImageSharpOriginal';
  height?: Maybe<Scalars['Float']>;
  src?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
};

export type ImageSharpOriginalFieldSelector = {
  height?: InputMaybe<FieldSelectorEnum>;
  src?: InputMaybe<FieldSelectorEnum>;
  width?: InputMaybe<FieldSelectorEnum>;
};

export type ImageSharpOriginalFilterInput = {
  height?: InputMaybe<FloatQueryOperatorInput>;
  src?: InputMaybe<StringQueryOperatorInput>;
  width?: InputMaybe<FloatQueryOperatorInput>;
};

export type ImageSharpOriginalSortInput = {
  height?: InputMaybe<SortOrderEnum>;
  src?: InputMaybe<SortOrderEnum>;
  width?: InputMaybe<SortOrderEnum>;
};

export type ImageSharpResize = {
  __typename?: 'ImageSharpResize';
  aspectRatio?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Int']>;
  originalName?: Maybe<Scalars['String']>;
  src?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type ImageSharpResizeFieldSelector = {
  aspectRatio?: InputMaybe<FieldSelectorEnum>;
  height?: InputMaybe<FieldSelectorEnum>;
  originalName?: InputMaybe<FieldSelectorEnum>;
  src?: InputMaybe<FieldSelectorEnum>;
  tracedSVG?: InputMaybe<FieldSelectorEnum>;
  width?: InputMaybe<FieldSelectorEnum>;
};

export type ImageSharpResizeFilterInput = {
  aspectRatio?: InputMaybe<FloatQueryOperatorInput>;
  height?: InputMaybe<IntQueryOperatorInput>;
  originalName?: InputMaybe<StringQueryOperatorInput>;
  src?: InputMaybe<StringQueryOperatorInput>;
  tracedSVG?: InputMaybe<StringQueryOperatorInput>;
  width?: InputMaybe<IntQueryOperatorInput>;
};

export type ImageSharpResizeSortInput = {
  aspectRatio?: InputMaybe<SortOrderEnum>;
  height?: InputMaybe<SortOrderEnum>;
  originalName?: InputMaybe<SortOrderEnum>;
  src?: InputMaybe<SortOrderEnum>;
  tracedSVG?: InputMaybe<SortOrderEnum>;
  width?: InputMaybe<SortOrderEnum>;
};

export type ImageSharpSortInput = {
  children?: InputMaybe<NodeSortInput>;
  fixed?: InputMaybe<ImageSharpFixedSortInput>;
  fluid?: InputMaybe<ImageSharpFluidSortInput>;
  gatsbyImageData?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  internal?: InputMaybe<InternalSortInput>;
  original?: InputMaybe<ImageSharpOriginalSortInput>;
  parent?: InputMaybe<NodeSortInput>;
  resize?: InputMaybe<ImageSharpResizeSortInput>;
};

export type IntQueryOperatorInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type Internal = {
  __typename?: 'Internal';
  content?: Maybe<Scalars['String']>;
  contentDigest: Scalars['String'];
  contentFilePath?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  fieldOwners?: Maybe<Array<Maybe<Scalars['String']>>>;
  ignoreType?: Maybe<Scalars['Boolean']>;
  mediaType?: Maybe<Scalars['String']>;
  owner: Scalars['String'];
  type: Scalars['String'];
};

export type InternalFieldSelector = {
  content?: InputMaybe<FieldSelectorEnum>;
  contentDigest?: InputMaybe<FieldSelectorEnum>;
  contentFilePath?: InputMaybe<FieldSelectorEnum>;
  description?: InputMaybe<FieldSelectorEnum>;
  fieldOwners?: InputMaybe<FieldSelectorEnum>;
  ignoreType?: InputMaybe<FieldSelectorEnum>;
  mediaType?: InputMaybe<FieldSelectorEnum>;
  owner?: InputMaybe<FieldSelectorEnum>;
  type?: InputMaybe<FieldSelectorEnum>;
};

export type InternalFilterInput = {
  content?: InputMaybe<StringQueryOperatorInput>;
  contentDigest?: InputMaybe<StringQueryOperatorInput>;
  contentFilePath?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  fieldOwners?: InputMaybe<StringQueryOperatorInput>;
  ignoreType?: InputMaybe<BooleanQueryOperatorInput>;
  mediaType?: InputMaybe<StringQueryOperatorInput>;
  owner?: InputMaybe<StringQueryOperatorInput>;
  type?: InputMaybe<StringQueryOperatorInput>;
};

export type InternalSortInput = {
  content?: InputMaybe<SortOrderEnum>;
  contentDigest?: InputMaybe<SortOrderEnum>;
  contentFilePath?: InputMaybe<SortOrderEnum>;
  description?: InputMaybe<SortOrderEnum>;
  fieldOwners?: InputMaybe<SortOrderEnum>;
  ignoreType?: InputMaybe<SortOrderEnum>;
  mediaType?: InputMaybe<SortOrderEnum>;
  owner?: InputMaybe<SortOrderEnum>;
  type?: InputMaybe<SortOrderEnum>;
};

export type JpgOptions = {
  progressive?: InputMaybe<Scalars['Boolean']>;
  quality?: InputMaybe<Scalars['Int']>;
};

export type JsonQueryOperatorInput = {
  eq?: InputMaybe<Scalars['JSON']>;
  glob?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  ne?: InputMaybe<Scalars['JSON']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  regex?: InputMaybe<Scalars['JSON']>;
};

/** Node Interface */
export type Node = {
  children: Array<Node>;
  id: Scalars['ID'];
  internal: Internal;
  parent?: Maybe<Node>;
};

export type NodeFieldSelector = {
  children?: InputMaybe<NodeFieldSelector>;
  id?: InputMaybe<FieldSelectorEnum>;
  internal?: InputMaybe<InternalFieldSelector>;
  parent?: InputMaybe<NodeFieldSelector>;
};

export type NodeFilterInput = {
  children?: InputMaybe<NodeFilterListInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  parent?: InputMaybe<NodeFilterInput>;
};

export type NodeFilterListInput = {
  elemMatch?: InputMaybe<NodeFilterInput>;
};

export type NodeSortInput = {
  children?: InputMaybe<NodeSortInput>;
  id?: InputMaybe<SortOrderEnum>;
  internal?: InputMaybe<InternalSortInput>;
  parent?: InputMaybe<NodeSortInput>;
};

export type PngOptions = {
  compressionSpeed?: InputMaybe<Scalars['Int']>;
  quality?: InputMaybe<Scalars['Int']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  nextTitle?: Maybe<Scalars['String']>;
  nextUrl?: Maybe<Scalars['String']>;
  prevTitle?: Maybe<Scalars['String']>;
  prevUrl?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type PageInfoFieldSelector = {
  nextTitle?: InputMaybe<FieldSelectorEnum>;
  nextUrl?: InputMaybe<FieldSelectorEnum>;
  prevTitle?: InputMaybe<FieldSelectorEnum>;
  prevUrl?: InputMaybe<FieldSelectorEnum>;
  title?: InputMaybe<FieldSelectorEnum>;
};

export type PageInfoFilterInput = {
  nextTitle?: InputMaybe<StringQueryOperatorInput>;
  nextUrl?: InputMaybe<StringQueryOperatorInput>;
  prevTitle?: InputMaybe<StringQueryOperatorInput>;
  prevUrl?: InputMaybe<StringQueryOperatorInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
};

export type PageInfoSortInput = {
  nextTitle?: InputMaybe<SortOrderEnum>;
  nextUrl?: InputMaybe<SortOrderEnum>;
  prevTitle?: InputMaybe<SortOrderEnum>;
  prevUrl?: InputMaybe<SortOrderEnum>;
  title?: InputMaybe<SortOrderEnum>;
};

export enum PageType {
  Mail = 'mail',
  Season = 'season'
}

export type PageTypeQueryOperatorInput = {
  eq?: InputMaybe<PageType>;
  in?: InputMaybe<Array<InputMaybe<PageType>>>;
  ne?: InputMaybe<PageType>;
  nin?: InputMaybe<Array<InputMaybe<PageType>>>;
};

export type Potrace = {
  alphaMax?: InputMaybe<Scalars['Float']>;
  background?: InputMaybe<Scalars['String']>;
  blackOnWhite?: InputMaybe<Scalars['Boolean']>;
  color?: InputMaybe<Scalars['String']>;
  optCurve?: InputMaybe<Scalars['Boolean']>;
  optTolerance?: InputMaybe<Scalars['Float']>;
  threshold?: InputMaybe<Scalars['Int']>;
  turdSize?: InputMaybe<Scalars['Float']>;
  turnPolicy?: InputMaybe<PotraceTurnPolicy>;
};

export enum PotraceTurnPolicy {
  TurnpolicyBlack = 'TURNPOLICY_BLACK',
  TurnpolicyLeft = 'TURNPOLICY_LEFT',
  TurnpolicyMajority = 'TURNPOLICY_MAJORITY',
  TurnpolicyMinority = 'TURNPOLICY_MINORITY',
  TurnpolicyRight = 'TURNPOLICY_RIGHT',
  TurnpolicyWhite = 'TURNPOLICY_WHITE'
}

export type Query = {
  __typename?: 'Query';
  allDirectory: DirectoryConnection;
  allEvent: EventConnection;
  allFeedblog: FeedblogConnection;
  allFeedblogMeta: FeedblogMetaConnection;
  allFile: FileConnection;
  allGraphQlSource: GraphQlSourceConnection;
  allImageSharp: ImageSharpConnection;
  allMail: MailConnection;
  allSite: SiteConnection;
  allSiteBuildMetadata: SiteBuildMetadataConnection;
  allSiteFunction: SiteFunctionConnection;
  allSitePage: SitePageConnection;
  allSitePlugin: SitePluginConnection;
  db: Db;
  directory?: Maybe<Directory>;
  event?: Maybe<Event>;
  feedblog?: Maybe<Feedblog>;
  feedblogMeta?: Maybe<FeedblogMeta>;
  file?: Maybe<File>;
  graphQlSource?: Maybe<GraphQlSource>;
  imageSharp?: Maybe<ImageSharp>;
  mail?: Maybe<Mail>;
  site?: Maybe<Site>;
  siteBuildMetadata?: Maybe<SiteBuildMetadata>;
  siteFunction?: Maybe<SiteFunction>;
  sitePage?: Maybe<SitePage>;
  sitePlugin?: Maybe<SitePlugin>;
};


export type QueryAllDirectoryArgs = {
  filter?: InputMaybe<DirectoryFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<DirectorySortInput>>>;
};


export type QueryAllEventArgs = {
  filter?: InputMaybe<EventFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<EventSortInput>>>;
};


export type QueryAllFeedblogArgs = {
  filter?: InputMaybe<FeedblogFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<FeedblogSortInput>>>;
};


export type QueryAllFeedblogMetaArgs = {
  filter?: InputMaybe<FeedblogMetaFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<FeedblogMetaSortInput>>>;
};


export type QueryAllFileArgs = {
  filter?: InputMaybe<FileFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<FileSortInput>>>;
};


export type QueryAllGraphQlSourceArgs = {
  filter?: InputMaybe<GraphQlSourceFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<GraphQlSourceSortInput>>>;
};


export type QueryAllImageSharpArgs = {
  filter?: InputMaybe<ImageSharpFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<ImageSharpSortInput>>>;
};


export type QueryAllMailArgs = {
  filter?: InputMaybe<MailFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<MailSortInput>>>;
};


export type QueryAllSiteArgs = {
  filter?: InputMaybe<SiteFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<SiteSortInput>>>;
};


export type QueryAllSiteBuildMetadataArgs = {
  filter?: InputMaybe<SiteBuildMetadataFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<SiteBuildMetadataSortInput>>>;
};


export type QueryAllSiteFunctionArgs = {
  filter?: InputMaybe<SiteFunctionFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<SiteFunctionSortInput>>>;
};


export type QueryAllSitePageArgs = {
  filter?: InputMaybe<SitePageFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<SitePageSortInput>>>;
};


export type QueryAllSitePluginArgs = {
  filter?: InputMaybe<SitePluginFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<SitePluginSortInput>>>;
};


export type QueryDirectoryArgs = {
  absolutePath?: InputMaybe<StringQueryOperatorInput>;
  accessTime?: InputMaybe<DateQueryOperatorInput>;
  atime?: InputMaybe<DateQueryOperatorInput>;
  atimeMs?: InputMaybe<FloatQueryOperatorInput>;
  base?: InputMaybe<StringQueryOperatorInput>;
  birthTime?: InputMaybe<DateQueryOperatorInput>;
  birthtime?: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  changeTime?: InputMaybe<DateQueryOperatorInput>;
  children?: InputMaybe<NodeFilterListInput>;
  ctime?: InputMaybe<DateQueryOperatorInput>;
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>;
  dev?: InputMaybe<IntQueryOperatorInput>;
  dir?: InputMaybe<StringQueryOperatorInput>;
  ext?: InputMaybe<StringQueryOperatorInput>;
  extension?: InputMaybe<StringQueryOperatorInput>;
  gid?: InputMaybe<IntQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  ino?: InputMaybe<FloatQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  mode?: InputMaybe<IntQueryOperatorInput>;
  modifiedTime?: InputMaybe<DateQueryOperatorInput>;
  mtime?: InputMaybe<DateQueryOperatorInput>;
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  nlink?: InputMaybe<IntQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  prettySize?: InputMaybe<StringQueryOperatorInput>;
  rdev?: InputMaybe<IntQueryOperatorInput>;
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
  root?: InputMaybe<StringQueryOperatorInput>;
  size?: InputMaybe<IntQueryOperatorInput>;
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>;
  uid?: InputMaybe<IntQueryOperatorInput>;
};


export type QueryEventArgs = {
  chapter?: InputMaybe<ChapterQueryOperatorInput>;
  children?: InputMaybe<NodeFilterListInput>;
  contact?: InputMaybe<StringQueryOperatorInput>;
  date?: InputMaybe<DateQueryOperatorInput>;
  distance?: InputMaybe<IntQueryOperatorInput>;
  event?: InputMaybe<StringQueryOperatorInput>;
  eventType?: InputMaybe<EventTypeQueryOperatorInput>;
  gatsbyPath?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  organizer?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  route?: InputMaybe<StringQueryOperatorInput>;
  rwgps?: InputMaybe<StringQueryOperatorInput>;
  rwgpsId?: InputMaybe<StringQueryOperatorInput>;
  rwgpsUrl?: InputMaybe<StringQueryOperatorInput>;
  sched_id?: InputMaybe<StringQueryOperatorInput>;
  scheduleId?: InputMaybe<StringQueryOperatorInput>;
  season?: InputMaybe<StringQueryOperatorInput>;
  startLocation?: InputMaybe<StringQueryOperatorInput>;
  startloc?: InputMaybe<StringQueryOperatorInput>;
  stime?: InputMaybe<StringQueryOperatorInput>;
  unixtime?: InputMaybe<IntQueryOperatorInput>;
};


export type QueryFeedblogArgs = {
  categories?: InputMaybe<StringQueryOperatorInput>;
  children?: InputMaybe<NodeFilterListInput>;
  comments?: InputMaybe<StringQueryOperatorInput>;
  content?: InputMaybe<FeedblogContentFilterInput>;
  contentSnippet?: InputMaybe<StringQueryOperatorInput>;
  creator?: InputMaybe<StringQueryOperatorInput>;
  dc?: InputMaybe<FeedblogDcFilterInput>;
  guid?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  isoDate?: InputMaybe<DateQueryOperatorInput>;
  link?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  pubDate?: InputMaybe<StringQueryOperatorInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
};


export type QueryFeedblogMetaArgs = {
  children?: InputMaybe<NodeFilterListInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  feedUrl?: InputMaybe<StringQueryOperatorInput>;
  generator?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  language?: InputMaybe<StringQueryOperatorInput>;
  lastBuildDate?: InputMaybe<StringQueryOperatorInput>;
  link?: InputMaybe<StringQueryOperatorInput>;
  paginationLinks?: InputMaybe<FeedblogMetaPaginationLinksFilterInput>;
  parent?: InputMaybe<NodeFilterInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
};


export type QueryFileArgs = {
  absolutePath?: InputMaybe<StringQueryOperatorInput>;
  accessTime?: InputMaybe<DateQueryOperatorInput>;
  atime?: InputMaybe<DateQueryOperatorInput>;
  atimeMs?: InputMaybe<FloatQueryOperatorInput>;
  base?: InputMaybe<StringQueryOperatorInput>;
  birthTime?: InputMaybe<DateQueryOperatorInput>;
  birthtime?: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  blksize?: InputMaybe<IntQueryOperatorInput>;
  blocks?: InputMaybe<IntQueryOperatorInput>;
  changeTime?: InputMaybe<DateQueryOperatorInput>;
  childImageSharp?: InputMaybe<ImageSharpFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  childrenImageSharp?: InputMaybe<ImageSharpFilterListInput>;
  ctime?: InputMaybe<DateQueryOperatorInput>;
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>;
  dev?: InputMaybe<IntQueryOperatorInput>;
  dir?: InputMaybe<StringQueryOperatorInput>;
  ext?: InputMaybe<StringQueryOperatorInput>;
  extension?: InputMaybe<StringQueryOperatorInput>;
  gid?: InputMaybe<IntQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  ino?: InputMaybe<FloatQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  mode?: InputMaybe<IntQueryOperatorInput>;
  modifiedTime?: InputMaybe<DateQueryOperatorInput>;
  mtime?: InputMaybe<DateQueryOperatorInput>;
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  nlink?: InputMaybe<IntQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  prettySize?: InputMaybe<StringQueryOperatorInput>;
  publicURL?: InputMaybe<StringQueryOperatorInput>;
  rdev?: InputMaybe<IntQueryOperatorInput>;
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
  root?: InputMaybe<StringQueryOperatorInput>;
  size?: InputMaybe<IntQueryOperatorInput>;
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>;
  uid?: InputMaybe<IntQueryOperatorInput>;
};


export type QueryGraphQlSourceArgs = {
  children?: InputMaybe<NodeFilterListInput>;
  fieldName?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  parent?: InputMaybe<NodeFilterInput>;
  typeName?: InputMaybe<StringQueryOperatorInput>;
};


export type QueryImageSharpArgs = {
  children?: InputMaybe<NodeFilterListInput>;
  fixed?: InputMaybe<ImageSharpFixedFilterInput>;
  fluid?: InputMaybe<ImageSharpFluidFilterInput>;
  gatsbyImageData?: InputMaybe<GatsbyImageDataQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  original?: InputMaybe<ImageSharpOriginalFilterInput>;
  parent?: InputMaybe<NodeFilterInput>;
  resize?: InputMaybe<ImageSharpResizeFilterInput>;
};


export type QueryMailArgs = {
  categories?: InputMaybe<StringQueryOperatorInput>;
  children?: InputMaybe<NodeFilterListInput>;
  content?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  sentAt?: InputMaybe<DateQueryOperatorInput>;
  subject?: InputMaybe<StringQueryOperatorInput>;
  teaser?: InputMaybe<StringQueryOperatorInput>;
};


export type QuerySiteArgs = {
  buildTime?: InputMaybe<DateQueryOperatorInput>;
  children?: InputMaybe<NodeFilterListInput>;
  flags?: InputMaybe<SiteFlagsFilterInput>;
  graphqlTypegen?: InputMaybe<BooleanQueryOperatorInput>;
  host?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  jsxRuntime?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  pathPrefix?: InputMaybe<StringQueryOperatorInput>;
  polyfill?: InputMaybe<BooleanQueryOperatorInput>;
  port?: InputMaybe<IntQueryOperatorInput>;
  siteMetadata?: InputMaybe<SiteSiteMetadataFilterInput>;
  trailingSlash?: InputMaybe<StringQueryOperatorInput>;
};


export type QuerySiteBuildMetadataArgs = {
  buildTime?: InputMaybe<DateQueryOperatorInput>;
  children?: InputMaybe<NodeFilterListInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  parent?: InputMaybe<NodeFilterInput>;
};


export type QuerySiteFunctionArgs = {
  absoluteCompiledFilePath?: InputMaybe<StringQueryOperatorInput>;
  children?: InputMaybe<NodeFilterListInput>;
  functionRoute?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  matchPath?: InputMaybe<StringQueryOperatorInput>;
  originalAbsoluteFilePath?: InputMaybe<StringQueryOperatorInput>;
  originalRelativeFilePath?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  pluginName?: InputMaybe<StringQueryOperatorInput>;
  relativeCompiledFilePath?: InputMaybe<StringQueryOperatorInput>;
};


export type QuerySitePageArgs = {
  children?: InputMaybe<NodeFilterListInput>;
  component?: InputMaybe<StringQueryOperatorInput>;
  componentChunkName?: InputMaybe<StringQueryOperatorInput>;
  context?: InputMaybe<SitePageContextFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  internalComponentName?: InputMaybe<StringQueryOperatorInput>;
  matchPath?: InputMaybe<StringQueryOperatorInput>;
  pageContext?: InputMaybe<JsonQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  path?: InputMaybe<StringQueryOperatorInput>;
  pluginCreator?: InputMaybe<SitePluginFilterInput>;
};


export type QuerySitePluginArgs = {
  browserAPIs?: InputMaybe<StringQueryOperatorInput>;
  children?: InputMaybe<NodeFilterListInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  nodeAPIs?: InputMaybe<StringQueryOperatorInput>;
  packageJson?: InputMaybe<JsonQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  pluginFilepath?: InputMaybe<StringQueryOperatorInput>;
  pluginOptions?: InputMaybe<JsonQueryOperatorInput>;
  resolve?: InputMaybe<StringQueryOperatorInput>;
  ssrAPIs?: InputMaybe<StringQueryOperatorInput>;
  version?: InputMaybe<StringQueryOperatorInput>;
};

export type Site = Node & {
  __typename?: 'Site';
  buildTime?: Maybe<Scalars['Date']>;
  children: Array<Node>;
  flags?: Maybe<SiteFlags>;
  graphqlTypegen?: Maybe<Scalars['Boolean']>;
  host?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  internal: Internal;
  jsxRuntime?: Maybe<Scalars['String']>;
  parent?: Maybe<Node>;
  pathPrefix?: Maybe<Scalars['String']>;
  polyfill?: Maybe<Scalars['Boolean']>;
  port?: Maybe<Scalars['Int']>;
  siteMetadata?: Maybe<SiteSiteMetadata>;
  trailingSlash?: Maybe<Scalars['String']>;
};


export type SiteBuildTimeArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type SiteBuildMetadata = Node & {
  __typename?: 'SiteBuildMetadata';
  buildTime?: Maybe<Scalars['Date']>;
  children: Array<Node>;
  id: Scalars['ID'];
  internal: Internal;
  parent?: Maybe<Node>;
};


export type SiteBuildMetadataBuildTimeArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type SiteBuildMetadataConnection = {
  __typename?: 'SiteBuildMetadataConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<SiteBuildMetadataEdge>;
  group: Array<SiteBuildMetadataGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<SiteBuildMetadata>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type SiteBuildMetadataConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldSelector;
};


export type SiteBuildMetadataConnectionGroupArgs = {
  field: SiteBuildMetadataFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type SiteBuildMetadataConnectionMaxArgs = {
  field: SiteBuildMetadataFieldSelector;
};


export type SiteBuildMetadataConnectionMinArgs = {
  field: SiteBuildMetadataFieldSelector;
};


export type SiteBuildMetadataConnectionSumArgs = {
  field: SiteBuildMetadataFieldSelector;
};

export type SiteBuildMetadataEdge = {
  __typename?: 'SiteBuildMetadataEdge';
  next?: Maybe<SiteBuildMetadata>;
  node: SiteBuildMetadata;
  previous?: Maybe<SiteBuildMetadata>;
};

export type SiteBuildMetadataFieldSelector = {
  buildTime?: InputMaybe<FieldSelectorEnum>;
  children?: InputMaybe<NodeFieldSelector>;
  id?: InputMaybe<FieldSelectorEnum>;
  internal?: InputMaybe<InternalFieldSelector>;
  parent?: InputMaybe<NodeFieldSelector>;
};

export type SiteBuildMetadataFilterInput = {
  buildTime?: InputMaybe<DateQueryOperatorInput>;
  children?: InputMaybe<NodeFilterListInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  parent?: InputMaybe<NodeFilterInput>;
};

export type SiteBuildMetadataGroupConnection = {
  __typename?: 'SiteBuildMetadataGroupConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<SiteBuildMetadataEdge>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
  group: Array<SiteBuildMetadataGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<SiteBuildMetadata>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type SiteBuildMetadataGroupConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldSelector;
};


export type SiteBuildMetadataGroupConnectionGroupArgs = {
  field: SiteBuildMetadataFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type SiteBuildMetadataGroupConnectionMaxArgs = {
  field: SiteBuildMetadataFieldSelector;
};


export type SiteBuildMetadataGroupConnectionMinArgs = {
  field: SiteBuildMetadataFieldSelector;
};


export type SiteBuildMetadataGroupConnectionSumArgs = {
  field: SiteBuildMetadataFieldSelector;
};

export type SiteBuildMetadataSortInput = {
  buildTime?: InputMaybe<SortOrderEnum>;
  children?: InputMaybe<NodeSortInput>;
  id?: InputMaybe<SortOrderEnum>;
  internal?: InputMaybe<InternalSortInput>;
  parent?: InputMaybe<NodeSortInput>;
};

export type SiteConnection = {
  __typename?: 'SiteConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<SiteEdge>;
  group: Array<SiteGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type SiteConnectionDistinctArgs = {
  field: SiteFieldSelector;
};


export type SiteConnectionGroupArgs = {
  field: SiteFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type SiteConnectionMaxArgs = {
  field: SiteFieldSelector;
};


export type SiteConnectionMinArgs = {
  field: SiteFieldSelector;
};


export type SiteConnectionSumArgs = {
  field: SiteFieldSelector;
};

export type SiteEdge = {
  __typename?: 'SiteEdge';
  next?: Maybe<Site>;
  node: Site;
  previous?: Maybe<Site>;
};

export type SiteFieldSelector = {
  buildTime?: InputMaybe<FieldSelectorEnum>;
  children?: InputMaybe<NodeFieldSelector>;
  flags?: InputMaybe<SiteFlagsFieldSelector>;
  graphqlTypegen?: InputMaybe<FieldSelectorEnum>;
  host?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  internal?: InputMaybe<InternalFieldSelector>;
  jsxRuntime?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  pathPrefix?: InputMaybe<FieldSelectorEnum>;
  polyfill?: InputMaybe<FieldSelectorEnum>;
  port?: InputMaybe<FieldSelectorEnum>;
  siteMetadata?: InputMaybe<SiteSiteMetadataFieldSelector>;
  trailingSlash?: InputMaybe<FieldSelectorEnum>;
};

export type SiteFilterInput = {
  buildTime?: InputMaybe<DateQueryOperatorInput>;
  children?: InputMaybe<NodeFilterListInput>;
  flags?: InputMaybe<SiteFlagsFilterInput>;
  graphqlTypegen?: InputMaybe<BooleanQueryOperatorInput>;
  host?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  jsxRuntime?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  pathPrefix?: InputMaybe<StringQueryOperatorInput>;
  polyfill?: InputMaybe<BooleanQueryOperatorInput>;
  port?: InputMaybe<IntQueryOperatorInput>;
  siteMetadata?: InputMaybe<SiteSiteMetadataFilterInput>;
  trailingSlash?: InputMaybe<StringQueryOperatorInput>;
};

export type SiteFlags = {
  __typename?: 'SiteFlags';
  FAST_DEV?: Maybe<Scalars['Boolean']>;
};

export type SiteFlagsFieldSelector = {
  FAST_DEV?: InputMaybe<FieldSelectorEnum>;
};

export type SiteFlagsFilterInput = {
  FAST_DEV?: InputMaybe<BooleanQueryOperatorInput>;
};

export type SiteFlagsSortInput = {
  FAST_DEV?: InputMaybe<SortOrderEnum>;
};

export type SiteFunction = Node & {
  __typename?: 'SiteFunction';
  absoluteCompiledFilePath: Scalars['String'];
  children: Array<Node>;
  functionRoute: Scalars['String'];
  id: Scalars['ID'];
  internal: Internal;
  matchPath?: Maybe<Scalars['String']>;
  originalAbsoluteFilePath: Scalars['String'];
  originalRelativeFilePath: Scalars['String'];
  parent?: Maybe<Node>;
  pluginName: Scalars['String'];
  relativeCompiledFilePath: Scalars['String'];
};

export type SiteFunctionConnection = {
  __typename?: 'SiteFunctionConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<SiteFunctionEdge>;
  group: Array<SiteFunctionGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<SiteFunction>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type SiteFunctionConnectionDistinctArgs = {
  field: SiteFunctionFieldSelector;
};


export type SiteFunctionConnectionGroupArgs = {
  field: SiteFunctionFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type SiteFunctionConnectionMaxArgs = {
  field: SiteFunctionFieldSelector;
};


export type SiteFunctionConnectionMinArgs = {
  field: SiteFunctionFieldSelector;
};


export type SiteFunctionConnectionSumArgs = {
  field: SiteFunctionFieldSelector;
};

export type SiteFunctionEdge = {
  __typename?: 'SiteFunctionEdge';
  next?: Maybe<SiteFunction>;
  node: SiteFunction;
  previous?: Maybe<SiteFunction>;
};

export type SiteFunctionFieldSelector = {
  absoluteCompiledFilePath?: InputMaybe<FieldSelectorEnum>;
  children?: InputMaybe<NodeFieldSelector>;
  functionRoute?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  internal?: InputMaybe<InternalFieldSelector>;
  matchPath?: InputMaybe<FieldSelectorEnum>;
  originalAbsoluteFilePath?: InputMaybe<FieldSelectorEnum>;
  originalRelativeFilePath?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  pluginName?: InputMaybe<FieldSelectorEnum>;
  relativeCompiledFilePath?: InputMaybe<FieldSelectorEnum>;
};

export type SiteFunctionFilterInput = {
  absoluteCompiledFilePath?: InputMaybe<StringQueryOperatorInput>;
  children?: InputMaybe<NodeFilterListInput>;
  functionRoute?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  matchPath?: InputMaybe<StringQueryOperatorInput>;
  originalAbsoluteFilePath?: InputMaybe<StringQueryOperatorInput>;
  originalRelativeFilePath?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  pluginName?: InputMaybe<StringQueryOperatorInput>;
  relativeCompiledFilePath?: InputMaybe<StringQueryOperatorInput>;
};

export type SiteFunctionGroupConnection = {
  __typename?: 'SiteFunctionGroupConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<SiteFunctionEdge>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
  group: Array<SiteFunctionGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<SiteFunction>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type SiteFunctionGroupConnectionDistinctArgs = {
  field: SiteFunctionFieldSelector;
};


export type SiteFunctionGroupConnectionGroupArgs = {
  field: SiteFunctionFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type SiteFunctionGroupConnectionMaxArgs = {
  field: SiteFunctionFieldSelector;
};


export type SiteFunctionGroupConnectionMinArgs = {
  field: SiteFunctionFieldSelector;
};


export type SiteFunctionGroupConnectionSumArgs = {
  field: SiteFunctionFieldSelector;
};

export type SiteFunctionSortInput = {
  absoluteCompiledFilePath?: InputMaybe<SortOrderEnum>;
  children?: InputMaybe<NodeSortInput>;
  functionRoute?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  internal?: InputMaybe<InternalSortInput>;
  matchPath?: InputMaybe<SortOrderEnum>;
  originalAbsoluteFilePath?: InputMaybe<SortOrderEnum>;
  originalRelativeFilePath?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  pluginName?: InputMaybe<SortOrderEnum>;
  relativeCompiledFilePath?: InputMaybe<SortOrderEnum>;
};

export type SiteGroupConnection = {
  __typename?: 'SiteGroupConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<SiteEdge>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
  group: Array<SiteGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type SiteGroupConnectionDistinctArgs = {
  field: SiteFieldSelector;
};


export type SiteGroupConnectionGroupArgs = {
  field: SiteFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type SiteGroupConnectionMaxArgs = {
  field: SiteFieldSelector;
};


export type SiteGroupConnectionMinArgs = {
  field: SiteFieldSelector;
};


export type SiteGroupConnectionSumArgs = {
  field: SiteFieldSelector;
};

export type SitePage = Node & {
  __typename?: 'SitePage';
  children: Array<Node>;
  component: Scalars['String'];
  componentChunkName: Scalars['String'];
  context?: Maybe<SitePageContext>;
  id: Scalars['ID'];
  internal: Internal;
  internalComponentName: Scalars['String'];
  matchPath?: Maybe<Scalars['String']>;
  pageContext?: Maybe<Scalars['JSON']>;
  parent?: Maybe<Node>;
  path: Scalars['String'];
  pluginCreator?: Maybe<SitePlugin>;
};

export type SitePageConnection = {
  __typename?: 'SitePageConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<SitePageEdge>;
  group: Array<SitePageGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type SitePageConnectionDistinctArgs = {
  field: SitePageFieldSelector;
};


export type SitePageConnectionGroupArgs = {
  field: SitePageFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type SitePageConnectionMaxArgs = {
  field: SitePageFieldSelector;
};


export type SitePageConnectionMinArgs = {
  field: SitePageFieldSelector;
};


export type SitePageConnectionSumArgs = {
  field: SitePageFieldSelector;
};

export type SitePageContext = {
  __typename?: 'SitePageContext';
  id?: Maybe<Scalars['String']>;
  pageInfo?: Maybe<PageInfo>;
  type?: Maybe<PageType>;
};

export type SitePageContextFieldSelector = {
  id?: InputMaybe<FieldSelectorEnum>;
  pageInfo?: InputMaybe<PageInfoFieldSelector>;
  type?: InputMaybe<FieldSelectorEnum>;
};

export type SitePageContextFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  pageInfo?: InputMaybe<PageInfoFilterInput>;
  type?: InputMaybe<PageTypeQueryOperatorInput>;
};

export type SitePageContextSortInput = {
  id?: InputMaybe<SortOrderEnum>;
  pageInfo?: InputMaybe<PageInfoSortInput>;
  type?: InputMaybe<SortOrderEnum>;
};

export type SitePageEdge = {
  __typename?: 'SitePageEdge';
  next?: Maybe<SitePage>;
  node: SitePage;
  previous?: Maybe<SitePage>;
};

export type SitePageFieldSelector = {
  children?: InputMaybe<NodeFieldSelector>;
  component?: InputMaybe<FieldSelectorEnum>;
  componentChunkName?: InputMaybe<FieldSelectorEnum>;
  context?: InputMaybe<SitePageContextFieldSelector>;
  id?: InputMaybe<FieldSelectorEnum>;
  internal?: InputMaybe<InternalFieldSelector>;
  internalComponentName?: InputMaybe<FieldSelectorEnum>;
  matchPath?: InputMaybe<FieldSelectorEnum>;
  pageContext?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  path?: InputMaybe<FieldSelectorEnum>;
  pluginCreator?: InputMaybe<SitePluginFieldSelector>;
};

export type SitePageFilterInput = {
  children?: InputMaybe<NodeFilterListInput>;
  component?: InputMaybe<StringQueryOperatorInput>;
  componentChunkName?: InputMaybe<StringQueryOperatorInput>;
  context?: InputMaybe<SitePageContextFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  internalComponentName?: InputMaybe<StringQueryOperatorInput>;
  matchPath?: InputMaybe<StringQueryOperatorInput>;
  pageContext?: InputMaybe<JsonQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  path?: InputMaybe<StringQueryOperatorInput>;
  pluginCreator?: InputMaybe<SitePluginFilterInput>;
};

export type SitePageGroupConnection = {
  __typename?: 'SitePageGroupConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<SitePageEdge>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
  group: Array<SitePageGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type SitePageGroupConnectionDistinctArgs = {
  field: SitePageFieldSelector;
};


export type SitePageGroupConnectionGroupArgs = {
  field: SitePageFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type SitePageGroupConnectionMaxArgs = {
  field: SitePageFieldSelector;
};


export type SitePageGroupConnectionMinArgs = {
  field: SitePageFieldSelector;
};


export type SitePageGroupConnectionSumArgs = {
  field: SitePageFieldSelector;
};

export type SitePageSortInput = {
  children?: InputMaybe<NodeSortInput>;
  component?: InputMaybe<SortOrderEnum>;
  componentChunkName?: InputMaybe<SortOrderEnum>;
  context?: InputMaybe<SitePageContextSortInput>;
  id?: InputMaybe<SortOrderEnum>;
  internal?: InputMaybe<InternalSortInput>;
  internalComponentName?: InputMaybe<SortOrderEnum>;
  matchPath?: InputMaybe<SortOrderEnum>;
  pageContext?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  path?: InputMaybe<SortOrderEnum>;
  pluginCreator?: InputMaybe<SitePluginSortInput>;
};

export type SitePlugin = Node & {
  __typename?: 'SitePlugin';
  browserAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  children: Array<Node>;
  id: Scalars['ID'];
  internal: Internal;
  name?: Maybe<Scalars['String']>;
  nodeAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  packageJson?: Maybe<Scalars['JSON']>;
  parent?: Maybe<Node>;
  pluginFilepath?: Maybe<Scalars['String']>;
  pluginOptions?: Maybe<Scalars['JSON']>;
  resolve?: Maybe<Scalars['String']>;
  ssrAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  version?: Maybe<Scalars['String']>;
};

export type SitePluginConnection = {
  __typename?: 'SitePluginConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<SitePluginEdge>;
  group: Array<SitePluginGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type SitePluginConnectionDistinctArgs = {
  field: SitePluginFieldSelector;
};


export type SitePluginConnectionGroupArgs = {
  field: SitePluginFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type SitePluginConnectionMaxArgs = {
  field: SitePluginFieldSelector;
};


export type SitePluginConnectionMinArgs = {
  field: SitePluginFieldSelector;
};


export type SitePluginConnectionSumArgs = {
  field: SitePluginFieldSelector;
};

export type SitePluginEdge = {
  __typename?: 'SitePluginEdge';
  next?: Maybe<SitePlugin>;
  node: SitePlugin;
  previous?: Maybe<SitePlugin>;
};

export type SitePluginFieldSelector = {
  browserAPIs?: InputMaybe<FieldSelectorEnum>;
  children?: InputMaybe<NodeFieldSelector>;
  id?: InputMaybe<FieldSelectorEnum>;
  internal?: InputMaybe<InternalFieldSelector>;
  name?: InputMaybe<FieldSelectorEnum>;
  nodeAPIs?: InputMaybe<FieldSelectorEnum>;
  packageJson?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  pluginFilepath?: InputMaybe<FieldSelectorEnum>;
  pluginOptions?: InputMaybe<FieldSelectorEnum>;
  resolve?: InputMaybe<FieldSelectorEnum>;
  ssrAPIs?: InputMaybe<FieldSelectorEnum>;
  version?: InputMaybe<FieldSelectorEnum>;
};

export type SitePluginFilterInput = {
  browserAPIs?: InputMaybe<StringQueryOperatorInput>;
  children?: InputMaybe<NodeFilterListInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  nodeAPIs?: InputMaybe<StringQueryOperatorInput>;
  packageJson?: InputMaybe<JsonQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  pluginFilepath?: InputMaybe<StringQueryOperatorInput>;
  pluginOptions?: InputMaybe<JsonQueryOperatorInput>;
  resolve?: InputMaybe<StringQueryOperatorInput>;
  ssrAPIs?: InputMaybe<StringQueryOperatorInput>;
  version?: InputMaybe<StringQueryOperatorInput>;
};

export type SitePluginGroupConnection = {
  __typename?: 'SitePluginGroupConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<SitePluginEdge>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
  group: Array<SitePluginGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type SitePluginGroupConnectionDistinctArgs = {
  field: SitePluginFieldSelector;
};


export type SitePluginGroupConnectionGroupArgs = {
  field: SitePluginFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type SitePluginGroupConnectionMaxArgs = {
  field: SitePluginFieldSelector;
};


export type SitePluginGroupConnectionMinArgs = {
  field: SitePluginFieldSelector;
};


export type SitePluginGroupConnectionSumArgs = {
  field: SitePluginFieldSelector;
};

export type SitePluginSortInput = {
  browserAPIs?: InputMaybe<SortOrderEnum>;
  children?: InputMaybe<NodeSortInput>;
  id?: InputMaybe<SortOrderEnum>;
  internal?: InputMaybe<InternalSortInput>;
  name?: InputMaybe<SortOrderEnum>;
  nodeAPIs?: InputMaybe<SortOrderEnum>;
  packageJson?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  pluginFilepath?: InputMaybe<SortOrderEnum>;
  pluginOptions?: InputMaybe<SortOrderEnum>;
  resolve?: InputMaybe<SortOrderEnum>;
  ssrAPIs?: InputMaybe<SortOrderEnum>;
  version?: InputMaybe<SortOrderEnum>;
};

export type SiteSiteMetadata = {
  __typename?: 'SiteSiteMetadata';
  author?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  siteURL?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type SiteSiteMetadataFieldSelector = {
  author?: InputMaybe<FieldSelectorEnum>;
  description?: InputMaybe<FieldSelectorEnum>;
  siteURL?: InputMaybe<FieldSelectorEnum>;
  title?: InputMaybe<FieldSelectorEnum>;
};

export type SiteSiteMetadataFilterInput = {
  author?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  siteURL?: InputMaybe<StringQueryOperatorInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
};

export type SiteSiteMetadataSortInput = {
  author?: InputMaybe<SortOrderEnum>;
  description?: InputMaybe<SortOrderEnum>;
  siteURL?: InputMaybe<SortOrderEnum>;
  title?: InputMaybe<SortOrderEnum>;
};

export type SiteSortInput = {
  buildTime?: InputMaybe<SortOrderEnum>;
  children?: InputMaybe<NodeSortInput>;
  flags?: InputMaybe<SiteFlagsSortInput>;
  graphqlTypegen?: InputMaybe<SortOrderEnum>;
  host?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  internal?: InputMaybe<InternalSortInput>;
  jsxRuntime?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  pathPrefix?: InputMaybe<SortOrderEnum>;
  polyfill?: InputMaybe<SortOrderEnum>;
  port?: InputMaybe<SortOrderEnum>;
  siteMetadata?: InputMaybe<SiteSiteMetadataSortInput>;
  trailingSlash?: InputMaybe<SortOrderEnum>;
};

export enum SortOrderEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringQueryOperatorInput = {
  eq?: InputMaybe<Scalars['String']>;
  glob?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ne?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  regex?: InputMaybe<Scalars['String']>;
};

export type TransformOptions = {
  cropFocus?: InputMaybe<ImageCropFocus>;
  duotone?: InputMaybe<DuotoneGradient>;
  fit?: InputMaybe<ImageFit>;
  grayscale?: InputMaybe<Scalars['Boolean']>;
  rotate?: InputMaybe<Scalars['Int']>;
  trim?: InputMaybe<Scalars['Float']>;
};

export type WebPOptions = {
  quality?: InputMaybe<Scalars['Int']>;
};

export type Db = {
  __typename?: 'db';
  /** fetch data from the table: "events" */
  events: Array<Db_Events>;
  memberships?: Maybe<Array<Maybe<Db_Membership>>>;
  /** fetch data from the table: "riders" */
  riders: Array<Db_Riders>;
  /** fetch data from the table: "rides" */
  rides: Array<Db_Rides>;
  /** fetch data from the table: "routes" */
  routes: Array<Db_Routes>;
};


export type DbEventsArgs = {
  distinct_on?: InputMaybe<Array<Db_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Db_Events_Order_By>>;
  where?: InputMaybe<Db_Events_Bool_Exp>;
};


export type DbMembershipsArgs = {
  where?: InputMaybe<Db_QueryInput>;
};


export type DbRidersArgs = {
  distinct_on?: InputMaybe<Array<Db_Riders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Db_Riders_Order_By>>;
  where?: InputMaybe<Db_Riders_Bool_Exp>;
};


export type DbRidesArgs = {
  distinct_on?: InputMaybe<Array<Db_Rides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Db_Rides_Order_By>>;
  where?: InputMaybe<Db_Rides_Bool_Exp>;
};


export type DbRoutesArgs = {
  distinct_on?: InputMaybe<Array<Db_Routes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Db_Routes_Order_By>>;
  where?: InputMaybe<Db_Routes_Bool_Exp>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Db_Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

export type Db_Membership = {
  __typename?: 'db_Membership';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  riderName?: Maybe<Scalars['String']>;
  type?: Maybe<Db_MembershipType>;
};

export enum Db_MembershipType {
  Family = 'Family',
  Individual = 'Individual',
  Trial = 'Trial'
}

export type Db_QueryInput = {
  riderName?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type Db_String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** ordering argument of a cursor */
export enum Db_Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Db_Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['db_date']>;
  _gt?: InputMaybe<Scalars['db_date']>;
  _gte?: InputMaybe<Scalars['db_date']>;
  _in?: InputMaybe<Array<Scalars['db_date']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['db_date']>;
  _lte?: InputMaybe<Scalars['db_date']>;
  _neq?: InputMaybe<Scalars['db_date']>;
  _nin?: InputMaybe<Array<Scalars['db_date']>>;
};

/** columns and relationships of "events" */
export type Db_Events = {
  __typename?: 'db_events';
  chapter?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['db_date']>;
  event_id?: Maybe<Scalars['Int']>;
  eventtype?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organization?: Maybe<Scalars['String']>;
  /** An array relationship */
  riders: Array<Db_Rides>;
  /** An object relationship */
  route?: Maybe<Db_Routes>;
};


/** columns and relationships of "events" */
export type Db_EventsRidersArgs = {
  distinct_on?: InputMaybe<Array<Db_Rides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Db_Rides_Order_By>>;
  where?: InputMaybe<Db_Rides_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type Db_Events_Bool_Exp = {
  _and?: InputMaybe<Array<Db_Events_Bool_Exp>>;
  _not?: InputMaybe<Db_Events_Bool_Exp>;
  _or?: InputMaybe<Array<Db_Events_Bool_Exp>>;
  chapter?: InputMaybe<Db_String_Comparison_Exp>;
  date?: InputMaybe<Db_Date_Comparison_Exp>;
  event_id?: InputMaybe<Db_Int_Comparison_Exp>;
  eventtype?: InputMaybe<Db_String_Comparison_Exp>;
  name?: InputMaybe<Db_String_Comparison_Exp>;
  organization?: InputMaybe<Db_String_Comparison_Exp>;
  riders?: InputMaybe<Db_Rides_Bool_Exp>;
  route?: InputMaybe<Db_Routes_Bool_Exp>;
};

/** Ordering options when selecting data from "events". */
export type Db_Events_Order_By = {
  chapter?: InputMaybe<Db_Order_By>;
  date?: InputMaybe<Db_Order_By>;
  event_id?: InputMaybe<Db_Order_By>;
  eventtype?: InputMaybe<Db_Order_By>;
  name?: InputMaybe<Db_Order_By>;
  organization?: InputMaybe<Db_Order_By>;
  riders_aggregate?: InputMaybe<Db_Rides_Aggregate_Order_By>;
  route?: InputMaybe<Db_Routes_Order_By>;
};

/** select columns of table "events" */
export enum Db_Events_Select_Column {
  /** column name */
  Chapter = 'chapter',
  /** column name */
  Date = 'date',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Eventtype = 'eventtype',
  /** column name */
  Name = 'name',
  /** column name */
  Organization = 'organization'
}

/** Streaming cursor of the table "events" */
export type Db_Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Db_Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Db_Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Db_Events_Stream_Cursor_Value_Input = {
  chapter?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['db_date']>;
  event_id?: InputMaybe<Scalars['Int']>;
  eventtype?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization?: InputMaybe<Scalars['String']>;
};

/** column ordering options */
export enum Db_Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** input type for inserting array relation for remote table "ride" */
export type Db_Ride_Arr_Rel_Insert_Input = {
  data: Array<Db_Ride_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Db_Ride_On_Conflict>;
};

/** Boolean expression to filter rows from the table "ride". All fields are combined with a logical 'AND'. */
export type Db_Ride_Bool_Exp = {
  _and?: InputMaybe<Array<Db_Ride_Bool_Exp>>;
  _not?: InputMaybe<Db_Ride_Bool_Exp>;
  _or?: InputMaybe<Array<Db_Ride_Bool_Exp>>;
};

/** unique or primary key constraints on table "ride" */
export enum Db_Ride_Constraint {
  /** unique or primary key constraint on columns "ride_timestamp", "ride_id" */
  RidePkey = 'ride_pkey',
  /** unique or primary key constraint on columns "ride_rider", "ride_event" */
  RideUnique = 'ride_unique'
}

/** input type for inserting data into table "ride" */
export type Db_Ride_Insert_Input = {
  ride_event?: InputMaybe<Scalars['Int']>;
  ride_rider?: InputMaybe<Scalars['Int']>;
  ride_starttime?: InputMaybe<Scalars['db_timestamptz']>;
  rider?: InputMaybe<Db_Rider_Obj_Rel_Insert_Input>;
};

/** response of any mutation on the table "ride" */
export type Db_Ride_Mutation_Response = {
  __typename?: 'db_ride_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
};

/** on_conflict condition type for table "ride" */
export type Db_Ride_On_Conflict = {
  constraint: Db_Ride_Constraint;
  update_columns?: Array<Db_Ride_Update_Column>;
  where?: InputMaybe<Db_Ride_Bool_Exp>;
};

/** placeholder for update columns of table "ride" (current role has no relevant permissions) */
export enum Db_Ride_Update_Column {
  /** placeholder (do not use) */
  Placeholder = '_PLACEHOLDER'
}

/** Boolean expression to filter rows from the table "rider". All fields are combined with a logical 'AND'. */
export type Db_Rider_Bool_Exp = {
  _and?: InputMaybe<Array<Db_Rider_Bool_Exp>>;
  _not?: InputMaybe<Db_Rider_Bool_Exp>;
  _or?: InputMaybe<Array<Db_Rider_Bool_Exp>>;
};

/** unique or primary key constraints on table "rider" */
export enum Db_Rider_Constraint {
  /** unique or primary key constraint on columns "rider_timestamp", "rider_id" */
  RiderPkey = 'rider_pkey',
  /** unique or primary key constraint on columns "rider_lastname", "rider_firstname" */
  RiderRiderFirstnameRiderLastnameKey = 'rider_rider_firstname_rider_lastname_key'
}

/** input type for inserting data into table "rider" */
export type Db_Rider_Insert_Input = {
  rider_email?: InputMaybe<Scalars['String']>;
  rider_firstname?: InputMaybe<Scalars['String']>;
  rider_gender?: InputMaybe<Scalars['String']>;
  rider_lastname?: InputMaybe<Scalars['String']>;
  rides?: InputMaybe<Db_Ride_Arr_Rel_Insert_Input>;
};

/** response of any mutation on the table "rider" */
export type Db_Rider_Mutation_Response = {
  __typename?: 'db_rider_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
};

/** input type for inserting object relation for remote table "rider" */
export type Db_Rider_Obj_Rel_Insert_Input = {
  data: Db_Rider_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Db_Rider_On_Conflict>;
};

/** on_conflict condition type for table "rider" */
export type Db_Rider_On_Conflict = {
  constraint: Db_Rider_Constraint;
  update_columns?: Array<Db_Rider_Update_Column>;
  where?: InputMaybe<Db_Rider_Bool_Exp>;
};

/** placeholder for update columns of table "rider" (current role has no relevant permissions) */
export enum Db_Rider_Update_Column {
  /** placeholder (do not use) */
  Placeholder = '_PLACEHOLDER'
}

/** columns and relationships of "riders" */
export type Db_Riders = {
  __typename?: 'db_riders';
  membership?: Maybe<Array<Maybe<Db_Membership>>>;
  riderName?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "riders". All fields are combined with a logical 'AND'. */
export type Db_Riders_Bool_Exp = {
  _and?: InputMaybe<Array<Db_Riders_Bool_Exp>>;
  _not?: InputMaybe<Db_Riders_Bool_Exp>;
  _or?: InputMaybe<Array<Db_Riders_Bool_Exp>>;
  riderName?: InputMaybe<Db_String_Comparison_Exp>;
};

/** Ordering options when selecting data from "riders". */
export type Db_Riders_Order_By = {
  riderName?: InputMaybe<Db_Order_By>;
};

/** select columns of table "riders" */
export enum Db_Riders_Select_Column {
  /** column name */
  RiderName = 'riderName'
}

/** Streaming cursor of the table "riders" */
export type Db_Riders_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Db_Riders_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Db_Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Db_Riders_Stream_Cursor_Value_Input = {
  riderName?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "rides" */
export type Db_Rides = {
  __typename?: 'db_rides';
  resultType?: Maybe<Scalars['String']>;
  ride_event?: Maybe<Scalars['Int']>;
  ride_id?: Maybe<Scalars['Int']>;
  ride_rider?: Maybe<Scalars['Int']>;
  /** An object relationship */
  rider?: Maybe<Db_Riders>;
};

/** order by aggregate values of table "rides" */
export type Db_Rides_Aggregate_Order_By = {
  avg?: InputMaybe<Db_Rides_Avg_Order_By>;
  count?: InputMaybe<Db_Order_By>;
  max?: InputMaybe<Db_Rides_Max_Order_By>;
  min?: InputMaybe<Db_Rides_Min_Order_By>;
  stddev?: InputMaybe<Db_Rides_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Db_Rides_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Db_Rides_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Db_Rides_Sum_Order_By>;
  var_pop?: InputMaybe<Db_Rides_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Db_Rides_Var_Samp_Order_By>;
  variance?: InputMaybe<Db_Rides_Variance_Order_By>;
};

/** order by avg() on columns of table "rides" */
export type Db_Rides_Avg_Order_By = {
  ride_event?: InputMaybe<Db_Order_By>;
  ride_id?: InputMaybe<Db_Order_By>;
  ride_rider?: InputMaybe<Db_Order_By>;
};

/** Boolean expression to filter rows from the table "rides". All fields are combined with a logical 'AND'. */
export type Db_Rides_Bool_Exp = {
  _and?: InputMaybe<Array<Db_Rides_Bool_Exp>>;
  _not?: InputMaybe<Db_Rides_Bool_Exp>;
  _or?: InputMaybe<Array<Db_Rides_Bool_Exp>>;
  resultType?: InputMaybe<Db_String_Comparison_Exp>;
  ride_event?: InputMaybe<Db_Int_Comparison_Exp>;
  ride_id?: InputMaybe<Db_Int_Comparison_Exp>;
  ride_rider?: InputMaybe<Db_Int_Comparison_Exp>;
  rider?: InputMaybe<Db_Riders_Bool_Exp>;
};

/** order by max() on columns of table "rides" */
export type Db_Rides_Max_Order_By = {
  resultType?: InputMaybe<Db_Order_By>;
  ride_event?: InputMaybe<Db_Order_By>;
  ride_id?: InputMaybe<Db_Order_By>;
  ride_rider?: InputMaybe<Db_Order_By>;
};

/** order by min() on columns of table "rides" */
export type Db_Rides_Min_Order_By = {
  resultType?: InputMaybe<Db_Order_By>;
  ride_event?: InputMaybe<Db_Order_By>;
  ride_id?: InputMaybe<Db_Order_By>;
  ride_rider?: InputMaybe<Db_Order_By>;
};

/** Ordering options when selecting data from "rides". */
export type Db_Rides_Order_By = {
  resultType?: InputMaybe<Db_Order_By>;
  ride_event?: InputMaybe<Db_Order_By>;
  ride_id?: InputMaybe<Db_Order_By>;
  ride_rider?: InputMaybe<Db_Order_By>;
  rider?: InputMaybe<Db_Riders_Order_By>;
};

/** select columns of table "rides" */
export enum Db_Rides_Select_Column {
  /** column name */
  ResultType = 'resultType',
  /** column name */
  RideEvent = 'ride_event',
  /** column name */
  RideId = 'ride_id',
  /** column name */
  RideRider = 'ride_rider'
}

/** order by stddev() on columns of table "rides" */
export type Db_Rides_Stddev_Order_By = {
  ride_event?: InputMaybe<Db_Order_By>;
  ride_id?: InputMaybe<Db_Order_By>;
  ride_rider?: InputMaybe<Db_Order_By>;
};

/** order by stddev_pop() on columns of table "rides" */
export type Db_Rides_Stddev_Pop_Order_By = {
  ride_event?: InputMaybe<Db_Order_By>;
  ride_id?: InputMaybe<Db_Order_By>;
  ride_rider?: InputMaybe<Db_Order_By>;
};

/** order by stddev_samp() on columns of table "rides" */
export type Db_Rides_Stddev_Samp_Order_By = {
  ride_event?: InputMaybe<Db_Order_By>;
  ride_id?: InputMaybe<Db_Order_By>;
  ride_rider?: InputMaybe<Db_Order_By>;
};

/** Streaming cursor of the table "rides" */
export type Db_Rides_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Db_Rides_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Db_Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Db_Rides_Stream_Cursor_Value_Input = {
  resultType?: InputMaybe<Scalars['String']>;
  ride_event?: InputMaybe<Scalars['Int']>;
  ride_id?: InputMaybe<Scalars['Int']>;
  ride_rider?: InputMaybe<Scalars['Int']>;
};

/** order by sum() on columns of table "rides" */
export type Db_Rides_Sum_Order_By = {
  ride_event?: InputMaybe<Db_Order_By>;
  ride_id?: InputMaybe<Db_Order_By>;
  ride_rider?: InputMaybe<Db_Order_By>;
};

/** order by var_pop() on columns of table "rides" */
export type Db_Rides_Var_Pop_Order_By = {
  ride_event?: InputMaybe<Db_Order_By>;
  ride_id?: InputMaybe<Db_Order_By>;
  ride_rider?: InputMaybe<Db_Order_By>;
};

/** order by var_samp() on columns of table "rides" */
export type Db_Rides_Var_Samp_Order_By = {
  ride_event?: InputMaybe<Db_Order_By>;
  ride_id?: InputMaybe<Db_Order_By>;
  ride_rider?: InputMaybe<Db_Order_By>;
};

/** order by variance() on columns of table "rides" */
export type Db_Rides_Variance_Order_By = {
  ride_event?: InputMaybe<Db_Order_By>;
  ride_id?: InputMaybe<Db_Order_By>;
  ride_rider?: InputMaybe<Db_Order_By>;
};

/** columns and relationships of "routes" */
export type Db_Routes = {
  __typename?: 'db_routes';
  brevetDistance?: Maybe<Scalars['Int']>;
  chapter?: Maybe<Scalars['String']>;
  cuesheet?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  startLocation?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "routes". All fields are combined with a logical 'AND'. */
export type Db_Routes_Bool_Exp = {
  _and?: InputMaybe<Array<Db_Routes_Bool_Exp>>;
  _not?: InputMaybe<Db_Routes_Bool_Exp>;
  _or?: InputMaybe<Array<Db_Routes_Bool_Exp>>;
  brevetDistance?: InputMaybe<Db_Int_Comparison_Exp>;
  chapter?: InputMaybe<Db_String_Comparison_Exp>;
  cuesheet?: InputMaybe<Db_String_Comparison_Exp>;
  distance?: InputMaybe<Db_Int_Comparison_Exp>;
  id?: InputMaybe<Db_Int_Comparison_Exp>;
  name?: InputMaybe<Db_String_Comparison_Exp>;
  startLocation?: InputMaybe<Db_String_Comparison_Exp>;
};

/** Ordering options when selecting data from "routes". */
export type Db_Routes_Order_By = {
  brevetDistance?: InputMaybe<Db_Order_By>;
  chapter?: InputMaybe<Db_Order_By>;
  cuesheet?: InputMaybe<Db_Order_By>;
  distance?: InputMaybe<Db_Order_By>;
  id?: InputMaybe<Db_Order_By>;
  name?: InputMaybe<Db_Order_By>;
  startLocation?: InputMaybe<Db_Order_By>;
};

/** select columns of table "routes" */
export enum Db_Routes_Select_Column {
  /** column name */
  BrevetDistance = 'brevetDistance',
  /** column name */
  Chapter = 'chapter',
  /** column name */
  Cuesheet = 'cuesheet',
  /** column name */
  Distance = 'distance',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  StartLocation = 'startLocation'
}

/** Streaming cursor of the table "routes" */
export type Db_Routes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Db_Routes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Db_Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Db_Routes_Stream_Cursor_Value_Input = {
  brevetDistance?: InputMaybe<Scalars['Int']>;
  chapter?: InputMaybe<Scalars['String']>;
  cuesheet?: InputMaybe<Scalars['String']>;
  distance?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  startLocation?: InputMaybe<Scalars['String']>;
};

export type Event = Node & {
  __typename?: 'event';
  chapter?: Maybe<Chapter>;
  children: Array<Node>;
  contact?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  distance?: Maybe<Scalars['Int']>;
  event?: Maybe<Scalars['String']>;
  eventType?: Maybe<EventType>;
  gatsbyPath?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  internal: Internal;
  organizer?: Maybe<Scalars['String']>;
  parent?: Maybe<Node>;
  route?: Maybe<Scalars['String']>;
  rwgps?: Maybe<Scalars['String']>;
  rwgpsId?: Maybe<Scalars['String']>;
  rwgpsUrl?: Maybe<Scalars['String']>;
  sched_id?: Maybe<Scalars['String']>;
  scheduleId?: Maybe<Scalars['String']>;
  season?: Maybe<Scalars['String']>;
  startLocation?: Maybe<Scalars['String']>;
  startloc?: Maybe<Scalars['String']>;
  stime?: Maybe<Scalars['String']>;
  unixtime?: Maybe<Scalars['Int']>;
};


export type EventDateArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type EventGatsbyPathArgs = {
  filePath?: InputMaybe<Scalars['String']>;
};

export type EventConnection = {
  __typename?: 'eventConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<EventEdge>;
  group: Array<EventGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<Event>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type EventConnectionDistinctArgs = {
  field: EventFieldSelector;
};


export type EventConnectionGroupArgs = {
  field: EventFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type EventConnectionMaxArgs = {
  field: EventFieldSelector;
};


export type EventConnectionMinArgs = {
  field: EventFieldSelector;
};


export type EventConnectionSumArgs = {
  field: EventFieldSelector;
};

export type EventEdge = {
  __typename?: 'eventEdge';
  next?: Maybe<Event>;
  node: Event;
  previous?: Maybe<Event>;
};

export type EventFieldSelector = {
  chapter?: InputMaybe<FieldSelectorEnum>;
  children?: InputMaybe<NodeFieldSelector>;
  contact?: InputMaybe<FieldSelectorEnum>;
  date?: InputMaybe<FieldSelectorEnum>;
  distance?: InputMaybe<FieldSelectorEnum>;
  event?: InputMaybe<FieldSelectorEnum>;
  eventType?: InputMaybe<FieldSelectorEnum>;
  gatsbyPath?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  internal?: InputMaybe<InternalFieldSelector>;
  organizer?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  route?: InputMaybe<FieldSelectorEnum>;
  rwgps?: InputMaybe<FieldSelectorEnum>;
  rwgpsId?: InputMaybe<FieldSelectorEnum>;
  rwgpsUrl?: InputMaybe<FieldSelectorEnum>;
  sched_id?: InputMaybe<FieldSelectorEnum>;
  scheduleId?: InputMaybe<FieldSelectorEnum>;
  season?: InputMaybe<FieldSelectorEnum>;
  startLocation?: InputMaybe<FieldSelectorEnum>;
  startloc?: InputMaybe<FieldSelectorEnum>;
  stime?: InputMaybe<FieldSelectorEnum>;
  unixtime?: InputMaybe<FieldSelectorEnum>;
};

export type EventFilterInput = {
  chapter?: InputMaybe<ChapterQueryOperatorInput>;
  children?: InputMaybe<NodeFilterListInput>;
  contact?: InputMaybe<StringQueryOperatorInput>;
  date?: InputMaybe<DateQueryOperatorInput>;
  distance?: InputMaybe<IntQueryOperatorInput>;
  event?: InputMaybe<StringQueryOperatorInput>;
  eventType?: InputMaybe<EventTypeQueryOperatorInput>;
  gatsbyPath?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  organizer?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  route?: InputMaybe<StringQueryOperatorInput>;
  rwgps?: InputMaybe<StringQueryOperatorInput>;
  rwgpsId?: InputMaybe<StringQueryOperatorInput>;
  rwgpsUrl?: InputMaybe<StringQueryOperatorInput>;
  sched_id?: InputMaybe<StringQueryOperatorInput>;
  scheduleId?: InputMaybe<StringQueryOperatorInput>;
  season?: InputMaybe<StringQueryOperatorInput>;
  startLocation?: InputMaybe<StringQueryOperatorInput>;
  startloc?: InputMaybe<StringQueryOperatorInput>;
  stime?: InputMaybe<StringQueryOperatorInput>;
  unixtime?: InputMaybe<IntQueryOperatorInput>;
};

export type EventGroupConnection = {
  __typename?: 'eventGroupConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<EventEdge>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
  group: Array<EventGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<Event>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type EventGroupConnectionDistinctArgs = {
  field: EventFieldSelector;
};


export type EventGroupConnectionGroupArgs = {
  field: EventFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type EventGroupConnectionMaxArgs = {
  field: EventFieldSelector;
};


export type EventGroupConnectionMinArgs = {
  field: EventFieldSelector;
};


export type EventGroupConnectionSumArgs = {
  field: EventFieldSelector;
};

export type EventSortInput = {
  chapter?: InputMaybe<SortOrderEnum>;
  children?: InputMaybe<NodeSortInput>;
  contact?: InputMaybe<SortOrderEnum>;
  date?: InputMaybe<SortOrderEnum>;
  distance?: InputMaybe<SortOrderEnum>;
  event?: InputMaybe<SortOrderEnum>;
  eventType?: InputMaybe<SortOrderEnum>;
  gatsbyPath?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  internal?: InputMaybe<InternalSortInput>;
  organizer?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  route?: InputMaybe<SortOrderEnum>;
  rwgps?: InputMaybe<SortOrderEnum>;
  rwgpsId?: InputMaybe<SortOrderEnum>;
  rwgpsUrl?: InputMaybe<SortOrderEnum>;
  sched_id?: InputMaybe<SortOrderEnum>;
  scheduleId?: InputMaybe<SortOrderEnum>;
  season?: InputMaybe<SortOrderEnum>;
  startLocation?: InputMaybe<SortOrderEnum>;
  startloc?: InputMaybe<SortOrderEnum>;
  stime?: InputMaybe<SortOrderEnum>;
  unixtime?: InputMaybe<SortOrderEnum>;
};

export type Mail = Node & {
  __typename?: 'mail';
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
  children: Array<Node>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  internal: Internal;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Node>;
  sentAt?: Maybe<Scalars['Date']>;
  subject?: Maybe<Scalars['String']>;
  teaser?: Maybe<Scalars['String']>;
};


export type MailSentAtArgs = {
  difference?: InputMaybe<Scalars['String']>;
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type MailConnection = {
  __typename?: 'mailConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<MailEdge>;
  group: Array<MailGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<Mail>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type MailConnectionDistinctArgs = {
  field: MailFieldSelector;
};


export type MailConnectionGroupArgs = {
  field: MailFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type MailConnectionMaxArgs = {
  field: MailFieldSelector;
};


export type MailConnectionMinArgs = {
  field: MailFieldSelector;
};


export type MailConnectionSumArgs = {
  field: MailFieldSelector;
};

export type MailEdge = {
  __typename?: 'mailEdge';
  next?: Maybe<Mail>;
  node: Mail;
  previous?: Maybe<Mail>;
};

export type MailFieldSelector = {
  categories?: InputMaybe<FieldSelectorEnum>;
  children?: InputMaybe<NodeFieldSelector>;
  content?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  internal?: InputMaybe<InternalFieldSelector>;
  name?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  sentAt?: InputMaybe<FieldSelectorEnum>;
  subject?: InputMaybe<FieldSelectorEnum>;
  teaser?: InputMaybe<FieldSelectorEnum>;
};

export type MailFilterInput = {
  categories?: InputMaybe<StringQueryOperatorInput>;
  children?: InputMaybe<NodeFilterListInput>;
  content?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  internal?: InputMaybe<InternalFilterInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  sentAt?: InputMaybe<DateQueryOperatorInput>;
  subject?: InputMaybe<StringQueryOperatorInput>;
  teaser?: InputMaybe<StringQueryOperatorInput>;
};

export type MailGroupConnection = {
  __typename?: 'mailGroupConnection';
  distinct: Array<Scalars['String']>;
  edges: Array<MailEdge>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
  group: Array<MailGroupConnection>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nodes: Array<Mail>;
  pageInfo: PageInfo;
  sum?: Maybe<Scalars['Float']>;
  totalCount: Scalars['Int'];
};


export type MailGroupConnectionDistinctArgs = {
  field: MailFieldSelector;
};


export type MailGroupConnectionGroupArgs = {
  field: MailFieldSelector;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type MailGroupConnectionMaxArgs = {
  field: MailFieldSelector;
};


export type MailGroupConnectionMinArgs = {
  field: MailFieldSelector;
};


export type MailGroupConnectionSumArgs = {
  field: MailFieldSelector;
};

export type MailSortInput = {
  categories?: InputMaybe<SortOrderEnum>;
  children?: InputMaybe<NodeSortInput>;
  content?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  internal?: InputMaybe<InternalSortInput>;
  name?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  sentAt?: InputMaybe<SortOrderEnum>;
  subject?: InputMaybe<SortOrderEnum>;
  teaser?: InputMaybe<SortOrderEnum>;
};

export type EventCalendarFeedsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventCalendarFeedsQuery = { __typename?: 'Query', allEvent: { __typename?: 'eventConnection', nodes: Array<{ __typename?: 'event', chapter?: Chapter | null, distance?: number | null, eventType?: EventType | null, id: string, organizer?: string | null, route?: string | null, startLocation?: string | null, date?: any | null, season?: string | null, path?: string | null }> } };

export type LoadMailQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type LoadMailQueryQuery = { __typename?: 'Query', allMail: { __typename?: 'mailConnection', nodes: Array<{ __typename?: 'mail', id: string, categories?: Array<string | null> | null, name?: string | null }> } };

export type GatsbyImageSharpFixedFragment = { __typename?: 'ImageSharpFixed', base64?: string | null, width: number, height: number, src: string, srcSet: string };

export type GatsbyImageSharpFixed_TracedSvgFragment = { __typename?: 'ImageSharpFixed', tracedSVG?: string | null, width: number, height: number, src: string, srcSet: string };

export type GatsbyImageSharpFixed_WithWebpFragment = { __typename?: 'ImageSharpFixed', base64?: string | null, width: number, height: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null };

export type GatsbyImageSharpFixed_WithWebp_TracedSvgFragment = { __typename?: 'ImageSharpFixed', tracedSVG?: string | null, width: number, height: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null };

export type GatsbyImageSharpFixed_NoBase64Fragment = { __typename?: 'ImageSharpFixed', width: number, height: number, src: string, srcSet: string };

export type GatsbyImageSharpFixed_WithWebp_NoBase64Fragment = { __typename?: 'ImageSharpFixed', width: number, height: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null };

export type GatsbyImageSharpFluidFragment = { __typename?: 'ImageSharpFluid', base64?: string | null, aspectRatio: number, src: string, srcSet: string, sizes: string };

export type GatsbyImageSharpFluidLimitPresentationSizeFragment = { __typename?: 'ImageSharpFluid', maxHeight: number, maxWidth: number };

export type GatsbyImageSharpFluid_TracedSvgFragment = { __typename?: 'ImageSharpFluid', tracedSVG?: string | null, aspectRatio: number, src: string, srcSet: string, sizes: string };

export type GatsbyImageSharpFluid_WithWebpFragment = { __typename?: 'ImageSharpFluid', base64?: string | null, aspectRatio: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null, sizes: string };

export type GatsbyImageSharpFluid_WithWebp_TracedSvgFragment = { __typename?: 'ImageSharpFluid', tracedSVG?: string | null, aspectRatio: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null, sizes: string };

export type GatsbyImageSharpFluid_NoBase64Fragment = { __typename?: 'ImageSharpFluid', aspectRatio: number, src: string, srcSet: string, sizes: string };

export type GatsbyImageSharpFluid_WithWebp_NoBase64Fragment = { __typename?: 'ImageSharpFluid', aspectRatio: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null, sizes: string };

export type PagesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type PagesQueryQuery = { __typename?: 'Query', allSiteFunction: { __typename?: 'SiteFunctionConnection', nodes: Array<{ __typename?: 'SiteFunction', functionRoute: string }> }, allSitePage: { __typename?: 'SitePageConnection', nodes: Array<{ __typename?: 'SitePage', path: string }> } };

export type GalleryQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GalleryQueryQuery = { __typename?: 'Query', allFile: { __typename?: 'FileConnection', nodes: Array<{ __typename?: 'File', name: string, childImageSharp?: { __typename?: 'ImageSharp', gatsbyImageData: any } | null }> } };

export type SiteTitleQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type SiteTitleQueryQuery = { __typename?: 'Query', site?: { __typename?: 'Site', siteMetadata?: { __typename?: 'SiteSiteMetadata', title?: string | null } | null } | null };

export type SeoImageQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type SeoImageQueryQuery = { __typename?: 'Query', site?: { __typename?: 'Site', siteMetadata?: { __typename?: 'SiteSiteMetadata', title?: string | null, description?: string | null, siteURL?: string | null } | null } | null };

export type UseBlogQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UseBlogQueryQuery = { __typename?: 'Query', allFeedblog: { __typename?: 'FeedblogConnection', nodes: Array<{ __typename?: 'Feedblog', id: string, title?: string | null, link?: string | null, content?: { __typename?: 'FeedblogContent', encodedSnippet?: string | null } | null }> } };

export type EventDataQueryVariables = Exact<{ [key: string]: never; }>;


export type EventDataQuery = { __typename?: 'Query', allEvent: { __typename?: 'eventConnection', nodes: Array<{ __typename?: 'event', chapter?: Chapter | null, distance?: number | null, eventType?: EventType | null, id: string, organizer?: string | null, route?: string | null, rwgpsUrl?: string | null, startLocation?: string | null, date?: any | null, scheduleId?: string | null, path?: string | null }> } };

export type UseRoutesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UseRoutesQueryQuery = { __typename?: 'Query', db: { __typename?: 'db', routes: Array<{ __typename?: 'db_routes', startLocation?: string | null, name?: string | null, id?: number | null, distance?: number | null, chapter?: string | null }> } };

export type EventPageQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type EventPageQueryQuery = { __typename?: 'Query', allSitePage: { __typename?: 'SitePageConnection', nodes: Array<{ __typename?: 'SitePage', path: string, id: string, context?: { __typename?: 'SitePageContext', pageInfo?: { __typename?: 'PageInfo', title?: string | null } | null } | null }> } };

export type SeasonPageQueryVariables = Exact<{
  season?: InputMaybe<Scalars['String']>;
}>;


export type SeasonPageQuery = { __typename?: 'Query', allEvent: { __typename?: 'eventConnection', nodes: Array<{ __typename?: 'event', chapter?: Chapter | null, distance?: number | null, eventType?: EventType | null, id: string, organizer?: string | null, route?: string | null, startLocation?: string | null, date?: any | null, season?: string | null, path?: string | null }> } };

export type EventPageQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type EventPageQuery = { __typename?: 'Query', event?: { __typename?: 'event', chapter?: Chapter | null, date?: any | null, distance?: number | null, eventType?: EventType | null, id: string, route?: string | null, rwgpsId?: string | null, rwgpsUrl?: string | null, scheduleId?: string | null, season?: string | null, startLocation?: string | null } | null };

export type IndexPageQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type IndexPageQueryQuery = { __typename?: 'Query', allMail: { __typename?: 'mailConnection', nodes: Array<{ __typename?: 'mail', id: string, name?: string | null, teaser?: string | null, subject?: string | null }> }, allSitePage: { __typename?: 'SitePageConnection', nodes: Array<{ __typename?: 'SitePage', path: string, context?: { __typename?: 'SitePageContext', id?: string | null } | null }> }, allFile: { __typename?: 'FileConnection', nodes: Array<{ __typename?: 'File', name: string, childImageSharp?: { __typename?: 'ImageSharp', gatsbyImageData: any } | null }> } };

export type LonelinessImageQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type LonelinessImageQueryQuery = { __typename?: 'Query', file?: { __typename?: 'File', name: string, childImageSharp?: { __typename?: 'ImageSharp', gatsbyImageData: any } | null } | null };

export type TraceImageQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type TraceImageQueryQuery = { __typename?: 'Query', file?: { __typename?: 'File', name: string, childImageSharp?: { __typename?: 'ImageSharp', gatsbyImageData: any } | null } | null };

export type AudaxImageQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AudaxImageQueryQuery = { __typename?: 'Query', file?: { __typename?: 'File', name: string, childImageSharp?: { __typename?: 'ImageSharp', gatsbyImageData: any } | null } | null };

export type MedalImgQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MedalImgQueryQuery = { __typename?: 'Query', file?: { __typename?: 'File', name: string, childImageSharp?: { __typename?: 'ImageSharp', gatsbyImageData: any } | null } | null };

export type NewsletterQueryQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type NewsletterQueryQuery = { __typename?: 'Query', mail?: { __typename?: 'mail', categories?: Array<string | null> | null, content?: string | null, id: string, name?: string | null, sentAt?: any | null, subject?: string | null, teaser?: string | null } | null };


declare module '*/createPages.ts' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const EventCalendarFeeds: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/createPage.ts' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const loadMailQuery: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/fragments.js' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GatsbyImageSharpFixed: DocumentNode;
export const GatsbyImageSharpFixed_tracedSVG: DocumentNode;
export const GatsbyImageSharpFixed_withWebp: DocumentNode;
export const GatsbyImageSharpFixed_withWebp_tracedSVG: DocumentNode;
export const GatsbyImageSharpFixed_noBase64: DocumentNode;
export const GatsbyImageSharpFixed_withWebp_noBase64: DocumentNode;
export const GatsbyImageSharpFluid: DocumentNode;
export const GatsbyImageSharpFluidLimitPresentationSize: DocumentNode;
export const GatsbyImageSharpFluid_tracedSVG: DocumentNode;
export const GatsbyImageSharpFluid_withWebp: DocumentNode;
export const GatsbyImageSharpFluid_withWebp_tracedSVG: DocumentNode;
export const GatsbyImageSharpFluid_noBase64: DocumentNode;
export const GatsbyImageSharpFluid_withWebp_noBase64: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/raw_dev-404-page.js' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const PagesQuery: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/Gallery.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GalleryQuery: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/layout.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const SiteTitleQuery: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/seo.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const seoImageQuery: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/useBlog.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const useBlogQuery: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/useEvents.ts' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const EventData: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/useRoutes.ts' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const useRoutesQuery: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/index.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const eventPageQuery: DocumentNode;
export const indexPageQuery: DocumentNode;
export const lonelinessImageQuery: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/{event.season}.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const SeasonPage: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/{event.route}-{event.date}.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const EventPage: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/trace-virtuelle.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const traceImageQuery: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/audax-a-distance.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const audaxImageQuery: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/medals.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const medalImgQuery: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/Newsletter.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const NewsletterQuery: DocumentNode;

  export default defaultDocument;
}
    
export const GatsbyImageSharpFixed = gql`
    fragment GatsbyImageSharpFixed on ImageSharpFixed {
  base64
  width
  height
  src
  srcSet
}
    `;
export const GatsbyImageSharpFixed_TracedSvg = gql`
    fragment GatsbyImageSharpFixed_tracedSVG on ImageSharpFixed {
  tracedSVG
  width
  height
  src
  srcSet
}
    `;
export const GatsbyImageSharpFixed_WithWebp = gql`
    fragment GatsbyImageSharpFixed_withWebp on ImageSharpFixed {
  base64
  width
  height
  src
  srcSet
  srcWebp
  srcSetWebp
}
    `;
export const GatsbyImageSharpFixed_WithWebp_TracedSvg = gql`
    fragment GatsbyImageSharpFixed_withWebp_tracedSVG on ImageSharpFixed {
  tracedSVG
  width
  height
  src
  srcSet
  srcWebp
  srcSetWebp
}
    `;
export const GatsbyImageSharpFixed_NoBase64 = gql`
    fragment GatsbyImageSharpFixed_noBase64 on ImageSharpFixed {
  width
  height
  src
  srcSet
}
    `;
export const GatsbyImageSharpFixed_WithWebp_NoBase64 = gql`
    fragment GatsbyImageSharpFixed_withWebp_noBase64 on ImageSharpFixed {
  width
  height
  src
  srcSet
  srcWebp
  srcSetWebp
}
    `;
export const GatsbyImageSharpFluid = gql`
    fragment GatsbyImageSharpFluid on ImageSharpFluid {
  base64
  aspectRatio
  src
  srcSet
  sizes
}
    `;
export const GatsbyImageSharpFluidLimitPresentationSize = gql`
    fragment GatsbyImageSharpFluidLimitPresentationSize on ImageSharpFluid {
  maxHeight: presentationHeight
  maxWidth: presentationWidth
}
    `;
export const GatsbyImageSharpFluid_TracedSvg = gql`
    fragment GatsbyImageSharpFluid_tracedSVG on ImageSharpFluid {
  tracedSVG
  aspectRatio
  src
  srcSet
  sizes
}
    `;
export const GatsbyImageSharpFluid_WithWebp = gql`
    fragment GatsbyImageSharpFluid_withWebp on ImageSharpFluid {
  base64
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes
}
    `;
export const GatsbyImageSharpFluid_WithWebp_TracedSvg = gql`
    fragment GatsbyImageSharpFluid_withWebp_tracedSVG on ImageSharpFluid {
  tracedSVG
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes
}
    `;
export const GatsbyImageSharpFluid_NoBase64 = gql`
    fragment GatsbyImageSharpFluid_noBase64 on ImageSharpFluid {
  aspectRatio
  src
  srcSet
  sizes
}
    `;
export const GatsbyImageSharpFluid_WithWebp_NoBase64 = gql`
    fragment GatsbyImageSharpFluid_withWebp_noBase64 on ImageSharpFluid {
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes
}
    `;
export const EventCalendarFeeds = gql`
    query EventCalendarFeeds {
  allEvent {
    nodes {
      chapter
      distance
      eventType
      id
      organizer
      route
      startLocation
      date
      season
      path: gatsbyPath(filePath: "/event/{event.season}/{event.route}-{event.date}")
    }
  }
}
    `;
export const LoadMailQuery = gql`
    query loadMailQuery {
  allMail {
    nodes {
      id
      categories
      name
    }
  }
}
    `;
export const PagesQuery = gql`
    query PagesQuery {
  allSiteFunction {
    nodes {
      functionRoute
    }
  }
  allSitePage(filter: {path: {regex: "/^(?!/dev-404-page).+$/"}}) {
    nodes {
      path
    }
  }
}
    `;
export const GalleryQuery = gql`
    query GalleryQuery {
  allFile(
    filter: {extension: {regex: "/(jpg|JPG|jpeg)/"}, relativeDirectory: {eq: "gallery"}}
    limit: 6
    sort: {birthTime: DESC}
  ) {
    nodes {
      name
      childImageSharp {
        gatsbyImageData(aspectRatio: 1, height: 300, formats: JPG)
      }
    }
  }
}
    `;
export const SiteTitleQuery = gql`
    query SiteTitleQuery {
  site {
    siteMetadata {
      title
    }
  }
}
    `;
export const SeoImageQuery = gql`
    query seoImageQuery {
  site {
    siteMetadata {
      title
      description
      siteURL
    }
  }
}
    `;
export const UseBlogQuery = gql`
    query useBlogQuery {
  allFeedblog(limit: 10) {
    nodes {
      id
      title
      link
      content {
        encodedSnippet
      }
    }
  }
}
    `;
export const EventData = gql`
    query EventData {
  allEvent {
    nodes {
      chapter
      distance
      eventType
      id
      organizer
      route
      rwgpsUrl
      startLocation
      date
      scheduleId
      path: gatsbyPath(filePath: "/event/{event.season}/{event.route}-{event.date}")
    }
  }
}
    `;
export const UseRoutesQuery = gql`
    query useRoutesQuery {
  db {
    routes(order_by: {chapter: asc, distance: asc}) {
      startLocation
      name
      id
      distance
      chapter
    }
  }
}
    `;
export const EventPageQuery = gql`
    query eventPageQuery {
  allSitePage(
    filter: {context: {type: {eq: season}}}
    sort: {context: {pageInfo: {title: DESC}}}
  ) {
    nodes {
      path
      id
      context {
        pageInfo {
          title
        }
      }
    }
  }
}
    `;
export const SeasonPage = gql`
    query SeasonPage($season: String) {
  allEvent(filter: {season: {eq: $season}, chapter: {eq: Toronto}}) {
    nodes {
      chapter
      distance
      eventType
      id
      organizer
      route
      startLocation
      date
      season
      path: gatsbyPath(filePath: "/event/{event.season}/{event.route}-{event.date}")
    }
  }
}
    `;
export const EventPage = gql`
    query EventPage($id: String) {
  event(id: {eq: $id}) {
    chapter
    date
    distance
    eventType
    id
    route
    rwgpsId
    rwgpsUrl
    scheduleId
    season
    startLocation
  }
}
    `;
export const IndexPageQuery = gql`
    query indexPageQuery {
  allMail(limit: 3, sort: {sentAt: DESC}) {
    nodes {
      id
      name
      teaser
      subject
    }
  }
  allSitePage(limit: 3, filter: {context: {type: {eq: mail}}}) {
    nodes {
      path
      context {
        id
      }
    }
  }
  allFile(
    filter: {extension: {regex: "/(jpg|JPG|jpeg)/"}, relativeDirectory: {eq: "gallery"}}
    limit: 6
    sort: {birthTime: DESC}
  ) {
    nodes {
      name
      childImageSharp {
        gatsbyImageData(aspectRatio: 1, height: 300, formats: JPG)
      }
    }
  }
}
    `;
export const LonelinessImageQuery = gql`
    query lonelinessImageQuery {
  file(name: {glob: "ClubAudax"}) {
    name
    childImageSharp {
      gatsbyImageData(width: 1200)
    }
  }
}
    `;
export const TraceImageQuery = gql`
    query traceImageQuery {
  file(name: {glob: "TraceVirtuelle"}) {
    name
    childImageSharp {
      gatsbyImageData(width: 500)
    }
  }
}
    `;
export const AudaxImageQuery = gql`
    query audaxImageQuery {
  file(name: {glob: "audax-a-distance"}) {
    name
    childImageSharp {
      gatsbyImageData(aspectRatio: 1, width: 500)
    }
  }
}
    `;
export const MedalImgQuery = gql`
    query medalImgQuery {
  file(name: {glob: "brm-medal-2023"}) {
    name
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
}
    `;
export const NewsletterQuery = gql`
    query NewsletterQuery($id: String) {
  mail(id: {eq: $id}) {
    categories
    content
    id
    name
    sentAt
    subject
    teaser
  }
}
    `;