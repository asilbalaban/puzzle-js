import {IFileResourceAsset, IFileResourceDependency} from "./resource";
import {Fragment} from "../lib/fragment";

export interface IFragment {
    name: string;
}

export interface IFragmentBFFRender {
    static?: boolean;
    url: string;
    routeCache?: number;
    selfReplace?: boolean;
    middlewares?: [Function[]];
    cacheControl?: string;
    placeholder?: boolean;
    timeout?: number;
}

export interface IFragmentHandler {
    content: (req: object, data?: any) => {
        main: string;
        [name: string]: string;
    };
    placeholder: () => string;
    data: (req: object) => any;
}

export interface IFragmentBFFVersion {
    assets: IFileResourceAsset[];
    dependencies: IFileResourceDependency[];
    handler: IFragmentHandler;
}

export interface IFragmentBFF extends IFragment {
    versions: {
        [version: string]: IFragmentBFFVersion
    };
    version: string;
    testCookie: string;
    render: IFragmentBFFRender;
}

export interface IFragmentMap {
    [name: string]: Fragment;
}

export interface IExposeFragment {
    version: string;
    testCookie: string;
    render: IFragmentBFFRender;
    assets: IFileResourceAsset[];
    dependencies: IFileResourceDependency[];
}

export interface IFragmentStorefrontAttributes {
    name: string;
    from: string;
    partial?: string;
    primary?: string;
    shouldwait?: string;

    [name: string]: string | undefined;
}

export interface IfragmentContentResponse {
    status: number;
    html: {
        [name: string]: string;
    };
}
