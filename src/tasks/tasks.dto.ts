import { TaskStatus } from './tasks.model';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus; //the ? operator is not gonna work at runtime because typescript isnt gonna work at runtime!

  @IsOptional()
  @IsString()
  search?: string;
}

// NestJS Pipes -> validation and error handling
// Pipes operate on the arguments to be processed by the route handler, just before the handler is called
// Pipes can perform data transformation or data validation
// Pipes can return data -- either original or modified -- which will be passed on to the route handler
// Pipes can throw exceptions. Exceptions thrown will be handled by nestjs and parsed into an error response.
// Pipes can be asynchronous.

// Default pipes in NestJS:
// ValidationPipe -> validates the compatibility of an entire object against a class (goes well with DTOs or Data Transfer Objects)
// if any property cannot be mapped properly (i.e. mismatching type) validation will fail.
// Very common use case, therefore having a built-in validation pipe is useful

// ParseIntPipe -> by default, arguments are of type String. This pipe validates that an argument is a number.
// If successful, the argument is transformed into a Number and passed on to the handler

// Custom Pipe Implementation
// -> classes annotated with the @Injectable() decorator
// Mus implement the PipeTransform generic interface -> every pipe must have a transform() method
// Method will be called by NestJS to process the arguments
// The transform() method accepts two parameters: value (value of the processed argument) and metadata (object containing metadata about argument)
// Whatever is returned from the transform() method will be passed on to the route handler -> exceptions will be sent back to the client
// Pipes can be consumed in different ways

// Handler level pipes -> defined at the handler level via the @UsePipes() decorator -> will process all parameters for the incoming requests
// Parameter level pipes -> defined at the parameter level -> only specific parameter for which the pipe has been specified will be processed
// Global pipes -> defined at the application level and will be applied to any incoming request!
