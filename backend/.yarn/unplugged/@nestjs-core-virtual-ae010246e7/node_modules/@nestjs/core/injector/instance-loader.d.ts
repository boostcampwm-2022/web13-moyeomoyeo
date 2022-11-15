import { Logger } from '@nestjs/common';
import { NestContainer } from './container';
import { Injector } from './injector';
import { Module } from './module';
export declare class InstanceLoader {
    protected readonly container: NestContainer;
    private logger;
    protected readonly injector: Injector;
    constructor(container: NestContainer, logger?: Logger);
    setLogger(logger: Logger): void;
    createInstancesOfDependencies(modules?: Map<string, Module>): Promise<void>;
    private createPrototypes;
    private createInstances;
    private createPrototypesOfProviders;
    private createInstancesOfProviders;
    private createPrototypesOfControllers;
    private createInstancesOfControllers;
    private createPrototypesOfInjectables;
    private createInstancesOfInjectables;
    private isModuleWhitelisted;
}
