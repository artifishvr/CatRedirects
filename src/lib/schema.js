import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const redirects = sqliteTable('redirects', {
    id: integer('id').primaryKey(),
    ownerid: text('ownerid'),
    host: text('host'),
    url: text('url'),
    wkPrefix: text('wkPrefix'),
    wkContent: text('wkContent'),
})
