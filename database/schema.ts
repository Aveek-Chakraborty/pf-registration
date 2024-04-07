import { pgTable, varchar } from "drizzle-orm/pg-core";

const users = pgTable('users', {
  name: varchar('name'),               
  mobileNo: varchar('mobile_no'),      
  uniqueCode: varchar('unique_code').primaryKey(), 
  email: varchar('email'),             
  usn: varchar('usn'),                 
});


export default users;