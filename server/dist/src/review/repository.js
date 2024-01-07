"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRepository = void 0;
class ReviewRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  getAll() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.prisma.review.findMany();
    });
  }
  getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.prisma.review.findUnique({
        where: {
          id: id,
        },
      });
    });
  }
  create(review) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.prisma.review.create({
        data: review,
      });
    });
  }
  updatebyId(id, review) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.prisma.review.update({
        where: {
          id: id,
        },
        data: review,
      });
    });
  }
  deletebyId(id) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.prisma.review.delete({
        where: {
          id: id,
        },
      });
    });
  }
}
exports.ReviewRepository = ReviewRepository;
