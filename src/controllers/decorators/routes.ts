import 'reflect-metadata';
import { RequestHandler } from 'express';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

interface RouterHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

const routeBinder = (method: string) => {
  return (path: string) => {
    return (target: any, key: string, desc: RouterHandlerDescriptor) => {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
};

export const Get = routeBinder(Methods.Get);
export const Put = routeBinder(Methods.Put);
export const Post = routeBinder(Methods.Post);
export const Delete = routeBinder(Methods.Delete);
export const Patch = routeBinder(Methods.Patch);
