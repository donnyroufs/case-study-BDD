import { Response } from "express"
import { mock, mockDeep } from "jest-mock-extended"
import { WithdrawCashRequest, WithdrawCashUseCase } from "../../../core"
import { WithdrawCashController } from "./WithdrawCashController"

describe("WithdrawCashController", () => {
  const mockedUseCase = mock<WithdrawCashUseCase>()
  const mockedResponse = mockDeep<Response>()

  test("passes the data to the use case", async () => {
    const sut = new WithdrawCashController(mockedUseCase)
    const dto = new WithdrawCashRequest("cardId", 20)
    await sut.handle({ body: dto } as any, mockedResponse)

    expect(mockedUseCase.execute).toHaveBeenCalledWith(dto)
  })

  test("returns a json response", async () => {
    const sut = new WithdrawCashController(mockedUseCase)
    const dto = new WithdrawCashRequest("cardId", 20)
    await sut.handle({ body: dto } as any, mockedResponse)

    expect(mockedResponse.json).toHaveBeenCalled()
  })

  test("returns an error object when something went wrong", async () => {
    const error = new Error("You did something that upset the system")
    mockedUseCase.execute.mockRejectedValue(error)
    const sut = new WithdrawCashController(mockedUseCase)
    const dto = new WithdrawCashRequest("cardId", 20)
    await sut.handle({ body: dto } as any, mockedResponse)

    expect(mockedResponse.json).toHaveBeenCalledWith({
      message: error.message,
    })
  })
})
