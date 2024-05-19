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
    threadId: string;
    commentId?: string;
}

export interface ThreadDTO {
    topic: string;
    title: string;
    text: string;
}

export interface ForumTopic {
    callerId: string;
    name: string;
    icon: string;
    description: string;
    isHovered: boolean;
}