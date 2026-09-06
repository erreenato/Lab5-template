import mongoose from "mongoose";
export declare const PostModel: mongoose.Model<{
    content: string;
    author?: string | null;
    thread?: string | null;
    parent?: string | null;
    likes: number;
    dislikes: number;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    content: string;
    author?: string | null;
    thread?: string | null;
    parent?: string | null;
    likes: number;
    dislikes: number;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    content: string;
    author?: string | null;
    thread?: string | null;
    parent?: string | null;
    likes: number;
    dislikes: number;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    content: string;
    author?: string | null;
    thread?: string | null;
    parent?: string | null;
    likes: number;
    dislikes: number;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    content: string;
    author?: string | null;
    thread?: string | null;
    parent?: string | null;
    likes: number;
    dislikes: number;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    content: string;
    author?: string | null;
    thread?: string | null;
    parent?: string | null;
    likes: number;
    dislikes: number;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    content: string;
    author?: string | null;
    thread?: string | null;
    parent?: string | null;
    likes: number;
    dislikes: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    content: string;
    author?: string | null;
    thread?: string | null;
    parent?: string | null;
    likes: number;
    dislikes: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Post.d.ts.map