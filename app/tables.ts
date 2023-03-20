import { Knex } from "knex";

export type User = {
  id: string;
  email: string;
  username: string;
};
export type Duck = {
  id: string;
  slug: string;
  name: string;
};
export type UserDuck = {
  id: string;
  found_at: string;
  user_id: string;
  duck_id: string;
};

type MaybeRaw<T> = { [K in keyof T]: T[K] | Knex.Raw };
type TableHelper<T> = Knex.CompositeTableType<
  T,
  MaybeRaw<Partial<T>>,
  MaybeRaw<Partial<T>>
>;

declare module "knex/types/tables" {
  interface Tables {
    users: TableHelper<User>;
    ducks: TableHelper<Duck>;
    user_ducks: TableHelper<UserDuck>;
  }
}
