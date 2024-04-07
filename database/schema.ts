import { pgTable, varchar } from "drizzle-orm/pg-core";

export const boys = pgTable('users', {
  name: varchar('name'),               
  mobileNo: varchar('mobile_no'),      
  uniqueCode: varchar('unique_code').primaryKey(), 
  email: varchar('email'),             
  usn: varchar('usn'),                 
});

export const girls = pgTable('girls', {
  name: varchar('name'),               
  mobileNo: varchar('mobile_no'),      
  uniqueCode: varchar('unique_code').primaryKey(), 
  email: varchar('email'),             
  usn: varchar('usn'),                 
});

export const walk = pgTable('walk', {
  name: varchar('name'),               
  mobileNo: varchar('mobile_no'),      
  uniqueCode: varchar('unique_code').primaryKey(), 
  email: varchar('email'),                              
});


export const sit = pgTable('sit', {
  name: varchar('name'),               
  mobileNo: varchar('mobile_no'),      
  uniqueCode: varchar('unique_code').primaryKey(), 
  email: varchar('email'),             
  usn: varchar('usn'),                 
});
