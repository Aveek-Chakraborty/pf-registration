import { time } from "console";
import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const boys = pgTable('users', {
  name: varchar('name'),
  mobileNo: varchar('mobile_no'),
  uniqueCode: varchar('unique_code').primaryKey(),
  email: varchar('email'),
  usn: varchar('usn'),
  qrcodedata: varchar("qrcodedata")
});

export const girls = pgTable('girls', {
  name: varchar('name'),
  mobileNo: varchar('mobile_no'),
  uniqueCode: varchar('unique_code').primaryKey(),
  email: varchar('email'),
  usn: varchar('usn'),
  qrcodedata: varchar("qrcodedata")
});

export const walk = pgTable('walk', {
  name: varchar('name'),
  mobileNo: varchar('mobile_no'),
  uniqueCode: varchar('unique_code').primaryKey(),
  email: varchar('email'),
  qrcodedata: varchar("qrcodedata")
});


export const sit = pgTable('sit', {
  name: varchar('name'),
  mobileNo: varchar('mobile_no'),
  uniqueCode: varchar('unique_code').primaryKey(),
  email: varchar('email'),
  usn: varchar('usn'),
  qrcodedata: varchar("qrcodedata")
});

export const master = pgTable("master",
  {
    name: varchar('name'),
    mobileNo: varchar('mobile_no'),
    uniqueCode: varchar('unique_code').primaryKey(),
    email: varchar('email'),
    usn: varchar('usn'),
    qrcodedata: varchar("qrcodedata")
  }
)

export const boycross = pgTable("boycross",
  {
    name: varchar('name'),
    uniqueCode: varchar('unique_code').primaryKey(),
    time: timestamp('time')
  }
)

export const girlcross = pgTable("girlcross",
  {
    name: varchar('name'),
    uniqueCode: varchar('unique_code').primaryKey(),
    time: timestamp('time')
  }
)

export const walkcross = pgTable("walkcross",
  {
    name: varchar('name'),
    uniqueCode: varchar('unique_code').primaryKey(),
    time: timestamp('time')
  }
)