import { PrismaClient } from "@prisma/client";

/**
 * ONLY VAR IS ABLE TO CREATE A PROPERTY
 * ON THE GLOBAL OBJECT NOT LET/CONST
 */

declare global {
	// eslint-disable-next-line no-var
	var __db: PrismaClient | undefined;
}


if (!global.__db) {
	global.__db = new PrismaClient();
}

const db:PrismaClient = global.__db;

export { db };