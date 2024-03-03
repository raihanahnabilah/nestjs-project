"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const transform_interceptor_1 = require("./tasks/transform.interceptor");
console.log(process.env.NODE);
console.log(process.env.MY_VARIABLE);
console.log(process.env.SOMETHING);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const logger = new common_1.Logger();
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        app.useGlobalPipes(new common_1.ValidationPipe({
            forbidUnknownValues: false,
        }));
        app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
        const port = process.env.PORT;
        yield app.listen(port, '0.0.0.0');
        logger.log(`Nest Application is running on: ${yield app.getUrl()}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map