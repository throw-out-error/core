# Triviality (Dependency Container) !heading

Dependency Injection is all about code reusability. 
It’s a design pattern aiming to make high-level code reusable, 
by separating the object creation/configuration from usage. **Triviality** highly aims to keep away from your application code. 
**No magic** injection with tokens, annotations whatsoever. It will use your application code as a **strictly typed interface** to assure everything is connected properly. 

Supported on *Web* and *Node*.

## Modules !heading

Triviality by its core is split into Modules. A module is defined as a class. Each module has his own services definitions 
so each module can serve it's unique and there separate logic.

######typescript "example/module/LogModule.ts"

As you can see a module class has functions. The function name is the service name. The function is the service factory implementation. Before we can call the service from the container
we need to build it:   

######typescript "example/module/LogModuleContainer.ts"

Now we can fetch the 'logger' service from the container and start using it. In the build step of the container, function results will be memorized and can be threaded as a 
singleton based on the service factory arguments. For example, create a service with a single service factory argument:

######typescript "example/singleton/LogModule.ts"

The logger service function and the 'prefixedLogger' functions will always return the same instance for the same arguments. 

######typescript "example/singleton/LogModuleContainer.ts"
___

The container service function types are inherited from the Modules.
This gives typescript the option to **strictly type check** if everything is connected properly. 
And you the benefits of **code completion** and the option to quickly traverse the service chain.
___

We can inject the Module with a Container that has multiple Module dependencies ```Container<...Modules>```. Let's put the type checking to the test, we create a nice module that dependence on the 'LogModule'. 

######typescript "example/moduleDependency/HalloModule.ts"

Build the container with missing 'LogModule' dependency:

######typescript "example/moduleDependency/HalloModuleErrorContainer.ts.example"

If you forget a module you see a nice error of typescript in your IDE.

!["Module requirement error"](./example/moduleDependency/HalloModuleErrorContainer.png)

    Error:(6, 8) TS2345: Argument of type 'typeof HalloModule' is not assignable to parameter of type 'ModuleConstructor<HalloModule, {}>'.
      Types of parameters 'container' and 'container' are incompatible.
        Property 'logger' is missing in type '{}' but required in type 'Readonly<Pick<LogModule, "logger">>'.

Let's fix the container by adding the LogModule:

######typescript "example/moduleDependency/HalloModuleContainer.ts"
######ts-node "example/moduleDependency/HalloModuleContainer.ts"

## Registers !heading

Registers are a collection of services so another module can use the registered services without knowing about anything about the other module.

Let's create a register for 'console commands'

######typescript "example/registries/ConsoleModule.registerOnly.ts"

As a module, the 'registries' return value is an object with functions. The object property name represents the registry name. 
The implementation returns the services that need to be added to the registry. It's possible to add a registry to multiple modules. In the next examples, both modules return one command service inside the registry function.
 
######typescript "example/registries/Command/HalloConsoleModule.ts"

######typescript "example/registries/Command/ByeConsoleModule.ts"

Multiple modules can define the registry. The implementation needs to match between modules otherwise typescript will assist you with strict type checking.
During the container build phase, the registries will be combined. 

######typescript "example/registries/ConsoleModule.ts"

Now we can combine the different command modules and build the container.

######typescript "example/registries/console.ts"

######ts-node "example/registries/console.ts"(hallo john)
######ts-node "example/registries/console.ts"(bye john)

You can also fetch all registries from the container

!["containerRegistries"](./example/registries/containerRegistries.png)

## Setup !heading

The build step returns a single promise, Each module can have its own specific setup
task. The module can check if everything is configured properly or connect to external service like a database.

######typescript "example/setup/DatabaseModule.ts"

Add a catch function to gracefully handle errors

######typescript "example/setup/bootstrap.ts"

######ts-node "example/setup/bootstrap.ts"

## Service overrides & decorators !heading

If you use an external module, maybe you want to override some services. For example, we start with the following greetings module:

######typescript "example/overrides/GreetingsModule.ts"

When we run 

######typescript "example/overrides/bootstrapGreetingsModule.ts"

We get:

######ts-node "example/overrides/bootstrapGreetingsModule.ts"

### Overriding a service !heading

If we want to use a different way to greet we need to override the 'greetingService'

######typescript "example/overrides/FormalGreetingsModule.ts"
######typescript "example/overrides/bootstrapFormalGreetingsModule.ts"

Now the original 'greetingService' service is overridden for the hole application. If we now run the example we get the following result: 

######ts-node "example/overrides/bootstrapFormalGreetingsModule.ts"

### Decorating a service !heading

If we still we to use the original service from the container. We can fetch the original service from the 'serviceOverrides' container argument.
 
Let's be less formal by screaming the sentence: 

######typescript "example/overrides/services/ScreamGreetingsService.ts"
######typescript "example/overrides/ScreamGreetingsModule.ts"
######typescript "example/overrides/bootstrapScreamGreetingsModule.ts"

Now the original 'greetingService' service is overridden and we get:

######ts-node "example/overrides/bootstrapScreamGreetingsModule.ts"