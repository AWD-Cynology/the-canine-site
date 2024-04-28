export interface Thread {
    topicId: string;
    cynologyUserId: string;
    title: string;
    text: string;
    datePosted: string;
    replies: Reply[];
    id: string;
}

export interface Reply {
    threadId: string;
    userId: string;
    text: string;
    datePosted: string;
    commentToReply: string;
    id: string;
}

export interface ReplyDTO {
    text: string;
    datePosted: string;
}

export interface ThreadDTO {
    topicId: string;
    title: string;
    text: string;
    datePosted: string;
}