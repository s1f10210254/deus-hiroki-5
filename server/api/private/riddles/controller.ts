import { prismaClient } from '$/service/prismaClient';
import { defineController } from './$relay';
import type { RiddleCreate } from '$/api/@types';

export default defineController(() => ({
  post: async ({ body }) => {
    const riddle: RiddleCreate = body;
    const createdRiddle = await prismaClient.riddle.create({
      data: {
        title: riddle.title,
        question: riddle.question,
        answer: riddle.answer,
        createdBy: 'userId', // 仮のユーザーID
        createdAt: new Date().toISOString()
      }
    });
    return { status: 201, body: createdRiddle };
  }
}));
