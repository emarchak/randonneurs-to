import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("https://randonneurs-to.hasura.app/v1/graphql", {
    method: "POST",
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  date: any;
  timestamptz: any;
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

export type Membership = {
  __typename?: 'Membership';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  riderName?: Maybe<Scalars['String']>;
  type?: Maybe<MembershipType>;
};

export enum MembershipType {
  Family = 'Family',
  Individual = 'Individual',
  Trial = 'Trial'
}

export type QueryInput = {
  riderName?: InputMaybe<Scalars['String']>;
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

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']>;
  _gt?: InputMaybe<Scalars['date']>;
  _gte?: InputMaybe<Scalars['date']>;
  _in?: InputMaybe<Array<Scalars['date']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['date']>;
  _lte?: InputMaybe<Scalars['date']>;
  _neq?: InputMaybe<Scalars['date']>;
  _nin?: InputMaybe<Array<Scalars['date']>>;
};

/** columns and relationships of "events" */
export type Events = {
  __typename?: 'events';
  chapter?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['date']>;
  event_id?: Maybe<Scalars['Int']>;
  eventtype?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organization?: Maybe<Scalars['String']>;
  /** An array relationship */
  riders: Array<Rides>;
  /** An object relationship */
  route?: Maybe<Routes>;
};


/** columns and relationships of "events" */
export type EventsRidersArgs = {
  distinct_on?: InputMaybe<Array<Rides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Rides_Order_By>>;
  where?: InputMaybe<Rides_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  _and?: InputMaybe<Array<Events_Bool_Exp>>;
  _not?: InputMaybe<Events_Bool_Exp>;
  _or?: InputMaybe<Array<Events_Bool_Exp>>;
  chapter?: InputMaybe<String_Comparison_Exp>;
  date?: InputMaybe<Date_Comparison_Exp>;
  event_id?: InputMaybe<Int_Comparison_Exp>;
  eventtype?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  organization?: InputMaybe<String_Comparison_Exp>;
  riders?: InputMaybe<Rides_Bool_Exp>;
  route?: InputMaybe<Routes_Bool_Exp>;
};

/** Ordering options when selecting data from "events". */
export type Events_Order_By = {
  chapter?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  eventtype?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  organization?: InputMaybe<Order_By>;
  riders_aggregate?: InputMaybe<Rides_Aggregate_Order_By>;
  route?: InputMaybe<Routes_Order_By>;
};

/** select columns of table "events" */
export enum Events_Select_Column {
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

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** insert data into the table: "ride" */
  insert_ride?: Maybe<Ride_Mutation_Response>;
  /** insert data into the table: "rider" */
  insert_rider?: Maybe<Rider_Mutation_Response>;
};


/** mutation root */
export type Mutation_RootInsert_RideArgs = {
  objects: Array<Ride_Insert_Input>;
  on_conflict?: InputMaybe<Ride_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RiderArgs = {
  objects: Array<Rider_Insert_Input>;
  on_conflict?: InputMaybe<Rider_On_Conflict>;
};

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
  /** fetch data from the table: "events" */
  events: Array<Events>;
  memberships?: Maybe<Array<Maybe<Membership>>>;
  /** fetch data from the table: "riders" */
  riders: Array<Riders>;
  /** fetch data from the table: "rides" */
  rides: Array<Rides>;
  /** fetch data from the table: "routes" */
  routes: Array<Routes>;
};


export type Query_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Query_RootMembershipsArgs = {
  where?: InputMaybe<QueryInput>;
};


export type Query_RootRidersArgs = {
  distinct_on?: InputMaybe<Array<Riders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Riders_Order_By>>;
  where?: InputMaybe<Riders_Bool_Exp>;
};


export type Query_RootRidesArgs = {
  distinct_on?: InputMaybe<Array<Rides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Rides_Order_By>>;
  where?: InputMaybe<Rides_Bool_Exp>;
};


export type Query_RootRoutesArgs = {
  distinct_on?: InputMaybe<Array<Routes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Routes_Order_By>>;
  where?: InputMaybe<Routes_Bool_Exp>;
};

/** input type for inserting array relation for remote table "ride" */
export type Ride_Arr_Rel_Insert_Input = {
  data: Array<Ride_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Ride_On_Conflict>;
};

/** Boolean expression to filter rows from the table "ride". All fields are combined with a logical 'AND'. */
export type Ride_Bool_Exp = {
  _and?: InputMaybe<Array<Ride_Bool_Exp>>;
  _not?: InputMaybe<Ride_Bool_Exp>;
  _or?: InputMaybe<Array<Ride_Bool_Exp>>;
};

/** unique or primary key constraints on table "ride" */
export enum Ride_Constraint {
  /** unique or primary key constraint on columns "ride_timestamp", "ride_id" */
  RidePkey = 'ride_pkey',
  /** unique or primary key constraint on columns "ride_event", "ride_rider" */
  RideUnique = 'ride_unique'
}

/** input type for inserting data into table "ride" */
export type Ride_Insert_Input = {
  ride_event?: InputMaybe<Scalars['Int']>;
  ride_rider?: InputMaybe<Scalars['Int']>;
  ride_starttime?: InputMaybe<Scalars['timestamptz']>;
  rider?: InputMaybe<Rider_Obj_Rel_Insert_Input>;
};

/** response of any mutation on the table "ride" */
export type Ride_Mutation_Response = {
  __typename?: 'ride_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
};

/** on_conflict condition type for table "ride" */
export type Ride_On_Conflict = {
  constraint: Ride_Constraint;
  update_columns?: Array<Ride_Update_Column>;
  where?: InputMaybe<Ride_Bool_Exp>;
};

/** placeholder for update columns of table "ride" (current role has no relevant permissions) */
export enum Ride_Update_Column {
  /** placeholder (do not use) */
  Placeholder = '_PLACEHOLDER'
}

/** Boolean expression to filter rows from the table "rider". All fields are combined with a logical 'AND'. */
export type Rider_Bool_Exp = {
  _and?: InputMaybe<Array<Rider_Bool_Exp>>;
  _not?: InputMaybe<Rider_Bool_Exp>;
  _or?: InputMaybe<Array<Rider_Bool_Exp>>;
};

/** unique or primary key constraints on table "rider" */
export enum Rider_Constraint {
  /** unique or primary key constraint on columns "rider_timestamp", "rider_id" */
  RiderPkey = 'rider_pkey',
  /** unique or primary key constraint on columns "rider_lastname", "rider_firstname" */
  RiderRiderFirstnameRiderLastnameKey = 'rider_rider_firstname_rider_lastname_key'
}

/** input type for inserting data into table "rider" */
export type Rider_Insert_Input = {
  rider_email?: InputMaybe<Scalars['String']>;
  rider_firstname?: InputMaybe<Scalars['String']>;
  rider_gender?: InputMaybe<Scalars['String']>;
  rider_lastname?: InputMaybe<Scalars['String']>;
  rides?: InputMaybe<Ride_Arr_Rel_Insert_Input>;
};

/** response of any mutation on the table "rider" */
export type Rider_Mutation_Response = {
  __typename?: 'rider_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
};

/** input type for inserting object relation for remote table "rider" */
export type Rider_Obj_Rel_Insert_Input = {
  data: Rider_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Rider_On_Conflict>;
};

/** on_conflict condition type for table "rider" */
export type Rider_On_Conflict = {
  constraint: Rider_Constraint;
  update_columns?: Array<Rider_Update_Column>;
  where?: InputMaybe<Rider_Bool_Exp>;
};

/** placeholder for update columns of table "rider" (current role has no relevant permissions) */
export enum Rider_Update_Column {
  /** placeholder (do not use) */
  Placeholder = '_PLACEHOLDER'
}

/** columns and relationships of "riders" */
export type Riders = {
  __typename?: 'riders';
  membership?: Maybe<Array<Maybe<Membership>>>;
  riderName?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "riders". All fields are combined with a logical 'AND'. */
export type Riders_Bool_Exp = {
  _and?: InputMaybe<Array<Riders_Bool_Exp>>;
  _not?: InputMaybe<Riders_Bool_Exp>;
  _or?: InputMaybe<Array<Riders_Bool_Exp>>;
  riderName?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "riders". */
export type Riders_Order_By = {
  riderName?: InputMaybe<Order_By>;
};

/** select columns of table "riders" */
export enum Riders_Select_Column {
  /** column name */
  RiderName = 'riderName'
}

/** columns and relationships of "rides" */
export type Rides = {
  __typename?: 'rides';
  resultType?: Maybe<Scalars['String']>;
  ride_event?: Maybe<Scalars['Int']>;
  ride_id?: Maybe<Scalars['Int']>;
  ride_rider?: Maybe<Scalars['Int']>;
  /** An object relationship */
  rider?: Maybe<Riders>;
};

/** order by aggregate values of table "rides" */
export type Rides_Aggregate_Order_By = {
  avg?: InputMaybe<Rides_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Rides_Max_Order_By>;
  min?: InputMaybe<Rides_Min_Order_By>;
  stddev?: InputMaybe<Rides_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Rides_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Rides_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Rides_Sum_Order_By>;
  var_pop?: InputMaybe<Rides_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Rides_Var_Samp_Order_By>;
  variance?: InputMaybe<Rides_Variance_Order_By>;
};

/** order by avg() on columns of table "rides" */
export type Rides_Avg_Order_By = {
  ride_event?: InputMaybe<Order_By>;
  ride_id?: InputMaybe<Order_By>;
  ride_rider?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "rides". All fields are combined with a logical 'AND'. */
export type Rides_Bool_Exp = {
  _and?: InputMaybe<Array<Rides_Bool_Exp>>;
  _not?: InputMaybe<Rides_Bool_Exp>;
  _or?: InputMaybe<Array<Rides_Bool_Exp>>;
  resultType?: InputMaybe<String_Comparison_Exp>;
  ride_event?: InputMaybe<Int_Comparison_Exp>;
  ride_id?: InputMaybe<Int_Comparison_Exp>;
  ride_rider?: InputMaybe<Int_Comparison_Exp>;
  rider?: InputMaybe<Riders_Bool_Exp>;
};

/** order by max() on columns of table "rides" */
export type Rides_Max_Order_By = {
  resultType?: InputMaybe<Order_By>;
  ride_event?: InputMaybe<Order_By>;
  ride_id?: InputMaybe<Order_By>;
  ride_rider?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "rides" */
export type Rides_Min_Order_By = {
  resultType?: InputMaybe<Order_By>;
  ride_event?: InputMaybe<Order_By>;
  ride_id?: InputMaybe<Order_By>;
  ride_rider?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "rides". */
export type Rides_Order_By = {
  resultType?: InputMaybe<Order_By>;
  ride_event?: InputMaybe<Order_By>;
  ride_id?: InputMaybe<Order_By>;
  ride_rider?: InputMaybe<Order_By>;
  rider?: InputMaybe<Riders_Order_By>;
};

/** select columns of table "rides" */
export enum Rides_Select_Column {
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
export type Rides_Stddev_Order_By = {
  ride_event?: InputMaybe<Order_By>;
  ride_id?: InputMaybe<Order_By>;
  ride_rider?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "rides" */
export type Rides_Stddev_Pop_Order_By = {
  ride_event?: InputMaybe<Order_By>;
  ride_id?: InputMaybe<Order_By>;
  ride_rider?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "rides" */
export type Rides_Stddev_Samp_Order_By = {
  ride_event?: InputMaybe<Order_By>;
  ride_id?: InputMaybe<Order_By>;
  ride_rider?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "rides" */
export type Rides_Sum_Order_By = {
  ride_event?: InputMaybe<Order_By>;
  ride_id?: InputMaybe<Order_By>;
  ride_rider?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "rides" */
export type Rides_Var_Pop_Order_By = {
  ride_event?: InputMaybe<Order_By>;
  ride_id?: InputMaybe<Order_By>;
  ride_rider?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "rides" */
export type Rides_Var_Samp_Order_By = {
  ride_event?: InputMaybe<Order_By>;
  ride_id?: InputMaybe<Order_By>;
  ride_rider?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "rides" */
export type Rides_Variance_Order_By = {
  ride_event?: InputMaybe<Order_By>;
  ride_id?: InputMaybe<Order_By>;
  ride_rider?: InputMaybe<Order_By>;
};

/** columns and relationships of "routes" */
export type Routes = {
  __typename?: 'routes';
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
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch data from the table: "riders" */
  riders: Array<Riders>;
  /** fetch data from the table: "rides" */
  rides: Array<Rides>;
  /** fetch data from the table: "routes" */
  routes: Array<Routes>;
};


export type Subscription_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootRidersArgs = {
  distinct_on?: InputMaybe<Array<Riders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Riders_Order_By>>;
  where?: InputMaybe<Riders_Bool_Exp>;
};


export type Subscription_RootRidesArgs = {
  distinct_on?: InputMaybe<Array<Rides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Rides_Order_By>>;
  where?: InputMaybe<Rides_Bool_Exp>;
};


export type Subscription_RootRoutesArgs = {
  distinct_on?: InputMaybe<Array<Routes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Routes_Order_By>>;
  where?: InputMaybe<Routes_Bool_Exp>;
};

export type FindEventQueryVariables = Exact<{
  eventId?: InputMaybe<Scalars['Int']>;
}>;


export type FindEventQuery = { __typename?: 'query_root', events: Array<{ __typename?: 'events', name?: string | null, riders: Array<{ __typename?: 'rides', rider?: { __typename?: 'riders', riderName?: string | null } | null }> }> };

export type GetMembershipQueryVariables = Exact<{
  riderName: Scalars['String'];
}>;


export type GetMembershipQuery = { __typename?: 'query_root', memberships?: Array<{ __typename?: 'Membership', riderName?: string | null, type?: MembershipType | null, id?: string | null } | null> | null };


export const FindEventDocument = `
    query findEvent($eventId: Int) {
  events(where: {event_id: {_eq: $eventId}}) {
    riders {
      rider {
        riderName
      }
    }
    name
  }
}
    `;
export const useFindEventQuery = <
      TData = FindEventQuery,
      TError = unknown
    >(
      variables?: FindEventQueryVariables,
      options?: UseQueryOptions<FindEventQuery, TError, TData>
    ) =>
    useQuery<FindEventQuery, TError, TData>(
      variables === undefined ? ['findEvent'] : ['findEvent', variables],
      fetcher<FindEventQuery, FindEventQueryVariables>(FindEventDocument, variables),
      options
    );
export const GetMembershipDocument = `
    query getMembership($riderName: String!) {
  memberships(where: {riderName: $riderName}) {
    riderName
    type
    id
  }
}
    `;
export const useGetMembershipQuery = <
      TData = GetMembershipQuery,
      TError = unknown
    >(
      variables: GetMembershipQueryVariables,
      options?: UseQueryOptions<GetMembershipQuery, TError, TData>
    ) =>
    useQuery<GetMembershipQuery, TError, TData>(
      ['getMembership', variables],
      fetcher<GetMembershipQuery, GetMembershipQueryVariables>(GetMembershipDocument, variables),
      options
    );