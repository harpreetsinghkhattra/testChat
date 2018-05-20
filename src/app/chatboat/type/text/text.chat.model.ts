import { Deserialized } from '../../../utils/deserialized.interface';

export class TextChatModel implements Deserialized<TextChatModel>{

    senderId: string;
    recieverId: string;
    time: string;
    name: string;
    imagePath: string;
    groupId: string;

    /** Copy input to this model */
    deserialized(input: any) {
        Object.assign(this, input);
        return this;
    }
}