import { createShuffle } from 'fast-shuffle'
import { NUMBER_1_99 } from './consts';
export type RoomInfo = {
    id: string;
    roomId: string;
    lotteryId: string;
}

export function getRoomInfo(id: string): RoomInfo {
    const publicId = id.split('-')[0];
    const privateId = id.split('-').slice(1).join('');
    return {
        id: id,
        roomId: publicId,
        lotteryId: privateId
    };
}

export function makeCard(roomId: string, userId: string): number[] {
    const seed = stringTo32BitHash(`${roomId}-${userId}`);
    const shuffle = createShuffle(seed);
    const card = shuffle(NUMBER_1_99).slice(0, 25);
    card[12] = 0;
    return card;
}

export function getLottery(lotteryId: string, turn: number): number[] {
    if (lotteryId === '') {
        return [];
    }
    const seed = stringTo32BitHash(`${lotteryId}`);
    const shuffle = createShuffle(seed);
    const lottery = shuffle(NUMBER_1_99).slice(0, turn);
    return lottery;
}

function stringTo32BitHash(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash = hash & 0xFFFFFFFF;
    }
    return hash >>> 0;
}
