
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model StoreInfo
 * 
 */
export type StoreInfo = $Result.DefaultSelection<Prisma.$StoreInfoPayload>
/**
 * Model Location
 * 
 */
export type Location = $Result.DefaultSelection<Prisma.$LocationPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Booking
 * 
 */
export type Booking = $Result.DefaultSelection<Prisma.$BookingPayload>
/**
 * Model Portfolio
 * 
 */
export type Portfolio = $Result.DefaultSelection<Prisma.$PortfolioPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  OWNER: 'OWNER',
  MEMBER: 'MEMBER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const BookingStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  DONE: 'DONE',
  MISSED: 'MISSED'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]


export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  UNISEX: 'UNISEX'
};

export type Gender = (typeof Gender)[keyof typeof Gender]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type BookingStatus = $Enums.BookingStatus

export const BookingStatus: typeof $Enums.BookingStatus

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more StoreInfos
 * const storeInfos = await prisma.storeInfo.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more StoreInfos
   * const storeInfos = await prisma.storeInfo.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.storeInfo`: Exposes CRUD operations for the **StoreInfo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StoreInfos
    * const storeInfos = await prisma.storeInfo.findMany()
    * ```
    */
  get storeInfo(): Prisma.StoreInfoDelegate<ExtArgs>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.LocationDelegate<ExtArgs>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<ExtArgs>;

  /**
   * `prisma.portfolio`: Exposes CRUD operations for the **Portfolio** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Portfolios
    * const portfolios = await prisma.portfolio.findMany()
    * ```
    */
  get portfolio(): Prisma.PortfolioDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    StoreInfo: 'StoreInfo',
    Location: 'Location',
    Service: 'Service',
    User: 'User',
    Booking: 'Booking',
    Portfolio: 'Portfolio'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "storeInfo" | "location" | "service" | "user" | "booking" | "portfolio"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      StoreInfo: {
        payload: Prisma.$StoreInfoPayload<ExtArgs>
        fields: Prisma.StoreInfoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StoreInfoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreInfoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StoreInfoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreInfoPayload>
          }
          findFirst: {
            args: Prisma.StoreInfoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreInfoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StoreInfoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreInfoPayload>
          }
          findMany: {
            args: Prisma.StoreInfoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreInfoPayload>[]
          }
          create: {
            args: Prisma.StoreInfoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreInfoPayload>
          }
          createMany: {
            args: Prisma.StoreInfoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StoreInfoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreInfoPayload>[]
          }
          delete: {
            args: Prisma.StoreInfoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreInfoPayload>
          }
          update: {
            args: Prisma.StoreInfoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreInfoPayload>
          }
          deleteMany: {
            args: Prisma.StoreInfoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StoreInfoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StoreInfoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreInfoPayload>
          }
          aggregate: {
            args: Prisma.StoreInfoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStoreInfo>
          }
          groupBy: {
            args: Prisma.StoreInfoGroupByArgs<ExtArgs>
            result: $Utils.Optional<StoreInfoGroupByOutputType>[]
          }
          count: {
            args: Prisma.StoreInfoCountArgs<ExtArgs>
            result: $Utils.Optional<StoreInfoCountAggregateOutputType> | number
          }
        }
      }
      Location: {
        payload: Prisma.$LocationPayload<ExtArgs>
        fields: Prisma.LocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findFirst: {
            args: Prisma.LocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findMany: {
            args: Prisma.LocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          create: {
            args: Prisma.LocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          createMany: {
            args: Prisma.LocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          delete: {
            args: Prisma.LocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          update: {
            args: Prisma.LocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          deleteMany: {
            args: Prisma.LocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.LocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Booking: {
        payload: Prisma.$BookingPayload<ExtArgs>
        fields: Prisma.BookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
          }
        }
      }
      Portfolio: {
        payload: Prisma.$PortfolioPayload<ExtArgs>
        fields: Prisma.PortfolioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortfolioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortfolioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          findFirst: {
            args: Prisma.PortfolioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortfolioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          findMany: {
            args: Prisma.PortfolioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[]
          }
          create: {
            args: Prisma.PortfolioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          createMany: {
            args: Prisma.PortfolioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PortfolioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[]
          }
          delete: {
            args: Prisma.PortfolioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          update: {
            args: Prisma.PortfolioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          deleteMany: {
            args: Prisma.PortfolioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortfolioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PortfolioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          aggregate: {
            args: Prisma.PortfolioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortfolio>
          }
          groupBy: {
            args: Prisma.PortfolioGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortfolioGroupByOutputType>[]
          }
          count: {
            args: Prisma.PortfolioCountArgs<ExtArgs>
            result: $Utils.Optional<PortfolioCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type LocationCountOutputType
   */

  export type LocationCountOutputType = {
    bookings: number
    services: number
    portfolios: number
  }

  export type LocationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | LocationCountOutputTypeCountBookingsArgs
    services?: boolean | LocationCountOutputTypeCountServicesArgs
    portfolios?: boolean | LocationCountOutputTypeCountPortfoliosArgs
  }

  // Custom InputTypes
  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCountOutputType
     */
    select?: LocationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountPortfoliosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
  }


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    locations: number
    bookings: number
    portfolios: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | ServiceCountOutputTypeCountLocationsArgs
    bookings?: boolean | ServiceCountOutputTypeCountBookingsArgs
    portfolios?: boolean | ServiceCountOutputTypeCountPortfoliosArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountPortfoliosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    bookings: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | UserCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model StoreInfo
   */

  export type AggregateStoreInfo = {
    _count: StoreInfoCountAggregateOutputType | null
    _min: StoreInfoMinAggregateOutputType | null
    _max: StoreInfoMaxAggregateOutputType | null
  }

  export type StoreInfoMinAggregateOutputType = {
    id: string | null
    phone: string | null
    line: string | null
    instagram: string | null
    facebook: string | null
    bankCode: string | null
    bankName: string | null
    bankAccount: string | null
    bankAccountName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StoreInfoMaxAggregateOutputType = {
    id: string | null
    phone: string | null
    line: string | null
    instagram: string | null
    facebook: string | null
    bankCode: string | null
    bankName: string | null
    bankAccount: string | null
    bankAccountName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StoreInfoCountAggregateOutputType = {
    id: number
    phone: number
    line: number
    instagram: number
    facebook: number
    bankCode: number
    bankName: number
    bankAccount: number
    bankAccountName: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StoreInfoMinAggregateInputType = {
    id?: true
    phone?: true
    line?: true
    instagram?: true
    facebook?: true
    bankCode?: true
    bankName?: true
    bankAccount?: true
    bankAccountName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StoreInfoMaxAggregateInputType = {
    id?: true
    phone?: true
    line?: true
    instagram?: true
    facebook?: true
    bankCode?: true
    bankName?: true
    bankAccount?: true
    bankAccountName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StoreInfoCountAggregateInputType = {
    id?: true
    phone?: true
    line?: true
    instagram?: true
    facebook?: true
    bankCode?: true
    bankName?: true
    bankAccount?: true
    bankAccountName?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StoreInfoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StoreInfo to aggregate.
     */
    where?: StoreInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreInfos to fetch.
     */
    orderBy?: StoreInfoOrderByWithRelationInput | StoreInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StoreInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StoreInfos
    **/
    _count?: true | StoreInfoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StoreInfoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StoreInfoMaxAggregateInputType
  }

  export type GetStoreInfoAggregateType<T extends StoreInfoAggregateArgs> = {
        [P in keyof T & keyof AggregateStoreInfo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStoreInfo[P]>
      : GetScalarType<T[P], AggregateStoreInfo[P]>
  }




  export type StoreInfoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreInfoWhereInput
    orderBy?: StoreInfoOrderByWithAggregationInput | StoreInfoOrderByWithAggregationInput[]
    by: StoreInfoScalarFieldEnum[] | StoreInfoScalarFieldEnum
    having?: StoreInfoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StoreInfoCountAggregateInputType | true
    _min?: StoreInfoMinAggregateInputType
    _max?: StoreInfoMaxAggregateInputType
  }

  export type StoreInfoGroupByOutputType = {
    id: string
    phone: string | null
    line: string | null
    instagram: string | null
    facebook: string | null
    bankCode: string | null
    bankName: string | null
    bankAccount: string | null
    bankAccountName: string | null
    createdAt: Date
    updatedAt: Date
    _count: StoreInfoCountAggregateOutputType | null
    _min: StoreInfoMinAggregateOutputType | null
    _max: StoreInfoMaxAggregateOutputType | null
  }

  type GetStoreInfoGroupByPayload<T extends StoreInfoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StoreInfoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StoreInfoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StoreInfoGroupByOutputType[P]>
            : GetScalarType<T[P], StoreInfoGroupByOutputType[P]>
        }
      >
    >


  export type StoreInfoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    line?: boolean
    instagram?: boolean
    facebook?: boolean
    bankCode?: boolean
    bankName?: boolean
    bankAccount?: boolean
    bankAccountName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["storeInfo"]>

  export type StoreInfoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    line?: boolean
    instagram?: boolean
    facebook?: boolean
    bankCode?: boolean
    bankName?: boolean
    bankAccount?: boolean
    bankAccountName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["storeInfo"]>

  export type StoreInfoSelectScalar = {
    id?: boolean
    phone?: boolean
    line?: boolean
    instagram?: boolean
    facebook?: boolean
    bankCode?: boolean
    bankName?: boolean
    bankAccount?: boolean
    bankAccountName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $StoreInfoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StoreInfo"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      phone: string | null
      line: string | null
      instagram: string | null
      facebook: string | null
      bankCode: string | null
      bankName: string | null
      bankAccount: string | null
      bankAccountName: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["storeInfo"]>
    composites: {}
  }

  type StoreInfoGetPayload<S extends boolean | null | undefined | StoreInfoDefaultArgs> = $Result.GetResult<Prisma.$StoreInfoPayload, S>

  type StoreInfoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StoreInfoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StoreInfoCountAggregateInputType | true
    }

  export interface StoreInfoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StoreInfo'], meta: { name: 'StoreInfo' } }
    /**
     * Find zero or one StoreInfo that matches the filter.
     * @param {StoreInfoFindUniqueArgs} args - Arguments to find a StoreInfo
     * @example
     * // Get one StoreInfo
     * const storeInfo = await prisma.storeInfo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StoreInfoFindUniqueArgs>(args: SelectSubset<T, StoreInfoFindUniqueArgs<ExtArgs>>): Prisma__StoreInfoClient<$Result.GetResult<Prisma.$StoreInfoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one StoreInfo that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StoreInfoFindUniqueOrThrowArgs} args - Arguments to find a StoreInfo
     * @example
     * // Get one StoreInfo
     * const storeInfo = await prisma.storeInfo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StoreInfoFindUniqueOrThrowArgs>(args: SelectSubset<T, StoreInfoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StoreInfoClient<$Result.GetResult<Prisma.$StoreInfoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first StoreInfo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreInfoFindFirstArgs} args - Arguments to find a StoreInfo
     * @example
     * // Get one StoreInfo
     * const storeInfo = await prisma.storeInfo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StoreInfoFindFirstArgs>(args?: SelectSubset<T, StoreInfoFindFirstArgs<ExtArgs>>): Prisma__StoreInfoClient<$Result.GetResult<Prisma.$StoreInfoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first StoreInfo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreInfoFindFirstOrThrowArgs} args - Arguments to find a StoreInfo
     * @example
     * // Get one StoreInfo
     * const storeInfo = await prisma.storeInfo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StoreInfoFindFirstOrThrowArgs>(args?: SelectSubset<T, StoreInfoFindFirstOrThrowArgs<ExtArgs>>): Prisma__StoreInfoClient<$Result.GetResult<Prisma.$StoreInfoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more StoreInfos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreInfoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StoreInfos
     * const storeInfos = await prisma.storeInfo.findMany()
     * 
     * // Get first 10 StoreInfos
     * const storeInfos = await prisma.storeInfo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storeInfoWithIdOnly = await prisma.storeInfo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StoreInfoFindManyArgs>(args?: SelectSubset<T, StoreInfoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreInfoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a StoreInfo.
     * @param {StoreInfoCreateArgs} args - Arguments to create a StoreInfo.
     * @example
     * // Create one StoreInfo
     * const StoreInfo = await prisma.storeInfo.create({
     *   data: {
     *     // ... data to create a StoreInfo
     *   }
     * })
     * 
     */
    create<T extends StoreInfoCreateArgs>(args: SelectSubset<T, StoreInfoCreateArgs<ExtArgs>>): Prisma__StoreInfoClient<$Result.GetResult<Prisma.$StoreInfoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many StoreInfos.
     * @param {StoreInfoCreateManyArgs} args - Arguments to create many StoreInfos.
     * @example
     * // Create many StoreInfos
     * const storeInfo = await prisma.storeInfo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StoreInfoCreateManyArgs>(args?: SelectSubset<T, StoreInfoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StoreInfos and returns the data saved in the database.
     * @param {StoreInfoCreateManyAndReturnArgs} args - Arguments to create many StoreInfos.
     * @example
     * // Create many StoreInfos
     * const storeInfo = await prisma.storeInfo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StoreInfos and only return the `id`
     * const storeInfoWithIdOnly = await prisma.storeInfo.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StoreInfoCreateManyAndReturnArgs>(args?: SelectSubset<T, StoreInfoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreInfoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a StoreInfo.
     * @param {StoreInfoDeleteArgs} args - Arguments to delete one StoreInfo.
     * @example
     * // Delete one StoreInfo
     * const StoreInfo = await prisma.storeInfo.delete({
     *   where: {
     *     // ... filter to delete one StoreInfo
     *   }
     * })
     * 
     */
    delete<T extends StoreInfoDeleteArgs>(args: SelectSubset<T, StoreInfoDeleteArgs<ExtArgs>>): Prisma__StoreInfoClient<$Result.GetResult<Prisma.$StoreInfoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one StoreInfo.
     * @param {StoreInfoUpdateArgs} args - Arguments to update one StoreInfo.
     * @example
     * // Update one StoreInfo
     * const storeInfo = await prisma.storeInfo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StoreInfoUpdateArgs>(args: SelectSubset<T, StoreInfoUpdateArgs<ExtArgs>>): Prisma__StoreInfoClient<$Result.GetResult<Prisma.$StoreInfoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more StoreInfos.
     * @param {StoreInfoDeleteManyArgs} args - Arguments to filter StoreInfos to delete.
     * @example
     * // Delete a few StoreInfos
     * const { count } = await prisma.storeInfo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StoreInfoDeleteManyArgs>(args?: SelectSubset<T, StoreInfoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StoreInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreInfoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StoreInfos
     * const storeInfo = await prisma.storeInfo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StoreInfoUpdateManyArgs>(args: SelectSubset<T, StoreInfoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StoreInfo.
     * @param {StoreInfoUpsertArgs} args - Arguments to update or create a StoreInfo.
     * @example
     * // Update or create a StoreInfo
     * const storeInfo = await prisma.storeInfo.upsert({
     *   create: {
     *     // ... data to create a StoreInfo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StoreInfo we want to update
     *   }
     * })
     */
    upsert<T extends StoreInfoUpsertArgs>(args: SelectSubset<T, StoreInfoUpsertArgs<ExtArgs>>): Prisma__StoreInfoClient<$Result.GetResult<Prisma.$StoreInfoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of StoreInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreInfoCountArgs} args - Arguments to filter StoreInfos to count.
     * @example
     * // Count the number of StoreInfos
     * const count = await prisma.storeInfo.count({
     *   where: {
     *     // ... the filter for the StoreInfos we want to count
     *   }
     * })
    **/
    count<T extends StoreInfoCountArgs>(
      args?: Subset<T, StoreInfoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StoreInfoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StoreInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreInfoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StoreInfoAggregateArgs>(args: Subset<T, StoreInfoAggregateArgs>): Prisma.PrismaPromise<GetStoreInfoAggregateType<T>>

    /**
     * Group by StoreInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreInfoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StoreInfoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StoreInfoGroupByArgs['orderBy'] }
        : { orderBy?: StoreInfoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StoreInfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoreInfoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StoreInfo model
   */
  readonly fields: StoreInfoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StoreInfo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StoreInfoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StoreInfo model
   */ 
  interface StoreInfoFieldRefs {
    readonly id: FieldRef<"StoreInfo", 'String'>
    readonly phone: FieldRef<"StoreInfo", 'String'>
    readonly line: FieldRef<"StoreInfo", 'String'>
    readonly instagram: FieldRef<"StoreInfo", 'String'>
    readonly facebook: FieldRef<"StoreInfo", 'String'>
    readonly bankCode: FieldRef<"StoreInfo", 'String'>
    readonly bankName: FieldRef<"StoreInfo", 'String'>
    readonly bankAccount: FieldRef<"StoreInfo", 'String'>
    readonly bankAccountName: FieldRef<"StoreInfo", 'String'>
    readonly createdAt: FieldRef<"StoreInfo", 'DateTime'>
    readonly updatedAt: FieldRef<"StoreInfo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StoreInfo findUnique
   */
  export type StoreInfoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreInfo
     */
    select?: StoreInfoSelect<ExtArgs> | null
    /**
     * Filter, which StoreInfo to fetch.
     */
    where: StoreInfoWhereUniqueInput
  }

  /**
   * StoreInfo findUniqueOrThrow
   */
  export type StoreInfoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreInfo
     */
    select?: StoreInfoSelect<ExtArgs> | null
    /**
     * Filter, which StoreInfo to fetch.
     */
    where: StoreInfoWhereUniqueInput
  }

  /**
   * StoreInfo findFirst
   */
  export type StoreInfoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreInfo
     */
    select?: StoreInfoSelect<ExtArgs> | null
    /**
     * Filter, which StoreInfo to fetch.
     */
    where?: StoreInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreInfos to fetch.
     */
    orderBy?: StoreInfoOrderByWithRelationInput | StoreInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StoreInfos.
     */
    cursor?: StoreInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StoreInfos.
     */
    distinct?: StoreInfoScalarFieldEnum | StoreInfoScalarFieldEnum[]
  }

  /**
   * StoreInfo findFirstOrThrow
   */
  export type StoreInfoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreInfo
     */
    select?: StoreInfoSelect<ExtArgs> | null
    /**
     * Filter, which StoreInfo to fetch.
     */
    where?: StoreInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreInfos to fetch.
     */
    orderBy?: StoreInfoOrderByWithRelationInput | StoreInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StoreInfos.
     */
    cursor?: StoreInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StoreInfos.
     */
    distinct?: StoreInfoScalarFieldEnum | StoreInfoScalarFieldEnum[]
  }

  /**
   * StoreInfo findMany
   */
  export type StoreInfoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreInfo
     */
    select?: StoreInfoSelect<ExtArgs> | null
    /**
     * Filter, which StoreInfos to fetch.
     */
    where?: StoreInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreInfos to fetch.
     */
    orderBy?: StoreInfoOrderByWithRelationInput | StoreInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StoreInfos.
     */
    cursor?: StoreInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreInfos.
     */
    skip?: number
    distinct?: StoreInfoScalarFieldEnum | StoreInfoScalarFieldEnum[]
  }

  /**
   * StoreInfo create
   */
  export type StoreInfoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreInfo
     */
    select?: StoreInfoSelect<ExtArgs> | null
    /**
     * The data needed to create a StoreInfo.
     */
    data?: XOR<StoreInfoCreateInput, StoreInfoUncheckedCreateInput>
  }

  /**
   * StoreInfo createMany
   */
  export type StoreInfoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StoreInfos.
     */
    data: StoreInfoCreateManyInput | StoreInfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StoreInfo createManyAndReturn
   */
  export type StoreInfoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreInfo
     */
    select?: StoreInfoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many StoreInfos.
     */
    data: StoreInfoCreateManyInput | StoreInfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StoreInfo update
   */
  export type StoreInfoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreInfo
     */
    select?: StoreInfoSelect<ExtArgs> | null
    /**
     * The data needed to update a StoreInfo.
     */
    data: XOR<StoreInfoUpdateInput, StoreInfoUncheckedUpdateInput>
    /**
     * Choose, which StoreInfo to update.
     */
    where: StoreInfoWhereUniqueInput
  }

  /**
   * StoreInfo updateMany
   */
  export type StoreInfoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StoreInfos.
     */
    data: XOR<StoreInfoUpdateManyMutationInput, StoreInfoUncheckedUpdateManyInput>
    /**
     * Filter which StoreInfos to update
     */
    where?: StoreInfoWhereInput
  }

  /**
   * StoreInfo upsert
   */
  export type StoreInfoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreInfo
     */
    select?: StoreInfoSelect<ExtArgs> | null
    /**
     * The filter to search for the StoreInfo to update in case it exists.
     */
    where: StoreInfoWhereUniqueInput
    /**
     * In case the StoreInfo found by the `where` argument doesn't exist, create a new StoreInfo with this data.
     */
    create: XOR<StoreInfoCreateInput, StoreInfoUncheckedCreateInput>
    /**
     * In case the StoreInfo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StoreInfoUpdateInput, StoreInfoUncheckedUpdateInput>
  }

  /**
   * StoreInfo delete
   */
  export type StoreInfoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreInfo
     */
    select?: StoreInfoSelect<ExtArgs> | null
    /**
     * Filter which StoreInfo to delete.
     */
    where: StoreInfoWhereUniqueInput
  }

  /**
   * StoreInfo deleteMany
   */
  export type StoreInfoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StoreInfos to delete
     */
    where?: StoreInfoWhereInput
  }

  /**
   * StoreInfo without action
   */
  export type StoreInfoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreInfo
     */
    select?: StoreInfoSelect<ExtArgs> | null
  }


  /**
   * Model Location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LocationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LocationCountAggregateOutputType = {
    id: number
    name: number
    address: number
    imageUrls: number
    isPublished: number
    openingHours: number
    vacationDays: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LocationMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LocationMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LocationCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    imageUrls?: true
    isPublished?: true
    openingHours?: true
    vacationDays?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Location to aggregate.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type LocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithAggregationInput | LocationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: LocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    id: string
    name: string
    address: string
    imageUrls: string[]
    isPublished: boolean
    openingHours: JsonValue | null
    vacationDays: Date[]
    createdAt: Date
    updatedAt: Date
    _count: LocationCountAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type LocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    imageUrls?: boolean
    isPublished?: boolean
    openingHours?: boolean
    vacationDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bookings?: boolean | Location$bookingsArgs<ExtArgs>
    services?: boolean | Location$servicesArgs<ExtArgs>
    portfolios?: boolean | Location$portfoliosArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    imageUrls?: boolean
    isPublished?: boolean
    openingHours?: boolean
    vacationDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["location"]>

  export type LocationSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    imageUrls?: boolean
    isPublished?: boolean
    openingHours?: boolean
    vacationDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | Location$bookingsArgs<ExtArgs>
    services?: boolean | Location$servicesArgs<ExtArgs>
    portfolios?: boolean | Location$portfoliosArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Location"
    objects: {
      bookings: Prisma.$BookingPayload<ExtArgs>[]
      services: Prisma.$ServicePayload<ExtArgs>[]
      portfolios: Prisma.$PortfolioPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      address: string
      imageUrls: string[]
      isPublished: boolean
      openingHours: Prisma.JsonValue | null
      vacationDays: Date[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = $Result.GetResult<Prisma.$LocationPayload, S>

  type LocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LocationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface LocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Location'], meta: { name: 'Location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationFindUniqueArgs>(args: SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationFindFirstArgs>(args?: SelectSubset<T, LocationFindFirstArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationWithIdOnly = await prisma.location.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationFindManyArgs>(args?: SelectSubset<T, LocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Location.
     * @param {LocationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
     */
    create<T extends LocationCreateArgs>(args: SelectSubset<T, LocationCreateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Locations.
     * @param {LocationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationCreateManyArgs>(args?: SelectSubset<T, LocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Locations and returns the data saved in the database.
     * @param {LocationCreateManyAndReturnArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends LocationDeleteArgs>(args: SelectSubset<T, LocationDeleteArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationUpdateArgs>(args: SelectSubset<T, LocationUpdateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationDeleteManyArgs>(args?: SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationUpdateManyArgs>(args: SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Location.
     * @param {LocationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends LocationUpsertArgs>(args: SelectSubset<T, LocationUpsertArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs['orderBy'] }
        : { orderBy?: LocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Location model
   */
  readonly fields: LocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookings<T extends Location$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Location$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany"> | Null>
    services<T extends Location$servicesArgs<ExtArgs> = {}>(args?: Subset<T, Location$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany"> | Null>
    portfolios<T extends Location$portfoliosArgs<ExtArgs> = {}>(args?: Subset<T, Location$portfoliosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Location model
   */ 
  interface LocationFieldRefs {
    readonly id: FieldRef<"Location", 'String'>
    readonly name: FieldRef<"Location", 'String'>
    readonly address: FieldRef<"Location", 'String'>
    readonly imageUrls: FieldRef<"Location", 'String[]'>
    readonly isPublished: FieldRef<"Location", 'Boolean'>
    readonly openingHours: FieldRef<"Location", 'Json'>
    readonly vacationDays: FieldRef<"Location", 'DateTime[]'>
    readonly createdAt: FieldRef<"Location", 'DateTime'>
    readonly updatedAt: FieldRef<"Location", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Location findUnique
   */
  export type LocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findFirst
   */
  export type LocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findMany
   */
  export type LocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Locations to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location create
   */
  export type LocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to create a Location.
     */
    data: XOR<LocationCreateInput, LocationUncheckedCreateInput>
  }

  /**
   * Location createMany
   */
  export type LocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location createManyAndReturn
   */
  export type LocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location update
   */
  export type LocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to update a Location.
     */
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
    /**
     * Choose, which Location to update.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
  }

  /**
   * Location upsert
   */
  export type LocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The filter to search for the Location to update in case it exists.
     */
    where: LocationWhereUniqueInput
    /**
     * In case the Location found by the `where` argument doesn't exist, create a new Location with this data.
     */
    create: XOR<LocationCreateInput, LocationUncheckedCreateInput>
    /**
     * In case the Location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
  }

  /**
   * Location delete
   */
  export type LocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter which Location to delete.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locations to delete
     */
    where?: LocationWhereInput
  }

  /**
   * Location.bookings
   */
  export type Location$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Location.services
   */
  export type Location$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Location.portfolios
   */
  export type Location$portfoliosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    cursor?: PortfolioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Location without action
   */
  export type LocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    price: number | null
    duration: number | null
  }

  export type ServiceSumAggregateOutputType = {
    price: number | null
    duration: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    name: string | null
    price: number | null
    duration: number | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    price: number | null
    duration: number | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    name: number
    price: number
    duration: number
    isPublished: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    price?: true
    duration?: true
  }

  export type ServiceSumAggregateInputType = {
    price?: true
    duration?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
    duration?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
    duration?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    name?: true
    price?: true
    duration?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    name: string
    price: number
    duration: number
    isPublished: boolean
    createdAt: Date
    updatedAt: Date
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    duration?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    locations?: boolean | Service$locationsArgs<ExtArgs>
    bookings?: boolean | Service$bookingsArgs<ExtArgs>
    portfolios?: boolean | Service$portfoliosArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    duration?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    name?: boolean
    price?: boolean
    duration?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | Service$locationsArgs<ExtArgs>
    bookings?: boolean | Service$bookingsArgs<ExtArgs>
    portfolios?: boolean | Service$portfoliosArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      locations: Prisma.$LocationPayload<ExtArgs>[]
      bookings: Prisma.$BookingPayload<ExtArgs>[]
      portfolios: Prisma.$PortfolioPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      price: number
      duration: number
      isPublished: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    locations<T extends Service$locationsArgs<ExtArgs> = {}>(args?: Subset<T, Service$locationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany"> | Null>
    bookings<T extends Service$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Service$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany"> | Null>
    portfolios<T extends Service$portfoliosArgs<ExtArgs> = {}>(args?: Subset<T, Service$portfoliosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Service model
   */ 
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly name: FieldRef<"Service", 'String'>
    readonly price: FieldRef<"Service", 'Int'>
    readonly duration: FieldRef<"Service", 'Int'>
    readonly isPublished: FieldRef<"Service", 'Boolean'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
  }

  /**
   * Service.locations
   */
  export type Service$locationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    cursor?: LocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Service.bookings
   */
  export type Service$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Service.portfolios
   */
  export type Service$portfoliosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    cursor?: PortfolioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    phone: string | null
    birthday: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    phone: string | null
    birthday: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    phone: number
    birthday: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    phone?: true
    birthday?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    phone?: true
    birthday?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    phone?: true
    birthday?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    passwordHash: string | null
    phone: string | null
    birthday: string | null
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    phone?: boolean
    birthday?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bookings?: boolean | User$bookingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    phone?: boolean
    birthday?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    phone?: boolean
    birthday?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | User$bookingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      bookings: Prisma.$BookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      passwordHash: string | null
      phone: string | null
      birthday: string | null
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookings<T extends User$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, User$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly birthday: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.bookings
   */
  export type User$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Booking
   */

  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingMinAggregateOutputType = {
    id: string | null
    status: $Enums.BookingStatus | null
    startTime: Date | null
    endTime: Date | null
    expiredAt: Date | null
    locationId: string | null
    serviceId: string | null
    customerId: string | null
    paymentProof: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingMaxAggregateOutputType = {
    id: string | null
    status: $Enums.BookingStatus | null
    startTime: Date | null
    endTime: Date | null
    expiredAt: Date | null
    locationId: string | null
    serviceId: string | null
    customerId: string | null
    paymentProof: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    status: number
    startTime: number
    endTime: number
    expiredAt: number
    locationId: number
    serviceId: number
    customerId: number
    paymentProof: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookingMinAggregateInputType = {
    id?: true
    status?: true
    startTime?: true
    endTime?: true
    expiredAt?: true
    locationId?: true
    serviceId?: true
    customerId?: true
    paymentProof?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    status?: true
    startTime?: true
    endTime?: true
    expiredAt?: true
    locationId?: true
    serviceId?: true
    customerId?: true
    paymentProof?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    status?: true
    startTime?: true
    endTime?: true
    expiredAt?: true
    locationId?: true
    serviceId?: true
    customerId?: true
    paymentProof?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithAggregationInput | BookingOrderByWithAggregationInput[]
    by: BookingScalarFieldEnum[] | BookingScalarFieldEnum
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }

  export type BookingGroupByOutputType = {
    id: string
    status: $Enums.BookingStatus
    startTime: Date
    endTime: Date
    expiredAt: Date
    locationId: string
    serviceId: string
    customerId: string
    paymentProof: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: BookingCountAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    expiredAt?: boolean
    locationId?: boolean
    serviceId?: boolean
    customerId?: boolean
    paymentProof?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    expiredAt?: boolean
    locationId?: boolean
    serviceId?: boolean
    customerId?: boolean
    paymentProof?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    expiredAt?: boolean
    locationId?: boolean
    serviceId?: boolean
    customerId?: boolean
    paymentProof?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      location: Prisma.$LocationPayload<ExtArgs>
      service: Prisma.$ServicePayload<ExtArgs>
      customer: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: $Enums.BookingStatus
      startTime: Date
      endTime: Date
      expiredAt: Date
      locationId: string
      serviceId: string
      customerId: string
      paymentProof: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["booking"]>
    composites: {}
  }

  type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = $Result.GetResult<Prisma.$BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingFindManyArgs>(args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
     */
    create<T extends BookingCreateArgs>(args: SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingCreateManyArgs>(args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
     */
    delete<T extends BookingDeleteArgs>(args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingUpdateArgs>(args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingUpdateManyArgs>(args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Booking model
   */
  readonly fields: BookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    location<T extends LocationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LocationDefaultArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    customer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Booking model
   */ 
  interface BookingFieldRefs {
    readonly id: FieldRef<"Booking", 'String'>
    readonly status: FieldRef<"Booking", 'BookingStatus'>
    readonly startTime: FieldRef<"Booking", 'DateTime'>
    readonly endTime: FieldRef<"Booking", 'DateTime'>
    readonly expiredAt: FieldRef<"Booking", 'DateTime'>
    readonly locationId: FieldRef<"Booking", 'String'>
    readonly serviceId: FieldRef<"Booking", 'String'>
    readonly customerId: FieldRef<"Booking", 'String'>
    readonly paymentProof: FieldRef<"Booking", 'String'>
    readonly notes: FieldRef<"Booking", 'String'>
    readonly createdAt: FieldRef<"Booking", 'DateTime'>
    readonly updatedAt: FieldRef<"Booking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Booking findUnique
   */
  export type BookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findFirst
   */
  export type BookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }

  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking createManyAndReturn
   */
  export type BookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
  }

  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }

  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
  }

  /**
   * Booking without action
   */
  export type BookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
  }


  /**
   * Model Portfolio
   */

  export type AggregatePortfolio = {
    _count: PortfolioCountAggregateOutputType | null
    _min: PortfolioMinAggregateOutputType | null
    _max: PortfolioMaxAggregateOutputType | null
  }

  export type PortfolioMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    gender: $Enums.Gender | null
    locationId: string | null
    serviceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortfolioMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    gender: $Enums.Gender | null
    locationId: string | null
    serviceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortfolioCountAggregateOutputType = {
    id: number
    title: number
    imageUrls: number
    description: number
    tags: number
    gender: number
    locationId: number
    serviceId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PortfolioMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    gender?: true
    locationId?: true
    serviceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortfolioMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    gender?: true
    locationId?: true
    serviceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortfolioCountAggregateInputType = {
    id?: true
    title?: true
    imageUrls?: true
    description?: true
    tags?: true
    gender?: true
    locationId?: true
    serviceId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PortfolioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolio to aggregate.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Portfolios
    **/
    _count?: true | PortfolioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortfolioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortfolioMaxAggregateInputType
  }

  export type GetPortfolioAggregateType<T extends PortfolioAggregateArgs> = {
        [P in keyof T & keyof AggregatePortfolio]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortfolio[P]>
      : GetScalarType<T[P], AggregatePortfolio[P]>
  }




  export type PortfolioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithAggregationInput | PortfolioOrderByWithAggregationInput[]
    by: PortfolioScalarFieldEnum[] | PortfolioScalarFieldEnum
    having?: PortfolioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortfolioCountAggregateInputType | true
    _min?: PortfolioMinAggregateInputType
    _max?: PortfolioMaxAggregateInputType
  }

  export type PortfolioGroupByOutputType = {
    id: string
    title: string
    imageUrls: string[]
    description: string | null
    tags: string[]
    gender: $Enums.Gender
    locationId: string | null
    serviceId: string | null
    createdAt: Date
    updatedAt: Date
    _count: PortfolioCountAggregateOutputType | null
    _min: PortfolioMinAggregateOutputType | null
    _max: PortfolioMaxAggregateOutputType | null
  }

  type GetPortfolioGroupByPayload<T extends PortfolioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortfolioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortfolioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortfolioGroupByOutputType[P]>
            : GetScalarType<T[P], PortfolioGroupByOutputType[P]>
        }
      >
    >


  export type PortfolioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    imageUrls?: boolean
    description?: boolean
    tags?: boolean
    gender?: boolean
    locationId?: boolean
    serviceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | Portfolio$locationArgs<ExtArgs>
    service?: boolean | Portfolio$serviceArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio"]>

  export type PortfolioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    imageUrls?: boolean
    description?: boolean
    tags?: boolean
    gender?: boolean
    locationId?: boolean
    serviceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | Portfolio$locationArgs<ExtArgs>
    service?: boolean | Portfolio$serviceArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio"]>

  export type PortfolioSelectScalar = {
    id?: boolean
    title?: boolean
    imageUrls?: boolean
    description?: boolean
    tags?: boolean
    gender?: boolean
    locationId?: boolean
    serviceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PortfolioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | Portfolio$locationArgs<ExtArgs>
    service?: boolean | Portfolio$serviceArgs<ExtArgs>
  }
  export type PortfolioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | Portfolio$locationArgs<ExtArgs>
    service?: boolean | Portfolio$serviceArgs<ExtArgs>
  }

  export type $PortfolioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Portfolio"
    objects: {
      location: Prisma.$LocationPayload<ExtArgs> | null
      service: Prisma.$ServicePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      imageUrls: string[]
      description: string | null
      tags: string[]
      gender: $Enums.Gender
      locationId: string | null
      serviceId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["portfolio"]>
    composites: {}
  }

  type PortfolioGetPayload<S extends boolean | null | undefined | PortfolioDefaultArgs> = $Result.GetResult<Prisma.$PortfolioPayload, S>

  type PortfolioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PortfolioFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PortfolioCountAggregateInputType | true
    }

  export interface PortfolioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Portfolio'], meta: { name: 'Portfolio' } }
    /**
     * Find zero or one Portfolio that matches the filter.
     * @param {PortfolioFindUniqueArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortfolioFindUniqueArgs>(args: SelectSubset<T, PortfolioFindUniqueArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Portfolio that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PortfolioFindUniqueOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortfolioFindUniqueOrThrowArgs>(args: SelectSubset<T, PortfolioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Portfolio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortfolioFindFirstArgs>(args?: SelectSubset<T, PortfolioFindFirstArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Portfolio that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortfolioFindFirstOrThrowArgs>(args?: SelectSubset<T, PortfolioFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Portfolios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Portfolios
     * const portfolios = await prisma.portfolio.findMany()
     * 
     * // Get first 10 Portfolios
     * const portfolios = await prisma.portfolio.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortfolioFindManyArgs>(args?: SelectSubset<T, PortfolioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Portfolio.
     * @param {PortfolioCreateArgs} args - Arguments to create a Portfolio.
     * @example
     * // Create one Portfolio
     * const Portfolio = await prisma.portfolio.create({
     *   data: {
     *     // ... data to create a Portfolio
     *   }
     * })
     * 
     */
    create<T extends PortfolioCreateArgs>(args: SelectSubset<T, PortfolioCreateArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Portfolios.
     * @param {PortfolioCreateManyArgs} args - Arguments to create many Portfolios.
     * @example
     * // Create many Portfolios
     * const portfolio = await prisma.portfolio.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortfolioCreateManyArgs>(args?: SelectSubset<T, PortfolioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Portfolios and returns the data saved in the database.
     * @param {PortfolioCreateManyAndReturnArgs} args - Arguments to create many Portfolios.
     * @example
     * // Create many Portfolios
     * const portfolio = await prisma.portfolio.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Portfolios and only return the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PortfolioCreateManyAndReturnArgs>(args?: SelectSubset<T, PortfolioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Portfolio.
     * @param {PortfolioDeleteArgs} args - Arguments to delete one Portfolio.
     * @example
     * // Delete one Portfolio
     * const Portfolio = await prisma.portfolio.delete({
     *   where: {
     *     // ... filter to delete one Portfolio
     *   }
     * })
     * 
     */
    delete<T extends PortfolioDeleteArgs>(args: SelectSubset<T, PortfolioDeleteArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Portfolio.
     * @param {PortfolioUpdateArgs} args - Arguments to update one Portfolio.
     * @example
     * // Update one Portfolio
     * const portfolio = await prisma.portfolio.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortfolioUpdateArgs>(args: SelectSubset<T, PortfolioUpdateArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Portfolios.
     * @param {PortfolioDeleteManyArgs} args - Arguments to filter Portfolios to delete.
     * @example
     * // Delete a few Portfolios
     * const { count } = await prisma.portfolio.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortfolioDeleteManyArgs>(args?: SelectSubset<T, PortfolioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Portfolios
     * const portfolio = await prisma.portfolio.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortfolioUpdateManyArgs>(args: SelectSubset<T, PortfolioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Portfolio.
     * @param {PortfolioUpsertArgs} args - Arguments to update or create a Portfolio.
     * @example
     * // Update or create a Portfolio
     * const portfolio = await prisma.portfolio.upsert({
     *   create: {
     *     // ... data to create a Portfolio
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Portfolio we want to update
     *   }
     * })
     */
    upsert<T extends PortfolioUpsertArgs>(args: SelectSubset<T, PortfolioUpsertArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioCountArgs} args - Arguments to filter Portfolios to count.
     * @example
     * // Count the number of Portfolios
     * const count = await prisma.portfolio.count({
     *   where: {
     *     // ... the filter for the Portfolios we want to count
     *   }
     * })
    **/
    count<T extends PortfolioCountArgs>(
      args?: Subset<T, PortfolioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortfolioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PortfolioAggregateArgs>(args: Subset<T, PortfolioAggregateArgs>): Prisma.PrismaPromise<GetPortfolioAggregateType<T>>

    /**
     * Group by Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PortfolioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortfolioGroupByArgs['orderBy'] }
        : { orderBy?: PortfolioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PortfolioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortfolioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Portfolio model
   */
  readonly fields: PortfolioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Portfolio.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortfolioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    location<T extends Portfolio$locationArgs<ExtArgs> = {}>(args?: Subset<T, Portfolio$locationArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    service<T extends Portfolio$serviceArgs<ExtArgs> = {}>(args?: Subset<T, Portfolio$serviceArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Portfolio model
   */ 
  interface PortfolioFieldRefs {
    readonly id: FieldRef<"Portfolio", 'String'>
    readonly title: FieldRef<"Portfolio", 'String'>
    readonly imageUrls: FieldRef<"Portfolio", 'String[]'>
    readonly description: FieldRef<"Portfolio", 'String'>
    readonly tags: FieldRef<"Portfolio", 'String[]'>
    readonly gender: FieldRef<"Portfolio", 'Gender'>
    readonly locationId: FieldRef<"Portfolio", 'String'>
    readonly serviceId: FieldRef<"Portfolio", 'String'>
    readonly createdAt: FieldRef<"Portfolio", 'DateTime'>
    readonly updatedAt: FieldRef<"Portfolio", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Portfolio findUnique
   */
  export type PortfolioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio findUniqueOrThrow
   */
  export type PortfolioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio findFirst
   */
  export type PortfolioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio findFirstOrThrow
   */
  export type PortfolioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio findMany
   */
  export type PortfolioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolios to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio create
   */
  export type PortfolioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The data needed to create a Portfolio.
     */
    data?: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>
  }

  /**
   * Portfolio createMany
   */
  export type PortfolioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Portfolios.
     */
    data: PortfolioCreateManyInput | PortfolioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Portfolio createManyAndReturn
   */
  export type PortfolioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Portfolios.
     */
    data: PortfolioCreateManyInput | PortfolioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Portfolio update
   */
  export type PortfolioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The data needed to update a Portfolio.
     */
    data: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>
    /**
     * Choose, which Portfolio to update.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio updateMany
   */
  export type PortfolioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Portfolios.
     */
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyInput>
    /**
     * Filter which Portfolios to update
     */
    where?: PortfolioWhereInput
  }

  /**
   * Portfolio upsert
   */
  export type PortfolioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The filter to search for the Portfolio to update in case it exists.
     */
    where: PortfolioWhereUniqueInput
    /**
     * In case the Portfolio found by the `where` argument doesn't exist, create a new Portfolio with this data.
     */
    create: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>
    /**
     * In case the Portfolio was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>
  }

  /**
   * Portfolio delete
   */
  export type PortfolioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter which Portfolio to delete.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio deleteMany
   */
  export type PortfolioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolios to delete
     */
    where?: PortfolioWhereInput
  }

  /**
   * Portfolio.location
   */
  export type Portfolio$locationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
  }

  /**
   * Portfolio.service
   */
  export type Portfolio$serviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
  }

  /**
   * Portfolio without action
   */
  export type PortfolioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StoreInfoScalarFieldEnum: {
    id: 'id',
    phone: 'phone',
    line: 'line',
    instagram: 'instagram',
    facebook: 'facebook',
    bankCode: 'bankCode',
    bankName: 'bankName',
    bankAccount: 'bankAccount',
    bankAccountName: 'bankAccountName',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StoreInfoScalarFieldEnum = (typeof StoreInfoScalarFieldEnum)[keyof typeof StoreInfoScalarFieldEnum]


  export const LocationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    imageUrls: 'imageUrls',
    isPublished: 'isPublished',
    openingHours: 'openingHours',
    vacationDays: 'vacationDays',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price',
    duration: 'duration',
    isPublished: 'isPublished',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    phone: 'phone',
    birthday: 'birthday',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const BookingScalarFieldEnum: {
    id: 'id',
    status: 'status',
    startTime: 'startTime',
    endTime: 'endTime',
    expiredAt: 'expiredAt',
    locationId: 'locationId',
    serviceId: 'serviceId',
    customerId: 'customerId',
    paymentProof: 'paymentProof',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const PortfolioScalarFieldEnum: {
    id: 'id',
    title: 'title',
    imageUrls: 'imageUrls',
    description: 'description',
    tags: 'tags',
    gender: 'gender',
    locationId: 'locationId',
    serviceId: 'serviceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PortfolioScalarFieldEnum = (typeof PortfolioScalarFieldEnum)[keyof typeof PortfolioScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'BookingStatus'
   */
  export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>
    


  /**
   * Reference to a field of type 'BookingStatus[]'
   */
  export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type StoreInfoWhereInput = {
    AND?: StoreInfoWhereInput | StoreInfoWhereInput[]
    OR?: StoreInfoWhereInput[]
    NOT?: StoreInfoWhereInput | StoreInfoWhereInput[]
    id?: StringFilter<"StoreInfo"> | string
    phone?: StringNullableFilter<"StoreInfo"> | string | null
    line?: StringNullableFilter<"StoreInfo"> | string | null
    instagram?: StringNullableFilter<"StoreInfo"> | string | null
    facebook?: StringNullableFilter<"StoreInfo"> | string | null
    bankCode?: StringNullableFilter<"StoreInfo"> | string | null
    bankName?: StringNullableFilter<"StoreInfo"> | string | null
    bankAccount?: StringNullableFilter<"StoreInfo"> | string | null
    bankAccountName?: StringNullableFilter<"StoreInfo"> | string | null
    createdAt?: DateTimeFilter<"StoreInfo"> | Date | string
    updatedAt?: DateTimeFilter<"StoreInfo"> | Date | string
  }

  export type StoreInfoOrderByWithRelationInput = {
    id?: SortOrder
    phone?: SortOrderInput | SortOrder
    line?: SortOrderInput | SortOrder
    instagram?: SortOrderInput | SortOrder
    facebook?: SortOrderInput | SortOrder
    bankCode?: SortOrderInput | SortOrder
    bankName?: SortOrderInput | SortOrder
    bankAccount?: SortOrderInput | SortOrder
    bankAccountName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StoreInfoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StoreInfoWhereInput | StoreInfoWhereInput[]
    OR?: StoreInfoWhereInput[]
    NOT?: StoreInfoWhereInput | StoreInfoWhereInput[]
    phone?: StringNullableFilter<"StoreInfo"> | string | null
    line?: StringNullableFilter<"StoreInfo"> | string | null
    instagram?: StringNullableFilter<"StoreInfo"> | string | null
    facebook?: StringNullableFilter<"StoreInfo"> | string | null
    bankCode?: StringNullableFilter<"StoreInfo"> | string | null
    bankName?: StringNullableFilter<"StoreInfo"> | string | null
    bankAccount?: StringNullableFilter<"StoreInfo"> | string | null
    bankAccountName?: StringNullableFilter<"StoreInfo"> | string | null
    createdAt?: DateTimeFilter<"StoreInfo"> | Date | string
    updatedAt?: DateTimeFilter<"StoreInfo"> | Date | string
  }, "id">

  export type StoreInfoOrderByWithAggregationInput = {
    id?: SortOrder
    phone?: SortOrderInput | SortOrder
    line?: SortOrderInput | SortOrder
    instagram?: SortOrderInput | SortOrder
    facebook?: SortOrderInput | SortOrder
    bankCode?: SortOrderInput | SortOrder
    bankName?: SortOrderInput | SortOrder
    bankAccount?: SortOrderInput | SortOrder
    bankAccountName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StoreInfoCountOrderByAggregateInput
    _max?: StoreInfoMaxOrderByAggregateInput
    _min?: StoreInfoMinOrderByAggregateInput
  }

  export type StoreInfoScalarWhereWithAggregatesInput = {
    AND?: StoreInfoScalarWhereWithAggregatesInput | StoreInfoScalarWhereWithAggregatesInput[]
    OR?: StoreInfoScalarWhereWithAggregatesInput[]
    NOT?: StoreInfoScalarWhereWithAggregatesInput | StoreInfoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StoreInfo"> | string
    phone?: StringNullableWithAggregatesFilter<"StoreInfo"> | string | null
    line?: StringNullableWithAggregatesFilter<"StoreInfo"> | string | null
    instagram?: StringNullableWithAggregatesFilter<"StoreInfo"> | string | null
    facebook?: StringNullableWithAggregatesFilter<"StoreInfo"> | string | null
    bankCode?: StringNullableWithAggregatesFilter<"StoreInfo"> | string | null
    bankName?: StringNullableWithAggregatesFilter<"StoreInfo"> | string | null
    bankAccount?: StringNullableWithAggregatesFilter<"StoreInfo"> | string | null
    bankAccountName?: StringNullableWithAggregatesFilter<"StoreInfo"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StoreInfo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StoreInfo"> | Date | string
  }

  export type LocationWhereInput = {
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    id?: StringFilter<"Location"> | string
    name?: StringFilter<"Location"> | string
    address?: StringFilter<"Location"> | string
    imageUrls?: StringNullableListFilter<"Location">
    isPublished?: BoolFilter<"Location"> | boolean
    openingHours?: JsonNullableFilter<"Location">
    vacationDays?: DateTimeNullableListFilter<"Location">
    createdAt?: DateTimeFilter<"Location"> | Date | string
    updatedAt?: DateTimeFilter<"Location"> | Date | string
    bookings?: BookingListRelationFilter
    services?: ServiceListRelationFilter
    portfolios?: PortfolioListRelationFilter
  }

  export type LocationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    imageUrls?: SortOrder
    isPublished?: SortOrder
    openingHours?: SortOrderInput | SortOrder
    vacationDays?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bookings?: BookingOrderByRelationAggregateInput
    services?: ServiceOrderByRelationAggregateInput
    portfolios?: PortfolioOrderByRelationAggregateInput
  }

  export type LocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    name?: StringFilter<"Location"> | string
    address?: StringFilter<"Location"> | string
    imageUrls?: StringNullableListFilter<"Location">
    isPublished?: BoolFilter<"Location"> | boolean
    openingHours?: JsonNullableFilter<"Location">
    vacationDays?: DateTimeNullableListFilter<"Location">
    createdAt?: DateTimeFilter<"Location"> | Date | string
    updatedAt?: DateTimeFilter<"Location"> | Date | string
    bookings?: BookingListRelationFilter
    services?: ServiceListRelationFilter
    portfolios?: PortfolioListRelationFilter
  }, "id">

  export type LocationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    imageUrls?: SortOrder
    isPublished?: SortOrder
    openingHours?: SortOrderInput | SortOrder
    vacationDays?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LocationCountOrderByAggregateInput
    _max?: LocationMaxOrderByAggregateInput
    _min?: LocationMinOrderByAggregateInput
  }

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    OR?: LocationScalarWhereWithAggregatesInput[]
    NOT?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Location"> | string
    name?: StringWithAggregatesFilter<"Location"> | string
    address?: StringWithAggregatesFilter<"Location"> | string
    imageUrls?: StringNullableListFilter<"Location">
    isPublished?: BoolWithAggregatesFilter<"Location"> | boolean
    openingHours?: JsonNullableWithAggregatesFilter<"Location">
    vacationDays?: DateTimeNullableListFilter<"Location">
    createdAt?: DateTimeWithAggregatesFilter<"Location"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Location"> | Date | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    price?: IntFilter<"Service"> | number
    duration?: IntFilter<"Service"> | number
    isPublished?: BoolFilter<"Service"> | boolean
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    locations?: LocationListRelationFilter
    bookings?: BookingListRelationFilter
    portfolios?: PortfolioListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    locations?: LocationOrderByRelationAggregateInput
    bookings?: BookingOrderByRelationAggregateInput
    portfolios?: PortfolioOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    name?: StringFilter<"Service"> | string
    price?: IntFilter<"Service"> | number
    duration?: IntFilter<"Service"> | number
    isPublished?: BoolFilter<"Service"> | boolean
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    locations?: LocationListRelationFilter
    bookings?: BookingListRelationFilter
    portfolios?: PortfolioListRelationFilter
  }, "id">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    name?: StringWithAggregatesFilter<"Service"> | string
    price?: IntWithAggregatesFilter<"Service"> | number
    duration?: IntWithAggregatesFilter<"Service"> | number
    isPublished?: BoolWithAggregatesFilter<"Service"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    birthday?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    bookings?: BookingListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    birthday?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bookings?: BookingOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    birthday?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    bookings?: BookingListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    birthday?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    birthday?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: StringFilter<"Booking"> | string
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    startTime?: DateTimeFilter<"Booking"> | Date | string
    endTime?: DateTimeFilter<"Booking"> | Date | string
    expiredAt?: DateTimeFilter<"Booking"> | Date | string
    locationId?: StringFilter<"Booking"> | string
    serviceId?: StringFilter<"Booking"> | string
    customerId?: StringFilter<"Booking"> | string
    paymentProof?: StringNullableFilter<"Booking"> | string | null
    notes?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    location?: XOR<LocationRelationFilter, LocationWhereInput>
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
    customer?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    expiredAt?: SortOrder
    locationId?: SortOrder
    serviceId?: SortOrder
    customerId?: SortOrder
    paymentProof?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    location?: LocationOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
    customer?: UserOrderByWithRelationInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    startTime?: DateTimeFilter<"Booking"> | Date | string
    endTime?: DateTimeFilter<"Booking"> | Date | string
    expiredAt?: DateTimeFilter<"Booking"> | Date | string
    locationId?: StringFilter<"Booking"> | string
    serviceId?: StringFilter<"Booking"> | string
    customerId?: StringFilter<"Booking"> | string
    paymentProof?: StringNullableFilter<"Booking"> | string | null
    notes?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    location?: XOR<LocationRelationFilter, LocationWhereInput>
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
    customer?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    expiredAt?: SortOrder
    locationId?: SortOrder
    serviceId?: SortOrder
    customerId?: SortOrder
    paymentProof?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookingCountOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    OR?: BookingScalarWhereWithAggregatesInput[]
    NOT?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Booking"> | string
    status?: EnumBookingStatusWithAggregatesFilter<"Booking"> | $Enums.BookingStatus
    startTime?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    expiredAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    locationId?: StringWithAggregatesFilter<"Booking"> | string
    serviceId?: StringWithAggregatesFilter<"Booking"> | string
    customerId?: StringWithAggregatesFilter<"Booking"> | string
    paymentProof?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
  }

  export type PortfolioWhereInput = {
    AND?: PortfolioWhereInput | PortfolioWhereInput[]
    OR?: PortfolioWhereInput[]
    NOT?: PortfolioWhereInput | PortfolioWhereInput[]
    id?: StringFilter<"Portfolio"> | string
    title?: StringFilter<"Portfolio"> | string
    imageUrls?: StringNullableListFilter<"Portfolio">
    description?: StringNullableFilter<"Portfolio"> | string | null
    tags?: StringNullableListFilter<"Portfolio">
    gender?: EnumGenderFilter<"Portfolio"> | $Enums.Gender
    locationId?: StringNullableFilter<"Portfolio"> | string | null
    serviceId?: StringNullableFilter<"Portfolio"> | string | null
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeFilter<"Portfolio"> | Date | string
    location?: XOR<LocationNullableRelationFilter, LocationWhereInput> | null
    service?: XOR<ServiceNullableRelationFilter, ServiceWhereInput> | null
  }

  export type PortfolioOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    imageUrls?: SortOrder
    description?: SortOrderInput | SortOrder
    tags?: SortOrder
    gender?: SortOrder
    locationId?: SortOrderInput | SortOrder
    serviceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    location?: LocationOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
  }

  export type PortfolioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PortfolioWhereInput | PortfolioWhereInput[]
    OR?: PortfolioWhereInput[]
    NOT?: PortfolioWhereInput | PortfolioWhereInput[]
    title?: StringFilter<"Portfolio"> | string
    imageUrls?: StringNullableListFilter<"Portfolio">
    description?: StringNullableFilter<"Portfolio"> | string | null
    tags?: StringNullableListFilter<"Portfolio">
    gender?: EnumGenderFilter<"Portfolio"> | $Enums.Gender
    locationId?: StringNullableFilter<"Portfolio"> | string | null
    serviceId?: StringNullableFilter<"Portfolio"> | string | null
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeFilter<"Portfolio"> | Date | string
    location?: XOR<LocationNullableRelationFilter, LocationWhereInput> | null
    service?: XOR<ServiceNullableRelationFilter, ServiceWhereInput> | null
  }, "id">

  export type PortfolioOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    imageUrls?: SortOrder
    description?: SortOrderInput | SortOrder
    tags?: SortOrder
    gender?: SortOrder
    locationId?: SortOrderInput | SortOrder
    serviceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PortfolioCountOrderByAggregateInput
    _max?: PortfolioMaxOrderByAggregateInput
    _min?: PortfolioMinOrderByAggregateInput
  }

  export type PortfolioScalarWhereWithAggregatesInput = {
    AND?: PortfolioScalarWhereWithAggregatesInput | PortfolioScalarWhereWithAggregatesInput[]
    OR?: PortfolioScalarWhereWithAggregatesInput[]
    NOT?: PortfolioScalarWhereWithAggregatesInput | PortfolioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Portfolio"> | string
    title?: StringWithAggregatesFilter<"Portfolio"> | string
    imageUrls?: StringNullableListFilter<"Portfolio">
    description?: StringNullableWithAggregatesFilter<"Portfolio"> | string | null
    tags?: StringNullableListFilter<"Portfolio">
    gender?: EnumGenderWithAggregatesFilter<"Portfolio"> | $Enums.Gender
    locationId?: StringNullableWithAggregatesFilter<"Portfolio"> | string | null
    serviceId?: StringNullableWithAggregatesFilter<"Portfolio"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Portfolio"> | Date | string
  }

  export type StoreInfoCreateInput = {
    id?: string
    phone?: string | null
    line?: string | null
    instagram?: string | null
    facebook?: string | null
    bankCode?: string | null
    bankName?: string | null
    bankAccount?: string | null
    bankAccountName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StoreInfoUncheckedCreateInput = {
    id?: string
    phone?: string | null
    line?: string | null
    instagram?: string | null
    facebook?: string | null
    bankCode?: string | null
    bankName?: string | null
    bankAccount?: string | null
    bankAccountName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StoreInfoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    line?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreInfoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    line?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreInfoCreateManyInput = {
    id?: string
    phone?: string | null
    line?: string | null
    instagram?: string | null
    facebook?: string | null
    bankCode?: string | null
    bankName?: string | null
    bankAccount?: string | null
    bankAccountName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StoreInfoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    line?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreInfoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    line?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCreateInput = {
    id?: string
    name: string
    address: string
    imageUrls?: LocationCreateimageUrlsInput | string[]
    isPublished?: boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationCreatevacationDaysInput | Date[] | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutLocationInput
    services?: ServiceCreateNestedManyWithoutLocationsInput
    portfolios?: PortfolioCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateInput = {
    id?: string
    name: string
    address: string
    imageUrls?: LocationCreateimageUrlsInput | string[]
    isPublished?: boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationCreatevacationDaysInput | Date[] | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutLocationInput
    services?: ServiceUncheckedCreateNestedManyWithoutLocationsInput
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imageUrls?: LocationUpdateimageUrlsInput | string[]
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationUpdatevacationDaysInput | Date[] | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutLocationNestedInput
    services?: ServiceUpdateManyWithoutLocationsNestedInput
    portfolios?: PortfolioUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imageUrls?: LocationUpdateimageUrlsInput | string[]
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationUpdatevacationDaysInput | Date[] | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutLocationNestedInput
    services?: ServiceUncheckedUpdateManyWithoutLocationsNestedInput
    portfolios?: PortfolioUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type LocationCreateManyInput = {
    id?: string
    name: string
    address: string
    imageUrls?: LocationCreateimageUrlsInput | string[]
    isPublished?: boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationCreatevacationDaysInput | Date[] | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imageUrls?: LocationUpdateimageUrlsInput | string[]
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationUpdatevacationDaysInput | Date[] | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imageUrls?: LocationUpdateimageUrlsInput | string[]
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationUpdatevacationDaysInput | Date[] | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateInput = {
    id?: string
    name: string
    price: number
    duration: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: LocationCreateNestedManyWithoutServicesInput
    bookings?: BookingCreateNestedManyWithoutServiceInput
    portfolios?: PortfolioCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    name: string
    price: number
    duration: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: LocationUncheckedCreateNestedManyWithoutServicesInput
    bookings?: BookingUncheckedCreateNestedManyWithoutServiceInput
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: LocationUpdateManyWithoutServicesNestedInput
    bookings?: BookingUpdateManyWithoutServiceNestedInput
    portfolios?: PortfolioUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: LocationUncheckedUpdateManyWithoutServicesNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutServiceNestedInput
    portfolios?: PortfolioUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    name: string
    price: number
    duration: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    passwordHash?: string | null
    phone?: string | null
    birthday?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutCustomerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    passwordHash?: string | null
    phone?: string | null
    birthday?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutCustomerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    passwordHash?: string | null
    phone?: string | null
    birthday?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateInput = {
    id?: string
    status?: $Enums.BookingStatus
    startTime: Date | string
    endTime: Date | string
    expiredAt: Date | string
    paymentProof?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location: LocationCreateNestedOneWithoutBookingsInput
    service: ServiceCreateNestedOneWithoutBookingsInput
    customer: UserCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateInput = {
    id?: string
    status?: $Enums.BookingStatus
    startTime: Date | string
    endTime: Date | string
    expiredAt: Date | string
    locationId: string
    serviceId: string
    customerId: string
    paymentProof?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutBookingsNestedInput
    service?: ServiceUpdateOneRequiredWithoutBookingsNestedInput
    customer?: UserUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locationId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyInput = {
    id?: string
    status?: $Enums.BookingStatus
    startTime: Date | string
    endTime: Date | string
    expiredAt: Date | string
    locationId: string
    serviceId: string
    customerId: string
    paymentProof?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locationId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioCreateInput = {
    id?: string
    title?: string
    imageUrls?: PortfolioCreateimageUrlsInput | string[]
    description?: string | null
    tags?: PortfolioCreatetagsInput | string[]
    gender?: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: LocationCreateNestedOneWithoutPortfoliosInput
    service?: ServiceCreateNestedOneWithoutPortfoliosInput
  }

  export type PortfolioUncheckedCreateInput = {
    id?: string
    title?: string
    imageUrls?: PortfolioCreateimageUrlsInput | string[]
    description?: string | null
    tags?: PortfolioCreatetagsInput | string[]
    gender?: $Enums.Gender
    locationId?: string | null
    serviceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrls?: PortfolioUpdateimageUrlsInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PortfolioUpdatetagsInput | string[]
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneWithoutPortfoliosNestedInput
    service?: ServiceUpdateOneWithoutPortfoliosNestedInput
  }

  export type PortfolioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrls?: PortfolioUpdateimageUrlsInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PortfolioUpdatetagsInput | string[]
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioCreateManyInput = {
    id?: string
    title?: string
    imageUrls?: PortfolioCreateimageUrlsInput | string[]
    description?: string | null
    tags?: PortfolioCreatetagsInput | string[]
    gender?: $Enums.Gender
    locationId?: string | null
    serviceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrls?: PortfolioUpdateimageUrlsInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PortfolioUpdatetagsInput | string[]
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrls?: PortfolioUpdateimageUrlsInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PortfolioUpdatetagsInput | string[]
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StoreInfoCountOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    line?: SortOrder
    instagram?: SortOrder
    facebook?: SortOrder
    bankCode?: SortOrder
    bankName?: SortOrder
    bankAccount?: SortOrder
    bankAccountName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StoreInfoMaxOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    line?: SortOrder
    instagram?: SortOrder
    facebook?: SortOrder
    bankCode?: SortOrder
    bankName?: SortOrder
    bankAccount?: SortOrder
    bankAccountName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StoreInfoMinOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    line?: SortOrder
    instagram?: SortOrder
    facebook?: SortOrder
    bankCode?: SortOrder
    bankName?: SortOrder
    bankAccount?: SortOrder
    bankAccountName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeNullableListFilter<$PrismaModel = never> = {
    equals?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    has?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    hasEvery?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    hasSome?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  export type PortfolioListRelationFilter = {
    every?: PortfolioWhereInput
    some?: PortfolioWhereInput
    none?: PortfolioWhereInput
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PortfolioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LocationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    imageUrls?: SortOrder
    isPublished?: SortOrder
    openingHours?: SortOrder
    vacationDays?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type LocationListRelationFilter = {
    every?: LocationWhereInput
    some?: LocationWhereInput
    none?: LocationWhereInput
  }

  export type LocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    price?: SortOrder
    duration?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    price?: SortOrder
    duration?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    birthday?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    birthday?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    birthday?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type EnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type LocationRelationFilter = {
    is?: LocationWhereInput
    isNot?: LocationWhereInput
  }

  export type ServiceRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    expiredAt?: SortOrder
    locationId?: SortOrder
    serviceId?: SortOrder
    customerId?: SortOrder
    paymentProof?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    expiredAt?: SortOrder
    locationId?: SortOrder
    serviceId?: SortOrder
    customerId?: SortOrder
    paymentProof?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    expiredAt?: SortOrder
    locationId?: SortOrder
    serviceId?: SortOrder
    customerId?: SortOrder
    paymentProof?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type LocationNullableRelationFilter = {
    is?: LocationWhereInput | null
    isNot?: LocationWhereInput | null
  }

  export type ServiceNullableRelationFilter = {
    is?: ServiceWhereInput | null
    isNot?: ServiceWhereInput | null
  }

  export type PortfolioCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    imageUrls?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    gender?: SortOrder
    locationId?: SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    gender?: SortOrder
    locationId?: SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    gender?: SortOrder
    locationId?: SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type LocationCreateimageUrlsInput = {
    set: string[]
  }

  export type LocationCreatevacationDaysInput = {
    set: Date[] | string[]
  }

  export type BookingCreateNestedManyWithoutLocationInput = {
    create?: XOR<BookingCreateWithoutLocationInput, BookingUncheckedCreateWithoutLocationInput> | BookingCreateWithoutLocationInput[] | BookingUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutLocationInput | BookingCreateOrConnectWithoutLocationInput[]
    createMany?: BookingCreateManyLocationInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ServiceCreateNestedManyWithoutLocationsInput = {
    create?: XOR<ServiceCreateWithoutLocationsInput, ServiceUncheckedCreateWithoutLocationsInput> | ServiceCreateWithoutLocationsInput[] | ServiceUncheckedCreateWithoutLocationsInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutLocationsInput | ServiceCreateOrConnectWithoutLocationsInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type PortfolioCreateNestedManyWithoutLocationInput = {
    create?: XOR<PortfolioCreateWithoutLocationInput, PortfolioUncheckedCreateWithoutLocationInput> | PortfolioCreateWithoutLocationInput[] | PortfolioUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutLocationInput | PortfolioCreateOrConnectWithoutLocationInput[]
    createMany?: PortfolioCreateManyLocationInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<BookingCreateWithoutLocationInput, BookingUncheckedCreateWithoutLocationInput> | BookingCreateWithoutLocationInput[] | BookingUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutLocationInput | BookingCreateOrConnectWithoutLocationInput[]
    createMany?: BookingCreateManyLocationInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutLocationsInput = {
    create?: XOR<ServiceCreateWithoutLocationsInput, ServiceUncheckedCreateWithoutLocationsInput> | ServiceCreateWithoutLocationsInput[] | ServiceUncheckedCreateWithoutLocationsInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutLocationsInput | ServiceCreateOrConnectWithoutLocationsInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type PortfolioUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<PortfolioCreateWithoutLocationInput, PortfolioUncheckedCreateWithoutLocationInput> | PortfolioCreateWithoutLocationInput[] | PortfolioUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutLocationInput | PortfolioCreateOrConnectWithoutLocationInput[]
    createMany?: PortfolioCreateManyLocationInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type LocationUpdateimageUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type LocationUpdatevacationDaysInput = {
    set?: Date[] | string[]
    push?: Date | string | Date[] | string[]
  }

  export type BookingUpdateManyWithoutLocationNestedInput = {
    create?: XOR<BookingCreateWithoutLocationInput, BookingUncheckedCreateWithoutLocationInput> | BookingCreateWithoutLocationInput[] | BookingUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutLocationInput | BookingCreateOrConnectWithoutLocationInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutLocationInput | BookingUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: BookingCreateManyLocationInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutLocationInput | BookingUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutLocationInput | BookingUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ServiceUpdateManyWithoutLocationsNestedInput = {
    create?: XOR<ServiceCreateWithoutLocationsInput, ServiceUncheckedCreateWithoutLocationsInput> | ServiceCreateWithoutLocationsInput[] | ServiceUncheckedCreateWithoutLocationsInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutLocationsInput | ServiceCreateOrConnectWithoutLocationsInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutLocationsInput | ServiceUpsertWithWhereUniqueWithoutLocationsInput[]
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutLocationsInput | ServiceUpdateWithWhereUniqueWithoutLocationsInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutLocationsInput | ServiceUpdateManyWithWhereWithoutLocationsInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type PortfolioUpdateManyWithoutLocationNestedInput = {
    create?: XOR<PortfolioCreateWithoutLocationInput, PortfolioUncheckedCreateWithoutLocationInput> | PortfolioCreateWithoutLocationInput[] | PortfolioUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutLocationInput | PortfolioCreateOrConnectWithoutLocationInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutLocationInput | PortfolioUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: PortfolioCreateManyLocationInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutLocationInput | PortfolioUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutLocationInput | PortfolioUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<BookingCreateWithoutLocationInput, BookingUncheckedCreateWithoutLocationInput> | BookingCreateWithoutLocationInput[] | BookingUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutLocationInput | BookingCreateOrConnectWithoutLocationInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutLocationInput | BookingUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: BookingCreateManyLocationInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutLocationInput | BookingUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutLocationInput | BookingUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutLocationsNestedInput = {
    create?: XOR<ServiceCreateWithoutLocationsInput, ServiceUncheckedCreateWithoutLocationsInput> | ServiceCreateWithoutLocationsInput[] | ServiceUncheckedCreateWithoutLocationsInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutLocationsInput | ServiceCreateOrConnectWithoutLocationsInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutLocationsInput | ServiceUpsertWithWhereUniqueWithoutLocationsInput[]
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutLocationsInput | ServiceUpdateWithWhereUniqueWithoutLocationsInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutLocationsInput | ServiceUpdateManyWithWhereWithoutLocationsInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type PortfolioUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<PortfolioCreateWithoutLocationInput, PortfolioUncheckedCreateWithoutLocationInput> | PortfolioCreateWithoutLocationInput[] | PortfolioUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutLocationInput | PortfolioCreateOrConnectWithoutLocationInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutLocationInput | PortfolioUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: PortfolioCreateManyLocationInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutLocationInput | PortfolioUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutLocationInput | PortfolioUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type LocationCreateNestedManyWithoutServicesInput = {
    create?: XOR<LocationCreateWithoutServicesInput, LocationUncheckedCreateWithoutServicesInput> | LocationCreateWithoutServicesInput[] | LocationUncheckedCreateWithoutServicesInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutServicesInput | LocationCreateOrConnectWithoutServicesInput[]
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutServiceInput = {
    create?: XOR<BookingCreateWithoutServiceInput, BookingUncheckedCreateWithoutServiceInput> | BookingCreateWithoutServiceInput[] | BookingUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutServiceInput | BookingCreateOrConnectWithoutServiceInput[]
    createMany?: BookingCreateManyServiceInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type PortfolioCreateNestedManyWithoutServiceInput = {
    create?: XOR<PortfolioCreateWithoutServiceInput, PortfolioUncheckedCreateWithoutServiceInput> | PortfolioCreateWithoutServiceInput[] | PortfolioUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutServiceInput | PortfolioCreateOrConnectWithoutServiceInput[]
    createMany?: PortfolioCreateManyServiceInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type LocationUncheckedCreateNestedManyWithoutServicesInput = {
    create?: XOR<LocationCreateWithoutServicesInput, LocationUncheckedCreateWithoutServicesInput> | LocationCreateWithoutServicesInput[] | LocationUncheckedCreateWithoutServicesInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutServicesInput | LocationCreateOrConnectWithoutServicesInput[]
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<BookingCreateWithoutServiceInput, BookingUncheckedCreateWithoutServiceInput> | BookingCreateWithoutServiceInput[] | BookingUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutServiceInput | BookingCreateOrConnectWithoutServiceInput[]
    createMany?: BookingCreateManyServiceInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type PortfolioUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<PortfolioCreateWithoutServiceInput, PortfolioUncheckedCreateWithoutServiceInput> | PortfolioCreateWithoutServiceInput[] | PortfolioUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutServiceInput | PortfolioCreateOrConnectWithoutServiceInput[]
    createMany?: PortfolioCreateManyServiceInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LocationUpdateManyWithoutServicesNestedInput = {
    create?: XOR<LocationCreateWithoutServicesInput, LocationUncheckedCreateWithoutServicesInput> | LocationCreateWithoutServicesInput[] | LocationUncheckedCreateWithoutServicesInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutServicesInput | LocationCreateOrConnectWithoutServicesInput[]
    upsert?: LocationUpsertWithWhereUniqueWithoutServicesInput | LocationUpsertWithWhereUniqueWithoutServicesInput[]
    set?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    disconnect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    delete?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    update?: LocationUpdateWithWhereUniqueWithoutServicesInput | LocationUpdateWithWhereUniqueWithoutServicesInput[]
    updateMany?: LocationUpdateManyWithWhereWithoutServicesInput | LocationUpdateManyWithWhereWithoutServicesInput[]
    deleteMany?: LocationScalarWhereInput | LocationScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutServiceNestedInput = {
    create?: XOR<BookingCreateWithoutServiceInput, BookingUncheckedCreateWithoutServiceInput> | BookingCreateWithoutServiceInput[] | BookingUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutServiceInput | BookingCreateOrConnectWithoutServiceInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutServiceInput | BookingUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: BookingCreateManyServiceInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutServiceInput | BookingUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutServiceInput | BookingUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type PortfolioUpdateManyWithoutServiceNestedInput = {
    create?: XOR<PortfolioCreateWithoutServiceInput, PortfolioUncheckedCreateWithoutServiceInput> | PortfolioCreateWithoutServiceInput[] | PortfolioUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutServiceInput | PortfolioCreateOrConnectWithoutServiceInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutServiceInput | PortfolioUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: PortfolioCreateManyServiceInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutServiceInput | PortfolioUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutServiceInput | PortfolioUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type LocationUncheckedUpdateManyWithoutServicesNestedInput = {
    create?: XOR<LocationCreateWithoutServicesInput, LocationUncheckedCreateWithoutServicesInput> | LocationCreateWithoutServicesInput[] | LocationUncheckedCreateWithoutServicesInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutServicesInput | LocationCreateOrConnectWithoutServicesInput[]
    upsert?: LocationUpsertWithWhereUniqueWithoutServicesInput | LocationUpsertWithWhereUniqueWithoutServicesInput[]
    set?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    disconnect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    delete?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    update?: LocationUpdateWithWhereUniqueWithoutServicesInput | LocationUpdateWithWhereUniqueWithoutServicesInput[]
    updateMany?: LocationUpdateManyWithWhereWithoutServicesInput | LocationUpdateManyWithWhereWithoutServicesInput[]
    deleteMany?: LocationScalarWhereInput | LocationScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<BookingCreateWithoutServiceInput, BookingUncheckedCreateWithoutServiceInput> | BookingCreateWithoutServiceInput[] | BookingUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutServiceInput | BookingCreateOrConnectWithoutServiceInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutServiceInput | BookingUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: BookingCreateManyServiceInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutServiceInput | BookingUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutServiceInput | BookingUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type PortfolioUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<PortfolioCreateWithoutServiceInput, PortfolioUncheckedCreateWithoutServiceInput> | PortfolioCreateWithoutServiceInput[] | PortfolioUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutServiceInput | PortfolioCreateOrConnectWithoutServiceInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutServiceInput | PortfolioUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: PortfolioCreateManyServiceInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutServiceInput | PortfolioUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutServiceInput | PortfolioUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type BookingCreateNestedManyWithoutCustomerInput = {
    create?: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput> | BookingCreateWithoutCustomerInput[] | BookingUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCustomerInput | BookingCreateOrConnectWithoutCustomerInput[]
    createMany?: BookingCreateManyCustomerInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput> | BookingCreateWithoutCustomerInput[] | BookingUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCustomerInput | BookingCreateOrConnectWithoutCustomerInput[]
    createMany?: BookingCreateManyCustomerInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BookingUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput> | BookingCreateWithoutCustomerInput[] | BookingUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCustomerInput | BookingCreateOrConnectWithoutCustomerInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutCustomerInput | BookingUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: BookingCreateManyCustomerInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutCustomerInput | BookingUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutCustomerInput | BookingUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput> | BookingCreateWithoutCustomerInput[] | BookingUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCustomerInput | BookingCreateOrConnectWithoutCustomerInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutCustomerInput | BookingUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: BookingCreateManyCustomerInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutCustomerInput | BookingUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutCustomerInput | BookingUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type LocationCreateNestedOneWithoutBookingsInput = {
    create?: XOR<LocationCreateWithoutBookingsInput, LocationUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: LocationCreateOrConnectWithoutBookingsInput
    connect?: LocationWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutBookingsInput = {
    create?: XOR<ServiceCreateWithoutBookingsInput, ServiceUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutBookingsInput
    connect?: ServiceWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBookingsInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus
  }

  export type LocationUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<LocationCreateWithoutBookingsInput, LocationUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: LocationCreateOrConnectWithoutBookingsInput
    upsert?: LocationUpsertWithoutBookingsInput
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutBookingsInput, LocationUpdateWithoutBookingsInput>, LocationUncheckedUpdateWithoutBookingsInput>
  }

  export type ServiceUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<ServiceCreateWithoutBookingsInput, ServiceUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutBookingsInput
    upsert?: ServiceUpsertWithoutBookingsInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutBookingsInput, ServiceUpdateWithoutBookingsInput>, ServiceUncheckedUpdateWithoutBookingsInput>
  }

  export type UserUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    upsert?: UserUpsertWithoutBookingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBookingsInput, UserUpdateWithoutBookingsInput>, UserUncheckedUpdateWithoutBookingsInput>
  }

  export type PortfolioCreateimageUrlsInput = {
    set: string[]
  }

  export type PortfolioCreatetagsInput = {
    set: string[]
  }

  export type LocationCreateNestedOneWithoutPortfoliosInput = {
    create?: XOR<LocationCreateWithoutPortfoliosInput, LocationUncheckedCreateWithoutPortfoliosInput>
    connectOrCreate?: LocationCreateOrConnectWithoutPortfoliosInput
    connect?: LocationWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutPortfoliosInput = {
    create?: XOR<ServiceCreateWithoutPortfoliosInput, ServiceUncheckedCreateWithoutPortfoliosInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutPortfoliosInput
    connect?: ServiceWhereUniqueInput
  }

  export type PortfolioUpdateimageUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PortfolioUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type LocationUpdateOneWithoutPortfoliosNestedInput = {
    create?: XOR<LocationCreateWithoutPortfoliosInput, LocationUncheckedCreateWithoutPortfoliosInput>
    connectOrCreate?: LocationCreateOrConnectWithoutPortfoliosInput
    upsert?: LocationUpsertWithoutPortfoliosInput
    disconnect?: LocationWhereInput | boolean
    delete?: LocationWhereInput | boolean
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutPortfoliosInput, LocationUpdateWithoutPortfoliosInput>, LocationUncheckedUpdateWithoutPortfoliosInput>
  }

  export type ServiceUpdateOneWithoutPortfoliosNestedInput = {
    create?: XOR<ServiceCreateWithoutPortfoliosInput, ServiceUncheckedCreateWithoutPortfoliosInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutPortfoliosInput
    upsert?: ServiceUpsertWithoutPortfoliosInput
    disconnect?: ServiceWhereInput | boolean
    delete?: ServiceWhereInput | boolean
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutPortfoliosInput, ServiceUpdateWithoutPortfoliosInput>, ServiceUncheckedUpdateWithoutPortfoliosInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type BookingCreateWithoutLocationInput = {
    id?: string
    status?: $Enums.BookingStatus
    startTime: Date | string
    endTime: Date | string
    expiredAt: Date | string
    paymentProof?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    service: ServiceCreateNestedOneWithoutBookingsInput
    customer: UserCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutLocationInput = {
    id?: string
    status?: $Enums.BookingStatus
    startTime: Date | string
    endTime: Date | string
    expiredAt: Date | string
    serviceId: string
    customerId: string
    paymentProof?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateOrConnectWithoutLocationInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutLocationInput, BookingUncheckedCreateWithoutLocationInput>
  }

  export type BookingCreateManyLocationInputEnvelope = {
    data: BookingCreateManyLocationInput | BookingCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type ServiceCreateWithoutLocationsInput = {
    id?: string
    name: string
    price: number
    duration: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutServiceInput
    portfolios?: PortfolioCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutLocationsInput = {
    id?: string
    name: string
    price: number
    duration: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutServiceInput
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutLocationsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutLocationsInput, ServiceUncheckedCreateWithoutLocationsInput>
  }

  export type PortfolioCreateWithoutLocationInput = {
    id?: string
    title?: string
    imageUrls?: PortfolioCreateimageUrlsInput | string[]
    description?: string | null
    tags?: PortfolioCreatetagsInput | string[]
    gender?: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
    service?: ServiceCreateNestedOneWithoutPortfoliosInput
  }

  export type PortfolioUncheckedCreateWithoutLocationInput = {
    id?: string
    title?: string
    imageUrls?: PortfolioCreateimageUrlsInput | string[]
    description?: string | null
    tags?: PortfolioCreatetagsInput | string[]
    gender?: $Enums.Gender
    serviceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioCreateOrConnectWithoutLocationInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutLocationInput, PortfolioUncheckedCreateWithoutLocationInput>
  }

  export type PortfolioCreateManyLocationInputEnvelope = {
    data: PortfolioCreateManyLocationInput | PortfolioCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type BookingUpsertWithWhereUniqueWithoutLocationInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutLocationInput, BookingUncheckedUpdateWithoutLocationInput>
    create: XOR<BookingCreateWithoutLocationInput, BookingUncheckedCreateWithoutLocationInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutLocationInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutLocationInput, BookingUncheckedUpdateWithoutLocationInput>
  }

  export type BookingUpdateManyWithWhereWithoutLocationInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutLocationInput>
  }

  export type BookingScalarWhereInput = {
    AND?: BookingScalarWhereInput | BookingScalarWhereInput[]
    OR?: BookingScalarWhereInput[]
    NOT?: BookingScalarWhereInput | BookingScalarWhereInput[]
    id?: StringFilter<"Booking"> | string
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    startTime?: DateTimeFilter<"Booking"> | Date | string
    endTime?: DateTimeFilter<"Booking"> | Date | string
    expiredAt?: DateTimeFilter<"Booking"> | Date | string
    locationId?: StringFilter<"Booking"> | string
    serviceId?: StringFilter<"Booking"> | string
    customerId?: StringFilter<"Booking"> | string
    paymentProof?: StringNullableFilter<"Booking"> | string | null
    notes?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
  }

  export type ServiceUpsertWithWhereUniqueWithoutLocationsInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutLocationsInput, ServiceUncheckedUpdateWithoutLocationsInput>
    create: XOR<ServiceCreateWithoutLocationsInput, ServiceUncheckedCreateWithoutLocationsInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutLocationsInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutLocationsInput, ServiceUncheckedUpdateWithoutLocationsInput>
  }

  export type ServiceUpdateManyWithWhereWithoutLocationsInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutLocationsInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    OR?: ServiceScalarWhereInput[]
    NOT?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    id?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    price?: IntFilter<"Service"> | number
    duration?: IntFilter<"Service"> | number
    isPublished?: BoolFilter<"Service"> | boolean
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
  }

  export type PortfolioUpsertWithWhereUniqueWithoutLocationInput = {
    where: PortfolioWhereUniqueInput
    update: XOR<PortfolioUpdateWithoutLocationInput, PortfolioUncheckedUpdateWithoutLocationInput>
    create: XOR<PortfolioCreateWithoutLocationInput, PortfolioUncheckedCreateWithoutLocationInput>
  }

  export type PortfolioUpdateWithWhereUniqueWithoutLocationInput = {
    where: PortfolioWhereUniqueInput
    data: XOR<PortfolioUpdateWithoutLocationInput, PortfolioUncheckedUpdateWithoutLocationInput>
  }

  export type PortfolioUpdateManyWithWhereWithoutLocationInput = {
    where: PortfolioScalarWhereInput
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyWithoutLocationInput>
  }

  export type PortfolioScalarWhereInput = {
    AND?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
    OR?: PortfolioScalarWhereInput[]
    NOT?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
    id?: StringFilter<"Portfolio"> | string
    title?: StringFilter<"Portfolio"> | string
    imageUrls?: StringNullableListFilter<"Portfolio">
    description?: StringNullableFilter<"Portfolio"> | string | null
    tags?: StringNullableListFilter<"Portfolio">
    gender?: EnumGenderFilter<"Portfolio"> | $Enums.Gender
    locationId?: StringNullableFilter<"Portfolio"> | string | null
    serviceId?: StringNullableFilter<"Portfolio"> | string | null
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeFilter<"Portfolio"> | Date | string
  }

  export type LocationCreateWithoutServicesInput = {
    id?: string
    name: string
    address: string
    imageUrls?: LocationCreateimageUrlsInput | string[]
    isPublished?: boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationCreatevacationDaysInput | Date[] | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutLocationInput
    portfolios?: PortfolioCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateWithoutServicesInput = {
    id?: string
    name: string
    address: string
    imageUrls?: LocationCreateimageUrlsInput | string[]
    isPublished?: boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationCreatevacationDaysInput | Date[] | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutLocationInput
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationCreateOrConnectWithoutServicesInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutServicesInput, LocationUncheckedCreateWithoutServicesInput>
  }

  export type BookingCreateWithoutServiceInput = {
    id?: string
    status?: $Enums.BookingStatus
    startTime: Date | string
    endTime: Date | string
    expiredAt: Date | string
    paymentProof?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location: LocationCreateNestedOneWithoutBookingsInput
    customer: UserCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutServiceInput = {
    id?: string
    status?: $Enums.BookingStatus
    startTime: Date | string
    endTime: Date | string
    expiredAt: Date | string
    locationId: string
    customerId: string
    paymentProof?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateOrConnectWithoutServiceInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutServiceInput, BookingUncheckedCreateWithoutServiceInput>
  }

  export type BookingCreateManyServiceInputEnvelope = {
    data: BookingCreateManyServiceInput | BookingCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type PortfolioCreateWithoutServiceInput = {
    id?: string
    title?: string
    imageUrls?: PortfolioCreateimageUrlsInput | string[]
    description?: string | null
    tags?: PortfolioCreatetagsInput | string[]
    gender?: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: LocationCreateNestedOneWithoutPortfoliosInput
  }

  export type PortfolioUncheckedCreateWithoutServiceInput = {
    id?: string
    title?: string
    imageUrls?: PortfolioCreateimageUrlsInput | string[]
    description?: string | null
    tags?: PortfolioCreatetagsInput | string[]
    gender?: $Enums.Gender
    locationId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioCreateOrConnectWithoutServiceInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutServiceInput, PortfolioUncheckedCreateWithoutServiceInput>
  }

  export type PortfolioCreateManyServiceInputEnvelope = {
    data: PortfolioCreateManyServiceInput | PortfolioCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type LocationUpsertWithWhereUniqueWithoutServicesInput = {
    where: LocationWhereUniqueInput
    update: XOR<LocationUpdateWithoutServicesInput, LocationUncheckedUpdateWithoutServicesInput>
    create: XOR<LocationCreateWithoutServicesInput, LocationUncheckedCreateWithoutServicesInput>
  }

  export type LocationUpdateWithWhereUniqueWithoutServicesInput = {
    where: LocationWhereUniqueInput
    data: XOR<LocationUpdateWithoutServicesInput, LocationUncheckedUpdateWithoutServicesInput>
  }

  export type LocationUpdateManyWithWhereWithoutServicesInput = {
    where: LocationScalarWhereInput
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyWithoutServicesInput>
  }

  export type LocationScalarWhereInput = {
    AND?: LocationScalarWhereInput | LocationScalarWhereInput[]
    OR?: LocationScalarWhereInput[]
    NOT?: LocationScalarWhereInput | LocationScalarWhereInput[]
    id?: StringFilter<"Location"> | string
    name?: StringFilter<"Location"> | string
    address?: StringFilter<"Location"> | string
    imageUrls?: StringNullableListFilter<"Location">
    isPublished?: BoolFilter<"Location"> | boolean
    openingHours?: JsonNullableFilter<"Location">
    vacationDays?: DateTimeNullableListFilter<"Location">
    createdAt?: DateTimeFilter<"Location"> | Date | string
    updatedAt?: DateTimeFilter<"Location"> | Date | string
  }

  export type BookingUpsertWithWhereUniqueWithoutServiceInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutServiceInput, BookingUncheckedUpdateWithoutServiceInput>
    create: XOR<BookingCreateWithoutServiceInput, BookingUncheckedCreateWithoutServiceInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutServiceInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutServiceInput, BookingUncheckedUpdateWithoutServiceInput>
  }

  export type BookingUpdateManyWithWhereWithoutServiceInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutServiceInput>
  }

  export type PortfolioUpsertWithWhereUniqueWithoutServiceInput = {
    where: PortfolioWhereUniqueInput
    update: XOR<PortfolioUpdateWithoutServiceInput, PortfolioUncheckedUpdateWithoutServiceInput>
    create: XOR<PortfolioCreateWithoutServiceInput, PortfolioUncheckedCreateWithoutServiceInput>
  }

  export type PortfolioUpdateWithWhereUniqueWithoutServiceInput = {
    where: PortfolioWhereUniqueInput
    data: XOR<PortfolioUpdateWithoutServiceInput, PortfolioUncheckedUpdateWithoutServiceInput>
  }

  export type PortfolioUpdateManyWithWhereWithoutServiceInput = {
    where: PortfolioScalarWhereInput
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyWithoutServiceInput>
  }

  export type BookingCreateWithoutCustomerInput = {
    id?: string
    status?: $Enums.BookingStatus
    startTime: Date | string
    endTime: Date | string
    expiredAt: Date | string
    paymentProof?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location: LocationCreateNestedOneWithoutBookingsInput
    service: ServiceCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutCustomerInput = {
    id?: string
    status?: $Enums.BookingStatus
    startTime: Date | string
    endTime: Date | string
    expiredAt: Date | string
    locationId: string
    serviceId: string
    paymentProof?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateOrConnectWithoutCustomerInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput>
  }

  export type BookingCreateManyCustomerInputEnvelope = {
    data: BookingCreateManyCustomerInput | BookingCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type BookingUpsertWithWhereUniqueWithoutCustomerInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutCustomerInput, BookingUncheckedUpdateWithoutCustomerInput>
    create: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutCustomerInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutCustomerInput, BookingUncheckedUpdateWithoutCustomerInput>
  }

  export type BookingUpdateManyWithWhereWithoutCustomerInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutCustomerInput>
  }

  export type LocationCreateWithoutBookingsInput = {
    id?: string
    name: string
    address: string
    imageUrls?: LocationCreateimageUrlsInput | string[]
    isPublished?: boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationCreatevacationDaysInput | Date[] | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceCreateNestedManyWithoutLocationsInput
    portfolios?: PortfolioCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateWithoutBookingsInput = {
    id?: string
    name: string
    address: string
    imageUrls?: LocationCreateimageUrlsInput | string[]
    isPublished?: boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationCreatevacationDaysInput | Date[] | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutLocationsInput
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationCreateOrConnectWithoutBookingsInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutBookingsInput, LocationUncheckedCreateWithoutBookingsInput>
  }

  export type ServiceCreateWithoutBookingsInput = {
    id?: string
    name: string
    price: number
    duration: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: LocationCreateNestedManyWithoutServicesInput
    portfolios?: PortfolioCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutBookingsInput = {
    id?: string
    name: string
    price: number
    duration: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: LocationUncheckedCreateNestedManyWithoutServicesInput
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutBookingsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutBookingsInput, ServiceUncheckedCreateWithoutBookingsInput>
  }

  export type UserCreateWithoutBookingsInput = {
    id?: string
    name?: string | null
    email?: string | null
    passwordHash?: string | null
    phone?: string | null
    birthday?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutBookingsInput = {
    id?: string
    name?: string | null
    email?: string | null
    passwordHash?: string | null
    phone?: string | null
    birthday?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutBookingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
  }

  export type LocationUpsertWithoutBookingsInput = {
    update: XOR<LocationUpdateWithoutBookingsInput, LocationUncheckedUpdateWithoutBookingsInput>
    create: XOR<LocationCreateWithoutBookingsInput, LocationUncheckedCreateWithoutBookingsInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutBookingsInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutBookingsInput, LocationUncheckedUpdateWithoutBookingsInput>
  }

  export type LocationUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imageUrls?: LocationUpdateimageUrlsInput | string[]
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationUpdatevacationDaysInput | Date[] | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUpdateManyWithoutLocationsNestedInput
    portfolios?: PortfolioUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imageUrls?: LocationUpdateimageUrlsInput | string[]
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationUpdatevacationDaysInput | Date[] | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutLocationsNestedInput
    portfolios?: PortfolioUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type ServiceUpsertWithoutBookingsInput = {
    update: XOR<ServiceUpdateWithoutBookingsInput, ServiceUncheckedUpdateWithoutBookingsInput>
    create: XOR<ServiceCreateWithoutBookingsInput, ServiceUncheckedCreateWithoutBookingsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutBookingsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutBookingsInput, ServiceUncheckedUpdateWithoutBookingsInput>
  }

  export type ServiceUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: LocationUpdateManyWithoutServicesNestedInput
    portfolios?: PortfolioUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: LocationUncheckedUpdateManyWithoutServicesNestedInput
    portfolios?: PortfolioUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type UserUpsertWithoutBookingsInput = {
    update: XOR<UserUpdateWithoutBookingsInput, UserUncheckedUpdateWithoutBookingsInput>
    create: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBookingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBookingsInput, UserUncheckedUpdateWithoutBookingsInput>
  }

  export type UserUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCreateWithoutPortfoliosInput = {
    id?: string
    name: string
    address: string
    imageUrls?: LocationCreateimageUrlsInput | string[]
    isPublished?: boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationCreatevacationDaysInput | Date[] | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutLocationInput
    services?: ServiceCreateNestedManyWithoutLocationsInput
  }

  export type LocationUncheckedCreateWithoutPortfoliosInput = {
    id?: string
    name: string
    address: string
    imageUrls?: LocationCreateimageUrlsInput | string[]
    isPublished?: boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationCreatevacationDaysInput | Date[] | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutLocationInput
    services?: ServiceUncheckedCreateNestedManyWithoutLocationsInput
  }

  export type LocationCreateOrConnectWithoutPortfoliosInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutPortfoliosInput, LocationUncheckedCreateWithoutPortfoliosInput>
  }

  export type ServiceCreateWithoutPortfoliosInput = {
    id?: string
    name: string
    price: number
    duration: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: LocationCreateNestedManyWithoutServicesInput
    bookings?: BookingCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutPortfoliosInput = {
    id?: string
    name: string
    price: number
    duration: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: LocationUncheckedCreateNestedManyWithoutServicesInput
    bookings?: BookingUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutPortfoliosInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutPortfoliosInput, ServiceUncheckedCreateWithoutPortfoliosInput>
  }

  export type LocationUpsertWithoutPortfoliosInput = {
    update: XOR<LocationUpdateWithoutPortfoliosInput, LocationUncheckedUpdateWithoutPortfoliosInput>
    create: XOR<LocationCreateWithoutPortfoliosInput, LocationUncheckedCreateWithoutPortfoliosInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutPortfoliosInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutPortfoliosInput, LocationUncheckedUpdateWithoutPortfoliosInput>
  }

  export type LocationUpdateWithoutPortfoliosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imageUrls?: LocationUpdateimageUrlsInput | string[]
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationUpdatevacationDaysInput | Date[] | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutLocationNestedInput
    services?: ServiceUpdateManyWithoutLocationsNestedInput
  }

  export type LocationUncheckedUpdateWithoutPortfoliosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imageUrls?: LocationUpdateimageUrlsInput | string[]
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationUpdatevacationDaysInput | Date[] | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutLocationNestedInput
    services?: ServiceUncheckedUpdateManyWithoutLocationsNestedInput
  }

  export type ServiceUpsertWithoutPortfoliosInput = {
    update: XOR<ServiceUpdateWithoutPortfoliosInput, ServiceUncheckedUpdateWithoutPortfoliosInput>
    create: XOR<ServiceCreateWithoutPortfoliosInput, ServiceUncheckedCreateWithoutPortfoliosInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutPortfoliosInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutPortfoliosInput, ServiceUncheckedUpdateWithoutPortfoliosInput>
  }

  export type ServiceUpdateWithoutPortfoliosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: LocationUpdateManyWithoutServicesNestedInput
    bookings?: BookingUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutPortfoliosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: LocationUncheckedUpdateManyWithoutServicesNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type BookingCreateManyLocationInput = {
    id?: string
    status?: $Enums.BookingStatus
    startTime: Date | string
    endTime: Date | string
    expiredAt: Date | string
    serviceId: string
    customerId: string
    paymentProof?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioCreateManyLocationInput = {
    id?: string
    title?: string
    imageUrls?: PortfolioCreateimageUrlsInput | string[]
    description?: string | null
    tags?: PortfolioCreatetagsInput | string[]
    gender?: $Enums.Gender
    serviceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutBookingsNestedInput
    customer?: UserUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUpdateWithoutLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutServiceNestedInput
    portfolios?: PortfolioUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutServiceNestedInput
    portfolios?: PortfolioUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrls?: PortfolioUpdateimageUrlsInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PortfolioUpdatetagsInput | string[]
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneWithoutPortfoliosNestedInput
  }

  export type PortfolioUncheckedUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrls?: PortfolioUpdateimageUrlsInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PortfolioUpdatetagsInput | string[]
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUncheckedUpdateManyWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrls?: PortfolioUpdateimageUrlsInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PortfolioUpdatetagsInput | string[]
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyServiceInput = {
    id?: string
    status?: $Enums.BookingStatus
    startTime: Date | string
    endTime: Date | string
    expiredAt: Date | string
    locationId: string
    customerId: string
    paymentProof?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioCreateManyServiceInput = {
    id?: string
    title?: string
    imageUrls?: PortfolioCreateimageUrlsInput | string[]
    description?: string | null
    tags?: PortfolioCreatetagsInput | string[]
    gender?: $Enums.Gender
    locationId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocationUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imageUrls?: LocationUpdateimageUrlsInput | string[]
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationUpdatevacationDaysInput | Date[] | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutLocationNestedInput
    portfolios?: PortfolioUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imageUrls?: LocationUpdateimageUrlsInput | string[]
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationUpdatevacationDaysInput | Date[] | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutLocationNestedInput
    portfolios?: PortfolioUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateManyWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imageUrls?: LocationUpdateimageUrlsInput | string[]
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    vacationDays?: LocationUpdatevacationDaysInput | Date[] | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutBookingsNestedInput
    customer?: UserUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locationId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locationId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrls?: PortfolioUpdateimageUrlsInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PortfolioUpdatetagsInput | string[]
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneWithoutPortfoliosNestedInput
  }

  export type PortfolioUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrls?: PortfolioUpdateimageUrlsInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PortfolioUpdatetagsInput | string[]
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrls?: PortfolioUpdateimageUrlsInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PortfolioUpdatetagsInput | string[]
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyCustomerInput = {
    id?: string
    status?: $Enums.BookingStatus
    startTime: Date | string
    endTime: Date | string
    expiredAt: Date | string
    locationId: string
    serviceId: string
    paymentProof?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutBookingsNestedInput
    service?: ServiceUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locationId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locationId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use LocationCountOutputTypeDefaultArgs instead
     */
    export type LocationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LocationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ServiceCountOutputTypeDefaultArgs instead
     */
    export type ServiceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StoreInfoDefaultArgs instead
     */
    export type StoreInfoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StoreInfoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LocationDefaultArgs instead
     */
    export type LocationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LocationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ServiceDefaultArgs instead
     */
    export type ServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BookingDefaultArgs instead
     */
    export type BookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BookingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PortfolioDefaultArgs instead
     */
    export type PortfolioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PortfolioDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}