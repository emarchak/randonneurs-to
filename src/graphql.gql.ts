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
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
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

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
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

/** columns and relationships of "chapter" */
export type Chapter = {
  __typename?: 'chapter';
  name: Scalars['String'];
};

/** Boolean expression to filter rows from the table "chapter". All fields are combined with a logical 'AND'. */
export type Chapter_Bool_Exp = {
  _and?: InputMaybe<Array<Chapter_Bool_Exp>>;
  _not?: InputMaybe<Chapter_Bool_Exp>;
  _or?: InputMaybe<Array<Chapter_Bool_Exp>>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "chapter". */
export type Chapter_Order_By = {
  name?: InputMaybe<Order_By>;
};

/** select columns of table "chapter" */
export enum Chapter_Select_Column {
  /** column name */
  Name = 'name'
}

/** column ordering options */
export enum Order_By {
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

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "chapter" */
  chapter: Array<Chapter>;
  /** fetch data from the table: "routes" */
  routes: Array<Routes>;
};


export type Query_RootChapterArgs = {
  distinct_on?: InputMaybe<Array<Chapter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Chapter_Order_By>>;
  where?: InputMaybe<Chapter_Bool_Exp>;
};


export type Query_RootRoutesArgs = {
  distinct_on?: InputMaybe<Array<Routes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Routes_Order_By>>;
  where?: InputMaybe<Routes_Bool_Exp>;
};

/** columns and relationships of "routes" */
export type Routes = {
  __typename?: 'routes';
  active?: Maybe<Scalars['Boolean']>;
  brevetDistance?: Maybe<Scalars['Int']>;
  chapter?: Maybe<Scalars['String']>;
  cuesheet?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  startLocation?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "routes". All fields are combined with a logical 'AND'. */
export type Routes_Bool_Exp = {
  _and?: InputMaybe<Array<Routes_Bool_Exp>>;
  _not?: InputMaybe<Routes_Bool_Exp>;
  _or?: InputMaybe<Array<Routes_Bool_Exp>>;
  active?: InputMaybe<Boolean_Comparison_Exp>;
  brevetDistance?: InputMaybe<Int_Comparison_Exp>;
  chapter?: InputMaybe<String_Comparison_Exp>;
  cuesheet?: InputMaybe<String_Comparison_Exp>;
  distance?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  startLocation?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "routes". */
export type Routes_Order_By = {
  active?: InputMaybe<Order_By>;
  brevetDistance?: InputMaybe<Order_By>;
  chapter?: InputMaybe<Order_By>;
  cuesheet?: InputMaybe<Order_By>;
  distance?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  startLocation?: InputMaybe<Order_By>;
};

/** select columns of table "routes" */
export enum Routes_Select_Column {
  /** column name */
  Active = 'active',
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

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "chapter" */
  chapter: Array<Chapter>;
  /** fetch data from the table: "routes" */
  routes: Array<Routes>;
};


export type Subscription_RootChapterArgs = {
  distinct_on?: InputMaybe<Array<Chapter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Chapter_Order_By>>;
  where?: InputMaybe<Chapter_Bool_Exp>;
};


export type Subscription_RootRoutesArgs = {
  distinct_on?: InputMaybe<Array<Routes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Routes_Order_By>>;
  where?: InputMaybe<Routes_Bool_Exp>;
};
