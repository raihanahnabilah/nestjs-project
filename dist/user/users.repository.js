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
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcryptjs_1 = require("bcryptjs");
let UsersRepository = class UsersRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(user_entity_1.User, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    createUser(authCredentialsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = authCredentialsDto;
            const salt = yield bcryptjs_1.default.genSalt();
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            const user = this.create({
                username,
                password: hashedPassword,
            });
            try {
                yield this.save(user);
            }
            catch (error) {
                console.log(error.code);
                if (error.code === '23505') {
                    throw new common_1.ConflictException('Username already exists');
                }
                else {
                    throw new common_1.InternalServerErrorException();
                }
            }
        });
    }
};
UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UsersRepository);
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users.repository.js.map