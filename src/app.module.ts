import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/tasks.entity';
import { TypeOrmExModule } from './typeorm-ex.module';
import { TasksRepository } from './tasks/tasks.repository';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { join } from 'path';

// Module decorator
// Each application has at least one module -- the root module. That's the starting point of the app!
// Modules are an efficient way to organize components by a closely related set of capabilities (i.e. per feature)!
// Good practice: have a folder per module, containing the module's components
// Modules are singletons -> a module can be imported by multiple other modules

// Module decorator properties:
// Providers -> providers to be available within the module via dependency injection
// Controllers -> to be instantiated within the module
// Exports -> providers to export to other modules
// Imports -> List of modules required by this module -> any exported provider by these modules will now be available in our module via dependency injection

@Module({
  imports: [
    TasksModule,
    AuthModule,
    TypeOrmModule.forRoot({
      // for root -> for main module
      // confgiure
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'task-management',
      autoLoadEntities: true, // will translate to database schemas within typeorm
      synchronize: true, // always keep database schema in sync!
      // entities: [__dirname + '../**/**/*.entity.ts'],
      // entities: [__dirname + './**/*.entity.ts'],
      // entities: [
      //   __dirname + 'dist/**/*.entity{.ts,.js}',
      //   __dirname + 'src/**/*.entity{.ts,.js}',
      // ],
      entities: [join(__dirname, './**/**.entity{.ts,.js}')],

      // entities: [Task, User],
    }),
    // TypeOrmExModule.forCustomRepository([TasksRepository]),
  ],
})
export class AppModule {} // turns class into a module

// Controllers -> handling incoming requests and returning responses to the client
// bound to a specific path
// contain handlers, which handle endpoints and request methods (i.e. GET, POST, DELETE, etc)
// can take advantage of dependency injection to consume providers within the same module

// The handler -> is the @Get, Post, Delete, etc

// Providers -> can be injected into constructors if decorated as an @Injectable, via dependency injection
// Can be a plain value, a class, sync/async factory, etc
// Providers must be provided to a module for them to be usable
// Can be exported from a module, then be available to other modules that import it

// Service -> Defined as providers, but Not all providers are services.
// Singleton when wrapped with @Injectable() and provided to a module.
// That means, the same instance will be shared across the application -- acting as a single source of truth
// The main source of business logic. For instance, a service will be called from a controller to validate data, create an item in the database and return a response.
// We put services in the providers array -> inject it to a module

// Dependency injection
// Any component within nestJS can inject a provider that is decorated with the @Injectable
// We define the dependencies in the constructor of the class. NestJS will take care of the injection for us, and it will then be available as a class property.
