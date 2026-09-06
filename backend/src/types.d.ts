export interface Post {
    id: number;
    content: string;
    author: string | null;
    thread: number | null;
    parent: number | null;
    createdAt: string;
    updatedAt: string;
    likes: number;
    dislikes: number;
}
//# sourceMappingURL=types.d.ts.map