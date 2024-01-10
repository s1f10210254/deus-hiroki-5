import type { GuessCreate } from '$/api/@types';
import { prismaClient } from '$/service/prismaClient';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ params, body }) => {
    const { riddleId } = params;
    const guess: GuessCreate = body;
    const riddle = await prismaClient.riddle.findUnique({ where: { id: riddleId } });
    if (!riddle) {
      return { status: 404, body: 'Riddle not found' };
    }
    const isCorrect = riddle.answer === guess.guess;
    const createdGuess = await prismaClient.guess.create({
      data: {
        riddleId,
        userId: 'userId', // 仮のユーザーID
        guess: guess.guess,
        isCorrect,
        createdAt: new Date().toISOString(),
      },
    });
    return { status: 201, body: createdGuess };
  },
}));
