import { prismaClient } from '$/service/prismaClient';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => {
    const riddles = await prismaClient.riddle.findMany();
    return { status: 200, body: riddles };
  },
}));
