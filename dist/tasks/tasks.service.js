"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const tasks_repository_1 = require("./tasks.repository");
let TasksService = class TasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    getTasks(filterDto, user) {
        return this.tasksRepository.getTasks(filterDto, user);
    }
    getTaskById(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.tasksRepository.findOne({ where: { id, user } });
            if (!found) {
                throw new common_1.NotFoundException(`Task with ID ${id} not found`);
            }
            return found;
        });
    }
    createTask(createTaskDto, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tasksRepository.createTask(createTaskDto, user);
        });
    }
    deleteTask(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.tasksRepository.delete({ id, user });
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Task with ID ${id} not found`);
            }
        });
    }
    updateTaskStatus(id, updateTaskDto, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status } = updateTaskDto;
            const task = yield this.getTaskById(id, user);
            task.status = status;
            yield this.tasksRepository.save(task);
            return task;
        });
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(tasks_repository_1.TasksRepository)),
    __metadata("design:paramtypes", [tasks_repository_1.TasksRepository])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map