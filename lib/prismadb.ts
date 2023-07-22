// if I remove global then I would have an error in globalThis and
// wouldn't work
// We use this way because otherwise next 13 would create errors.

import { PrismaClient } from "@prisma/client";

declare global{
    var prisma: PrismaClient | undefined
};

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;